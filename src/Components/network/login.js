
import { BASE_URL } from "../../constant";


export const PostLogin = async ({data}) => {
    try{ 
        return await fetch(`${BASE_URL}/userLogin`, {
            method: 'POST',
            headers: {
                Accept: "application/json",
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }).then(Response => Response.json())
    }catch(error){
        console.log(error);
    }
}