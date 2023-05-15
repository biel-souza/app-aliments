import { TextInputProps } from 'react-native';

import Input from '../Input';

interface PropsType extends TextInputProps {
  label?: string;
  error?: string;
}

const PasswordInput = ({ label, error, ...rest }: PropsType) => {
  return <Input label={label} error={error} secureTextEntry={true} autoCapitalize="none" {...rest} />;
};

export default PasswordInput;
