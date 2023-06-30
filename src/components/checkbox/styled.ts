import styled, { keyframes } from 'styled-components';

export const Input = styled.input`
	height: 0;
	width: 0;
	opacity: 0;
	z-index: -1;
`;

export const Label = styled.label`
	position: relative;
	display: inline-block;
	margin: 0.6em 1em;
	cursor: pointer;
`;

export const rotate = keyframes`
 from {
    opacity: 0;
    transform: rotate(0deg);
  }
  to {
    opacity: 1;
    transform: rotate(45deg);
  }
`;

export const Indicator = styled.div`
	width: 1.2em;
	height: 1.2em;
	background: #fff;
	position: absolute;
	top: 0em;
	left: -1.6em;
	border: 1px solid #ea2f7a;
	border-radius: 0.2em;

	${Label}:hover & {
		background: #ccc;
	}

	&::after {
		content: '';
		position: absolute;
		display: none;
	}

	${Input}:checked + &::after {
		display: block;
		top: 0.1em;
		left: 0.35em;
		width: 25%;
		height: 50%;
		border: solid #ea2f7a;
		border-width: 0 0.2em 0.2em 0;
		animation-name: ${rotate};
		animation-duration: 0.3s;
		animation-fill-mode: forwards;
	}

	&::disabled {
		cursor: not-allowed;
	}
`;
