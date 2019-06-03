# Propertygraph infrastructure

This is platform-as-code for the propertygraph project. This is little
more than a hello world so far, but it's a start.

## Key ideas

We are using the `kustomize` tool which is now built into `kubectl`. This tool
to generate variations on our configuration and sorts the output so that
everything is created in the right order.

# Deployment

You can deploy this application with the following command:

```sh
# Bring it up in Minikube
kubectl apply -k infrastructure/overlays/minikube

# Bring it up on Google Kubernetes Engine
kubectl apply -k infrastructure/overlays/gke
```
