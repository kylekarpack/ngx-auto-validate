import { Directive, ElementRef } from "@angular/core";
import { fromEvent } from "rxjs";
import { shareReplay, tap } from "rxjs/operators";

@Directive({
	selector: "form"
})
export class FormSubmitDirective {

	constructor(private host: ElementRef<HTMLFormElement>) { }

	/**
	 * Get the form element
	 * @returns HTMLFormElement
	 */
	get element(): HTMLFormElement {
		return this.host.nativeElement;
	}

	ngOnInit() {
		// ToDo: take initial class as a parameter
		this.element.classList.add("needs-validation");
	}
	
	/**
	 * Handle form submission
	 */
	public submit$ = fromEvent(this.element, "submit")
		.pipe(tap(() => {
			// ToDo: take validation class as a parameter
			if (!this.element.classList.contains("was-validated")) {
				this.element.classList.add("was-validated");
			}
		}), shareReplay(1));

}