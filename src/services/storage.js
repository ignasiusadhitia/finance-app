import AsyncStorage from "@react-native-async-storage/async-storage";

const Storage = {
  /**
   * Save a value in AsyncStorage
   * @param {string} key - The key to store the value
   * @param {any} value - The value to store
   */
  save: async (key, value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (error) {
      console.error("Failed to save data to AsyncStorage:", error);
    }
  },

  /**
   * Retrieve a value form AsyncStorage
   * @param {string} key - The key to retrieve the value
   * @returns {Promise<any>} - The retrieved value or null if not found
   */
  get: async (key) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
      console.error("Failed to retrieve data from AsyncStorage", e);
      return null;
    }
  },

  /**
   * Remove a value from AsyncStorage
   * @param {string} key - The key to remove
   */
  remove: async (key) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error("Failed to remove data from AsyncStorage:", error);
    }
  },

  /**
   * Clear all data in AsyncStorage
   */
  clear: async () => {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error("Failed to clear AsyncStorage:", error);
    }
  },
};

export default Storage;
