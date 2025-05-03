// LocalStorage.ts

class LocalStorageUtil<T> {

    /**
     * 
     * @param key Key can be any things but the type should be string
     * @param value value can be any things but the value types is generic means that the types should be defined while creating the object of the class.
     * 
     */
    setItems<T>(key: string, value: T): void {
        try {
            const jsonValue = JSON.stringify(value);
            localStorage.setItem(key, jsonValue);
        } catch (error) {
            console.error(`Error saving ${key} to localStorage`, error);
        }
    }

    /**
     * 
     * @param key Key can be any things
     * @returns Return generic types of the value
     */
    getItems<T>(key: string): T | null {
        try {
            const data = localStorage.getItem(key);
            return data ? (JSON.parse(data)) : null;
        } catch (error) {
            console.error(error);
            return null;

        }
    }

    /**
     * 
     * This method help's to remove the data from the localstorage by key
     * @param key String localstorage key
     */
    removeItem(key: string): void {
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.error(error);

        }
    }

    /**
     * Clear all the localstorage datas from the localstorage
     */
    clear(): void {
        try {
            localStorage.clear();
        } catch (error) {
            console.log(error);

        }
    }
}


export default LocalStorageUtil;
