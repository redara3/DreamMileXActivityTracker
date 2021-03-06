import nextConnect from 'next-connect';
import middleware from '../../../middlewares/middleware';
import { getActivity } from '../../../lib/db';
import _ from 'lodash'

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
  const data = await getActivity(req);
  
  // res.status(200).json(data);
  res.status(200).json(data);
});

export default handler;