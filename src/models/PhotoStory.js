import mongoose from 'mongoose';

const PhotoStorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
  },
  description: {
    type: String,
  },
  imageUrl: {
    type: String,
    required: [true, 'Please provide an imageUrl'],
  },
});

const PhotoStory = mongoose.model('PhotoStory', PhotoStorySchema);

export default PhotoStory;
