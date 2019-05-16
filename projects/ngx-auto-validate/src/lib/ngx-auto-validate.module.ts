import { ModuleWithProviders, NgModule } from "@angular/core";
import { ControlErrorComponent } from "./components/control-error/control-error.component";
import { AV_CONFIG, DEFAULT_AV_CONFIG, provideConfig } from "./config/config.config";
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
	static forRoot(config: Config = {}): ModuleWithProviders {
		return {
			ngModule: NgxAutoValidateModule,
			providers: [
				// Get default auto validate configuration
				{ 
					provide: DEFAULT_AV_CONFIG, 
					useValue: config 
				},
				// And use that default config to build the meged config
				{ 
					provide: AV_CONFIG, 
					useFactory: provideConfig, // merges configurations
					deps: [DEFAULT_AV_CONFIG]
				}
			]
		};
	}

}
