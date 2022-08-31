const { connectToDatabase } = require('../../utils/mongoConnection');
// const ObjectId = require('mongodb').ObjectId;

export default async function handler(req, res) {
    
    const connection = await connectToDatabase();

    const db = connection.db;
    // switch the methods
    switch (req.method) {
        case 'GET': {
            // return getPosts(req, res);
           return res.status(200).json({ hello: 'world'})
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
            return deletePost(req, res);
        }
    }
}