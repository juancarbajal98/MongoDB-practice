var MongoClient = require('mongodb').MongoClient;
const express = require('express');
const app = express();
const port = 3000;
const uri = "mongodb+srv://juancarbajal:47@cluster0-ru3hp.mongodb.net/test?retryWrites=true";
app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

app.use(express.static('post'))
app.use(express.static('retreive'))
app.use(express.static('retreivebyID'))

enteredTitle = '';
enteredContent = '';
// ID var only used for ID lookup
enteredID = '';

let db;
MongoClient.connect(uri, {useNewUrlParser: true}, (err,client) => {
    if (err) throw err;
    console.log("connected to DB");
    db = client.db('blogDB')
})
function onAddPost(){
    app.post('/post.html', (req, res)=>{
        db.collection('blogs').insertOne({
            title: this.enteredTitle,
            content: this.enteredContent
        }, (err, result) => {
            if  (err) throw err;
            res.send(result);
        })
    })
};

function onRetrieve(){
    app.get('/retrieve.html', (req, res)=>{
        // pass in empty document to retreat ALL documents 
        db.collection('blogs').find({}, (err,result) => {
            if (err) throw err;
            res.send(result);
        })
    })
};

function onRetrievebyID(){
    id = this.enteredID;
    // app.get (incorporate newly initialized id var)

}