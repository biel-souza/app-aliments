import { StyleSheet } from 'react-native';

import colors from '../../styles/colors';

export const styles = StyleSheet.create({
  content: {
    flex: 1,
    minHeight: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    display: 'flex',
    width: '90%',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    fontSize: 25,
    color: colors.darkGreen,
  },
  boxInput: {
    width: '100%',
    marginTop: 10,
  },
  boxButton: {
    width: '80%',
    marginTop: 30,
  },
  wrapper: {
    padding: 10,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  linkText: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    textAlign: 'center',
  },
});
