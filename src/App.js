import "./App.css";
import {OverlayBackground} from "./components/OverlayBackground";
import {OverlayCanvas} from "./components/OverlayCanvas";
import {OverlayField, useOverlayFieldStyle} from "./components/OverlayField";
import {useGoogleSheets} from "./utils/useGoogleSheets";
import {useQuerySettings} from "./utils/useQuerySettings";

function App() {
	const query = useQuerySettings();
	const defaultFieldStyle = useOverlayFieldStyle(query.settings);
	const sheets = useGoogleSheets(
		"1XZA9rUDCWqWzDAVd-QZ85r4-OM57tha0GzT45P0g48A",
	);

	const fieldNames = Object.keys(query.fields);
	fieldNames.forEach((fieldName) => {
		const field = query.fields[fieldName];
		const fieldValue = field && sheets[field.cell];
		field.name = fieldName;
		field.text = fieldValue || fieldName;
	});

	const overlayFields = fieldNames.map((fieldName) => {
		const field = query.fields[fieldName];
		return <OverlayField key={fieldName} {...field} />;
	});

	return (
		<OverlayCanvas style={defaultFieldStyle}>
			<OverlayBackground source={query.settings.background} />
			{overlayFields}
		</OverlayCanvas>
	);
}

export default App;
