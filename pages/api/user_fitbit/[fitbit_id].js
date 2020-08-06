import nextConnect from 'next-connect';
import middleware from '../../../middlewares/middleware';
import { getUser } from '../../../lib/db';

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
  const user = await getUser(req, req.query.fitbit_id);
  res.send({ user });
});

export default handler;