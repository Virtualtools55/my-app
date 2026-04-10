import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  imageUrl: { type: String, required: true }, // ImageKit URL
  projectLink: { type: String, required: true },
  category: { type: String },
}, { timestamps: true });

export default mongoose.models.MyProjects || mongoose.model('MyProjects', ProjectSchema);