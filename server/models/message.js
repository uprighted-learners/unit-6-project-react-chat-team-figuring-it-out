import mongoose from "mongoose";
import User from "./user.js";
import rooms from "./rooms.js"


const MessageSchema = new mongoose.Schema(
    {
        when: {
            type : Date, 
            default : Date.now,
            required: true,
        },
        user: {
            type: mongoose.ObjectId,
            required : true,
        },
        room: {
            type : mongoose.ObjectId,
            required: true,
            ref: "Room"
        },
        body: {
            type : String,
            required: true
        }
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("message", MessageSchema)