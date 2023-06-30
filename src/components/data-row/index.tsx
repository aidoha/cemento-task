import React, { useState } from 'react';
import Select from '../select';
import Input from '../input';
import { TableRow, TableCell } from './styled';
import { Column, DataRow, TableData } from '../../types';

interface RowProps {
	index: number;
	style: React.CSSProperties;
	data: DataRow[];
	filteredData: DataRow[];
	setTableData: (value: any) => void;
	columns: Column[];
	visibleColumns: string[];
}
const Row: React.FC<RowProps> = ({
	index,
	style,
	data,
	filteredData,
	setTableData,
	columns,
	visibleColumns,
}) => {
	const [editingCell, setEditingCell] = useState<{ rowId: string; columnId: string } | null>(null);
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

		const updatedData = data.map((row: DataRow) => {
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
			{columns.map((column: Column) => {
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
									selected={row[column.id].find((row: DataRow) => row.selected)}
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
										selected={row[column.id].find((row: DataRow) => row.selected)}
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

export default Row;
