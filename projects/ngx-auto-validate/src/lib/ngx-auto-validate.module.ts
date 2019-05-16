import { ModuleWithProviders, NgModule } from "@angular/core";
import { ControlErrorComponent } from "./components/control-error/control-error.component";
import { DEFAULT_FORM_ERRORS, FORM_ERRORS, provideFormErrors } from "./config/form-errors.config";
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
	 * @param config
	 * @returns ModuleWithProviders
	 */
	static forRoot(config: Config = { errors: {} }): ModuleWithProviders {
		return {
			ngModule: NgxAutoValidateModule,
			providers: [
				{ 
					provide: DEFAULT_FORM_ERRORS, 
					useValue: config.errors 
				},
				{ 
					provide: FORM_ERRORS, 
					useFactory: provideFormErrors,
					deps: [DEFAULT_FORM_ERRORS]
				}
			]
		};
	}

}
