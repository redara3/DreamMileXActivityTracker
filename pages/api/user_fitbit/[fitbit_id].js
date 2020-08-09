import nextConnect from 'next-connect';
import middleware from '../../../middlewares/middleware';
import { getUser } from '../../../lib/db';

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
  const user = await getUser(req, req.query.fitbit_id);
  console.log(user);
  res.status(200).json(user);
});

export default handler;