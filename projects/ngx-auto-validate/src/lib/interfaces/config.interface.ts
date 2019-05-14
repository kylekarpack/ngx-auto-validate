type errorsFunction = (params?: any) => string;

export interface ErrorsConfig {
	field?: string | errorsFunction;
	minlength?: string | errorsFunction;
	[key: string]: string | errorsFunction;
}

export interface Config {
	errors?: ErrorsConfig;
}