# Propertygraph infrastructure

This is platform-as-code for the propertygraph project. This is little
more than a hello world so far, but it's a start.

## Key ideas

We are using the `kustomize` tool which is now built into `kubectl`. This tool
to generate variations on our configuration and sorts the output so that
everything is created in the right order.

## local development

[Skaffold](https://skaffold.dev) is used for local development. Assuming [Minikube](https://minikube.sigs.k8s.io) is installed and running, run the following command in the project root:

```sh
skaffold dev --port-forward
```

# Deployment

You can deploy this application with the following command:

```sh
# Bring it up in Minikube
kubectl apply -k platform/overlays/minikube
```
