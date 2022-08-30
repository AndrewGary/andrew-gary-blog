const { connectToDatabase } = require('../../utils/mongoConnection');
// const ObjectId = require('mongodb').ObjectId;

export default async function handler(req, res) {
    console.log('req');
    
    // switch the methods
    switch (req.method) {
        case 'GET': {
            // return getPosts(req, res);
           return res.status(200).json({ hello: 'world'})
        }

        case 'POST': {
            return addPost(req, res);
        }

        case 'PUT': {
            return updatePost(req, res);
        }

        case 'DELETE': {
            return deletePost(req, res);
        }
    }
}