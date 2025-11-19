import { useExternalStyle } from "../utils/useExternalStyle";

export const OverlayField = (properties) => {
	const style = useOverlayFieldStyle(properties);
	return <span style={style}>{properties.text}</span>;
};

export const useOverlayFieldStyle = ({
	pos,
	font_url,
	font,
	size,
	color,
	shadow,
}) => {
	useExternalStyle(font_url);
	const [x, y] = pos ? (pos.contains(",") ? pos.split(",") : [0, 0]) : [0, 0];
	const result = {
		left: x,
		top: y,
	};
	if (font) {
		result.fontFamily = font;
	}
	if (size) {
		result.fontSize = size;
	}
	if (color) {
		result.color = color;
	}
	if (shadow) {
		result.textShadow = "2px 2px 4px rgba(0, 0, 0, 0.5)";
	}
	return result;
};
