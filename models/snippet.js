import mongoose, { Schema, model, models } from 'mongoose';

const SnippetSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title:{
        type:String,
        required : [true, 'Title is required.'],
    },
    purpose:{
        type:String,
        required : [true, 'purpose is required.'],
    },
    language:{
        type:String,
        required : [true, 'Language is required.'],
    },
    snippet:{
        type:String,
        required : [true, 'Snippet is required.'],
    },
    tag:{
        type:String,
        required: [ true, 'Tag is required']
    }
});

const Snippet = models.Snippet || model("Snippet", SnippetSchema);

export default Snippet;  