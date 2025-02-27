import { useEffect, useState } from 'react';

interface EditableCellProps {
	value: string;
	onChange: (value: string) => void;
	validate?: (value: string) => boolean;
}

export default function EditableCell({ value, onChange, validate }: EditableCellProps) {
	const [isEditing, setIsEditing] = useState<boolean>(false);
	const [currentValue, setCurrentValue] = useState<string>(String(value));
	const [invalid, setInvalid] = useState<boolean>(false);

	useEffect(() => {
		setCurrentValue(String(value));
	}, [value]);

	function commitChange() {
		if (validate && !validate(currentValue)) {
			setInvalid(true);
			setTimeout(() => {
				setInvalid(false);
				setIsEditing(false);
				setCurrentValue(value);
			}, 1000);
			return;
		}
		onChange(currentValue);
		setIsEditing(false);
		setInvalid(false);
	}

	function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
		if (event.key === 'Enter') {
			commitChange();
		}
		if (event.key === 'Escape') {
			setIsEditing(false);
			setCurrentValue(String(value));
			setInvalid(false);
		}
	}

	function handleIsEditing() {
		setIsEditing(true);
	}

	return (
		<div className='cursor-pointer' onClick={handleIsEditing}>
			{isEditing ? (
				<input
					className={invalid ? 'border-red-500' : 'border-gray-300'}
					value={currentValue}
					onBlur={commitChange}
					onKeyDown={handleKeyDown}
					onChange={(e) => setCurrentValue(e.target.value)}
				/>
			) : (
				<span>{currentValue}</span>
			)}
		</div>
	);
}
