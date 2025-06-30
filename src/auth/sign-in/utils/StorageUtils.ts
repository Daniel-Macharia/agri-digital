export const storagePut = ( key: string, value: any) => {
    try{
        const jsonValue = JSON.stringify(value);
        localStorage.setItem(key, jsonValue);
    } catch( error )
    {
        console.error(`Failed to save ${key} to local storage`);
    }
};

export const storageGet = <T = any >( key: string ): T|null =>{
    try{
        const value =  localStorage.getItem( key );

        return (value) ? ( JSON.parse(value) as T) : null;
    }catch( error )
    {
        console.log(`Failed to fetch value ${key} from local storage`);
        return null;
    }
};

export const storageDelete = ( key: string ): boolean =>{
    try{
        localStorage.removeItem( key );
        return true;
    }catch( error )
    {
        console.log(`Failed to delete value: ${key}`);
        return false;
    }
};