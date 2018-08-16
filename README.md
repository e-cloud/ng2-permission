# ng2-permission

<p align="center">
  <a href="https://travis-ci.org/e-cloud/ng2-permission?branch=master"><img src="https://travis-ci.org/e-cloud/ng2-permission.svg?branch=master" alt="Travis Status"></a>
  <a href="https://www.npmjs.com/package/vue"><img src="https://img.shields.io/npm/v/ng2-permission.svg" alt="Version"></a>
  <a href="https://www.npmjs.com/package/vue"><img src="https://img.shields.io/npm/l/ng2-permission.svg" alt="License"></a>
  <br>
</p>

## Claims

This library is for angular 2+. Its implementation is inspired by [angular-permission](https://github.com/Narzerus/angular-permission). And its usage therefore is similar to `angular-permission`. However,
its functionality is a superset compared to `angular-permission`

## Features

* simple and clear model to manage permission and roles
* route guard(only for `@angular/router`)
* directives to control element's existence
* central store to host ACL(access control list)
* async permission pipes to use with `ngIf`

## Installation

To install this library, run:

```bash
$ npm install ng2-permission --save
```

## Concepts

Internally, we use a `PermissionMap` model to represent the various permission operation and composition.

`PermissionMap` has following three fields to hold the ability of Set Operations necessary for permission control.

* **`only`**    <==>  **and** <==> Intersection
* **`anyOf`**   <==> **or**  <==> Union
* **`except`**  <==>  **not** <==> Complement

> NOTE: `only` here is different from `only` in `angular-permission`. In `angular-permission`, `only` represents
> `or`/`Union` in fact. It isn't correct semantically but only a little sense-making orally.

## Usage

### Imports

Once you have installed the library, you can import it in your Angular `AppModule`:

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// Import your library
import { PermissionModule } from 'ng2-permission';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,

    // Specify library as an import
    PermissionModule()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

### Define permissions and roles

```typescript
@Injectable()
export class DefinePermissionsAndRolesService {
    constructor(private permissionStore: PermissionStore, private roleStore: RoleStore) { }

    init() {
        this.permissionStore.definePermission('Read', function () {
            return true;
        });
        this.permissionStore.definePermission('Write', function () {
            return true;
        });
        this.permissionStore.definePermission('Delete', function () {
            return true;
        });

        this.roleStore.defineRole('Admin', ['Read', 'Write', 'Delete']);
    }
}
```

#### Option 1: Standalone service

Create a service to define permissions and roles, and use it in the root component of your app.

```typescript
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(defineService: DefinePermissionsAndRolesService) {
      defineService.init()
  }
}
```

#### Option 2: APP_INITIALIZER

See [HERE](https://github.com/angular/angular/issues/9047#issuecomment-224075188)

Create a service to define permissions and roles, and use it via `APP_INITIALIZER`

### Directive
Once the library is imported, you can use its components, directives and pipes in your Angular application:

```html
<!-- permission ia a string(or RawPermissionMap) variable representing a permission or role -->
<h1 *permissionIf="permVar">
  {{title}}
</h1>
```

### Use directives

we provide four directives now for various purposes.

```html
<!--
 powerful permissionIf, if you pass string or string array, it will behave as permissionOnly.
 if you pass an object, it will process all rules specified.
  -->
<h1 *permissionIf="permVar">{{ title }}</h1>
<h1 *permissionIf="'a string'">{{ title }}</h1>
<h1 *permissionIf="['string a', 'string b']">{{ title }}</h1>
<h1 *permissionIf="{ only: 'string a', except: 'string b', 'anyOf': 'string c' }">{{ title }}</h1>
<h1 *permissionIf="'a string'; else elseTpl">{{ title }}</h1>

<!-- only process with `only` rule -->
<h1 *permissionOnly="'a string'">{{ title }}</h1>
<h1 *permissionOnly="['string a', 'string b']">{{ title }}</h1>
<h1 *permissionOnly="'a string'; else elseTpl">{{ title }}</h1>

<!-- only process with `except` rule -->
<h1 *permissionExcept="'a string'">{{ title }}</h1>
<h1 *permissionExcept="['string a', 'string b']">{{ title }}</h1>
<h1 *permissionExcept="'a string'; else elseTpl">{{ title }}</h1>

<!-- only process with `anyOf` rule -->
<h1 *permissionAnyOf="['string a', 'string b']">{{ title }}</h1>
<h1 *permissionAnyOf="['string a', 'string b']; else elseTpl">{{ title }}</h1>

<ng-template #elseTpl>some text</ng-template>
```

#### External condition

Some, we want to use it with other condition just like combining it with `ngIf`, but we can't use two
structural directive in one tag. Fortunately, we support external condition in `permissionIf`.

```html
<h1 *permissionIf="permVar;external: externalCondition">
  {{title}}
</h1>
```

external condition is supported by all four directives.

### Pipe
Once the library is imported, you can use its components, directives and pipes in your Angular application:

```html
<!-- permission ia a string(or RawPermissionMap) variable representing a permission or role -->
<h1 *ngIf="permVar | permission | async">
  {{title}}
</h1>
```

> Note: permission pipe doesn't support `redirectTo` config if it's used with object map. Because it doesn't make sense.

### Route Guard

Specify `PermissionGuard` in `canActivate` or `canActivateChild`, then define the `permission` property in data object.
Then `PermissionGuard` will extract permission data and perform the verification.

You can also specify a `redirectTo` field in permission object, we will perform redirection like `redirect` in route config object.

```ts
import { PermissionGuard } from 'ng2-permission';

// ...

RouterTestingModule.withRoutes([
    { path: 'login', component: LoginComponent },
    { path: '404', component: PageNotFoundComponent },
    {
        path: 'home',
        canActivate: [PermissionGuard],
        component: HomeComponent,
        data: {
            permission: {
                only: 'Admin',
                except: 'Suspect',
            },
        },
    },
    {
        path: 'home2',
        canActivate: [PermissionGuard],
        component: HomeComponent,
        data: {
            permission: {
                only: 'Admin',
                except: 'Suspect',
                redirectTo: '/404',
            },
        },
    },
]),
```

## Development

To generate all `*.js`, `*.d.ts` and `*.metadata.json` files:

```bash
$ npm run build
```

To lint all `*.ts` files:

```bash
$ npm run lint
```

## License

MIT © [e-cloud](mailto:saintscott119@gmail.com)
