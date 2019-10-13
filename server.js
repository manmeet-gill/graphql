const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())

const mongoose = require('mongoose')

const graphqlExpress = require('express-graphql')
const taskSchema = require('./graphql/TaskSchema').TaskSchema

mongoose.connect('mongodb+srv://<username>:<password>@cluster0-lgloo.mongodb.net/test?retryWrites=true&w=majority',
    (err)=>{
        if(err) throw err;
        console.log("connected to mongo atlas");
    }
);

app.set('port', (process.env.PORT || 5000))

app.use('/graphql', graphqlExpress({
    schema: taskSchema,
    rootValue:global,
    graphiql:true
}))

app.listen(app.get('port'), () =>{
    console.log("Node app is running at localhost:"+ app.get('port'))
})