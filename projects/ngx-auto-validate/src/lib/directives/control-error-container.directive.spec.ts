import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { ViewContainerRef } from "@angular/core";
import { ControlErrorContainerDirective } from "./control-error-container.directive";

@Component({
	template: `
    <div>Without Directive</div>
    <div controlErrorContainer>Default</div>
  `
})
class TestComponent { }

describe("ControlErrorContainerDirective", () => {
	let fixture: ComponentFixture<TestComponent>;
	let elementsWithDirective: Array<DebugElement>;
	let bareElement: DebugElement;
	beforeEach(() => {
		const viewContainerRefStub = {};
		TestBed.configureTestingModule({
			declarations: [ControlErrorContainerDirective, TestComponent]
		});
		fixture = TestBed.createComponent(TestComponent);
		fixture.detectChanges();
		elementsWithDirective = fixture.debugElement.queryAll(
			By.directive(ControlErrorContainerDirective)
		);
		bareElement = fixture.debugElement.query(
			By.css(":not([controlErrorContainer])")
		);
	});
	it("should have bare element", () => {
		expect(bareElement).toBeTruthy();
	});
	it("should have 1 element(s) with directive", () => {
		expect(elementsWithDirective.length).toBe(1);
	});
});
