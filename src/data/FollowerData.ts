import connection from './connection'

const followerTable = "followTable";
const userTable = "userTable"

export class FollowerData {

    following = async (id_user:string, id_following:string): Promise<void> => {
        await connection
        .insert ({id_user, id_following})
        .into(followerTable)
    };

    
      alreadyFollowing = async (id_user: string, id_following: string): Promise<any> => {
    const result = await connection(followerTable)
    .select("*")
    .where(id_following)
    console.log(result)
    return result
    }
  
    unfollow = async (id_user:string, id_following:string) : Promise<void> =>{
        await connection
        .delete()
        .from(followerTable)
        .where({id_user,id_following})
     }

 checkFollowing = async (id_user: string): Promise<any> => {
const result = await connection(followerTable)
             .select("*")
             .where({id_user})
         return result 
     }
 } 

   