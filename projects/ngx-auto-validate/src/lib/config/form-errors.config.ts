import { InjectionToken } from "@angular/core";
import { ErrorsConfig } from "../interfaces/config.interface";

/**
 * Default errors are provided here
 */
export const defaultErrors: ErrorsConfig = {
	required: (error) => `This field is required`,
	minlength: ({ requiredLength, actualLength }) => `Minimum ${requiredLength} characters`,
	maxlength: ({ requiredLength, actualLength }) => `Maximum ${requiredLength} characters`,
	min: ({ min, actual }) => `Minimum ${min}`,
	max: ({ max, actual }) => `Maximum ${max}`,
	email: (error) => `Must be a valid email address`,
	pattern: ({ requiredPattern, actual }) => `Must match pattern ${requiredPattern}`
};

/**
 * Form errors injection token
 */
export const FORM_ERRORS = new InjectionToken("FORM_ERRORS", {
	providedIn: "root",
	factory: () => defaultErrors
});

/**
 * Merge form errors injection token
 * @param errors?
 * @returns ErrorsConfig
 */
export const provideFormErrors = (errors?: ErrorsConfig): ErrorsConfig => {
	return {
		...defaultErrors,
		...errors
	};
};