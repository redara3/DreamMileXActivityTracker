import _ from 'lodash'
import { getUser } from './db';
import btoa from 'btoa';
import moment from 'moment';

const clientId = process.env.FITBIT_CLIENT_ID;
const clientSecret = process.env.FITBIT_CLIENT_SECRET;
const secret = clientId + ':' + clientSecret;

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

            // // Parse response and update user's doc
            user.refresh_token = authJson.refresh_token;
            user.access_token = authJson.access_token;
              db.collection("data").updateOne({
      
                "user.fitbit_id": user.fitbit_id,
              }, { $set:  { user: { access_token: authJson.access_token, refresh_token: authJson.refresh_token, teamName: user.teamName, challengeType: user.challengeType,
              displayName: user.displayName, fitbit_id: user.fitbit_id } } }, { upsert: false }, function(err, res) {
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
        const baseDate = req.query.baseDate;
        const endDate = moment(new Date()).format('YYYY-MM-DD');
        let response = await fetch(`https://api.fitbit.com/1/user/-/activities/distance/date/${baseDate}/${endDate}.json`, {
          
          headers: {
            'Authorization': `Bearer ${user.access_token}`,
            'Accept-Language': 'en_US'
          }
        });
        let distanceJson = await response.json();
        if(distanceJson.success === false) {
          console.log('expired');
            user = await refreshTokens(user, db);
            response = await fetch(`https://api.fitbit.com/1/user/-/activities/distance/date/${baseDate}/${endDate}.json`, {
          
            headers: {
                'Authorization': `Bearer ${user.access_token}`,
                'Accept-Language': 'en_US'
            }
            });
            distanceJson = await response.json(); //extract JSON from the http response
            console.log(distanceJson)

        } else {
          console.log('Not Expired token');
          console.log(distanceJson);
        }
        
        
        Object.keys(distanceJson).forEach(function(v){
          distanceJson[v.replace("-", "_")] = distanceJson[v];
          delete distanceJson[v];
      });
        
      db.collection("data").updateOne({"user.fitbit_id": fitbit_id}, {$set:distanceJson}, { upsert: false }, function(err, res) {
        if (err) throw err;
        console.log("1 document updated");
      });
    
        
       response = await fetch(`https://api.fitbit.com/1/user/-/activities/steps/date/${baseDate}/${endDate}.json`, {
          
          headers: {
            'Authorization': `Bearer ${user.access_token}`
          }
        });
        const stepsJson = await response.json(); //extract JSON from the http response
        Object.keys(stepsJson).forEach(function(v){
          stepsJson[v.replace("-", "_")] = stepsJson[v];
          delete stepsJson[v];
      });
      
      
        console.log(stepsJson)
        _.mapKeys(stepsJson, function(value, key){
          return _.replace(key, "-","_")
        })
        
        db.collection("data").updateOne({"user.fitbit_id": fitbit_id}, {$set:stepsJson}, { upsert: false }, function(err, res) {
          if (err) throw err;
          console.log("1 document updated");
        });


        response = await fetch(`https://api.fitbit.com/1/user/-/activities/recent.json`, {
    
          headers: {
            'Authorization': `Bearer ${user.access_token}`
          }
        });
        const recent = await response.json(); //extract JSON from the http response
        console.log(recent);

        db.collection("data").updateOne({"user.fitbit_id": fitbit_id}, {$set:{recent: recent, lastUpdated: _.now()}}, { upsert: false }, function(err, res) {
          if (err) throw err;
          console.log("1 document updated");
        });

        return {fitbit_id: fitbit_id, action: 'sync', status: 'success'};
    }




