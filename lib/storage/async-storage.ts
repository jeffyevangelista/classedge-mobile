import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeASData = async (
  key: string,
  value: unknown
): Promise<void> => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
    console.log("Data saved successfully to async storage");
  } catch (error) {
    console.log("Error saving data to async storage", error);
  }
};

export const getASData = async <T>(key: string): Promise<T | null> => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : null;
  } catch (error) {
    console.log("Error getting data from async storage", error);
    return null;
  }
};

export const deleteASData = async (key: string): Promise<void> => {
  try {
    await AsyncStorage.removeItem(key);
    console.log("Data deleted successfully from async storage");
  } catch (error) {
    console.log("Error deleting data from async storage", error);
  }
};
