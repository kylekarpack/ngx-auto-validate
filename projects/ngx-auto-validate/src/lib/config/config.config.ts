import { InjectionToken } from "@angular/core";
import { Config } from "../interfaces/config.interface";
import { defaultErrors } from "./form-errors.config";

/**
 * Declare default configuration values
 */
export const defaultConfig: Config = {
	errors: defaultErrors,
	classes: {
		validationMessage: "text-danger small",
		formNeedsValidation: "needs-validation",
		formWasValidated: "was-validated"
	},
	text: {
		defaultError: "Validation error"
	}
};

/**
 * Register an injection token for "DEFAULT_AV_CONFIG"
 */
export const DEFAULT_AV_CONFIG = new InjectionToken("DEFAULT_AV_CONFIG", {
	providedIn: "root",
	factory: () => defaultConfig
});

/**
 * Register an injection token for "AV_CONFIG"
 */
export const AV_CONFIG = new InjectionToken("AV_CONFIG", {
	providedIn: "root",
	factory: () => defaultConfig
});

/**
 * Merge a given config into the default config
 * @param config?
 * @returns Config
 */
export const provideConfig = (config?: Config): Config => {
	return mergeDeep<Config>(defaultConfig, config);
};

/**
 * Deeply merge two or more KVP objects
 * @param  ...objects
 * @returns T
 */
export function mergeDeep<T>(...objects: any): T {
	
	const isObject = (obj: any) => obj && typeof obj === "object";

	return objects.reduce((prev: { [key: string]: any; }, obj: { [key: string]: any; }) => {
		Object.keys(obj).forEach(key => {
			const pVal = prev[key],
				oVal = obj[key];

			if (Array.isArray(pVal) && Array.isArray(oVal)) {
				prev[key] = pVal.concat(...oVal);
			} else if (isObject(pVal) && isObject(oVal)) {
				prev[key] = mergeDeep(pVal, oVal);
			} else {
				prev[key] = oVal;
			}
		});

		return prev;
	}, {});
}