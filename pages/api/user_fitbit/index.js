import btoa from 'btoa';
// import { connectToDatabase } from '../../../util/mongodb';
import nextConnect from 'next-connect';
import middleware from '../../../middlewares/middleware';
import _ from 'lodash';
import { getUser } from '../../../lib/db';
import { revokeAccess } from '../../../lib/fitbit';
const clientId = process.env.FITBIT_CLIENT_ID;
const clientSecret = process.env.FITBIT_CLIENT_SECRET;
import moment from 'moment';


const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
  const db = req.db;
  if(req.query.type === 'revoke') {
    console.log(req.query);
    const returnResponse = await revokeAccess(req, req.query.fitbit_id);
    res.status(200).json(returnResponse)
  } else {
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
  const fitbit_id = authJson.user_id;
  if(_.isEmpty(fitbit_id)) {
    return {fitbit_id: fitbit_id, action: 'link', status: 'failure'};
  }
  return await getProfile(authJson.access_token, authJson.refresh_token, state, fitbit_id, db);
}

const getProfile = async (accessToken, refreshToken, state, fitbitId, db) => {

  let userJson = {user: {access_token: accessToken, refresh_token: refreshToken, displayName: JSON.parse(state).name, teamName: JSON.parse(state).teamName,challengeType: JSON.parse(state).challengeType, fitbit_id: fitbitId}};
  let baseDate = JSON.parse(state).baseDate;
  
  const endDate = moment(new Date()).format('YYYY-MM-DD');
  

 let response = await fetch(`https://api.fitbit.com/1/user/-/activities/distance/date/${baseDate}/${endDate}.json`, {
    
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Accept-Language': 'en_US'
    }
  });
  const distanceJson = await response.json(); //extract JSON from the http response
  console.log(distanceJson)
  Object.keys(distanceJson).forEach(function(v){
    distanceJson[v.replace("-", "_")] = distanceJson[v];
    delete distanceJson[v];
    console.log(distanceJson);
});
  
 response = await fetch(`https://api.fitbit.com/1/user/-/activities/steps/date/${baseDate}/${endDate}.json`, {
    
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

response = await fetch(`https://api.fitbit.com/1/user/-/activities/recent.json`, {
    
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });
  const recent = await response.json(); //extract JSON from the http response
  console.log(recent);


  console.log(stepsJson)
  _.mapKeys(stepsJson, function(value, key){
    return _.replace(key, "-","_")
  })
  const dbDocument = _.merge( userJson, distanceJson, stepsJson, {recent: recent, lastUpdated: _.now()});
  db.collection("data").replaceOne({"user.fitbit_id": fitbitId}, dbDocument, { upsert: true }, function(err, res) {
    if (err) throw err;
    console.log("1 document replaced");
  });
  return {fitbit_id: fitbitId, action: 'link', status: 'success'};
}



export default handler;