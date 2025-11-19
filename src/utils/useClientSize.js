import { useEffect, useState } from "react";

export const useClientSize = () => {
	const [size, setSize] = useState({
		width: document.documentElement.clientWidth,
		height: document.documentElement.clientHeight,
	});

	const updateSize = () => {
		const width = document.documentElement.clientWidth;
		const height = document.documentElement.clientHeight;
		setSize({ width, height });
	};

	useEffect(() => {
		window.addEventListener("resize", updateSize);
		return () => window.removeEventListener("resize", updateSize);
	});

	return size;
};
