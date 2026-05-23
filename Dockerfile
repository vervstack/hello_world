FROM --platform=$BUILDPLATFORM node:23-alpine3.20 AS webclient

WORKDIR /web

RUN --mount=type=bind,target=/web,rw \
    cd /web/pkg/web/hello-world-ui && \
    npm i -g bun && bun i && bun run build && \
    mv dist /dist

FROM --platform=$BUILDPLATFORM golang:1.26.3 AS builder

WORKDIR /app

COPY --from=webclient /dist internal/transport/ui/dist

RUN --mount=target=. \
        --mount=type=cache,target=/root/.cache/go-build \
        --mount=type=cache,target=/go/pkg \
        GOOS=$TARGETOS GOARCH=$TARGETARCH CGO_ENABLED=0 \
    go build -o /deploy/server/service ./cmd/service/main.go && \
    cp -r config /deploy/server/config && \
    cp -r migrations /deploy/server/migrations

FROM alpine

WORKDIR /app
LABEL MATRESHKA_CONFIG_ENABLED=true

COPY --from=builder /deploy/server/ .

EXPOSE 80

ENTRYPOINT ["./service"]