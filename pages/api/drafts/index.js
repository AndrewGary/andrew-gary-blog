import { connectToDatabase } from "../../../utils/mongoConnection";

export default async function hanlder(req, res) {
  const connection = await connectToDatabase();

  const db = connection.db;

  switch (req.method) {
    case "GET": {
      try {
        const allposts = await db
          .collection("drafts")
          .find({})
          .sort({ timeStamp: -1 })
          .toArray();

        return res.status(200).json(allposts);
      } catch (error) {
        return res.status(500).json(error);
      }
    }

    case "POST": {
      try {
        const response = await db.collection("drafts").insertOne(req.body);

        res.status(200).json(response);
      } catch (error) {
        return res.status(500).json(error);
      }
    }
  }
}
