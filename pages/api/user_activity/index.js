import nextConnect from 'next-connect';
import middleware from '../../../middlewares/middleware';
import { getActivity } from '../../../lib/db';
import _ from 'lodash'

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
  const data = await getActivity(req);
  const orderByChallenge = _.chain(data)
  .groupBy('challenge').map((users, challenge) => ({ users, challenge }))
  .value();
  // res.status(200).json(data);
  res.status(200).json(orderByChallenge);
});

export default handler;