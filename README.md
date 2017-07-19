# Zutto UI 
The owlmanatt/ZuttoZuttoZutto frontend.

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For development, you will probably want to set up the API proxy to work around CORS. You can configure it in `config/index.js`.

``` javascript
    proxyTable: {
      '/api': {
        target: 'https://chi.godless-internets.org',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/'
        }
      }
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
