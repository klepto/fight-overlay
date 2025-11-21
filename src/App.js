import "./App.css";
import { OverlayBackground } from "./components/OverlayBackground";
import { OverlayCanvas } from "./components/OverlayCanvas";
import { OverlayField, useOverlayFieldStyle } from "./components/OverlayField";
import { useGoogleSheets } from "./utils/useGoogleSheets";
import { useQuerySettings } from "./utils/useQuerySettings";

function App() {
	const query = useQuerySettings();
	const defaultFieldStyle = useOverlayFieldStyle(query.settings);
	const sheets = useGoogleSheets(
		"1XZA9rUDCWqWzDAVd-QZ85r4-OM57tha0GzT45P0g48A",
	);
	console.log(sheets);

	return (
		<OverlayCanvas style={defaultFieldStyle}>
			<OverlayBackground source={query.settings.background} />
			<OverlayField text="Hello World!" />
		</OverlayCanvas>
	);
}

export default App;
