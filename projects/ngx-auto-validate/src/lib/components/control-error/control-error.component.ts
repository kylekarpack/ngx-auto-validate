import { Component, Input, ChangeDetectorRef, ChangeDetectionStrategy } from "@angular/core";

// ToDo: take validation class as a parameter
@Component({
	template: `<p class="text-danger" [class.hide]="hide">{{ text }}</p>`,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ControlErrorComponent {

	private _text: string;
	private _hide: boolean = true;

	constructor(private changeDetectorRef: ChangeDetectorRef) { }
	
	/**
	 * Gets current value of the "hide" property 
	 * @returns boolean
	 */
	get hide(): boolean {
		return this._hide;
	}

	/**
	 * Sets current value of the "hide" property
	 * @param hide
	 */
	set hide(hide: boolean) {
		this._hide = hide;
	}

	/**
	 * Gets current value of the validation text "text" property 
	 * @returns string
	 */
	get text(): string {
		return this._text;
	}

	/**
	 * Sets the current value of the validation text "text" property
	 * @param value
	 */
	@Input() set text(value: string) {
		if (value !== this._text) {
			
			// Set validation text and if it should be showing or hidden
			this._text = value;
			this._hide = !value;

			// Trigger a change detection
			this.changeDetectorRef.detectChanges();
		}
	}


}