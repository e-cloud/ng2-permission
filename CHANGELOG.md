# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

<a name="1.1.1"></a>
## [1.1.1](https://github.com/e-cloud/ng2-permission/compare/v1.1.0...v1.1.1) (2018-12-11)



<a name="1.1.0"></a>
# [1.1.0](https://github.com/e-cloud/ng2-permission/compare/v1.0.0...v1.1.0) (2018-12-11)


### Features

* **deps:** upgrade deps and support angualr v7 ([56a59d4](https://github.com/e-cloud/ng2-permission/commit/56a59d4))



<a name="1.0.0"></a>
# [1.0.0](https://github.com/e-cloud/ng2-permission/compare/v0.9.0...v1.0.0) (2018-08-16)


### Features

* add rule specific directives for convenience and better semantic ([f24763b](https://github.com/e-cloud/ng2-permission/commit/f24763b))
* deprecate `forRoot` for better convenient usage ([c95dbcf](https://github.com/e-cloud/ng2-permission/commit/c95dbcf))
* support anyOf rule for full mapping with set operations ([9e61bd9](https://github.com/e-cloud/ng2-permission/commit/9e61bd9))


### BREAKING CHANGES

* The signature of ValidateResult is changed to be an interface



<a name="0.9.0"></a>
# [0.9.0](https://github.com/e-cloud/ng2-permission/compare/v0.8.2...v0.9.0) (2018-06-01)


### Features

* upgrade to Ng6 and Rxjs 6 and the project template ([603c1a5](https://github.com/e-cloud/ng2-permission/commit/603c1a5))



<a name="0.8.2"></a>
## [0.8.2](https://github.com/e-cloud/ng2-permission/compare/v0.8.1...v0.8.2) (2017-12-26)



<a name="0.8.1"></a>
## [0.8.1](https://github.com/e-cloud/ng2-permission/compare/v0.8.0...v0.8.1) (2017-11-23)



<a name="0.8.0"></a>
# [0.8.0](https://github.com/e-cloud/ng2-permission/compare/v0.7.1...v0.8.0) (2017-11-18)


### Features

* **deps:** upgrade deps to support Angular 5 ([d593fa8](https://github.com/e-cloud/ng2-permission/commit/d593fa8))



<a name="0.7.1"></a>
## [0.7.1](https://github.com/e-cloud/ng2-permission/compare/v0.7.0...v0.7.1) (2017-10-26)


### Bug Fixes

* **rxjs:** remove the ignored throw operator ([96de94f](https://github.com/e-cloud/ng2-permission/commit/96de94f))



<a name="0.7.0"></a>
# [0.7.0](https://github.com/e-cloud/ng2-permission/compare/v0.6.4...v0.7.0) (2017-10-26)


### Features

* **rxjs:** upgrade rxjs and use its new lettable feature ([99440e4](https://github.com/e-cloud/ng2-permission/commit/99440e4))


### BREAKING CHANGES

* **rxjs:** previously we added the operatators to Observable's prototype, now we don't. This could raise some missing references error at the user end.



<a name="0.6.4"></a>
## [0.6.4](https://github.com/e-cloud/ng2-permission/compare/v0.6.3...v0.6.4) (2017-08-04)


### Bug Fixes

* **module-syntax:** use proper import syntax to support tree shaking ([2c589e0](https://github.com/e-cloud/ng2-permission/commit/2c589e0))



<a name="0.6.3"></a>
## [0.6.3](https://github.com/e-cloud/ng2-permission/compare/v0.6.2...v0.6.3) (2017-08-01)


### Bug Fixes

* **permission-pipe:** check lastinput validity ([eac829d](https://github.com/e-cloud/ng2-permission/commit/eac829d))



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
