import mongoose, { Document, ObjectId, Schema } from "mongoose";

export interface TeamSubmssion extends Document {
  teamName: string;
  teamId: ObjectId;
IdeaDescription:string; 
  createdAt?: Date,
  IdeaTitle:string,
  trackId:Number
}

const TeamSchema: Schema<TeamSubmssion> = new Schema(
  {
    teamName: {
      type: String,
      required: [true, "Team name is required"],
      unique: true,
    },
    teamId: {
        type: Schema.Types.ObjectId,
        required: [true, "TeamId is required"],
        unique: true,
    },
    trackId:{
      type:Number,
      required: [true, "track is required"],
    },
    IdeaTitle:{
      type: String,
      required: [true, "title is required"],
    },
    IdeaDescription: {
      type: String,
      required: [true, "desxcription is required"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: "Round1Submission" }
);

const TeamModel = (mongoose.models.Round1Submission as mongoose.Model<TeamSubmssion>) || (mongoose.model<TeamSubmssion>("Round1Submission", TeamSchema));

export default TeamModel;


