import btoa from 'btoa';
import nextConnect from 'next-connect';
import middleware from '../../../middlewares/middleware';
import _ from 'lodash';

const clientId = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
const {google} = require('googleapis');

const oauth2Client = new google.auth.OAuth2(
  clientId,
  clientSecret,
  'http://localhost:3000/api/user_google'
);

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
  const db = req.db;
  if(req.query.type === 'revoke') {
    console.log(req.query);
    revokeAccess(db);
  } else {
  const {tokens} = await oauth2Client.getToken(req.query.code)
  console.log(tokens)
  oauth2Client.setCredentials(tokens);
  getGoogleFitData(tokens.access_token, tokens.token_type, tokens.scope, db)
  }
  res.send({ msg: "Success" });
});



const getGoogleFitData = async (accessToken, tokenType, scope, db) => {

  let response = await fetch(`https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate`, {
    method: 'POST',
    body: {
      "aggregateBy": [{
        "dataTypeName": "com.google.step_count.delta",
        "dataSourceId": "derived:com.google.step_count.delta:com.google.android.gms:estimated_steps"
      }],
      "bucketByTime": { "durationMillis": 86400000 },
      "startTimeMillis": 1438705622000,
      "endTimeMillis": 1439310422000
    },
    headers: {
      'Authorization': `${tokenType} ${accessToken}`,
      'Content-Type': 'application/json'
    }
  });
  let fitnessData = await response.json(); //extract text from the http response
  console.log(fitnessData);
  
  // db.collection("data").insertOne(fitnessData, function(err, res) {
  //   if (err) throw err;
  //   console.log("1 document inserted");
  // });
 
}

const revokeAccess = async () => {
  
}




export default handler;