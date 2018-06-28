# react-ssr-bootstrap-project

Simple React project with SSR

-   React
-   SSR (Http2 | Http1 fallback)
-   babel 7
-   webpack 4
-   HMR
-   typescript (as typecheccker not transpiller)
-   prettier
-   tslint
-   stylelint
-   jest
-   puppeteer

.babelrc используется webpack и node-babel для транспиляции конфигов и утилит
для react-loader все настройки находятся в ./config/babelLoaderConfig.json

to start app - run client & server npm scripts

// TODO: after all tools are migrated to babel 7 - remove babel-core@7.0.0-bridge.0
