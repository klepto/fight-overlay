import isEqual from "lodash.isequal";
import { useState } from "react";

export const useDeepState = (initialValue) => {
	const [state, setState] = useState(initialValue);
	const setDeepState = (newState) => {
		if (!isEqual(state, newState)) {
			setState(newState);
		}
	};
	return [state, setDeepState];
};
