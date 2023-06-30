import styled from 'styled-components';

export const DataTableContainer = styled.div`
	margin-bottom: 20px;
`;

export const Table = styled.table`
	width: 100%;
	border-collapse: collapse;
`;

export const TableHead = styled.thead`
	background-color: #f2f2f2;
`;

export const TableRow = styled.tr`
	&:nth-child(even) {
		background-color: #f9f9f9;
	}
`;

export const TableHeaderCell = styled.th`
	padding: 8px;
	border: 1px solid #ddd;
	min-width: 80px;
`;

export const TableCell = styled.td`
	padding: 8px;
	border: 1px solid #ddd;
	min-width: 80px;
`;
