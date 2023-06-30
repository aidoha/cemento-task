import styled from 'styled-components';

export const DataTableContainer = styled.div`
	margin-bottom: 20px;
`;

export const TableHead = styled.div`
	display: flex;
	background-color: #f2f2f2;
`;

export const TableBody = styled.div`
	overflow: auto;
`;

export const TableHeaderCell = styled.div`
	flex: 1;
	padding: 8px;
	border: 1px solid #ddd;
	min-width: 80px;
`;

export const TopBar = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	position: sticky;
	top: 0px;
	background-color: #fff;
	z-index: 99999;
	margin: 30px;
`;
