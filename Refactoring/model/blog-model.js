const mongodb = require('mongodb');
const db = require('../data/database');

const ObjectId = mongodb.ObjectId;

class Post{
    constructor(title, content, id){
        this.title = title;
        this.content = content;
     
        if(id){
            this.id = new ObjectId(id);
        }
    }

    static async fetchAll(){
        const posts = await db.getDb().collection('posts').find().toArray();
        return posts;
    }
    async fetchSinglePost(){
        const post = await db.getDb().collection('posts').findOne({ _id: this.id });
        return post;
    }
     async save(){
        let result ;
        if(this.id){
           result = await db
            .getDb()
            .collection('posts')
            .updateOne(
              { _id: this.id },
              { $set: { title: this.title, content: this.content } }
            );
        return result;
        }else{
            const newPost = {
                title: this.title,
                content: this.content
              };
            result = await db.getDb().collection('posts').insertOne(newPost);
            return result;
        }
    }

    async delete(){
        await db.getDb().collection('posts').deleteOne({ _id: this.id });
    }
}




module.exports = Post;