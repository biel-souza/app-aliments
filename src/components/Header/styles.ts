import { StyleSheet } from 'react-native';

import colors from '../../styles/colors';

export const styles = StyleSheet.create({
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.darkGreen,
    width: '100%',
    padding: 20,
    paddingTop: 50,
  },
  text: {
    color: colors.white,
    width: '80%',
    marginHorizontal: 10,
    fontSize: 20,
    textAlign: 'center',
  },
  button: {
    borderRadius: 5,
    fontWeight: 'bold',
    fontSize: 15,
    color: colors.white,
    paddingVertical: 7,
    borderWidth: 0,
    cursor: 'pointer',
    alignItems: 'center',
  },
});
