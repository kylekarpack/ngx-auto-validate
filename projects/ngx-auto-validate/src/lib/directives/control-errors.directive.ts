// tslint:disable-next-line:max-line-length
import { ComponentFactoryResolver, ComponentRef, Directive, ElementRef, Host, Inject, Optional, Self, ViewContainerRef } from "@angular/core";
import { NgControl } from "@angular/forms";
import { untilDestroyed } from "ngx-take-until-destroy";
import { EMPTY, merge, Observable } from "rxjs";
import { ControlErrorComponent } from "../components/control-error/control-error.component";
import { ErrorsConfig } from "../interfaces/config.interface";
import { ControlErrorContainerDirective } from "./control-error-container.directive";
import { FormSubmitDirective } from "./form-submit.directive";

@Directive({
	selector: "[formControl], [formControlName]"
})
export class ControlErrorsDirective {

	submit$: Observable<any>;
	errorsContainer: ComponentRef<ControlErrorComponent>;
	container: any;

	constructor(
		@Inject("config") private errors: ErrorsConfig, // Get module configuration
		@Self() private control: NgControl,	// Get this control
		@Optional() @Host() private form: FormSubmitDirective, // Get parent form
		private viewContainer: ViewContainerRef,
		private resolver: ComponentFactoryResolver,
		@Optional() controlErrorContainer: ControlErrorContainerDirective,
		private elementRef: ElementRef
	) {
		this.submit$ = this.form ? this.form.submit$ : EMPTY;
		this.container = controlErrorContainer ? controlErrorContainer.vcr : viewContainer;
	}

	ngOnInit() {

		// Trigger on control value changes or form submission
		merge(
			this.submit$,
			this.control.valueChanges
		).pipe(
			untilDestroyed(this)
		).subscribe(() => {
			this.setValidation();
		});
	}

	ngOnDestroy() {
		// Implemented to satisfy untilDestroyed
	}

	/**
	 * Set the error text that should be showing
	 * @param text
	 * @returns void
	 */
	private setError(text: string): void {
		if (!this.errorsContainer) {
			const factory = this.resolver.resolveComponentFactory(ControlErrorComponent);
			this.errorsContainer = this.viewContainer.createComponent(factory);
		}

		this.errorsContainer.instance.text = text;
	}

	/**
	 * Set validation state when something changes
	 * @returns void
	 */
	private setValidation(): void {
		const controlErrors = this.control.errors;
		if (controlErrors) {
			const firstKey = Object.keys(controlErrors)[0],
				getError = this.errors[firstKey];
			
			let text = "Validation error";
			if (getError) {
				if (typeof getError === "string") {
					text = getError;
				} else if (typeof getError === "function") {
					text = getError(controlErrors[firstKey]);
				} else if (getError == null) {
					return;
				}
			}

			// Add :invalid pseudo class
			this.elementRef.nativeElement.setCustomValidity("Invalid");
			this.setError(text);
		} else if (this.errorsContainer) {

			// Add :valid pseudo class
			this.elementRef.nativeElement.setCustomValidity("");
			this.setError(null);
		}
	}
}