import { ComponentFixture, TestBed, async } from "@angular/core/testing";
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { ComponentFactoryResolver } from "@angular/core";
import { ElementRef } from "@angular/core";
import { ViewContainerRef } from "@angular/core";
import { NgControl, FormControl, Validators } from "@angular/forms";
import { ErrorsConfig } from "../interfaces/config.interface";
import { ControlErrorContainerDirective } from "./control-error-container.directive";
import { FormSubmitDirective } from "./form-submit.directive";
import { ControlErrorsDirective } from "./control-errors.directive";

@Component({
	template: `
    <div>Without Directive</div>
  `
})
class TestComponent { 
	public testControl = new FormControl("", Validators.required);
}

describe("ControlErrorsDirective", () => {
	let fixture: ComponentFixture<TestComponent>;
	let elementsWithDirective: Array<DebugElement>;
	let bareElement: DebugElement;

	beforeEach(() => {
		const componentFactoryResolverStub = {
			resolveComponentFactory: controlErrorComponent1 => ({})
		};
		const elementRefStub = { nativeElement: { setCustomValidity: () => ({}) } };
		const viewContainerRefStub = { createComponent: factory1 => ({}) };
		const ngControlStub = { valueChanges: {}, errors: {} };
		const errorsConfigStub = {};
		const controlErrorContainerDirectiveStub = { vcr: {} };
		const formSubmitDirectiveStub = { submit$: {} };
		TestBed.configureTestingModule({
			declarations: [ControlErrorsDirective, TestComponent]
		}).compileComponents();
		fixture = TestBed.createComponent(TestComponent);
		fixture.detectChanges();
		// elementsWithDirective = fixture.debugElement.queryAll(
		// 	By.directive(ControlErrorsDirective)
		// );
		// bareElement = fixture.debugElement.query(
		// 	By.css(":not([formControl], [formControlName])")
		// );
	});

	// it("should be able to test directive", async(() => {
	// 	TestBed.overrideComponent(TestComponent, {
	// 		set: {
	// 			template: "<input formControl='testControl' />"
	// 		}
	// 	});

	// 	// ...      

	// }));
	it("should test initial state", () => {
		expect(fixture).toBeDefined();
	});

	it("should initially be invalid", () => {
		expect(fixture.componentInstance.testControl.valid).toEqual(false);
	});

	it("should not show validation initially", async(() => {
		// const directiveEl = fixture.debugElement.query(By.directive(ControlErrorsDirective));
		// const directiveInstance = directiveEl.injector.get(ControlErrorsDirective);
		// expect(directiveInstance.errorsContainer.instance.hide).toBe(true);
	}));

	it ("should be valid when value is set", () => {
		fixture.componentInstance.testControl.patchValue("test");
		expect(fixture.componentInstance.testControl.valid).toEqual(true);
	});

});
