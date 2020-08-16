import _ from 'lodash'
import { getUser } from './db';
import btoa from 'btoa';

const clientId = process.env.FITBIT_CLIENT_ID;
const clientSecret = process.env.FITBIT_CLIENT_SECRET;
const secret = clientId + ':' + clientSecret;
import async from "async";
const MAX_RETRY = 5;

    /**
     *  Refresh a user's access token and save to the database.
     * @param {Object} user A user object contains refresh_token.
     * @returns {void}
     */
   

    const refreshTokens = async (user, db) => {
        try {
            
            let refreshed_token_response = await fetch(`https://api.fitbit.com/oauth2/token?grant_type=refresh_token&refresh_token=${user.refresh_token}`, {
                method: 'POST',
                
                headers: {
                    'Authorization': `Basic ${btoa(secret)}`,
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
          
            });

        const authJson = await refreshed_token_response.json();

       console.log(authJson);

            // Parse response and update user's doc
            user.refresh_token = authJson.refresh_token;
            user.access_token = authJson.access_token;

            // Insert updated user doc into mongodb.
            db.collection("users").replaceOne({
      
                "user.fitbit_id": user.fitbit_id,
              }, user, { upsert: true }, function(err, res) {
                if (err) throw err;
                console.log("1 document replaced");
              });

              db.collection("data").updateOne({
      
                "user.fitbit_id": user.fitbit_id,
              }, user.access_token, { upsert: true }, function(err, res) {
                if (err) throw err;
                console.log("1 document updated");
              });

              db.collection("data").updateOne({
      
                "user.fitbit_id": user.fitbit_id,
              }, user.refresh_token, { upsert: true }, function(err, res) {
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
        console.log('update data');
        console.log(user);

        let response = await fetch(`https://api.fitbit.com/1/user/-/activities/distance/date/today/1m.json`, {
          
          headers: {
            'Authorization': `Bearer ${user.access_token}`
          }
        });
        const responsejson = await response.json();
        if(responsejson.success === false) {
          console.log('expired')
            user = await refreshTokens(user, db);
            response = await fetch(`https://api.fitbit.com/1/user/-/activities/distance/date/today/1m.json`, {
          
            headers: {
                'Authorization': `Bearer ${user.access_token}`
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
            'Authorization': `Bearer ${user.access_token}`
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
        db.collection("data").replaceOne({"user.fitbit_id": fitbit_id}, dbDocument, { upsert: true }, function(err, res) {
          if (err) throw err;
          console.log("1 document replaced");
        });
        return {fitbit_id: fitbit_id, action: 'data', status: 'success'};
    }




