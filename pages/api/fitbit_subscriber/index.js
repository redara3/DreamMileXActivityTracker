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
  let code = req.query.verify || "";
    if (code == process.env.FITBIT_SUBSCRIBER_VERIFY_CODE && code != "") {
        res.sendStatus(204);
    } else if (code != process.env.FITBIT_SUBSCRIBER_VERIFY_CODE && code != "") {
        res.sendStatus(404);
    }
  
});





export default handler;