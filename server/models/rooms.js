import mongoose from "mongoose";
import User from "./user.js";
// import Message from "./message.js";

const RoomsSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,

        },
        description: {
            type: String,
            required : true,


        },
        addedUsers: {
            type: [mongoose.ObjectId],
            ref: User

        }

    },
    {
        timestamps: true,
    }
);

export default mongoose.model("rooms", RoomsSchema)