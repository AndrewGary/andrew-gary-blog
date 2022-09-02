const { connectToDatabase } = require('../../../utils/mongoConnection')
const {ObjectId} = require('mongodb');

export default async function handler(req, res){

    const connection = await connectToDatabase();

    const db = connection.db;

    try{
        console.log('req.query: ', req.query);

        const tessst = req.query.id

        console.log('tessst: ', tessst);

        console.log(typeof req.query.id);
        console.log(typeof tessst);

        const results = await db.collection('blogPosts').findOne({ _id : ObjectId(req.query.id)})

        console.log('results: ', results);

        return res.status(200).json(results)
    }catch(error){

        return res.status(500).json(error.message);
    }
}