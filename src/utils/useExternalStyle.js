import { useEffect } from "react";

export const useExternalStyle = (styleUrl) => {
	return useEffect(() => {
		const link = document.createElement("link");
		link.href = styleUrl;
		link.rel = "stylesheet";
		link.id = styleUrl;
		document.head.appendChild(link);
		return () => {
			const existingLink = document.getElementById(styleUrl);
			if (existingLink) {
				document.head.removeChild(existingLink);
			}
		};
	}, [styleUrl]);
};
