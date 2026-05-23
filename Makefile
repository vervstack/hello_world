include rscli.mk


gen:
	mkdir -p pkg/web
	mkdir -p pkg/docs/
	moti g

build-ui:
	@echo --- Building WebUI ---
	cd pkg/web/hello-world-ui && bun i && bun run build
	@echo --- Copying dist into Go embed path ---
	rm -rf internal/transport/ui/dist
	cp -r pkg/web/hello-world-ui/dist internal/transport/ui/dist
