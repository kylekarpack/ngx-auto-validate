import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { ElementRef } from "@angular/core";
import { FormSubmitDirective } from "./form-submit.directive";

@Component({
	template: `
		<div>Without Directive</div>
		<div or>Default</div>
	`
})
class TestComponent {}

describe("FormSubmitDirective", () => {
	let fixture: ComponentFixture<TestComponent>;
	let elementsWithDirective: Array<DebugElement>;
	let bareElement: DebugElement;
	beforeEach(() => {
		const elementRefStub = {};
		TestBed.configureTestingModule({
			declarations: [FormSubmitDirective, TestComponent]
		});
		fixture = TestBed.createComponent(TestComponent);
		fixture.detectChanges();
		elementsWithDirective = fixture.debugElement.queryAll(
			By.directive(FormSubmitDirective)
		);
		bareElement = fixture.debugElement.query(By.css(":not(form)"));
	});
	it("should have bare element", () => {
		expect(bareElement).toBeTruthy();
	});
	// it("should have 1 element(s) with directive", () => {
	// 	expect(elementsWithDirective.length).toBe(1);
	// });
});
