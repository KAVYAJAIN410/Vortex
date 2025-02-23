import mongoose, { Document, ObjectId, Schema } from "mongoose";

export interface TeamSubmssion extends Document {
  teamName: string;
  teamId: ObjectId;
submission:string; 
  createdAt?: Date,

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
        required: [true, "Team Id is required"],
        unique: true,
    },
    submission: {
      type: String,
      required: [true, "Submission is required"],
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


