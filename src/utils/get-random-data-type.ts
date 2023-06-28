import { Column } from '../types';

export const getRandomDataType = (): Column['type'] => {
	const dataTypes: Column['type'][] = ['string', 'number', 'boolean', 'selection'];
	return dataTypes[Math.floor(Math.random() * dataTypes.length)];
};
