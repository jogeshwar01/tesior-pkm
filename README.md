# Tesior PKM

Multi Cloud Kubernetes Clusters and Shamir Secret Sharing for private key management in tesior

## Kubernetes setup

1. Local Setup

- Prerequisites - Kind and Kubectl

```
cd infra/k8s
kind create cluster --config cluster.yml --name local
kubectl apply -f deployment.yml
kubectl apply -f service.yml
```

2. Access

```
kubectl get nodes --owide            // Get node internal IP
Go to INTERNAL-IP:30007/share
```
