type errorsFunction = (params?: any) => string;

export interface ErrorsConfig {
	field?: string | errorsFunction;
	minlength?: string | errorsFunction;
	[key: string]: string | errorsFunction;
}

export interface TextsConfig {
	defaultErrors?: string;
	[key: string]: string;
}

export interface ClassesConfig {
	element?: string;
	container?: string;
	validationMessage?: string;
	[key: string]: string;
}

export interface Config {
	errors?: ErrorsConfig;
	classes?: ClassesConfig;
	text?: TextsConfig;
}