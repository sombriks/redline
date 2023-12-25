# web-app-vue

Frontend part for redline

## Requirements

- node 18+
- docker 20+

## Recommended IDE Setup

- [Intellij IDEA Ultimate](https://www.jetbrains.com/idea/)
- [VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev:web
```

### Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:web
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## Docker image build and run

You can change `VITE_API_URL` to a proper testing value 

```sh
docker build -f infrastructure/Dockerfile \
-e VITE_API_URL=http://api.redline.sombriks.org \
-t sombriks/redline-web:testing .
```
You can expose another port if needed

```sh
docker run --rm -it --network=host -p 5000:5000 sombriks/redline-web:testing
```
