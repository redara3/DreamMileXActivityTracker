import nextConnect from 'next-connect';
import middleware from '../../../middlewares/middleware';
import { updateAllUsers } from '../../../lib/db';
import _ from 'lodash'

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
  const data = await updateAllUsers(req);
  
  res.status(200).json(data);
});

export default handler;