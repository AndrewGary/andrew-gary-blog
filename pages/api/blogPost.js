const { connectToDatabase } = require('../../utils/mongoConnection');
// const ObjectId = require('mongodb').ObjectId;

export default async function handler(req, res) {
    
    const connection = await connectToDatabase();

    const db = connection.db;

    console.log('hello world');
    // switch the methods
    switch (req.method) {
        case 'GET': {

            try{
                console.log('inside of GET')

            const collection = db.collection('blogPosts');

            const idk = await collection.find();

            console.log('idk: ', idk);
            const allPosts = await db.collection('blogPosts').find({}).toArray();

            return res.status(200).json(allPosts);
            }catch(error){
                res.status(400).json(error);
            }
            // return getPosts(req, res);
        //    return res.status(200).json({ hello: 'world'})
        }

        case 'POST': {
            console.log(req.body);

            const collection = db.collection('blogPosts')

            const result = await collection.insertOne(req.body);

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