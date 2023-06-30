import styled from 'styled-components';

export const TableRow = styled.div`
	display: flex;
	&:nth-child(even) {
		background-color: #f9f9f9;
	}
`;

export const TableCell = styled.div`
	flex: 1;
	padding: 8px;
	border: 1px solid #ddd;
	min-width: 80px;
	min-height: 50px;
`;
