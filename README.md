# ngx-auto-validate

ngx-auto-validate is a validation module for Angular that favors dynamic element modification to show client-side validation errors. It's a good solution for large forms or applications where writing out all validation combinations could result in excess HTML in your templates.

Inspired by https://netbasal.com/make-your-angular-forms-error-messages-magically-appear-1e32350b7fa5 and https://jonsamwell.github.io/angular-auto-validate

## Installation
### NOTE: This package is not yet avaliable on npm
```
npm install ngx-auto-validate
```
or 
```
yarn add ngx-auto-validate
```

## Usage:

Import this library in your ```app.module.ts```:
```typescript
import { NgxAutoValidateModule } from "ngx-auto-validate";

@NgModule({
    ...
    imports: [
        ReactiveFormsModule,
        NgxAutoValidateModule,
        ...
    ]
})
export class AppModule { }

```

## ToDo:
* Add additional validation types
* Add parameters for customization
* Add NPM package