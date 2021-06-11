## Runing docker kafka service

### Running docker services

```
> docker-compose up -d
```

### Creating a topic

```
> docker-compose exec kafka kafka-topics --create --topic meu-topico-legal --partitions 1 --replication-factor 1 --if-not-exists --bootstrap-server localhost:29092
```

### Producing test messsages to the topic

```
> docker-compose exec kafka bash -c "seq 100 | kafka-console-producer --request-required-acks 1 --broker-list localhost:29092 --topic meu-topico-legal && echo 'Produced 100 messages.'"
```

### Consuming test messsages from the topic

```
> docker-compose exec kafka kafka-console-consumer --bootstrap-server localhost:29092 --topic meu-topico-legal --from-beginning --max-messages 100
```
