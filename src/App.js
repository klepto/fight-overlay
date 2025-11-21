import "./App.css";
import {OverlayBackground} from "./components/OverlayBackground";
import {OverlayCanvas} from "./components/OverlayCanvas";
import {OverlayField, useOverlayFieldStyle} from "./components/OverlayField";
import {useGoogleSheets} from "./utils/useGoogleSheets";
import {useQuerySettings} from "./utils/useQuerySettings";

function App() {
	const query = useQuerySettings();
	const defaultFieldStyle = useOverlayFieldStyle(query.settings);
	const sheets = useGoogleSheets(query.settings.sheet);

	const fieldNames = Object.keys(query.fields);
	fieldNames.forEach((fieldName) => {
		const field = query.fields[fieldName];
		const fieldValue = field && sheets[field.cell];
		field.name = fieldName;
        if (fieldValue) {
            field.text = fieldValue
        }
        if (!field.text) {
            field.text = fieldName
        }
	});

	const overlayFields = fieldNames.map((fieldName) => {
		const field = query.fields[fieldName];
		return <OverlayField key={fieldName} {...field} />;
	});

	return (
		<OverlayCanvas style={{...defaultFieldStyle, transform: ""}}>
			<OverlayBackground source={query.settings.background} />
			{overlayFields}
		</OverlayCanvas>
	);
}

export default App;
