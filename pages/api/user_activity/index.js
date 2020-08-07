import nextConnect from 'next-connect';
import middleware from '../../../middlewares/middleware';
import { getActivity } from '../../../lib/db';

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
  const data = await getActivity(req);
  res.send({ data });
});

export default handler;