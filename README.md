# Tesior PKM

Multi-Cloud Kubernetes Clusters and Shamir Secret Sharing for Private Key Management in Tesior

## Kubernetes setup

1. **Prerequisites**

- [Install Docker](https://docs.docker.com/engine/install/debian/)
- [Install Kind](https://kind.sigs.k8s.io/docs/user/quick-start#installing-from-release-binaries)
- [Install kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl-linux/)

2. **Create Cluster**

```
cd infra/k8s
kind create cluster --config cluster.yml --name local
```

3. **Environment Variables**

- Put base64 secret values in with corresponding keys in secret.yml

```
echo -n 'your_secret_data' | base64
kubectl apply -f secret.yml
```

4. **Setup Deployments and services**

```
kubectl apply -f deployment.yml
kubectl apply -f service.yml
```

5. **Access**

- NodePort service - using node internal ip

```
kubectl get nodes --owide            // Get node internal IP
Go to INTERNAL-IP:30007/share
```

- Localhost - using port mappings in cluster.yml

```
localhost:30007/share
```

6. **Taints and tolerations**

- To check if taint is present -

```
kubectl describe node local-control-plane | grep Taints
```

- By default, the master node has a taint that prevents regular pods from scheduling on it. You need to remove this taint to allow pods to run on the master node. This can be done using the following kubectl command:

```
kubectl taint nodes --all node-role.kubernetes.io/master-
```

7. **Note:**

- Dockerhub image - `jogeshwar01/tesior-pkm`
- **To run shamir secret sharing on smaller machines**
  - Set replicas in deployment and number of worker nodes in cluster as per need.
  - For smaller machines, use 1 replica and no worker node. Remove taint on control plane (if present) to run pods on control plane. (**_Not recommended but fine for this case_**). Also run all queries in superuser mode -> `sudo su`
  - If on AWS EC2 - after setting up the cluster - add an inbound rule to port 30007 to access the share at
    `<Instance-Public-IP>:30007/share`. Need to add firewall rules to prevent anyone from accessing the api.
