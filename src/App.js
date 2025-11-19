import "./App.css";
import { OverlayBackground } from "./components/OverlayBackground";
import { OverlayCanvas } from "./components/OverlayCanvas";
import { OverlayField } from "./components/OverlayField";
import { useQuerySettings } from "./utils/useQuerySettings";

function App() {
	const query = useQuerySettings();

	console.log(query.settings);
	return (
		<OverlayCanvas>
			<OverlayBackground source={query.settings.background} />
			<OverlayField text="Hello World!" {...query.settings} />
		</OverlayCanvas>
	);
}

export default App;
