// tslint:disable-next-line:max-line-length
import { ComponentFactoryResolver, ComponentRef, Directive, ElementRef, Host, Inject, Optional, Self, ViewContainerRef, Renderer2 } from "@angular/core";
import { NgControl } from "@angular/forms";
import { untilDestroyed } from "ngx-take-until-destroy";
import { EMPTY, merge, Observable } from "rxjs";
import { ControlErrorComponent } from "../components/control-error/control-error.component";
import { ErrorsConfig } from "../interfaces/config.interface";
import { ControlErrorContainerDirective } from "./control-error-container.directive";
import { FormSubmitDirective } from "./form-submit.directive";
import { FORM_ERRORS } from "../config/form-errors.config";

@Directive({
	selector: "[formControl], [formControlName]"
})
export class ControlErrorsDirective {

	private submit$: Observable<any>;
	private errorsContainer: ComponentRef<ControlErrorComponent>;

	constructor(
		@Inject(FORM_ERRORS) private errors: ErrorsConfig, // Get module configuration
		@Self() private control: NgControl,	// Get this control
		@Optional() @Host() private form: FormSubmitDirective, // Get parent form
		@Optional() @Host() private controlErrorContainer: ControlErrorContainerDirective, // Get parent form group
		private viewContainer: ViewContainerRef,
		private resolver: ComponentFactoryResolver,
		private elementRef: ElementRef,
		private renderer: Renderer2
	) {
		this.submit$ = this.form ? this.form.submit$ : EMPTY;
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
	 * Create a container component for the errors if it doesn't exist
	 * Set the error text that should be showing
	 * @param text
	 * @returns void
	 */
	private setError(text: string): void {
		// Create the container if needed
		if (!this.errorsContainer) {

			// Create the component
			const factory = this.resolver.resolveComponentFactory(ControlErrorComponent);

			// Create errors container (also adds to DOM)
			this.errorsContainer = this.viewContainer.createComponent(factory);

			// Add to end of parent container if specified
			if (this.controlErrorContainer && this.controlErrorContainer.viewContainer) {

				const parent = this.controlErrorContainer.viewContainer.element.nativeElement,
					child = this.errorsContainer.injector.get(ControlErrorComponent).elementRef.nativeElement;

				this.renderer.appendChild(parent, child);

				// ToDo: this is not very tidy
				if (this.controlErrorContainer.validationInitialized) {
					this.renderer.removeChild(parent, child);
				}

				// Tell the container that it contains validation
				this.controlErrorContainer.validationInitialized = true;
			}
		}

		if (this.errorsContainer) {
			this.errorsContainer.instance.text = text;
		}

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