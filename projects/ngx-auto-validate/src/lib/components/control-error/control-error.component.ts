import { Component, Input, ChangeDetectorRef, ChangeDetectionStrategy, ViewEncapsulation } from "@angular/core";

// ToDo: take validation class as a parameter
@Component({
	template: `<p class="text-danger" [class.hide]="_hide">{{ _text }}</p>`,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ControlErrorComponent {
	_text: string;
	_hide = true;

	@Input() set text(value) {
		if (value !== this._text) {
			this._text = value;
			this._hide = !value;
			this.cdr.detectChanges();
		}
	}

	constructor(private cdr: ChangeDetectorRef) { }

}