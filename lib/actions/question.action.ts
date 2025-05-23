"use server";

import Question from "@/database/question.model";
import action from "../handlers/action";
import handleError from "../handlers/error";
import {
    AskQuestionSchema,
    EditQuestionSchema,
    GetQuestionSchema,
} from "../validations";
import mongoose from "mongoose";
import Tag, { ITagDoc } from "@/database/tag.model";
import TagQuestion, { ITagQuestion } from "@/database/tag-question-model";
import { NotFoundError, UnauthorizedError } from "../http-errors";

export async function createQuestion(
    params: CreateQuestionParams
): Promise<ActionResponse<Question>> {
    const validationResult = await action({
        params,
        schema: AskQuestionSchema,
        authorize: true,
    });

    if (validationResult instanceof Error) {
        return handleError(validationResult) as ErrorResponse;
    }

    const { title, content, tags } = validationResult.params!;
    const userId = validationResult!.session!.user!.id;

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const [question] = await Question.create(
            [{ title, content, author: userId }],
            { session }
        );
        if (!question) {
            throw new Error("Failed to create question");
        }

        const tagIds: mongoose.Types.ObjectId[] = [];
        const tagQuestionDocuments: ITagQuestion[] = [];

        for (const tag of tags) {
            const tagEntry = await Tag.findOneAndUpdate(
                { name: { $regex: new RegExp(`^${tag}$`, "i") } },
                { $setOnInsert: { name: tag }, $inc: { questions: 1 } },
                { upsert: true, new: true, session }
            );
            tagIds.push(tagEntry._id);
            tagQuestionDocuments.push({
                tag: tagEntry._id,
                question: question._id,
            });
        }

        await TagQuestion.insertMany(tagQuestionDocuments, { session });
        await Question.findByIdAndUpdate(
            question._id,
            {
                $push: { tags: { $each: tagIds } },
            },
            { session }
        );

        await session.commitTransaction();

        return {
            success: true,
            data: JSON.parse(JSON.stringify(question)),
            status: 201,
        };
    } catch (error) {
        await session.abortTransaction();
        return handleError(error) as ErrorResponse;
    } finally {
        await session.endSession();
    }
}

export async function editQuestion(
    params: EditQuestionParams
): Promise<ActionResponse<Question>> {
    const validationResult = await action({
        params,
        schema: EditQuestionSchema,
        authorize: true,
    });

    if (validationResult instanceof Error) {
        return handleError(validationResult) as ErrorResponse;
    }

    const { title, content, tags, questionId } = validationResult.params!;
    const userId = validationResult!.session!.user!.id;

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const question = await Question.findById(questionId).populate("tags");
        if (!question) {
            throw new NotFoundError("Question");
        }

        if (question.author.toString() !== userId) {
            throw new UnauthorizedError(
                "You are not authorized to edit this question"
            );
        }

        if (question.title !== title || question.content !== content) {
            question.title = title;
            question.content = content;
            await question.save({ session });
        }

        const tagsToAdd = tags.filter(
            (tag) => !question.tags.includes(tag.toLowerCase())
        );

        const tagsToRemove = question.tags.filter(
            (tag: ITagDoc) => !tags.includes(tag.name.toLowerCase())
        );

        const newTagDocuments: ITagQuestion[] = [];

        if (tagsToAdd.length > 0) {
            for (const tag of tagsToAdd) {
                const tagEntry = await Tag.findOneAndUpdate(
                    { name: { $regex: new RegExp(`^${tag}$`, "i") } },
                    { $setOnInsert: { name: tag }, $inc: { questions: 1 } },
                    { upsert: true, new: true, session }
                );

                if (tagEntry) {
                    newTagDocuments.push({
                        tag: tagEntry._id,
                        question: question._id,
                    });
                    question.tags.push(tagEntry._id);
                }
            }
        }

        if (tagsToRemove.length > 0) {
            const tagIdsToRemove = tagsToRemove.map((tag: ITagDoc) => tag._id);
            await Tag.updateMany(
                { _id: { $in: tagIdsToRemove } },
                { $inc: { questions: -1 } },
                { session }
            );

            await TagQuestion.deleteMany(
                {
                    tag: { $in: tagIdsToRemove },
                    question: question._id,
                },
                { session }
            );

            question.tags = question.tags.filter(
                (tagId: mongoose.Types.ObjectId) =>
                    !tagsToRemove.includes(tagId)
            );
        }

        if (newTagDocuments.length > 0) {
            await TagQuestion.insertMany(newTagDocuments, { session });
        }

        await question.save({ session });

        await session.commitTransaction();

        return {
            success: true,
            data: JSON.parse(JSON.stringify(question)),
            status: 200,
        };
    } catch (error) {
        await session.abortTransaction();
        return handleError(error) as ErrorResponse;
    } finally {
        await session.endSession();
    }
}

export async function getQuestion(
    params: GetQuestionParams
): Promise<ActionResponse<Question>> {
    const validationResult = await action({
        params,
        schema: GetQuestionSchema,
        authorize: true,
    });

    if (validationResult instanceof Error) {
        return handleError(validationResult) as ErrorResponse;
    }

    const { questionId } = validationResult.params!;

    try {
        const question = await Question.findById(questionId).populate("tags");
        if (!question) {
            throw new NotFoundError("Question");
        }

        return {
            success: true,
            data: JSON.parse(JSON.stringify(question)),
            status: 200,
        };
    } catch (error) {
        return handleError(error) as ErrorResponse;
    }
}
