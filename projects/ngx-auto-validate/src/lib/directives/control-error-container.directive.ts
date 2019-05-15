import { Directive, ViewContainerRef } from "@angular/core";

@Directive({
	selector: ".form-group" // ToDo: Make this customizable
})
export class ControlErrorContainerDirective {

	constructor(public viewContainer: ViewContainerRef) { }

}
