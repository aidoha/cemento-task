import React, { useState } from 'react';
import Checkbox from '../checkbox';
import { DropdownContainer, DropdownToggle, DropdownMenu, OptionLabel } from './styled';

export type Option = {
	id: string;
	title: string;
};

type MultiSelectDropdownProps = {
	options: Option[];
	selectedOptions: string[];
	onChange: (id: string) => void;
};

const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = ({
	options,
	selectedOptions,
	onChange,
}) => {
	const [isOpen, setIsOpen] = useState(false);

	const handleToggleDropdown = () => {
		setIsOpen(!isOpen);
	};

	return (
		<DropdownContainer>
			<DropdownToggle isOpen={isOpen} onClick={handleToggleDropdown}>
				<div>Display</div>
				<div>{isOpen ? <>&#8593;</> : <>&#8595;</>}</div>
			</DropdownToggle>
			{isOpen && (
				<DropdownMenu>
					{options.map((option) => (
						<OptionLabel key={option.id}>
							<Checkbox
								checked={selectedOptions.includes(option.id)}
								onChange={() => onChange(option.id)}
								label={option.title}
							/>
						</OptionLabel>
					))}
				</DropdownMenu>
			)}
		</DropdownContainer>
	);
};

export default MultiSelectDropdown;
