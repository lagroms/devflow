"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useRef, useTransition } from "react";
import { Path, useForm } from "react-hook-form";
import { z } from "zod";

import { AskQuestionSchema } from "@/lib/validations";

import { Button } from "../ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

import { MDXEditorMethods } from "@mdxeditor/editor";
import dynamic from "next/dynamic";
import TagCard from "../cards/TagCard";
import { createQuestion, editQuestion } from "@/lib/actions/question.action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import ROUTES from "@/constants/routes";
import { Loader } from "lucide-react";

const Editor = dynamic(() => import("../editor"), {
    ssr: false,
});

interface QuestionFormProps {
    isEdit?: boolean;
    question?: Question;
}

const QuestionForm = ({ isEdit = false, question }: QuestionFormProps) => {
    const router = useRouter();
    const editorRef = useRef<MDXEditorMethods>(null);
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof AskQuestionSchema>>({
        resolver: zodResolver(AskQuestionSchema),
        defaultValues: {
            title: question?.title || "",
            content: question?.content || "",
            tags: question?.tags.map((tag) => tag.name) || [],
        },
    });

    const handleInputKeyDown = (
        e: React.KeyboardEvent<HTMLInputElement>,
        field: { value: string[] }
    ) => {
        if (e.key === "Enter") {
            e.preventDefault();
            const tagInput = e.currentTarget.value.trim();

            if (
                tagInput &&
                tagInput.length < 15 &&
                !field.value.includes(tagInput)
            ) {
                form.setValue("tags", [...field.value, tagInput]);
                e.currentTarget.value = "";
                form.clearErrors("tags");
            } else if (tagInput.length > 30) {
                form.setError("tags", {
                    type: "manual",
                    message: "Tag cannot exceed 30 characters.",
                });
            } else if (field.value.includes(tagInput)) {
                form.setError("tags", {
                    type: "manual",
                    message: "Tag already exists.",
                });
            }
        }
    };

    const handleTagRemove = (tag: string, field: { value: string[] }) => {
        const newTags = field.value.filter((t) => t !== tag);
        form.setValue("tags", newTags);

        if (newTags.length === 0) {
            form.setError("tags", {
                type: "manual",
                message: "At least one tag is required.",
            });
        }
    };

    const handleCreateQuestion = async (
        data: z.infer<typeof AskQuestionSchema>
    ) => {
        startTransition(async () => {
            if (isEdit && question) {
                const result = await editQuestion({
                    ...data,
                    questionId: question._id,
                });

                if (result.success) {
                    toast.success("Question updated successfully");
                    if (result.data)
                        router.push(ROUTES.QUESTION(result.data._id));
                } else {
                    toast.error(
                        result.error?.message || "Failed to updated question"
                    );
                }

                return;
            }

            const result = await createQuestion(data);

            if (result.success) {
                toast.success("Question created successfully");
                if (result.data) router.push(ROUTES.QUESTION(result.data._id));
            } else {
                toast.error(
                    result.error?.message || "Failed to create question"
                );
            }
        });
    };

    return (
        <Form {...form}>
            <form
                className="flex w-full flex-col gap-10"
                onSubmit={form.handleSubmit(handleCreateQuestion)}
            >
                <FormField
                    control={form.control}
                    name={"title"}
                    render={({ field }) => (
                        <FormItem className="flex w-full flex-col">
                            <FormLabel className="paragraph-semibold text-dark400_light700">
                                Question Title{" "}
                                <span className="text-primary-500">*</span>
                            </FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    className="paragraph-regular no-focus background-light700_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                                />
                            </FormControl>
                            <FormDescription className="body-regular text-light-500 mt-2.5">
                                Be specific and imagine you&apos;re asking a
                                question to another person.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name={"content"}
                    render={({ field }) => (
                        <FormItem className="flex w-full flex-col">
                            <FormLabel className="paragraph-semibold text-dark400_light700">
                                Detailed explanation of your problem{" "}
                                <span className="text-primary-500">*</span>
                            </FormLabel>
                            <FormControl>
                                <Editor
                                    value={field.value}
                                    fieldChange={field.onChange}
                                    editorRef={editorRef}
                                />
                            </FormControl>
                            <FormDescription className="body-regular text-light-500 mt-2.5">
                                Introduce the problem and expand on what
                                you&apos;ve put in the title.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name={"tags"}
                    render={({ field }) => (
                        <FormItem className="flex w-full flex-col gap-3">
                            <FormLabel className="paragraph-semibold text-dark400_light700">
                                Tags <span className="text-primary-500">*</span>
                            </FormLabel>
                            <FormControl>
                                <div>
                                    <Input
                                        placeholder="Add tags..."
                                        className="paragraph-regular no-focus background-light700_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                                        onKeyDown={(e) =>
                                            handleInputKeyDown(e, field)
                                        }
                                    />
                                    {field.value.length > 0 && (
                                        <div className="flex-start mt-2.5 flex-wrap gap-2">
                                            {field.value.map((tag) => (
                                                <TagCard
                                                    key={tag}
                                                    name={tag}
                                                    _id={tag}
                                                    compact
                                                    remove
                                                    isButton
                                                    onRemove={() =>
                                                        handleTagRemove(
                                                            tag,
                                                            field
                                                        )
                                                    }
                                                />
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </FormControl>
                            <FormDescription className="body-regular text-light-500 mt-2.5">
                                Add up to 3 tags to describe what your question
                                is about. You need to press enter to add a tag.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex justify-end mt-16">
                    <Button
                        type="submit"
                        className="primary-gradient !text-light-900 w-fit"
                        disabled={isPending}
                    >
                        {isPending ? (
                            <>
                                <Loader className="size-4 mr-2 animate-spin" />
                                <span>Submitting...</span>
                            </>
                        ) : (
                            <>{isEdit ? "Edit" : "Ask A Question"}</>
                        )}
                    </Button>
                </div>
            </form>
        </Form>
    );
};

export default QuestionForm;
