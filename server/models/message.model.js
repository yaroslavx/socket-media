import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const messageSchema = new Schema(
  {
    messageId: {
      type: String,
      required: true,
      unique: true,
    },
    messageType: {
      type: String,
      required: true,
    },
    textOrPathToFile: {
      type: String,
    },
    roomId: {
      type: String,
      require: true,
    },
    userId: {
      type: String,
      require: true,
    },
    userName: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model('Message', messageSchema);
