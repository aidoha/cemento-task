import { Column, Row, TableData } from '../types';
import { generateRandomValue } from './generate-random-value';
import { getRandomDataType } from './get-random-data-type';

export const generateRandomData = (): TableData => {
	const columns: Column[] = [];
	const data: Row[] = [];

	for (let i = 1; i <= 10; i++) {
		const column: Column = {
			id: `column${i}`,
			ordinalNo: i,
			title: `Column ${i}`,
			type: getRandomDataType(),
		};
		columns.push(column);
	}

	for (let i = 1; i <= 50; i++) {
		const row: Row = { id: `row${i}` };
		columns.forEach((column) => {
			row[column.id] = generateRandomValue(column.type);
		});
		data.push(row);
	}

	return { columns, data };
};
