import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  const client = await MongoClient.connect(
    "mongodb+srv://admin-eden:edenrebeccaapp@rebeccadb.hfffjnp.mongodb.net/?retryWrites=true&w=majority&appName=rebeccaDB"
  );
  const db = client.db();
  const sentencesCollection = db.collection("sentences");

  try {
    const result = await sentencesCollection.find().toArray();
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
  }

  client.close();
}
