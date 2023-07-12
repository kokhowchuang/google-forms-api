import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    image: { type: String },
    createdForms: [],
  },
  { timestamps: true }
);

userSchema.plugin(mongoosePaginate);

export default mongoose.model('users', userSchema);
