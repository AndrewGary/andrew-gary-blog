const { connectToDatabase } = require('../../../utils/mongoConnection')
const {ObjectId} = require('mongodb');

export default async function handler(req, res){
    const connection = await connectToDatabase();

    const db = connection.db;

    switch(req.method){
        case 'GET':
            try{
                const results = await db.collection('blogPosts').findOne({ _id : ObjectId(req.query.id)})
                
                return res.status(200).json(results)
            }catch(error){
                return res.status(500).json(error.message);
            }

        case 'DELETE':
            try{
                console.log('inside of DELETE in you know');
                const returnValue = db.collection('blogPosts').deleteOne({_id: ObjectId(req.query.id)})
                console.log('rt value: ', returnValue);

                return res.status(200).json(returnValue);
            }catch(error){
                console.log('inside of errorrrr');
                return res.status(500).json(error.message);
            }

        case 'PUT':
            try{
                console.log('req.body: ', req.body)
            }catch(error){
                return res.status(500).json(error.message);
            }
        }
}