# ng2-permission

## Claims

This library is for angular 2+. Its implementation is inspired by [angular-permission](https://github.com/Narzerus/angular-permission). And its usage therefore is similar to `angular-permission`.

## Features

* simple and clear model to manage permission and roles
* route guard(only for `@angular/router`)
* directive to control element's existence
* central store to host ACL(access control list)
* async permission pipes to use with `ngIf`

## Installation

To install this library, run:

```bash
$ npm install ng2-permission --save
```

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

    // Specify your library as an import
    PermissionModule.forRoot()
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

### Pipe
Once the library is imported, you can use its components, directives and pipes in your Angular application:

```html
<!-- permission ia a string(or RawPermissionMap) variable representing a permission or role -->
<h1 *ngIf="permVar | permission | async">
  {{title}}
</h1>
```

> Note: permission pipe doesn't support `redirectTo` config if it's used with object map. Because it doesn't make sense.

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
