package docs

import (
	"embed"
	"io/fs"
	"net/http"
	"path"

	swaggerui "github.com/Red-Sock/go-swagger-ui"
	"github.com/rs/zerolog/log"
)

//go:embed all:swaggers
var swaggers embed.FS

const (
	BasePath    = "/docs/"
	swaggerPath = BasePath + "swaggers/"
)

func Swagger() (p string, handler http.HandlerFunc) {
	mux := http.NewServeMux()

	mux.Handle(BasePath, swaggerui.NewHandler(
		swaggerui.WithBasePath(BasePath),
		swaggerui.WithHTMLTitle("HELLO_WORLD_DOCS"),
		swaggerui.WithSpecURLs("hello_world_api", []swaggerui.SpecURL{
			{
				Name: "hello_world_api",
				URL:  path.Join(swaggerPath, "hello_world_api.swagger.json"),
			},
		}),
		swaggerui.WithShowExtensions(true),
	))

	{
		stripped, err := fs.Sub(swaggers, "swaggers")
		if err != nil {
			log.Fatal().Err(err).Send()
		}

		ffs := http.StripPrefix(swaggerPath, http.FileServer(http.FS(stripped)))
		mux.Handle(swaggerPath, ffs)
	}

	return BasePath, mux.ServeHTTP
}
