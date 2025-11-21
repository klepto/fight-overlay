import {useSearchParams} from "react-router";

export const useQuerySettings = () => {
	const [params] = useSearchParams();
	const result = {
		settings: {},
		fields: {},
	};

	for (const [key, value] of params.entries()) {
		if (!key.includes("_")) {
			result.settings[key] = value;
			continue;
		}
		const [field, setting] = key.split("_", 2);
		result.fields[field] = result.fields[field] || {};
		result.fields[field][setting] = value;
	}

	return result;
};
