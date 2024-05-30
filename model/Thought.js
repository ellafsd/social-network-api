const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction'); // Ensure the correct path to the reactionSchema file

// Schema to create a user model
const thoughtSchema = new Schema(         
  {
    thoughtText: {
       type: String,
       required: true,
       minlength: 1,
       maxlength: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
    },
    username: {
        type: String,
        required: true,
        },
     reactions:[reactionSchema],    // Array of nested documents created with the reactionSchema
  },
  {
    toJSON: {
      virtuals: true,    //Ensures that virtual properties are included when the document is converted to JSON. 
      getters: true,  // Ensures that getter methods are applied
    },
    id: false,     //prevents Mongoose from creating a virtual property called id that duplicates _id. It avoids confusion or unnecessary duplication.
  }
);

// Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;    
  });

const Thought = model('Thought', thoughtSchema);   // Create the Thought model using the thoughtSchema

module.exports = Thought;      //exports the Thought model so that it can be imported and used in other parts of the application.
