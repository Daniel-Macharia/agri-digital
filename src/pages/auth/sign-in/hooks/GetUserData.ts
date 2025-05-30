import {useState, useEffect} from 'react';

import axios from 'axios';

import postmanCollection from '/src/collections/Shamba_Bot_postman_collection.json';


function useData()
{
    const [responses, setResponses] = useState([]);

    useEffect(() => {
        function fetchCollectionData()
        {
            const availableData = [];

            for( const item of postmanCollection.item )
            {
                //console.log(item);
                if( item.name )
                {
                    availableData.push( {name: item.name, data: item.item});
                }
            }

            setResponses(availableData);
            return availableData;
        };

        fetchCollectionData();
        
    }, []);
    
    return responses;
}

export function useAuthData()
{
    let authData = useData()[0];
    return authData;
}

export function useRightGroupData()
{
    let rightGroupData = useData()[1];
 
    return rightGroupData;
}

export function useUserData()
{
    let userData = useData()[2];

    return userData;
}

