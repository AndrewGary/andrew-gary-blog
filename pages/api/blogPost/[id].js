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
                const returnValue = db.collection('blogPosts').deleteOne({_id: ObjectId(req.query.id)})

                return res.status(200).json(returnValue);
            }catch(error){
                return res.status(500).json(error.message);
            }

        case 'PUT':
            try{
                const searchTerm = req.body.searchQuery;

                delete req.body.searchQuery;
                delete req.body._id;

                console.log('searchTerm: ', searchTerm);

                const returnValue = await db.collection('blogPosts').replaceOne({ postName: searchTerm}, req.body);

                console.log('returnValue: ', returnValue);
    
                res.status(200).json(returnValue)
            }catch(error){
                return res.status(500).json(error.message);
            }
        }
}