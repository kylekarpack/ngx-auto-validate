import { Directive, Self, Inject, Optional, Host, ViewContainerRef, 
		ComponentRef, ComponentFactoryResolver, ElementRef } from "@angular/core";
import { NgControl } from "@angular/forms";
import { untilDestroyed } from "ngx-take-until-destroy";
import { FORM_ERRORS } from "../config/form-errors.config";
import { FormSubmitDirective } from "./form-submit.directive";
import { Observable, EMPTY, merge } from "rxjs";
import { ControlErrorComponent } from "../components/control-error/control-error.component";
import { ControlErrorContainerDirective } from "./control-error-container.directive";

@Directive({
	selector: "[formControl], [formControlName]"
})
export class ControlErrorsDirective {

	submit$: Observable<any>;
	ref: ComponentRef<ControlErrorComponent>;
	container: any;

	constructor(
		@Self() private control: NgControl,
		@Optional() @Host() private form: FormSubmitDirective,
		@Inject(FORM_ERRORS) private errors,
		private viewContainer: ViewContainerRef,
		private resolver: ComponentFactoryResolver,
		@Optional() controlErrorContainer: ControlErrorContainerDirective,
		private elementRef: ElementRef
	) {
		this.submit$ = this.form ? this.form.submit$ : EMPTY;
		this.container = controlErrorContainer ? controlErrorContainer.vcr : viewContainer;
	}

	ngOnInit() {

		merge(
			this.submit$,
			this.control.valueChanges
		).pipe(
			untilDestroyed(this)).subscribe(() => {
				const controlErrors = this.control.errors;
				if (controlErrors) {
					const firstKey = Object.keys(controlErrors)[0];
					const getError = this.errors[firstKey];
					const text = getError(controlErrors[firstKey]);

					// Add :invalid pseudo class
					this.elementRef.nativeElement.setCustomValidity("Invalid");
					this.setError(text);
				} else if (this.ref) {

					// Add :valid pseudo class
					this.elementRef.nativeElement.setCustomValidity("");
					this.setError(null);
				}
			});
	}

	ngOnDestroy() {
		// Implemented to satisfy untilDestroyed
	}

	setError(text: string) {
		if (!this.ref) {
			const factory = this.resolver.resolveComponentFactory(ControlErrorComponent);
			this.ref = this.viewContainer.createComponent(factory);
		}

		this.ref.instance.text = text;
	}
}