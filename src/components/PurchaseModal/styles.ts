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
    paddingHorizontal: 40,
    position: 'absolute',
    top: '30%',
    border: 0,
    outline: 0,
    paddingVertical: 30,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  title: {
    fontSize: 20,
    color: colors.darkGreen,
    marginTop: 10,
    marginBottom: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  containerInput: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  fakeInput: {
    borderWidth: 1,
    borderColor: colors.darkGreen,
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 4,
    marginHorizontal: 15,
  },
  customButton: {
    border: 0,
    backgroundColor: colors.darkGreen,
    borderRadius: 50,
    height: 30,
    width: 30,
    padding: 5,
    cursor: 'pointer',
  },
  boxInput: {
    width: '100%',
  },
  boxButton: {
    marginTop: 25,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
  },
  wrapperButtons: {
    width: '45%',
    marginHorizontal: 5,
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
