import btoa from 'btoa';
// import { connectToDatabase } from '../../../util/mongodb';
import nextConnect from 'next-connect';
import middleware from '../../../middlewares/middleware';
import _ from 'lodash';
import { getUser } from '../../../lib/db';
import { revokeAccess } from '../../../lib/fitbit';
const clientId = process.env.FITBIT_CLIENT_ID;
const clientSecret = process.env.FITBIT_CLIENT_SECRET;

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
  const db = req.db;
  if(req.query.type === 'revoke') {
    console.log(req.query);
    const returnResponse = await revokeAccess(req, req.query.fitbit_id);

    // const returnResponse = await revokeAccess(db, req.query.access_token, req.query.refresh_token, req.query.fitbit_id);
    res.status(200).json(returnResponse)
  } else {
    console.log(req.query.code);
    console.log(req.query.state);
    const response = await getaccessTokenFromCode(req.query.code, req.query.state, db);
    res.writeHead(307, {Location: `/user/${response.fitbit_id}?action=${response.action}`});                    // <- redirect
    res.end();
  }
  res.writeHead(307, { Location: `/` })
  res.end()
});



const getaccessTokenFromCode = async (code, state, db) => {
  const secret = clientId + ':' + clientSecret;
  let response = await fetch(`https://api.fitbit.com/oauth2/token?grant_type=authorization_code&code=${code}&redirect_uri=https%3A%2F%2Fdream-mile-x-activity-tracker.vercel.app%2Fapi%2Fuser_fitbit`, {
    method : 'POST',
    headers: {
      'Authorization': `Basic ${btoa(secret)}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
  const authJson = await response.json(); //extract JSON from the http response
  console.log(authJson);
  const fitbit_id = authJson.user_id;
  return await getProfile(authJson.access_token, authJson.refresh_token, state, fitbit_id, db);
}

const getProfile = async (accessToken, refreshToken, state, fitbitId, db) => {

  let userJson = {user: {access_token: accessToken, refresh_token: refreshToken, displayName: JSON.parse(state).name, teamName: JSON.parse(state).teamName,challengeType: JSON.parse(state).challengeType, fitbit_id: fitbitId}};
  
  await fetch(`https://api.fitbit.com/1/user/-/activities/apiSubscriptions/${fitbitId}.json`, {
    method: "POST",
    headers: {
        "Authorization": `Bearer ${accessToken}`
    }
  }).catch(e => e);

  

  db.collection("users").replaceOne({
      
    "user.fitbit_id": fitbitId,
  }, userJson, { upsert: true }, function(err, res) {
    if (err) throw err;
    console.log("1 document replaced");
  });

 let response = await fetch(`https://api.fitbit.com/1/user/-/activities/distance/date/today/1m.json`, {
    
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });
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
  return {fitbit_id: fitbitId, action: 'link', status: 'success'};
}

// const revokeAccess = async (db, access_token, refresh_token, fitbit_id) => {
//   const secret = clientId + ':' + clientSecret;
//    await fetch(`https://api.fitbit.com/oauth2/revoke?token=${access_token}`, {
//     method: 'POST',
    
//     headers: {
//       'Authorization': `Basic ${btoa(secret)}`,
//       'Content-Type': 'application/x-www-form-urlencoded'
//     }
//   });
  
//   await fetch(`https://api.fitbit.com/oauth2/revoke?token=${refresh_token}`, {
//     method: 'POST',
    
//     headers: {
//       'Authorization': `Basic ${btoa(secret)}`,
//       'Content-Type': 'application/x-www-form-urlencoded'
//     }
//   });
//   db.collection("data").deleteOne({"user.fitbit_id": fitbit_id}, function(err, res) {
//     if (err) throw err;
//     console.log("1 document deleted");
//   });
//   return {fitbit_id: fitbit_id, action: 'revoke', status: 'success'};
  
// }




export default handler;