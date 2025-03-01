import { Schema } from "mongoose";
import mongoose from "mongoose";

interface Project {
  title: string;
  date: string;
  description: string;
  slug: string;
  image: string;
  alt: string;
  order: number;
}

// mongoose schema
const projectSchema = new Schema<Project>({
  title: { type: String, required: true },
  slug: { type: String, required: true },
  date: { type: String, required: false }, //{ type: Date, required: false, default: new Date() },
  description: { type: String, required: true },
  image: { type: String, required: true },
  alt: { type: String, required: false },
  order: { type: Number, required: true },
});

// defining the collection and model
const Project =
  mongoose.models["projects"] || mongoose.model("projects", projectSchema);

export default Project;
