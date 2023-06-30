export interface Column {
	id: string;
	ordinalNo: number;
	title: string;
	type: string;
	width?: number;
}

export interface DataRow {
	id: string;
	[columnId: string]: any;
}

export interface TableData {
	columns: Column[];
	data: DataRow[];
}

export interface DataTableProps {
	tableData: TableData;
	setTableData: (newState: any) => void;
}
