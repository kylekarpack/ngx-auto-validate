import { InjectionToken } from "@angular/core";

export const defaultErrors = {
	required: (error) => `This field is required`,
	minlength: ({ requiredLength, actualLength }) => `Minimum ${requiredLength} characters`
};

export const FORM_ERRORS = new InjectionToken("FORM_ERRORS", {
	providedIn: "root",
	factory: () => defaultErrors
});