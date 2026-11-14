#!/bin/bash

echo Generating private key...
openssl genrsa -out jpi_private.pem 4096

echo Generated. Generating public key...
openssl rsa -in jpi_private.pem -out jpi_public.pem -outform PEM -pubout

echo JPI keys generated.