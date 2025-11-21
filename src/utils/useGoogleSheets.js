import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { useDeepState } from "./useDeepState";

export const useGoogleSheets = (spreadsheetId) => {
	const [spreadsheet, setSpreadsheet] = useDeepState({});

	useEffect(() => {
		console.log("Fetching Google Sheet:", spreadsheetId);
		const intervalId = setInterval(async () => {
			const result = await fetchGoogleSheet(spreadsheetId);
			setSpreadsheet(parseXlsxData(result));
		}, 5000);
		return () => clearInterval(intervalId);
	}, [spreadsheetId, setSpreadsheet]);

	return spreadsheet;
};

const fetchGoogleSheet = async (spreadsheetId) => {
	const response = await fetch(
		`https://docs.google.com/spreadsheets/d/${spreadsheetId}/export`,
	);
	return await response.bytes();
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
