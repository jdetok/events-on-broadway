import { MongoClient } from 'mongodb';

const uri = `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@mongo:27017/`;
const client = new MongoClient(uri);

export const db = client.db(process.env.MONGO_INITDB_DATABASE);