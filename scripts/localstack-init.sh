#!/bin/bash

set -e

# Wait for LocalStack to be ready
echo "Waiting for LocalStack to be ready..."
until curl -s http://localhost:4566/_localstack/health | grep -q "\"s3\": \"available\""; do
  sleep 2
done

echo "LocalStack is ready. Creating S3 bucket..."

# Create S3 bucket using awslocal (available in LocalStack init container)
awslocal s3api create-bucket \
  --bucket tryonn \
  --region ap-south-1 \
  --create-bucket-configuration LocationConstraint=ap-south-1

echo "S3 bucket 'tryonn' created successfully in ap-south-1 region."

