import * as mongoose from 'mongoose';
import * as timestamps from 'mongoose-timestamp';

export const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: function() {
      // little trick to allow empty string. (required: true is too strong).
      return typeof this.title !== 'string';
    },
  },
  description: {
    type: String,
    default: '',
  },
  done: {
    type: Boolean,
    default: false,
  }
});

TaskSchema.plugin(timestamps);
