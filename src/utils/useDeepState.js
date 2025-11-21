import isEqual from "lodash.isequal";
import { useCallback, useState } from "react";

export const useDeepState = (initialValue) => {
	const [state, setState] = useState(initialValue);

	// Custom setter that only calls the actual setState if the value has changed
	const setDeepState = useCallback((newValue) => {
		setState((prevState) => {
			// Check if the content is the same before updating
			if (isEqual(prevState, newValue)) {
				return prevState; // Return the existing state to prevent re-render
			}
			return newValue; // Return the new value to trigger update
		});
	}, []);

	return [state, setDeepState];
};
