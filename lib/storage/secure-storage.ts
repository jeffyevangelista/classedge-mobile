import { deleteItemAsync, getItemAsync, setItemAsync } from "expo-secure-store";

export const storeSSData = async (
  key: string,
  value: string
): Promise<void> => {
  try {
    await setItemAsync(key, value);
    console.log("Data saved successfully to secure storage");
  } catch (error) {
    console.log("Error saving data to secure storage", error);
  }
};

export const getSSData = async (key: string): Promise<string | null> => {
  try {
    const value = await getItemAsync(key);
    return value;
  } catch (error) {
    console.log("Error getting data from secure storage", error);
    return null;
  }
};

export const deleteSSData = async (key: string): Promise<void> => {
  try {
    await deleteItemAsync(key);
    console.log("Data deleted successfully from secure storage");
  } catch (error) {
    console.log("Error deleting data from secure storage", error);
  }
};
