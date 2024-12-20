##
## Build
##
FROM golang:1.23.4-bookworm AS build

WORKDIR /app

COPY go.mod ./
COPY go.sum ./
RUN go mod download

COPY . .

RUN go build -o /adam cmd/server/main.go

##
## Deploy
##
FROM gcr.io/distroless/base-debian10

WORKDIR /

COPY --from=build /adam /adam

EXPOSE 1323

USER nonroot:nonroot

ENTRYPOINT ["/adam"]
