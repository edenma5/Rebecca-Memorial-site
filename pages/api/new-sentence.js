import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  const client = await MongoClient.connect(process.env.MONGODB_CONNECTION);
  const db = client.db();
  const sentencesCollection = db.collection("sentences");

  if (req.method === "POST") {
    const data = req.body;

    try {
      const result = await sentencesCollection.insertOne(data);
      res.status(200).json(result);
      client.close();
    } catch (err) {
      console.log(err);
    }
  }
}
