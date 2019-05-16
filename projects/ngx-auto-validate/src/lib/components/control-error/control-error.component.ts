import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Inject, Input } from "@angular/core";
import { AV_CONFIG } from "../../config/config.config";
import { Config } from "../../interfaces/config.interface";

@Component({
	template: `<p [class]="config.classes.validationMessage" [class.hide]="hide">{{ text }}</p>`,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ControlErrorComponent {

	private _text: string;
	private _hide: boolean = true;

	constructor(
		@Inject(AV_CONFIG) public config: Config, // Get module configuration
		private changeDetectorRef: ChangeDetectorRef,
		public elementRef: ElementRef
	) { }
	
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