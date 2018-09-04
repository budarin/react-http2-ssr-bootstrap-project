# react-ssr-bootstrap-project

[![dependencies](https://david-dm.org/budarin/react-ssr-bootstrap-project.svg)](https://david-dm.org/budarin/react-ssr-bootstrap-project) [![devDependencies](https://david-dm.org/budarin/react-ssr-bootstrap-project/dev-status.svg)](https://david-dm.org/budarin/react-ssr-bootstrap-project?type=dev)

Simple React project with SSR

-   React
-   SSR (Http2 | Http1 fallback)
-   babel 7 - для точной транспиляции под выбранные платформы
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
