import _ from 'lodash'
import { getUser } from './db';
import btoa from 'btoa';

const clientId = process.env.FITBIT_CLIENT_ID;
const clientSecret = process.env.FITBIT_CLIENT_SECRET;
const secret = clientId + ':' + clientSecret;

/**
     *  Refresh a user's access token and save to the database.
     * @param {Object} user A user object contains refresh_token.
     * @returns {void}
     */
   

    export const refreshTokens = async (user, db) => {
        try {
            
            let refreshed_token_response = await fetch(`https://api.fitbit.com/oauth2/token?grant_type=refresh_token&refresh_token=${user.refresh_token}`, {
                method: 'POST',
                
                headers: {
                    'Authorization': `Basic ${btoa(secret)}`,
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
          
            });

        const authJson = await refreshed_token_response.json();

       

            // Parse response and update user's doc
            user.refresh_token = authJson.refresh_token;
            user.access_token = authJson.access_token;

            // Insert updated user doc into mongodb.
            db.collection("users").updateOne({
      
                "user.fitbit_id": fitbitId,
              }, user, { upsert: true }, function(err, res) {
                if (err) throw err;
                console.log("1 document updated");
              });
            
            return user;

        } catch(err) {
            throw err;
        }
    }


    export const revokeAccess = async (req, fitbit_id) => {
        const db = req.db;
        const user = await getUser(req, fitbit_id);
        if(user.access_token) {
         await fetch(`https://api.fitbit.com/oauth2/revoke?token=${user.access_token}`, {
          method: 'POST',
          
          headers: {
            'Authorization': `Basic ${btoa(secret)}`,
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        });
        
        await fetch(`https://api.fitbit.com/oauth2/revoke?token=${user.refresh_token}`, {
          method: 'POST',
          
          headers: {
            'Authorization': `Basic ${btoa(secret)}`,
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        });
        db.collection("data").deleteOne({"user.fitbit_id": fitbit_id}, function(err, res) {
          if (err) throw err;
          console.log("1 document deleted");
        });
        return {fitbit_id: fitbit_id, action: 'revoke', status: 'success'};
    } else {
        console.log("Did not find user to revoke");
        return {fitbit_id: fitbit_id, action: 'revoke', status: 'failure'};
    }
        
    }

    export const updateData = async (req, fitbit_id) => {
        const db = req.db;
        let user = await getUser(req, fitbit_id);
        // let userJson = {user: {access_token: accessToken, refresh_token: refreshToken, displayName: JSON.parse(state).name, teamName: JSON.parse(state).teamName,challengeType: JSON.parse(state).challengeType, fitbit_id: fitbitId}};
        
        let response = await fetch(`https://api.fitbit.com/1/user/-/activities/distance/date/today/1m.json`, {
          
          headers: {
            'Authorization': `Bearer ${user.accessToken}`
          }
        });
        if(response.status != 200) {
            user = refreshTokens(user, db);
            response = await fetch(`https://api.fitbit.com/1/user/-/activities/distance/date/today/1m.json`, {
          
            headers: {
                'Authorization': `Bearer ${user.accessToken}`
            }
            });
        }
        
        const distanceJson = await response.json(); //extract JSON from the http response
        console.log(distanceJson)
        Object.keys(distanceJson).forEach(function(v){
          distanceJson[v.replace("-", "_")] = distanceJson[v];
          delete distanceJson[v];
          console.log(distanceJson);
      });
        
      
    
        
       response = await fetch(`https://api.fitbit.com/1/user/-/activities/steps/date/today/1m.json`, {
          
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });
        const stepsJson = await response.json(); //extract JSON from the http response
        Object.keys(stepsJson).forEach(function(v){
          stepsJson[v.replace("-", "_")] = stepsJson[v];
          delete stepsJson[v];
          console.log(stepsJson);
      });
      
      
        console.log(stepsJson)
        _.mapKeys(stepsJson, function(value, key){
          return _.replace(key, "-","_")
        })
        const dbDocument = _.merge( userJson, distanceJson, stepsJson);
        db.collection("data").replaceOne({"user.fitbit_id": fitbitId}, dbDocument, { upsert: true }, function(err, res) {
          if (err) throw err;
          console.log("1 document replaced");
        });
        return {fitbit_id: fitbit_id, action: 'data', status: 'success'};
    }
