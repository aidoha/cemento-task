import React, { useState } from 'react';
import { FixedSizeList as List } from 'react-window';
import styled from 'styled-components';
import Select from '../select';

interface Column {
	id: string;
	ordinalNo: number;
	title: string;
	type: string;
	width?: number;
}

interface DataRow {
	id: string;
	[columnId: string]: any;
}

interface TableData {
	columns: Column[];
	data: DataRow[];
}

interface DataTableProps {
	tableData: TableData;
}

const DataTableContainer = styled.div`
	margin-bottom: 20px;
`;

const VisibleColumnsContainer = styled.div`
	margin-bottom: 10px;
`;

const CheckboxLabel = styled.label`
	margin-left: 5px;
`;

const Table = styled.table`
	width: 100%;
	border-collapse: collapse;
`;

const TableHead = styled.thead`
	background-color: #f2f2f2;
`;

const TableRow = styled.tr`
	&:nth-child(even) {
		background-color: #f9f9f9;
	}
`;

const TableHeaderCell = styled.th`
	padding: 8px;
	border: 1px solid #ddd;
	min-width: 100px;
`;

const TableCell = styled.td`
	padding: 8px;
	border: 1px solid #ddd;
	min-width: 100px;
`;

const DataTable: React.FC<DataTableProps> = ({ tableData }) => {
	const { columns, data } = tableData;
	const [visibleColumns, setVisibleColumns] = useState(columns.map((column) => column.id));

	const handleColumnVisibilityChange = (columnId: string) => {
		if (visibleColumns.includes(columnId)) {
			// Column is currently visible, so hide it
			setVisibleColumns(visibleColumns.filter((id) => id !== columnId));
		} else {
			// Column is currently hidden, so show it
			setVisibleColumns([...visibleColumns, columnId]);
		}
	};

	const Row: React.FC<{ index: number; style: React.CSSProperties }> = ({ index, style }) => {
		const row = data[index];

		return (
			<TableRow style={style}>
				{columns.map((column) => {
					return visibleColumns.includes(column.id) ? (
						<TableCell key={column.id}>
							{typeof row[column.id] === 'boolean' ? (
								row[column.id] ? (
									'Yes'
								) : (
									'No'
								)
							) : typeof row[column.id] === 'object' ? (
								<Select options={row[column.id]} />
							) : (
								row[column.id]
							)}
						</TableCell>
					) : null;
				})}
			</TableRow>
		);
	};

	const rowHeight = 30;
	const tableHeight = rowHeight * tableData.data.length;
	return (
		<DataTableContainer>
			<VisibleColumnsContainer>
				<label>Visible Columns:</label>
				{columns.map((column) => (
					<div key={column.id}>
						<input
							type="checkbox"
							id={column.id}
							checked={visibleColumns.includes(column.id)}
							onChange={() => handleColumnVisibilityChange(column.id)}
						/>
						<CheckboxLabel htmlFor={column.id}>{column.title}</CheckboxLabel>
					</div>
				))}
			</VisibleColumnsContainer>
			<Table>
				<TableHead>
					<tr>
						{columns.map((column) =>
							visibleColumns.includes(column.id) ? (
								<TableHeaderCell key={column.id}>{column.title}</TableHeaderCell>
							) : null
						)}
					</tr>
				</TableHead>
				<tbody>
					<List
						style={{ overflow: 'inherit' }}
						height={tableHeight}
						itemCount={data.length}
						itemSize={rowHeight}
						width="100%"
					>
						{Row}
					</List>
				</tbody>
			</Table>
		</DataTableContainer>
	);
};

export default DataTable;
