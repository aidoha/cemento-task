import React, { useState } from 'react';
import styled from 'styled-components';

export type Option = {
	id: string;
	title: string;
};

type MultiSelectDropdownProps = {
	options: Option[];
	selectedOptions: Option[];
	onChange: (selectedOptions: Option[]) => void;
};

const DropdownContainer = styled.div`
	position: relative;
	display: inline-block;
`;

const DropdownToggle = styled.button`
	background-color: #f0f0f0;
	border: none;
	padding: 8px;
	cursor: pointer;
`;

const DropdownMenu = styled.div`
	position: absolute;
	top: 100%;
	left: 0;
	z-index: 1;
	background-color: #ffffff;
	border: 1px solid #ccc;
	padding: 8px;
`;

const OptionLabel = styled.label`
	display: block;
	margin-bottom: 4px;
`;

const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = ({
	options,
	selectedOptions,
	onChange,
}) => {
	const [isOpen, setIsOpen] = useState(false);

	const handleToggleDropdown = () => {
		setIsOpen(!isOpen);
	};

	const handleOptionChange = (option: Option) => {
		const updatedOptions = selectedOptions.includes(option)
			? selectedOptions.filter((o) => o.id !== option.id)
			: [...selectedOptions, option];
		onChange(updatedOptions);
	};

	return (
		<DropdownContainer>
			<DropdownToggle onClick={handleToggleDropdown}>Display</DropdownToggle>
			{isOpen && (
				<DropdownMenu>
					{options.map((option) => (
						<OptionLabel key={option.id}>
							<input
								type="checkbox"
								checked={selectedOptions.includes(option)}
								onChange={() => handleOptionChange(option)}
							/>
							{option.title}
						</OptionLabel>
					))}
				</DropdownMenu>
			)}
		</DropdownContainer>
	);
};

export default MultiSelectDropdown;
