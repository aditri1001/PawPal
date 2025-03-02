import { Schema, model } from 'mongoose'

const userDetailSchema = new Schema(
    {
        fullName: String,
        email: {type: String, unique: true},
        password: String,
    },
    {
        collection: "userLoginDetail",
    }
)

model("userLoginDetail", userDetailSchema)