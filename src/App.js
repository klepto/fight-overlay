import "./App.css";
import { OverlayCanvas } from "./components/OverlayCanvas";
import { useQuerySettings } from "./utils/useQuerySettings";

function App() {
	const settings = useQuerySettings();
	console.log(settings);

	return (
		<OverlayCanvas>
			<h1 className="text-3xl font-bold underline">Hello world!</h1>
			<h1 className="text-3xl font-bold underline">World hello!</h1>
		</OverlayCanvas>
	);
}

export default App;
