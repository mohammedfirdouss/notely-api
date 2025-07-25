import mongoose, { Document, Schema } from 'mongoose';

export interface INoteDocument extends Document {
  title: string;
  content: string;
  userId: string;
}

const noteSchema = new Schema<INoteDocument>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters']
    },
    content: {
      type: String,
      required: [true, 'Content is required'],
      maxlength: [10000, 'Content cannot exceed 10000 characters']
    },
    userId: {
      type: String,
      required: [true, 'User ID is required'],
      ref: 'User'
    }
  },
  {
    timestamps: true
  }
);

// Create indexes for better query performance
noteSchema.index({ userId: 1 });
noteSchema.index({ userId: 1, createdAt: -1 });
noteSchema.index({ userId: 1, title: 'text', content: 'text' });

export const Note = mongoose.model<INoteDocument>('Note', noteSchema);
