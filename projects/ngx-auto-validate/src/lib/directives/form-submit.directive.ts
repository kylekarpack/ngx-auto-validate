import { Directive, ElementRef, Inject, Input } from "@angular/core";
import { fromEvent } from "rxjs";
import { shareReplay, tap } from "rxjs/operators";
import { AV_CONFIG } from "../config/config.config";
import { Config } from "../interfaces/config.interface";

@Directive({
	selector: "form"
})
export class FormSubmitDirective {
	
	@Input("avNoValidate") noValidate: boolean | string;

	constructor(
		@Inject(AV_CONFIG) private config: Config, // Get module configuration
		private host: ElementRef<HTMLFormElement>
	) { }

	/**
	 * Get the form element
	 * @returns HTMLFormElement
	 */
	get element(): HTMLFormElement {
		return this.host.nativeElement;
	}

	ngOnInit() {

		if (this.noValidate === true || this.noValidate === "") {
			this.noValidate = true;
		}

		this.element.classList.add(this.config.classes.formNeedsValidation);
	}
	
	/**
	 * Handle form submission
	 */
	public submit$ = fromEvent(this.element, "submit")
		.pipe(tap(() => {
			// ToDo: take validation class as a parameter
			if (!this.element.classList.contains(this.config.classes.formWasValidated)) {
				this.element.classList.add(this.config.classes.formWasValidated);
			}
		}), shareReplay(1));

}