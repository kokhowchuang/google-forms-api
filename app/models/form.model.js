import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const formSchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    name: { type: String, required: false, trim: true },
    description: {
      type: String,
      default: '',
    },
    questions: [
      {
        _id: false,
        open: { type: Boolean, default: false },
        questionText: String,
        questionImage: { type: String, default: '' },
        options: [
          {
            _id: false,
            optionText: String,
            optionImage: { type: String, default: '' },
          },
        ],
      },
    ],
    stared: { type: Boolean, default: false },
    formType: { type: String, default: 'anonymous' },
  },
  { timestamps: true }
);

formSchema.plugin(mongoosePaginate);

export default mongoose.model('forms', formSchema);
