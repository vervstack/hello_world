package main

import (
	"context"

	"github.com/rs/zerolog/log"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"

	api "github.com/godverv/hello_world/pkg/hello_world"
)

func main() {
	c, err := grpc.NewClient(":80",
		grpc.WithTransportCredentials(insecure.NewCredentials()))
	if err != nil {
		log.Fatal().Err(err).Send()
	}

	apiClient := api.NewHelloWorldAPIClient(c)
	resp, err := apiClient.Version(context.Background(), &api.Version_Request{})
	if err != nil {
		log.Fatal().Err(err).Send()
	} else {
		log.Info().Msgf("%v", resp)
	}

}
