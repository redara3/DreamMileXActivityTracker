import btoa from 'btoa';
import nextConnect from 'next-connect';
import middleware from '../../../middlewares/middleware';
import _ from 'lodash';
import { updateData } from '../../../lib/fitbit'; 
const clientId = process.env.FITBIT_CLIENT_ID;
const clientSecret = process.env.FITBIT_CLIENT_SECRET;

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
  const db = req.db;
  


    switch (req.method) {
        case 'GET':
            let code = req.query.verify || "";
            if (code == process.env.FITBIT_SUBSCRIBER_VERIFY_CODE && code != "") {
                res.status(204).end()
            } else if (code != process.env.FITBIT_SUBSCRIBER_VERIFY_CODE && code != "") {
                res.status(404).end();
            }
            else {
              res.status(404).end();
            }
            break;
        case 'POST':
           let notifications = req.body;
           console.log(notifications);
            // if(notifications.collectionType === 'activities') {
              updateData(req, notifications.ownerId);
            // }
           res.status(204).end();
            
          break
        default:
          res.status(405).end() //Method Not Allowed
          break
      }
  
});





export default handler;