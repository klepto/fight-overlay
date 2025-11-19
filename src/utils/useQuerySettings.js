import { useSearchParams } from "react-router";

export const useQuerySettings = () => {
	const [params] = useSearchParams();
	const settings = {};
	const fields = {};

	params.entries().forEach(([key, value]) => {
		if (!key.includes("_")) {
			settings[key] = value;
			return;
		}

		const [field, setting] = key.split("_");
		if (!fields[field]) {
			fields[field] = {};
		}
		fields[field][setting] = value;
	});

	return { settings, fields };
};
