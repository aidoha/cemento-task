export type Column = {
	id: string;
	ordinalNo: number;
	title: string;
	type: 'string' | 'number' | 'boolean' | 'selection';
	width?: number;
};

export type Row = {
	id: string;
	[columnId: string]: any;
};

export type TableData = {
	columns: Column[];
	data: Row[];
};
