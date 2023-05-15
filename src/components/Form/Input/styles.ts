import { StyleSheet } from 'react-native';

import colors from '../../../styles/colors';

export const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.darkGreen,
    marginBottom: 5,
  },
  error: {
    fontSize: 11,
    fontWeight: 'bold',
    color: colors.darkRed,
    marginTop: 4,
    marginBottom: 8,
  },
  input: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.darkGreen,
    backgroundColor: colors.white,
    color: colors.darkGreen,
    height: 45,
    paddingHorizontal: 15,
    paddingVertical: 0,
  },
});
