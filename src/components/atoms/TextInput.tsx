import {Input} from '@/components/atoms/input';
import {Label} from '@/components/atoms/label';

type Props = {
    label: string;
    error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;


export function TextInput({label, error, ...props}: Props) {
    return (
        <div className="flex flex-col">
            <Label>{label}</Label>
            <Input {...props} className={error ? 'border-red-500' : ''}/>
            {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
    );
}