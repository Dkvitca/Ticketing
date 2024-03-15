import mongoose from "mongoose";
import { Password } from "../utils/password";

// describe properties required to create new User
interface UserAttrs {
    email: string;
    password: string;
}

// describes the properties a User model has
interface UserModel extends mongoose.Model<UserDoc> {
    build(attrs: UserAttrs): UserDoc;
}

// describes the properties a User Document has
interface UserDoc extends mongoose.Document {
    email: string;
    password: string;
}

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

userSchema.pre('save', async function(done) {
    if (this.isModified('password')) {
        const hashed = await Password.toHash(this.get('password'))
        this.set('password', hashed);
    }
    done();
});

userSchema.statics.build = (attrs: UserAttrs) => {
    return new User(attrs);
};

//delete unnecessary data
userSchema.methods.toJSON = function () {
    const { __v, password, _id, ...user } = this.toObject();
    user.id = _id;
    return user;
  };

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User }