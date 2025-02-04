import mongoose, { Schema, Document, Types } from "mongoose";
import { boolean } from "zod";

export interface IUser extends Document {
  email: string;
  name: string;
  regNo: string;
  mobNo: number;
  event1TeamRole: number; // 0 for leader, 1 for member
  event1TeamId: Types.ObjectId | null;
  hasFilledDetails: boolean;
  event1Consent: boolean;
  hostel: "lh" | "mh" | "ds"; // Added "ds" for day scholar
  block?: string; // Optional for day scholars
  roomNumber?: string; // Optional for day scholars
}


const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    regNo: {
      type: String,
      required: false,
    },
    mobNo: {
      type: Number,
      required: false,
    },
    event1TeamRole: {
      type: Number, // 0 for leader, 1 for member
      required: false,
    },
    event1TeamId: {
      type: Schema.Types.ObjectId,
      ref: "TeamsEvent1",
      required: false,
    },
    hasFilledDetails: {
      type: Boolean,
      default: false,
    },
    event1Consent: {
      type: Boolean,
      default: false,
    },
    hostel: {
      type: String,
    },
    block: {
      type: String,
      required: false,
    },
    roomNumber: {
      type: String,
      required: false,
      
    },

  },
  { collection: "Users" }
);

export const Users =
  mongoose.models.Users || mongoose.model<IUser>("Users", userSchema);
