const { connectToDatabase } = require('../../../utils/mongoConnection');

export default async function handler(req, res) {
    
    const connection = await connectToDatabase();

    const db = connection.db;

    // switch the methods
    switch (req.method) {
        case 'GET': {

            try{
                const allPosts = await db.collection('blogPosts').find({}).sort({timeStamp: -1}).toArray();

                return res.status(200).json(allPosts);
            }catch(error){
                return res.status(400).json(error);
            }
        }

        case 'POST': {

            const result = await db.collection('blogPosts').insertOne(req.body);

            return res.status(201).json(result);
        }

        case 'PUT': {
            return updatePost(req, res);
        }

        case 'DELETE': {
            try{
                
            }catch(error){
                return res.status(400).json(error);
            }
        }
    }
}