import { faker } from '@faker-js/faker';
import { Column, Row, TableData } from './types';

export const transformTableData = (tableData: TableData) => {
	const columns = tableData.columns.map((column) => ({ ...column, isVisible: true }));
	const data = tableData.data.map((row) => ({ ...row, isVisible: true }));
	return { columns, data };
};

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

export const getRandomDataType = (): Column['type'] => {
	const dataTypes: Column['type'][] = ['string', 'number', 'boolean', 'selection'];
	return dataTypes[Math.floor(Math.random() * dataTypes.length)];
};

export const generateRandomValue = (dataType: Column['type']): any => {
	switch (dataType) {
		case 'string':
			return faker.lorem.word();
		case 'number':
			return Math.floor(Math.random() * 1000);
		case 'boolean':
			return Math.random() < 0.5;
		case 'selection':
			const options = ['Option 1', 'Option 2', 'Option 3'];
			return options[Math.floor(Math.random() * options.length)];
		default:
			return null;
	}
};
