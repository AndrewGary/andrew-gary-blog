import { connectToDatabase } from "../../../utils/mongoConnection";
import { ObjectId } from "mongodb";

export default async function handler(req, res){

    const connection = await connectToDatabase();

    const db = connection.db;

    switch(req.method){
        case 'GET':{
            try{
                const draft = await db.collection('drafts').findOne({ _id: ObjectId(req.query.id)})

                return res.status(200).json(draft);
            }catch(error){
                return res.status(500).json(error);
            }
        }

        case 'DELETE':{
            try{
                const returnValue = db.collection('drafts').deleteOne({_id: ObjectId(req.query.id)})

                return res.status(200).json(returnValue);
            }catch(error){
                return res.status(500).json(error.message);
            }
        }
    }
}