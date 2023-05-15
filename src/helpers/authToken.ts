import AsyncStorage from '@react-native-async-storage/async-storage';

export const getAuthToken = async () => {
  return (await AsyncStorage.getItem('auth_token')) as string;
};

export const setAuthToken = async (token: string) => {
  await AsyncStorage.setItem('auth_token', token);
};
