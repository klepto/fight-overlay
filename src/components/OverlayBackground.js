import "../App.css";
import defaultBackground from "../assets/default-background.webp";

export const OverlayBackground = ({ source }) => {
	const backgroundSource = source || defaultBackground;
	const isVideo = parseSourceExtensions(backgroundSource) === "mp4";

	return isVideo ? (
		<BackgroundVideo source={backgroundSource} />
	) : (
		<BackgroundImage source={backgroundSource} />
	);
};

const BackgroundVideo = ({ source }) => {
	return (
		<video className="stretch" autoPlay loop muted>
			<source src={source} type="video/mp4" />
			Your browser does not support the video tag.
		</video>
	);
};

const BackgroundImage = ({ source }) => {
	return <img className="stretch" src={source} alt="Background" />;
};

const parseSourceExtensions = (source) => {
	const match = source.toLowerCase().match(/\.([0-9a-z]+)(?:[?#].*)?$/);
	return match ? match[1] : null;
};
