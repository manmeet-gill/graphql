var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLString = require('graphql').GraphQLString;
var taskType = require('./TaskType');
var taskModel = require('../models/Task');

exports.addTask = {
    type: taskType.taskType,
    args: {
        title: {
            type: new GraphQLNonNull(GraphQLString),
        }
    },
    resolve: async(root,args)=>{
        const uModel = new taskModel(args);
        const newTask = await uModel.save();
        if(!newTask){
            throw new Error('error');
        }
        return newTask;
    }
}