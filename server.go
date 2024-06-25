package main

import (
	"flag"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/joho/godotenv"
)

//==============================================================================================

func loadEnv() {
	configFile := flag.String("config", ".env.develp", "Name of the config file (with extension)")
	flag.Parse()
	fmt.Printf("Using config file: %s\n", *configFile)

	// Load environment variables from .env file
	err := godotenv.Load(*configFile)
	if err != nil {
		log.Fatalf("Error loading .env file: %v", err)
	}
}

//===============================================

func startServer() {
	serverAddr := os.Getenv("SERVER_ADDR")
	serverPort := os.Getenv("SERVER_PORT")

	if serverAddr == "" || serverPort == "" {
		log.Fatalf("SERVER_ADDR or SERVER_PORT is not set in the environment")
	}

	address := fmt.Sprintf("%s:%s", serverAddr, serverPort)
	fmt.Printf("starting web server at http://%s\n", address)

	// Define a new router
	mux := http.NewServeMux()

	// CORS middleware handler
	corsHandler := func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			w.Header().Set("Access-Control-Allow-Origin", "*") // Allow all origins
			w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
			w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With")
			if r.Method == "OPTIONS" {
				w.WriteHeader(http.StatusOK)
				return
			}
			next.ServeHTTP(w, r)
		})
	}

	// Use the CORS middleware with your file server
	fs := http.FileServer(http.Dir("./"))
	mux.Handle("/WebStatic/", http.StripPrefix("/WebStatic/", corsHandler(fs)))

	// Start the server with your custom router
	err := http.ListenAndServe(address, mux)
	if err != nil {
		log.Fatalf("Error starting server: %v", err)
	}
}

//==============================================================================================

func main() {
	loadEnv()

	startServer()
}

//==============================================================================================
