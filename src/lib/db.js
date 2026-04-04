import { MongoClient } from "mongodb";

const uri = "mongodb+srv://toolsdesignwebdev_db_user:6rYz2pUGzaADRD4F@portfoliocluster.pr6iydp.mongodb.net/?appName=portfolioCluster";

let client;
let clientPromise;

if (!global._mongoClientPromise) {
  client = new MongoClient(uri);
  global._mongoClientPromise = client.connect();
}

clientPromise = global._mongoClientPromise;

export default clientPromise;