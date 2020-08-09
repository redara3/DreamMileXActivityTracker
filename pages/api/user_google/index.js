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
  'https://dream-mile-x-activity-tracker.vercel.app/api/user_google'
);

const fitness = google.fitness('v1');
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
  google.options({auth: oauth2Client});
  getGoogleFitData(tokens.access_token, tokens.token_type, tokens.scope, db)
  }
  res.send({ msg: "Success" });
});



const getGoogleFitData = async (accessToken, tokenType, scope, db) => {

  const end_time = new Date().getTime();
  const start_time = new Date().getTime() - 30*86400000;



  // const res = await fitness.users.dataSources({
  //   userId: 'me',
    
  //         requestBody: 
  //      {
  //            "aggregateBy": [{
  //         // "dataTypeName": "com.google.step_count.delta",
  //         "dataTypeName":"com.google.activity.summary",
  //         "dataSourceId": "derived:com.google.step_count.delta:com.google.android.gms:estimated_steps"
  //       //    "dataTypeName": "com.google.distance.delta",
  //       // "dataSourceId": "derived:com.google.distance.delta:com.google.android.gms:merge_distance_delta",
  //       }],
  //      "bucketByActivitySegment": {},
  //      "bucketByActivityType": {},
  //     "bucketBySession": {},
  //      "bucketByTime": {"durationMillis": "86400000"},
  //     //  "endTimeMillis": `${end_time}`,
  //      "filteredDataQualityStandard": [],
  //     //  "startTimeMillis": `${start_time}`
  //     }
  //          }
  //       );


  const res = await fitness.users.dataset.aggregate({
  userId: 'me',
  
        requestBody: 
     {
           "aggregateBy": [{
        // "dataTypeName": "com.google.step_count.delta",
        "dataTypeName":"com.google.activity.summary",
        "dataSourceId": "derived:com.google.step_count.delta:com.google.android.gms:estimated_steps"
      //    "dataTypeName": "com.google.distance.delta",
      // "dataSourceId": "derived:com.google.distance.delta:com.google.android.gms:merge_distance_delta",
      }],
     "bucketByActivitySegment": {},
     "bucketByActivityType": {},
    "bucketBySession": {},
     "bucketByTime": {"durationMillis": "86400000"},
     "endTimeMillis": `${end_time}`,
    //  "filteredDataQualityStandard": [],
     "startTimeMillis": `${start_time}`
    }
         }
      );
     console.log(res.data.bucket[0].dataset[0].point[0]);
     console.log(res.data.bucket[1].dataset[0].point[0]);
     console.log(res.data.bucket[2].dataset[0].point[0]);


  // let response = await fetch(`https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate`, {
  //   method: 'POST',
  //   body: {
  //     "aggregateBy": [{
  //       "dataTypeName": "com.google.step_count.delta",
  //       "dataSourceId": "derived:com.google.step_count.delta:com.google.android.gms:estimated_steps"
  //     }],
  //     "bucketByTime": { "durationMillis": 86400000 },
  //     "startTimeMillis": 0,
  //     "endTimeMillis": 0
      
  //   },
   
  //   headers: {
  //     'Authorization': `${tokenType} ${accessToken}`
  //   }
  // });
 
  // db.collection("data").insertOne(fitnessData, function(err, res) {
  //   if (err) throw err;
  //   console.log("1 document inserted");
  // });
 
}

const revokeAccess = async () => {
  
}




export default handler;