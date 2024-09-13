import AsyncStorage from "@react-native-async-storage/async-storage";
export const LanguageKey = "APPLICATION_LANGUAGE_SELECTED";
export const themeKey = "APPLICATION_THEME_SELECTED";
export const saveItemToStore = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (err) {}
};
export const getStoredItem = async (key: string) => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (err) {
    return null;
  }
};
