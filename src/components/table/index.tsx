import React, { useState } from 'react';
import { FixedSizeList as List, ListChildComponentProps } from 'react-window';
import { TableData } from '../../types';
import tableDataJson from '../../table-data.json';
import './styles.css';

const Table: React.FC = () => {
	const [tableData] = useState<TableData>(tableDataJson as TableData);

	const Row: React.FC<ListChildComponentProps> = ({ index, style }) => {
		const row = tableData.data[index];

		return (
			<div className="table-row" style={style}>
				{tableData.columns.map((column) => {
					const cellValue = row[column.id];
					return (
						<div className="table-cell" key={`${row.id}-${column.id}`}>
							{cellValue.toString()}
						</div>
					);
				})}
			</div>
		);
	};

	const MemoizedRow = React.memo(Row);

	const rowHeight = 30;
	const tableHeight = rowHeight * tableData.data.length;

	return (
		<div className="table-container">
			<div style={{ height: tableHeight, width: '100%' }}>
				<div className="table-header">
					{tableData.columns.map((column) => (
						<div
							className="table-cell"
							style={{ width: column.width ? `${column.width}px` : 'auto' }}
							key={column.id}
						>
							{column.title}
						</div>
					))}
				</div>
				<List
					className="table-list"
					height={tableHeight}
					itemCount={tableData.data.length}
					itemSize={rowHeight}
					width="100%"
				>
					{MemoizedRow}
				</List>
			</div>
		</div>
	);
};

export default Table;
