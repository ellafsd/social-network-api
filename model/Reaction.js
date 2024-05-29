const { Schema, model } = require('mongoose');

// Schema to create a user model
const reactionSchema = new Schema(        //reactions are subdocuments nested within the thoughtSchema
  {
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => new Date(timestamp).toLocaleString(),
    },
  },
  {
    toJSON: {
      getters: true,    //Ensure getters are applied to JSON output
    },
    id: false,     // Disable the default virtual `id` property
  }
);

module.exports = reactionSchema;      //exports the User model so that it can be imported and used in other parts of the application.
