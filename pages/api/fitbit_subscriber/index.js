import btoa from 'btoa';
import nextConnect from 'next-connect';
import middleware from '../../../middlewares/middleware';
import _ from 'lodash';

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
                res.status(204)
            } else if (code != process.env.FITBIT_SUBSCRIBER_VERIFY_CODE && code != "") {
                res.status(404)
            }
            break;
        case 'POST':
            if (req.is("application/json")) {
                let notifications = req.body;
    
                // Fitbit subscription expects a 204 response within 3 seconds.
                res.status(204)
    
                // Push notifications to a queue to be handled.
                console.log(notifications);
            } else {
                res.status(400)
            }
          break
        default:
          res.status(405).end() //Method Not Allowed
          break
      }
  
});





export default handler;