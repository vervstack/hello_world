package example_api_impl

import (
	"context"
	"net/http"

	"github.com/grpc-ecosystem/grpc-gateway/v2/runtime"
	"github.com/rs/zerolog/log"
	"google.golang.org/grpc"

	"github.com/godverv/hello_world/pkg/hello_world"
)

type Impl struct {
	hello_world.UnimplementedHelloWorldAPIServer
}

func New() *Impl {
	return &Impl{}
}

func (impl *Impl) Register(server grpc.ServiceRegistrar) {
	hello_world.RegisterHelloWorldAPIServer(server, impl)
}

func (impl *Impl) Gateway(ctx context.Context, endpoint string, opts ...grpc.DialOption) (route string, handler http.Handler) {
	gwHttpMux := runtime.NewServeMux()

	err := hello_world.RegisterHelloWorldAPIHandlerFromEndpoint(
		ctx,
		gwHttpMux,
		endpoint,
		opts,
	)
	if err != nil {
		log.Error().Err(err).Msg("error registering grpc2http handler")
	}

	return "/api/", gwHttpMux
}
