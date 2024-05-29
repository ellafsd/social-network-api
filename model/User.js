const { Schema, model } = require('mongoose');

// Schema to create a user model
const userSchema = new Schema(
  {
    userName: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must match a valid email address'],
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought',
        },
    ],
    },
    {
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,    //Ensures that virtual properties are included when the document is converted to JSON. 
    },
    id: false,     //prevents Mongoose from creating a virtual property called id that duplicates _id. It avoids confusion or unnecessary duplication.
  }
);

// Create a virtual called friendCount that retrieves the length of the user's friends array field on query
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;     //this.friends is used to access the friends array in the same document
  });

const User = model('User', userSchema);   //creates a Mongoose model named User based on the userSchema. This model allows to create, read, update, and delete documents in the users collection.

module.exports = User;      //exports the User model so that it can be imported and used in other parts of the application.
