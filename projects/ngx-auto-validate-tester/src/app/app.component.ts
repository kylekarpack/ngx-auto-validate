import { Component } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.css"]
})
export class AppComponent {
	title = "ngx-auto-validate-tester";

	constructor(private formBuilder: FormBuilder) {}

	public form = this.formBuilder.group({
		required: ["", Validators.required],
		requiredAndMinLength: ["", [Validators.required, Validators.minLength(5)]],
		minLength: ["", Validators.minLength(5)],
		maxLength: ["", Validators.maxLength(5)],
		min: ["", Validators.min(5)],
		max: ["", Validators.max(5)],
		email: ["", Validators.email],
		pattern: ["", Validators.pattern(/^[a-z]*$/)],
		checkboxRequired: ["", Validators.requiredTrue],
		radio: ["", Validators.required]
	});

}
