const mongodb=require('mongodb')
const MongoClient=mongodb.MongoClient
const connectionURL='mongodb://127.0.0.1:27017'
const database='students'
MongoClient.connect(connectionURL,{useNewUrlParser:true,useUnifiedTopology: true},(error,client)=>{
    if(error){
        return console.log('unable to connect to database')
    }
    console.log('connected succesfully')
    const db=client.db(databaseName)
})