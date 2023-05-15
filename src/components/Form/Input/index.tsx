import { TextInputProps, TextInput, View, Text } from 'react-native';

import colors from '../../../styles/colors';
import { styles } from './styles';

interface PropsType extends TextInputProps {
  label?: string;
  error?: string;
}

const Input = ({ label, error, ...rest }: PropsType) => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      <TextInput style={styles.input} placeholderTextColor={colors.gray} {...rest}></TextInput>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

export default Input;
