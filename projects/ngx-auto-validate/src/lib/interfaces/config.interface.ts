type errorsFunction = (params?: any) => string;

export interface ErrorsConfig {
	field?: string | errorsFunction;
	minlength?: string | errorsFunction;
	[key: string]: string | errorsFunction;
}

export interface TextsConfig {
	defaultError?: string;
	[key: string]: string;
}

export interface ClassesConfig {
	validationMessage?: string;
	formNeedsValidation?: string;
	formWasValidated?: string;
	[key: string]: string;
}

export interface Config {
	errors?: ErrorsConfig;
	classes?: ClassesConfig;
	text?: TextsConfig;
}