import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_DETAILS_KEY = 'userDetails';

export const setUser = async (user: any) => {
  const userData = JSON.stringify({ token: user.token, id: user.user.id });
  await AsyncStorage.setItem(USER_DETAILS_KEY, userData);
};

export const getUser = async () => {
  const userData = await AsyncStorage.getItem(USER_DETAILS_KEY);
  return userData;
};

export const removeUser = async () => {
  await AsyncStorage.removeItem('userDetails');
};
