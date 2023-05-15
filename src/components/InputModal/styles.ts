import { StyleSheet } from 'react-native';

import colors from '../../styles/colors';

export const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.transparentBlack,
  },
  content: {
    backgroundColor: colors.white,
    width: '90%',
    paddingHorizontal: 60,
    position: 'absolute',
    top: '30%',
    border: 0,
    outline: 0,
    paddingVertical: 40,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  closeButton: {
    border: 0,
    background: colors.transparent,
    position: 'absolute',
    right: 10,
    top: 13,
    color: colors.darkGreen,
    fontWeight: 'bold',
    cursor: 'pointer',
  },
});
