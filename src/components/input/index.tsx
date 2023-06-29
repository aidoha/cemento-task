import React from 'react';
import styled from 'styled-components';

const StyledEditableCellInput = styled.input`
	width: 100%;
	padding: 5px;
`;

interface EditableCellInputProps {
	value: string;
	onChange: (value: string, rowId: string, columnId: string) => void;
	onBlur: () => void;
	editingCell: {
		rowId: string;
		columnId: string;
	};
}

const EditableCellInput: React.FC<EditableCellInputProps> = ({
	value,
	onChange,
	onBlur,
	editingCell,
}) => {
	const [inputValue, setInputValue] = React.useState(value);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(event.target.value);
	};

	const handleBlur = () => {
		onChange(inputValue, editingCell.rowId, editingCell.columnId);
		onBlur();
	};

	return <StyledEditableCellInput value={inputValue} onChange={handleChange} onBlur={handleBlur} />;
};

export default EditableCellInput;
