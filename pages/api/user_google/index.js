import btoa from 'btoa';
import nextConnect from 'next-connect';
import middleware from '../../../middlewares/middleware';
import _ from 'lodash';

const clientId = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
const redirectURI = process.env.GOOGLE_REDIRECT_URL;
const {google} = require('googleapis');

const oauth2Client = new google.auth.OAuth2(
  clientId,
  clientSecret,
  'http://localhost:3000/api/user_google'
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



  const response = await fitness.users.dataSources.list({
    userId: 'me',
    
      //     requestBody: 
      //  {
      //   "endTimeMillis": `${end_time}`,
      //   //  "filteredDataQualityStandard": [],
      //    "startTimeMillis": `${start_time}`
      // //  "startTimeMillis": `${start_time}`
      // }
           }
        );

        console.log(response.data);

  const res = await fitness.users.dataset.aggregate({
  userId: 'me',
  
        requestBody: 
     {
           "aggregateBy": [
             {
        // "dataTypeName": "com.google.step_count.delta",
        "dataTypeName":"com.google.step_count.delta",
        "dataSourceId": "derived:com.google.step_count.delta:com.google.android.gms:estimated_steps"
      //    "dataTypeName": "com.google.distance.delta",
      // "dataSourceId": "derived:com.google.distance.delta:com.google.android.gms:merge_distance_delta",
      },
      {
        // "dataTypeName": "com.google.step_count.delta",
        "dataTypeName":"com.google.distance.delta",
        "dataSourceId": "raw:com.google.activity.segment:com.google.android.apps.fitness:user_input"
      //    "dataTypeName": "com.google.distance.delta",
      // "dataSourceId": "derived:com.google.distance.delta:com.google.android.gms:merge_distance_delta",
      }, 
      {
        // "dataTypeName": "com.google.step_count.delta",
        "dataTypeName":"com.google.merge_activity_segments",
        "dataSourceId": "derived:com.google.activity.segment:com.google.android.gms:merge_activity_segments"
      //    "dataTypeName": "com.google.distance.delta",
      // "dataSourceId": "derived:com.google.distance.delta:com.google.android.gms:merge_distance_delta",
      }],
     
     "bucketByTime": {"durationMillis": "86400000"},
     "endTimeMillis": `${end_time}`,
    //  "filteredDataQualityStandard": [],
     "startTimeMillis": `${start_time}`
    }
         }
      );
    //  console.log(res.data.bucket[0].dataset[0].point[0]);
    //  console.log(res.data.bucket[1].dataset[0].point[0]);
    //  console.log(res.data.bucket[2].dataset[0].point[0]);

     const json = res.data;
     console.log(res.data.bucket[0].dataset[0].point[0]);
     console.log(res.data.bucket[1].dataset[0].point[0]);
     
     for(var b = 0; b < json.bucket.length; b++) {
       // each bucket in our response should be a day
       var bucketDate = new Date(parseInt(json.bucket[b].startTimeMillis, 10));
       
       var steps = -1;
       var distance = -1;
       
       if (json.bucket[b].dataset[0].point.length > 0) {
         steps = json.bucket[b].dataset[0].point[0].value[0].intVal;
       }
      
       
       if (json.bucket[b].dataset[1].point.length > 0) {
         distance = json.bucket[b].dataset[1].point[0].value[0].fpVal;
       }

       console.log(bucketDate);
       console.log(steps);
       console.log(distance);
       
       
     }
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