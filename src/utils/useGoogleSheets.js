import {useCallback, useEffect} from "react";
import * as XLSX from "xlsx";
import {useDeepState} from "./useDeepState";

export const useGoogleSheets = (spreadsheetId) => {
	const POLLING_INTERVAL = 5000;
	const [sheetData, setSheetData] = useDeepState({});

	const fetchAndSetData = useCallback(async () => {
		try {
			const rawResult = await fetchGoogleSheet(spreadsheetId);
			const parsedData = parseXlsxData(rawResult);
			setSheetData(parsedData);
		} catch (error) {
			console.error("Error fetching Google Sheet data:", error);
		}
	}, [spreadsheetId, setSheetData]);

	useEffect(() => {
		if (!spreadsheetId) {
			console.warn("useGoogleSheets called without a spreadsheetId.");
			return;
		}
		fetchAndSetData();

		console.log(`Starting data polling for Sheet ID: ${spreadsheetId}`);
		const intervalId = setInterval(fetchAndSetData, POLLING_INTERVAL);

		return () => {
			console.log(`Clearing polling interval for Sheet ID: ${spreadsheetId}`);
			clearInterval(intervalId);
		};
	}, [spreadsheetId, fetchAndSetData]);

	return sheetData;
};

const fetchGoogleSheet = async (spreadsheetId) => {
	const response = await fetch(
		`https://docs.google.com/spreadsheets/d/${spreadsheetId}/export`,
	);
	return await response.arrayBuffer();
};

const parseXlsxData = (data) => {
	if (!data || data.length === 0) {
		return {};
	}

	const worksheet = XLSX.read(data, { type: "array" }).Sheets;
	return Object.keys(worksheet).reduce((result, sheetId) => {
		const sheet = worksheet[sheetId];
		Object.keys(sheet).forEach((cellId) => {
			const cell = sheet[cellId];
			if (cell?.v) {
				result[`${sheetId}!${cellId}`] = cell.v;
			}
		});
		return result;
	}, {});
};
