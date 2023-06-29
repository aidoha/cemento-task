import React from 'react';

interface SelectProps {
	options: string[];
}

const Select: React.FC<SelectProps> = ({ options }) => {
	return (
		<select>
			{options.map((option) => (
				<option key={option} value={option}>
					{option}
				</option>
			))}
		</select>
	);
};

export default Select;
