# Some bad practices, code smells and so on to fix (maybe)

On pet projects i often tend to not get too serious about some good practices
because, well, we don't expect it to _grow that much_

And i often get wrong on that. On "real work" projects i get so pragmatic, from
beginning, but here i was just toying around with a
[hypothetical database schema][1] for a personal finance control system and API
and, well, there we are: frontend, backend, continuous integration, continuous
deployment, docker images and image registries and a on-premise kubernetes
cluster somewhere with a pull-based deployment GitOps strategy. Because why not?

That said, there are some bad practices that someday i wish to fix. Some are 
simple, some are not.

## Dual language everywhere

I am a native portuguese speaker and english is my second language. Over this
codebase you may find terms like 'descrição', sometimes 'description'.

## Secrets on git repository

Big security issue. For a good amount of time, i had secrets in my .env files.
They still there, but rotated already, thanks to env override superpowers on
[kubernetes deployment manifest][2].

## Monorepo/Multiproject

At some point the simple database became an API and the api got a shiny vue.js 3
frontend. Not to mention the later IaC scripts dedicated to each module. The
thing with monorepos is, it must be able to produce several artifacts, and it
leads to volumous CI/CD scripts, if not complex. One project, one repo is a rule
to keep things simpler.

## Kubernetes instead simpler git push based deployments

For a hobby project, there is absolutely no need for kubernetes. It could be
[much simpler][3]. Sure, it was very educative to dive in the docs and learn as
much as possible about pods, replica sets, deployments, services, config maps, 
ingress, rbac, kubectl, k9s, k3s, k0s, operators, custom resource definitions
and all the funny names people do for tools interacting with k8s ecosystem, but
we don't need all of this for small to medium projects.

[1]: ./redline.sql
[2]: ../service-node-koa/infrastructure/k8s/deployment.yml
[3]: https://sombriks.com/blog/0063-git-based-deployment-services/
