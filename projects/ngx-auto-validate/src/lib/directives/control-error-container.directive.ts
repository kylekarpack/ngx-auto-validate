import { Directive, ViewContainerRef } from "@angular/core";

@Directive({
	selector: ".form-group" // ToDo: Make this customizable
})
export class ControlErrorContainerDirective {

	public validationInitialized: boolean = false;

	constructor(public viewContainer: ViewContainerRef) { }

}
