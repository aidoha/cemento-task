import React, { useState } from 'react';
import { FixedSizeList as List } from 'react-window';
import MultiSelectDropdown from '../dropdown';
import Row from '../data-row';
import { DataTableContainer, TableHead, TableBody, TableHeaderCell, TopBar } from './styled';
import { DataTableProps } from '../../types';

const DataTable: React.FC<DataTableProps> = ({ tableData, setTableData }) => {
	const { columns, data } = tableData;
	const [visibleColumns, setVisibleColumns] = useState(columns.map((column) => column.id));
	const [searchQuery, setSearchQuery] = useState('');

	const handleColumnVisibilityChange = (columnId: string) => {
		if (visibleColumns.includes(columnId)) {
			setVisibleColumns(visibleColumns.filter((id) => id !== columnId));
		} else {
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

	const rowHeight = 30;
	const tableHeight = rowHeight * filteredData.length;

	return (
		<DataTableContainer>
			<TopBar>
				<MultiSelectDropdown
					options={columns}
					selectedOptions={visibleColumns}
					onChange={handleColumnVisibilityChange}
				/>
				<div>
					<label>Search:</label>
					<input type="text" value={searchQuery} onChange={handleSearchChange} />
				</div>
				<button onClick={onSave}>Save</button>
			</TopBar>

			<TableHead>
				{columns.map((column) =>
					visibleColumns.includes(column.id) ? (
						<TableHeaderCell key={column.id}>{column.title}</TableHeaderCell>
					) : null
				)}
			</TableHead>
			<TableBody>
				<List
					height={tableHeight}
					itemCount={filteredData.length}
					itemSize={rowHeight}
					width="100%"
				>
					{({ index, style }) => (
						<Row {...{ index, style, data, filteredData, setTableData, columns, visibleColumns }} />
					)}
				</List>
			</TableBody>
		</DataTableContainer>
	);
};

export default DataTable;
