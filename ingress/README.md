# Ingress

Ingress for this project is being handled by Istio. This is a basic hello world
config at the moment.

NB: The cluster is being created with Istio already installed. So there is only
some application specific config here, rather than the entire Istio install.

The cluster is currently being created with the following command:
```sh
gcloud beta container --project "propertygraph" clusters create "propertygraph" \
  --region "northamerica-northeast1" --no-enable-basic-auth \
  --cluster-version "1.13.6-gke.0" --machine-type "n1-standard-1" --image-type "COS" \
  --disk-type "pd-standard" --disk-size "100" --metadata disable-legacy-endpoints=true \
  --scopes "https://www.googleapis.com/auth/devstorage.read_only","https://www.googleapis.com/auth/logging.write","https://www.googleapis.com/auth/monitoring","https://www.googleapis.com/auth/servicecontrol","https://www.googleapis.com/auth/service.management.readonly","https://www.googleapis.com/auth/trace.append"
  --preemptible --num-nodes "1" --enable-stackdriver-kubernetes --enable-ip-alias \
  --network "projects/propertygraph/global/networks/default" \
  --subnetwork "projects/propertygraph/regions/northamerica-northeast1/subnetworks/default" \
  --default-max-pods-per-node "110" --addons HorizontalPodAutoscaling,HttpLoadBalancing,Istio \
  --istio-config auth=MTLS_PERMISSIVE --enable-autoupgrade --enable-autorepair \
  --database-encryption-key "projects/propertygraph/locations/northamerica-northeast1/keyRings/propertygraph/cryptoKeys/k8s"
```
