import React, { useState } from 'react';
import { FixedSizeList as List } from 'react-window';
import Select from '../select';
import Input from '../input';
import MultiSelectDropdown from '../dropdown';
import {
	DataTableContainer,
	Table,
	TableHead,
	TableRow,
	TableHeaderCell,
	TableCell,
} from './styled';
import { Column, DataRow, TableData, DataTableProps } from './types';

const DataTable: React.FC<DataTableProps> = ({ tableData, setTableData }) => {
	const { columns, data } = tableData;
	const [visibleColumns, setVisibleColumns] = useState(columns.map((column) => column.id));
	const [editingCell, setEditingCell] = useState<{ rowId: string; columnId: string } | null>(null);
	const [searchQuery, setSearchQuery] = useState('');

	const handleColumnVisibilityChange = (columnId: string) => {
		if (visibleColumns.includes(columnId)) {
			// Column is currently visible, so hide it
			setVisibleColumns(visibleColumns.filter((id) => id !== columnId));
		} else {
			// Column is currently hidden, so show it
			setVisibleColumns([...visibleColumns, columnId]);
		}
	};

	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;
		setSearchQuery(value);
	};

	const onSave = () => {
		sessionStorage.setItem('tableData', JSON.stringify(tableData));
	};

	const filteredData = data.filter((row) => {
		const searchValue = searchQuery.toLowerCase();
		return Object.values(row).some((value) => {
			if (typeof value === 'boolean') {
				return value.toString().toLowerCase() === searchValue;
			}
			if (typeof value === 'object' && value !== null) {
				return value.some((option: any) => option.value.toLowerCase().includes(searchValue));
			}
			return value.toString().toLowerCase().includes(searchValue);
		});
	});

	const Row: React.FC<{ index: number; style: React.CSSProperties }> = ({ index, style }) => {
		const row = filteredData[index];

		const handleCellClick = (rowId: string, columnId: string) => {
			setEditingCell({ rowId, columnId });
		};

		const handleCellBlur = () => {
			setEditingCell(null);
		};

		const handleCellChange = (value: any, rowId: string, columnId: string) => {
			const isTrueSet = String(value).toLowerCase() === 'true';
			const isFalseSet = String(value).toLowerCase() === 'false';

			const updatedValue = isNaN(Number(value))
				? isTrueSet
					? true
					: isFalseSet
					? false
					: value
				: Number(value);

			const updatedData = data.map((row) => {
				if (row.id === rowId) {
					return {
						...row,
						[columnId]: updatedValue,
					};
				}
				return row;
			});

			setTableData((prevTableData: TableData) => ({
				...prevTableData,
				data: updatedData,
			}));
		};

		return (
			<TableRow style={style}>
				{columns.map((column) => {
					return visibleColumns.includes(column.id) ? (
						<TableCell key={column.id}>
							{editingCell?.rowId === row.id && editingCell?.columnId === column.id ? (
								typeof row[column.id] === 'boolean' ? (
									<Select
										options={[true, false]}
										selected={row[column.id]}
										editingCell={{
											rowId: row.id,
											columnId: column.id,
										}}
										onChange={(value) => handleCellChange(value, row.id, column.id)}
									/>
								) : typeof row[column.id] === 'object' ? (
									<Select
										options={row[column.id]}
										selected={row[column.id].find((x: any) => x.selected)}
										editingCell={{
											rowId: row.id,
											columnId: column.id,
										}}
										onChange={(value) => handleCellChange(value, row.id, column.id)}
										isComplex
									/>
								) : (
									<Input
										value={row[column.id]}
										editingCell={{
											rowId: row.id,
											columnId: column.id,
										}}
										onChange={(value) => handleCellChange(value, row.id, column.id)}
										onBlur={handleCellBlur}
									/>
								)
							) : (
								<div onClick={() => handleCellClick(row.id, column.id)}>
									{typeof row[column.id] === 'boolean' ? (
										<Select
											options={[true, false]}
											selected={row[column.id]}
											editingCell={{
												rowId: row.id,
												columnId: column.id,
											}}
											onChange={(value) => handleCellChange(value, row.id, column.id)}
										/>
									) : typeof row[column.id] === 'object' ? (
										<Select
											options={row[column.id]}
											selected={row[column.id].find((x: any) => x.selected)}
											editingCell={{
												rowId: row.id,
												columnId: column.id,
											}}
											onChange={(value) => handleCellChange(value, row.id, column.id)}
											isComplex
										/>
									) : (
										row[column.id]
									)}
								</div>
							)}
						</TableCell>
					) : null;
				})}
			</TableRow>
		);
	};

	const rowHeight = 30;
	const tableHeight = rowHeight * filteredData.length;

	return (
		<DataTableContainer>
			<MultiSelectDropdown
				options={columns}
				selectedOptions={visibleColumns}
				onChange={handleColumnVisibilityChange}
			/>

			<button onClick={onSave}>Save</button>
			<div>
				<label>Search:</label>
				<input type="text" value={searchQuery} onChange={handleSearchChange} />
			</div>
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
						itemCount={filteredData.length}
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
