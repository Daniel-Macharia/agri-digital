export default class LocalStorageUtil {
  /**
   * Store a value in localStorage
   * @param key The key to store the value under
   * @param value The value to store
   */
  static setItem<T>(key: string, value: T): void {
    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
    } catch (error) {
      console.error("Error saving to localStorage", error);
    }
  }

  /**
   * Retrieve a value from localStorage
   * @param key The key to retrieve the value from
   * @returns The parsed value or null if not found
   */
  static getItem<T>(key: string): T | null {
    try {
      const serializedValue = localStorage.getItem(key);
      return serializedValue ? (JSON.parse(serializedValue) as T) : null;
    } catch (error) {
      console.error("Error reading from localStorage", error);
      return null;
    }
  }

  /**
   * Remove an item from localStorage
   * @param key The key of the item to remove
   */
  static removeItem(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error("Error removing from localStorage", error);
    }
  }
}
