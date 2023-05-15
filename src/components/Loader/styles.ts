import { StyleSheet } from 'react-native';

import colors from '../../styles/colors';

export const styles = StyleSheet.create({
  loader: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    background: colors.white,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
