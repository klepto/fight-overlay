import {useEffect} from "react";
import {useDeepState} from "./useDeepState";

const getClientDimensions = () => ({
	width: document.documentElement.clientWidth,
	height: document.documentElement.clientHeight,
});

export const useClientSize = () => {
	const [size, setSize] = useDeepState(getClientDimensions);
	useEffect(() => {
		const updateSize = () => setSize(getClientDimensions());
		window.addEventListener("resize", updateSize);
		return () => window.removeEventListener("resize", updateSize);
	});
	return size;
};
