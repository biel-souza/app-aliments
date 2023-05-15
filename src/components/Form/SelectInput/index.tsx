import RNPickerSelect from 'react-native-picker-select';
import { View, Text } from 'react-native';

import colors from '../../../styles/colors';
import { styles } from './styles';

interface PropsType {
  value?: string;
  options: { label: string; value: string }[];
  onChange: (value: string) => void;
  error?: string;
  label?: string;
}

const SelectInput = ({ value, options, onChange, error, label }: PropsType) => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      <RNPickerSelect
        value={value}
        onValueChange={onChange}
        items={options}
        placeholder={{
          label: 'Selecione',
          value: undefined,
          color: colors.gray,
        }}
        style={{
          inputAndroid: styles.input,
          inputIOS: styles.input,
          viewContainer: styles.viewContainer,
          placeholder: {
            color: colors.gray,
          },
        }}
      />
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

export default SelectInput;
