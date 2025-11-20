.PHONY: build run test clean docker

BINARY := cexd
PKG := github.com/luxfi/cex

build:
	go build -o bin/$(BINARY) ./cmd/cexd/

run: build
	./bin/$(BINARY)

test:
	go test -v -race ./...

clean:
	rm -rf bin/

docker:
	docker build -t ghcr.io/luxfi/cex:latest .

lint:
	go vet ./...
