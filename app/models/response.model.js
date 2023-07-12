import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const responseSchema = new mongoose.Schema(
  {
    formId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'forms',
    },
    userId: {
      type: String,
    },
    response: [
      {
        questionId: String,
        optionId: String,
      },
    ],
  },
  { timestamps: true }
);

responseSchema.plugin(mongoosePaginate);

export default mongoose.model('responses', responseSchema);
