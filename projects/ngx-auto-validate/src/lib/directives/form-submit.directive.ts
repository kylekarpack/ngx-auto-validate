import { Directive, ElementRef } from "@angular/core";
import { fromEvent } from "rxjs";
import { shareReplay, tap } from "rxjs/operators";

@Directive({
	selector: "form"
})
export class FormSubmitDirective {

	constructor(private host: ElementRef<HTMLFormElement>) { }

	get element() {
		return this.host.nativeElement;
	}

	ngOnInit() {
		// ToDo: take initial class as a parameter
		this.host.nativeElement.classList.add("needs-validation");
	}
	
	public submit$ = fromEvent(this.element, "submit")
		.pipe(tap(() => {
			// ToDo: take validation class as a parameter
			if (this.element.classList.contains("was-validated") === false) {
				this.element.classList.add("was-validated");
			}
		}), shareReplay(1));

}