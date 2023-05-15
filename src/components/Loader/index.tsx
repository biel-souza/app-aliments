import { ActivityIndicator, View } from 'react-native';

import colors from '../../styles/colors';
import { styles } from './styles';

export const Loader = () => {
  return (
    <View style={styles.loader}>
      <ActivityIndicator size="large" color={colors.darkGreen} />
    </View>
  );
};
