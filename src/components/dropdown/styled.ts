import styled, { css } from 'styled-components';

export const DropdownContainer = styled.div`
	position: relative;
	display: inline-block;
`;

export const DropdownToggle = styled.div<{ isOpen: boolean }>`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 8px 16px;
	font-size: 18px;
	cursor: pointer;
	outline: none;
	border-radius: 10px;
	color: #ea2f7a;
	width: 300px;
	border: 1px solid #ea2f7a;
	${({ isOpen }) =>
		isOpen &&
		css`
			border-bottom: none;
			border-bottom-left-radius: 0px;
			border-bottom-right-radius: 0px;
		`}
`;

export const DropdownMenu = styled.div`
	position: absolute;
	top: 100%;
	left: 0;
	z-index: 1;
	background-color: #ffffff;
	border: 1px solid #ea2f7a;
	border-top: none;
	padding: 8px 16px;
	width: 300px;
	border-bottom-left-radius: 10px;
	border-bottom-right-radius: 10px;
`;

export const OptionLabel = styled.label`
	display: block;
	margin-bottom: 4px;
`;
