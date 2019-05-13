import { NgModule } from "@angular/core";
import { ControlErrorComponent } from "./components/control-error/control-error.component";
import { ControlErrorContainerDirective } from "./directives/control-error-container.directive";
import { ControlErrorsDirective } from "./directives/control-errors.directive";
import { FormSubmitDirective } from "./directives/form-submit.directive";

@NgModule({
	declarations: [ControlErrorsDirective, FormSubmitDirective, ControlErrorComponent, ControlErrorContainerDirective],
	imports: [],
	exports: [ControlErrorsDirective, FormSubmitDirective, ControlErrorComponent, ControlErrorContainerDirective],
	entryComponents: [ControlErrorComponent]
})
export class NgxAutoValidateModule { }
