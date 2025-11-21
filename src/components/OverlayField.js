import {AnimatePresence, motion} from 'framer-motion';
import {useExternalStyle} from "../utils/useExternalStyle";

const fadeTransition = {
	duration: 0.3,
	ease: "easeInOut",
};

export const OverlayField = (properties) => {
	const style = useOverlayFieldStyle(properties);
	const { name, text } = properties;
	const key = `overlay-field-${name}-${text}`;

	return (
		<AnimatePresence>
			<motion.div
				key={key}
				exit={{ opacity: 0 }}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={fadeTransition}
				style={style}
			>
				{text}
			</motion.div>
		</AnimatePresence>
	);
};

export const useOverlayFieldStyle = ({
	align,
	pos,
	font_url,
	font,
	size,
	color,
	shadow,
    bold,
}) => {
	useExternalStyle(font_url);
	return {
        overflow: "hidden",
        whitespace: "no-wrap",
		...parseAlignStyle(align),
		...parsePositionStyle(pos),
		...(font && { fontFamily: font }),
		...(size && { fontSize: appendPx(size) }),
		...(color && { color: color }),
		...(shadow && { textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }),
        ...(bold && { fontWeight: 'bold' }),
	};
};

const parsePositionStyle = (position) => {
	const [x, y] =
		!position || !position.includes(",") ? [0, 0] : position.split(",", 2);
	return {
		left: appendPx(x),
		top: appendPx(y),
	};
};

const parseAlignStyle = (align) => {
	switch (align) {
		case "left":
			return {};
		case "right":
			return { transform: "translate(-100%)" };
		default:
			return { transform: "translate(-50%)" };
	}
};

const appendPx = (value) => {
	if (typeof value === "number") {
		return `${value}px`;
	}
	return value.endsWith("px") ? value : `${value}px`;
};