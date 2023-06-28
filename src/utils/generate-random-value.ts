import { faker } from '@faker-js/faker';
import { Column } from '../types';

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
