package api

import (
	"context"
	"database/sql"
	"net/http"

	"github.com/grpc-ecosystem/grpc-gateway/v2/runtime"
	"github.com/rs/zerolog/log"
	"google.golang.org/grpc"

	"github.com/godverv/hello_world/internal/config"
	api "github.com/godverv/hello_world/pkg/hello_world"
)

type Impl struct {
	api.UnimplementedHelloWorldAPIServer

	version string

	db   *sql.DB
	peer api.HelloWorldAPIClient
}

func New(db *sql.DB, cfg config.Config) *Impl {
	return &Impl{
		version: cfg.AppInfo.Version,
		db:      db,
	}
}

func (a *Impl) WithPeer(peer api.HelloWorldAPIClient) {
	a.peer = peer
}

func (a *Impl) Register(server grpc.ServiceRegistrar) {
	api.RegisterHelloWorldAPIServer(server, a)
}

func (a *Impl) Gateway(ctx context.Context, endpoint string, opts ...grpc.DialOption) (route string, handler http.Handler) {
	gwHttpMux := runtime.NewServeMux()

	err := api.RegisterHelloWorldAPIHandlerFromEndpoint(
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
