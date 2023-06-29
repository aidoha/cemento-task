import styled from 'styled-components';

export const DataTableContainer = styled.div`
	margin-bottom: 20px;
`;

export const VisibleColumnsContainer = styled.div`
	margin-bottom: 10px;
`;

export const CheckboxLabel = styled.label`
	margin-left: 5px;
`;

export const Table = styled.table`
	width: 100%;
	border-collapse: collapse;
	table-layout: fixed;
`;

export const TableHead = styled.thead`
	background-color: #f2f2f2;
`;

export const TableRow = styled.tr`
	&:nth-child(even) {
		background-color: #f9f9f9;
	}
`;

export const TableHeaderCell = styled.th``;

export const TableCell = styled.td`
	padding: 10px;
	border: 1px solid #ddd;
	text-align: left;
	flex: 1;
	min-width: 100px;
`;
