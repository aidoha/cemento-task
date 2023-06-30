import { Label, Input, Indicator } from './styled';

interface CheckboxProps {
	checked: boolean;
	onChange: (value: string) => void;
	label: string;
}

const Checkbox = ({ checked, onChange, label }: CheckboxProps) => (
	<Label>
		{label}
		<Input type="checkbox" checked={checked} onChange={(val: any) => onChange(val)} />
		<Indicator />
	</Label>
);

export default Checkbox;
