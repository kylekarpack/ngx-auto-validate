import { ModuleWithProviders, NgModule } from "@angular/core";
import { ControlErrorComponent } from "./components/control-error/control-error.component";
import { FORM_ERRORS, provideFormErrors } from "./config/form-errors.config";
import { ControlErrorContainerDirective } from "./directives/control-error-container.directive";
import { ControlErrorsDirective } from "./directives/control-errors.directive";
import { FormSubmitDirective } from "./directives/form-submit.directive";
import { Config } from "./interfaces/config.interface";

@NgModule({
	entryComponents: [
		ControlErrorComponent
	],
	declarations: [
		ControlErrorsDirective,
		FormSubmitDirective,
		ControlErrorComponent,
		ControlErrorContainerDirective
	],
	imports: [],
	exports: [
		ControlErrorsDirective,
		FormSubmitDirective,
		ControlErrorComponent,
		ControlErrorContainerDirective
	]
})
export class NgxAutoValidateModule { 
	
	/**
	 * Construct an instance of this module with the specified configuration
	 * @param  {Config={errors:{}}} config
	 * @returns ModuleWithProviders
	 */
	static forRoot(config: Config = { errors: {} }): ModuleWithProviders {
		return {
			ngModule: NgxAutoValidateModule,
			providers: [
				{ 
					provide: FORM_ERRORS, 
					useValue: config.errors 
				},
				{ 
					provide: "config", 
					useFactory: provideFormErrors,
					deps: [FORM_ERRORS]
				}
			]
		};
	}

}
