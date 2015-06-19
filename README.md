# iflux-api-gateway-node
Node.js implementation of the iFLUX APIs Gateway

## Development setup

Create a `.env` file in the root directory of the project and put the following content:

```bash
KAFKA_ZOOKEEPER_HOST=<Boot2Docker IP>
KAFKA_ZOOKEEPER_PORT=2181
```

### Mandatory

It's highly recommended to use `Docker` to simplify your environment setup. Refers to this [iFLUX Docker](https://github.com/SoftEng-HEIGVD/iflux-docker) repository. 

| Name                       | Description                               |
| -------------------------- | ----------------------------------------- |
| KAFKA_ZOOKEEPER_HOST       | Should be the Docker host IP (boot2docker IP, Vagrant VM IP, ...) or the IP of your host if you have installed Kafka manually. |
| KAFKA_ZOOKEEPER_PORT       | Default port is 2181. |
