import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';

import { styles } from './styles';
import colors from '../../styles/colors';

interface PropsType extends TouchableOpacityProps {
  color?: string;
  background?: string;
  title: string;
}

export const ActionButton = ({ color, background, title, ...rest }: PropsType) => {
  return (
    <TouchableOpacity
      style={{ ...styles.button, backgroundColor: background ? background : colors.darkGreen }}
      {...rest}
    >
      <Text style={{ color: color ? color : colors.white }}>{title}</Text>
    </TouchableOpacity>
  );
};
