# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

<a name="0.6.2"></a>
## [0.6.2](https://github.com/e-cloud/ng2-permission/compare/v0.6.1...v0.6.2) (2017-08-01)


### Bug Fixes

* **authorization:** use merge to properly emit any update ([e9fde6b](https://github.com/e-cloud/ng2-permission/commit/e9fde6b))
* **index:** export permission pipe for proper aot ([40a2a48](https://github.com/e-cloud/ng2-permission/commit/40a2a48))
* **permission-pipe:** keep data updated from store changes ([688c53f](https://github.com/e-cloud/ng2-permission/commit/688c53f))



<a name="0.6.1"></a>
## [0.6.1](https://github.com/e-cloud/ng2-permission/compare/v0.6.0...v0.6.1) (2017-08-01)



<a name="0.6.0"></a>
# [0.6.0](https://github.com/e-cloud/ng2-permission/compare/v0.5.2...v0.6.0) (2017-08-01)


### Bug Fixes

* **deps:** sync dependencies to product package.json ([a9ff85b](https://github.com/e-cloud/ng2-permission/commit/a9ff85b))
* **types:** improve types to compatible with ts 2.4 ([7b6763e](https://github.com/e-cloud/ng2-permission/commit/7b6763e))


### Features

* **guard:** provide a way to notify rejected route navigation ([820bbb3](https://github.com/e-cloud/ng2-permission/commit/820bbb3))
* **permissionIf:** improve and add tests for permissionIf ([32f2f0e](https://github.com/e-cloud/ng2-permission/commit/32f2f0e))
* **permissionIf:** support then & else block, and external condition ([107f235](https://github.com/e-cloud/ng2-permission/commit/107f235))



<a name="0.5.2"></a>
## [0.5.2](https://github.com/e-cloud/ng2-permission/compare/v0.5.1...v0.5.2) (2017-07-31)


### Bug Fixes

* **guard:** handle string permission properly, support canActivateChild ([b54c6f3](https://github.com/e-cloud/ng2-permission/commit/b54c6f3))



<a name="0.5.1"></a>
## [0.5.1](https://github.com/e-cloud/ng2-permission/compare/v0.5.0...v0.5.1) (2017-07-31)


### Bug Fixes

* add missing PermissionGuard to providers config ([5a6a715](https://github.com/e-cloud/ng2-permission/commit/5a6a715))



<a name="0.5.0"></a>
# [0.5.0](https://github.com/e-cloud/ng2-permission/compare/v0.4.0...v0.5.0) (2017-07-30)


### Bug Fixes

* **permission-guard:** make sure redirectTo work as expected ([83cebef](https://github.com/e-cloud/ng2-permission/commit/83cebef))


### Features

* **dep:** use lodash-es instead of lodash to support tree shaking ([6589f5e](https://github.com/e-cloud/ng2-permission/commit/6589f5e))
* **permission-pipe:** add a  pipe to use aside with external condition ([e5dfb6d](https://github.com/e-cloud/ng2-permission/commit/e5dfb6d))



<a name="0.4.0"></a>
# [0.4.0](https://github.com/e-cloud/ng2-permission/compare/v0.3.0...v0.4.0) (2017-06-07)


### Bug Fixes

* recheck the permission onnce the permission stores updated ([6afe330](https://github.com/e-cloud/ng2-permission/commit/6afe330))



<a name="0.3.0"></a>
# [0.3.0](https://github.com/e-cloud/ng2-permission/compare/v0.2.0...v0.3.0) (2017-06-06)


### Bug Fixes

* **module-export:** remove default exports ([c5f20ae](https://github.com/e-cloud/ng2-permission/commit/c5f20ae))


### BREAKING CHANGES

* **module-export:** we drop default export for aot and better types reference



<a name="0.2.0"></a>
# 0.2.0 (2017-05-03)


### Bug Fixes

* handle empty privilege array ([2828afb](https://github.com/e-cloud/ng2-permission/commit/2828afb))
* typings error for ngc ([507e664](https://github.com/e-cloud/ng2-permission/commit/507e664))


### Features

* add permission-guard service for route intercepting ([8d767c1](https://github.com/e-cloud/ng2-permission/commit/8d767c1))
* add permissionIf directive ([603c7b5](https://github.com/e-cloud/ng2-permission/commit/603c7b5))
* finish permission module ([45751c7](https://github.com/e-cloud/ng2-permission/commit/45751c7))
* setup permission module ([0817a81](https://github.com/e-cloud/ng2-permission/commit/0817a81))
* use generator-angular2-library template for releasing the lib ([4c6cd8c](https://github.com/e-cloud/ng2-permission/commit/4c6cd8c))
