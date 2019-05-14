import { InjectionToken } from "@angular/core";
import { ErrorsConfig } from "../interfaces/config.interface";

export const defaultErrors: ErrorsConfig = {
	required: (error) => `This field is required`,
	minlength: ({ requiredLength, actualLength }) => `Minimum ${requiredLength} characters`,
};

export const FORM_ERRORS = new InjectionToken("FORM_ERRORS", {
	providedIn: "root",
	factory: () => defaultErrors
});

export const provideFormErrors = (errors?: ErrorsConfig): ErrorsConfig => {
	return {
		...defaultErrors,
		...errors
	};
};