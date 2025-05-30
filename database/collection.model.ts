import { Schema, models, model, Types, Document } from "mongoose";

export interface ICollection {
    author: Types.ObjectId;
    question: Types.ObjectId;
}

export interface ICollectionDoc extends ICollection, Document {}

const CollectionSchema = new Schema<ICollection>(
    {
        author: { type: Schema.Types.ObjectId, required: true, ref: "User" },
        question: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "Question",
        },
    },
    { timestamps: true }
);

const Collection =
    models?.Collection || model<ICollection>("Collection", CollectionSchema);

export default Collection;
