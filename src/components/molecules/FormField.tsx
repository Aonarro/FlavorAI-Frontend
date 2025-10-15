import { TextInput } from '@/components/atoms/TextInput';

type Props = React.ComponentProps<typeof TextInput>;


export function FormField({ label, error, ...props }: Props) {
    return <TextInput label={label} error={error} {...props} />;
}