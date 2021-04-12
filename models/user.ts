import { model, Schema } from 'mongoose';

const User = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  userInfo: {
    type: Schema.Types.ObjectId,
    ref: 'UserInfo',
  },
});

export default model('User', User);
