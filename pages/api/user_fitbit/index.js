import btoa from 'btoa';
// import { connectToDatabase } from '../../../util/mongodb';
import nextConnect from 'next-connect';
import middleware from '../../../middlewares/middleware';
import _ from 'lodash';
import { getUser } from '../../../lib/db';

const clientId = process.env.FITBIT_CLIENT_ID;
const clientSecret = process.env.FITBIT_CLIENT_SECRET;
let currentToken = '';

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
  const db = req.db;
  if(req.query.type === 'revoke') {
    console.log(req.query);
    revokeAccess(db);
  } else {
  console.log(req.query.code);
  getaccessTokenFromCode(req.query.code, db);
  }
  res.send({ msg: "Success" });
});



const getaccessTokenFromCode = async (code, db) => {
  const secret = clientId + ':' + clientSecret;
  let response = await fetch(`https://api.fitbit.com/oauth2/token?grant_type=authorization_code&code=${code}&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fuser_fitbit`, {
    method : 'POST',
    headers: {
      'Authorization': `Basic ${btoa(secret)}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
  const authJson = await response.json(); //extract JSON from the http response
  console.log(authJson);
  currentToken = authJson.access_token;
  const fitbit_id = authJson.user_id;
  getProfile(authJson.access_token, authJson.refresh_token, fitbit_id, db);
}

const getProfile = async (accessToken, refreshToken, fitbitId, db) => {

  let response = await fetch(`https://api.fitbit.com/1/user/-/profile.json`, {
    
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });
  let userJson = await response.json(); //extract JSON from the http response
  userJson.user.access_token = accessToken;
  userJson.user.refresh_token = refreshToken;
  userJson.user.fitbit_id = fitbitId;

  await fetch(`https://api.fitbit.com/1/user/-/activities/apiSubscriptions/1.json`, {
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

 response = await fetch(`https://api.fitbit.com/1/user/-/activities/distance/date/today/1m.json`, {
    
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });
  const distanceJson = await response.json(); //extract JSON from the http response
  
  
 response = await fetch(`https://api.fitbit.com/1/user/-/activities/steps/date/today/1m.json`, {
    
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });
  const stepsJson = await response.json(); //extract JSON from the http response
  const dbDocument = _.merge( userJson, distanceJson, stepsJson);
  db.collection("data").replaceOne({"user.fitbit_id": fitbitId}, dbDocument, { upsert: true }, function(err, res) {
    if (err) throw err;
    console.log("1 document replaced");
  });
}

const revokeAccess = async () => {
  const secret = clientId + ':' + clientSecret;
  console.log(btoa(secret));
  let response = await fetch(`https://api.fitbit.com/oauth2/revoke?token=${currentToken}`, {
    method: 'POST',
    
    headers: {
      'Authorization': `Basic ${btoa(secret)}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
  const myJson = await response.json(); //extract JSON from the http response
  console.log(myJson);
  // do something with myJson
}




export default handler;