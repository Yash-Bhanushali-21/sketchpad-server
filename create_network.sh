#!/bin/bash

NETWORK_NAME="my_network"

# Check if the network exists
if ! docker network inspect $NETWORK_NAME &> /dev/null; then
    # If the network doesn't exist, create it
    docker network create $NETWORK_NAME
    echo "Network '$NETWORK_NAME' created."
else
    echo "Network '$NETWORK_NAME' already exists."
fi
