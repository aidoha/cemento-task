import React from 'react';

interface SelectProps {
	selected: any;
	options: any[];
	onChange: (value: any, rowId: string, columnId: string) => void;
	editingCell: {
		rowId: string;
		columnId: string;
	};
	isComplex?: boolean;
}

const Select: React.FC<SelectProps> = ({ options, selected, onChange, editingCell, isComplex }) => {
	const [selectValue, setSelectValue] = React.useState(selected);

	const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const { value } = event.target;
		setSelectValue(value);

		if (isComplex) {
			const newOptions = options.map((option) => {
				if (option.value === value) {
					return { ...option, selected: true };
				}
				return { ...option, selected: false };
			});
			onChange(newOptions, editingCell.rowId, editingCell.columnId);
		} else {
			onChange(value, editingCell.rowId, editingCell.columnId);
		}
	};
	return (
		<select value={isComplex ? selectValue.value : selectValue} onChange={handleChange}>
			{isComplex
				? options.map((option, index) => (
						<option key={`${option.value}_${index}`} value={option.value}>
							{option.value}
						</option>
				  ))
				: options.map((option, index) => (
						<option key={`${option}_${index}`} value={option}>
							{option === true ? 'Yes' : 'No'}
						</option>
				  ))}
		</select>
	);
};

export default Select;
