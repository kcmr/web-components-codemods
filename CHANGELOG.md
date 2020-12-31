## [1.1.4](https://github.com/kcmr/web-components-codemods/compare/1.1.3...1.1.4) (2020-12-31)


### Bug Fixes

* **deps:** update dependency execa to v5 ([3cf140d](https://github.com/kcmr/web-components-codemods/commit/3cf140d3debbdcd4431e77d7affc6f7cebcc8b34))

## [1.1.3](https://github.com/kcmr/web-components-codemods/compare/1.1.2...1.1.3) (2020-11-19)


### Bug Fixes

* **deps:** update dependency jscodeshift to ^0.11.0 ([3bfe7bd](https://github.com/kcmr/web-components-codemods/commit/3bfe7bddf362e60b78727bf40fb90e00f87bf4ce))

## [1.1.2](https://github.com/kcmr/web-components-codemods/compare/1.1.1...1.1.2) (2020-07-07)


### Bug Fixes

* **deps:** update dependency globby to v11 ([0e8e0ed](https://github.com/kcmr/web-components-codemods/commit/0e8e0edd9ff92f82255e2b3d53a1e2ca07244038))

## [1.1.1](https://github.com/kcmr/web-components-codemods/compare/1.1.0...1.1.1) (2020-06-20)


### Bug Fixes

* **deps:** update dependency jscodeshift to ^0.10.0 ([11a3f77](https://github.com/kcmr/web-components-codemods/commit/11a3f778c3b39918aa33a935c039c88cbbd8c2b0))

# [1.1.0](https://github.com/kcmr/web-components-codemods/compare/1.0.1...1.1.0) (2020-06-20)


### Bug Fixes

* **commands:** typo in rename-tag command ([2b8ac06](https://github.com/kcmr/web-components-codemods/commit/2b8ac062fa631c6230c070c81da19f702e3df1a7))
* **transforms:** find tag name in any string ([eb1ee27](https://github.com/kcmr/web-components-codemods/commit/eb1ee27fa8d5ad73c94282f62ef26df647b112d9))


### Features

* **commands:** add new kodemod ([de74540](https://github.com/kcmr/web-components-codemods/commit/de74540d106c2f2390863bb2a1632b509d00fbb9))
* **transforms:** add a codemod to rename tags ([5b40bde](https://github.com/kcmr/web-components-codemods/commit/5b40bde86865b01981588b5f0f39f6f1131a89cb))
* **transforms:** rename tag name strings ([4e1cdf4](https://github.com/kcmr/web-components-codemods/commit/4e1cdf4e00ac86545a5804bf323b3e96d9cdd94e))

## [1.0.1](https://github.com/kcmr/web-components-codemods/compare/1.0.0...1.0.1) (2020-05-03)


### Bug Fixes

* **package:** update jscodeshift to version 0.8.0 ([ccb1296](https://github.com/kcmr/web-components-codemods/commit/ccb12969093cc9b36ae0dde2600f40653379494f))

# 1.0.0 (2020-01-05)


### Bug Fixes

* **package-lock:** remove private registry in some entries ([89694b2](https://github.com/kcmr/web-components-codemods/commit/89694b29b1ee49f77bd04e5b57c1ac5a52087e3f))
* **package-lock:** remove private registry in some entries ([fed7c24](https://github.com/kcmr/web-components-codemods/commit/fed7c24994ded66549d2aba401f0bfadfb4273a9))
* **replace-attrs:** do not replace unmodified nodes ([34a9e2f](https://github.com/kcmr/web-components-codemods/commit/34a9e2fdf8067d4e4f5a6c01e9b3e51b0617e137))
* **replace-attrs:** prevent replacing the tag name or attribute values ([dbeb37e](https://github.com/kcmr/web-components-codemods/commit/dbeb37e7229bf60dc0adb2f47b342cf916fd2ba7))
* **transforms:** prevent replacing brackets in if statement by iife ([f6bf99f](https://github.com/kcmr/web-components-codemods/commit/f6bf99faf5b5a8db58a0a19e4e20a40b7bb7cf63))


### Features

* **cli:** add CLI to run transforms ([e0f2c82](https://github.com/kcmr/web-components-codemods/commit/e0f2c823976c463792253f4747e528e8b899d52c)), closes [#4](https://github.com/kcmr/web-components-codemods/issues/4) [#4](https://github.com/kcmr/web-components-codemods/issues/4) [#4](https://github.com/kcmr/web-components-codemods/issues/4) [#4](https://github.com/kcmr/web-components-codemods/issues/4) [#4](https://github.com/kcmr/web-components-codemods/issues/4) [#4](https://github.com/kcmr/web-components-codemods/issues/4) [#4](https://github.com/kcmr/web-components-codemods/issues/4) [#4](https://github.com/kcmr/web-components-codemods/issues/4) [#4](https://github.com/kcmr/web-components-codemods/issues/4) [#4](https://github.com/kcmr/web-components-codemods/issues/4) [#4](https://github.com/kcmr/web-components-codemods/issues/4) [#4](https://github.com/kcmr/web-components-codemods/issues/4) [#4](https://github.com/kcmr/web-components-codemods/issues/4) [#4](https://github.com/kcmr/web-components-codemods/issues/4) [#4](https://github.com/kcmr/web-components-codemods/issues/4) [#4](https://github.com/kcmr/web-components-codemods/issues/4) [#4](https://github.com/kcmr/web-components-codemods/issues/4) [#4](https://github.com/kcmr/web-components-codemods/issues/4)
* **replace-attrs:** allow to pass recast options in params ([d90ca05](https://github.com/kcmr/web-components-codemods/commit/d90ca0520a2c30393519018f81a0f21b777a749f))
* **transforms:** add a codemod to replace block scope by IIFE ([db57c7b](https://github.com/kcmr/web-components-codemods/commit/db57c7b2474b585634ed546c72182af7a709dedc))
