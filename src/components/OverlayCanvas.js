import { useClientSize } from "../utils/useClientSize";

export const OverlayCanvas = ({ children }) => {
	const { width, height } = useClientSize();
	const scale = Math.min(width / 1920, height / 1080);
	return (
		<div className="absolute" style={{ transform: `scale(${scale})` }}>
			<div
				style={{
					width: 1920,
					height: 1080,
					overflow: "hidden",
					boxShadow: `inset 0 0 0 4px red`,
				}}
			>
				{children}
			</div>
		</div>
	);
};
