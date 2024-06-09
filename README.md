# [Redline](https://github.com/sombriks/redline)

[![Node.js CI/CD](https://github.com/sombriks/redline/actions/workflows/node.js.yml/badge.svg)](https://github.com/sombriks/redline/actions/workflows/node.js.yml)

Study project - Yet another personal finance app

## Overview

- Keep track of your personal expenses and income
- [Draw nice charts](https://vue-data-ui.graphieros.com/)
- [Use nice UI components](https://vuetifyjs.com/)
- Import and export data
- [_Don't take this code too serious_](./docs/THINGS_TO_FIX.md)
- <https://sombriks.atlassian.net/jira/software/projects/RED/boards/2>
- <https://lazerhawk.bandcamp.com/album/redline>

![jerry-maguire-show-me-the-money.gif](docs/jerry-maguire-show-me-the-money.gif)

## Project setup, how to run, how to test, etc

See [individual](service-node-koa/README.md) [readme's](web-app-vue/README.md)
for each project.

## Noteworthy

- It all started for fun with a [db schema](docs/redline.sql) for a personal
  finance app.
- Then we added a node with koa backend to study api building, and a frontend
  made with vue3, vuetify and a few other cool libraries.
- Then the project was used to study
  [docker](service-node-koa/infrastructure/Dockerfile)
  [containers](web-app-vue/infrastructure/Dockerfile).
- At some moment it was used to
  [study kubernetes](service-node-koa/infrastructure/k8s/deployment.yml).
- And finally Continuous Delivery with GitOps, using ArgoCD to observe the
  desired state for the cluster and applying it when it changes.
- There is [a few things to be done](docs/THINGS_TO_FIX.md) to proper call it a
  respectable code reference, but i think it's cool.
