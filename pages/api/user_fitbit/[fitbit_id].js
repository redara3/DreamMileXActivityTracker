import nextConnect from 'next-connect';
import middleware from '../../../middlewares/middleware';
import { getUser } from '../../../lib/db';
import { updateData } from '../../../lib/fitbit';

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
  if(req.query.type === 'sync') {
    console.log(req.query);
    const returnResponse = await updateData(req, req.query.fitbit_id);
    res.status(200).json(returnResponse);
  } else {
  const user = await getUser(req, req.query.fitbit_id);
  res.status(200).json(user);
  }
});

export default handler;