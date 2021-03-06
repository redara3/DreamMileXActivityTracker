import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export async function setUpDb(db) {
  db
    .collection('data')
    .createIndex({ expireAt: -1 }, { expireAfterSeconds: 0 });
  db.collection('users').createIndex({ expireAt: -1 }, { expireAfterSeconds: 0 });
}

export default async function database(req, res, next) {
  if (!client.isConnected()) await client.connect();
  req.dbClient = client;
  req.db = client.db(process.env.MONGODB_DB);
  await setUpDb(req.db);
  return next();
}