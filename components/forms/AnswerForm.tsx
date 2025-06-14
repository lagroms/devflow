"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { AnswerSchema } from "@/lib/validations";
import { useRef, useState, useTransition } from "react";
import dynamic from "next/dynamic";
import { MDXEditorMethods } from "@mdxeditor/editor";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { createAnswer } from "@/lib/actions/answer.action";
import { toast } from "sonner";

const Editor = dynamic(() => import("../editor"), {
    ssr: false,
});

const AnswerForm = ({ questionId }: { questionId: string }) => {
    const [isAnswering, startAnswerTransition] = useTransition();
    const [isAISubmitting, setIsAISubmitting] = useState(false);
    const editorRef = useRef<MDXEditorMethods>(null);
    const form = useForm<z.infer<typeof AnswerSchema>>({
        resolver: zodResolver(AnswerSchema),
        defaultValues: {
            content: "",
        },
    });

    const handleSubmit = async (values: z.infer<typeof AnswerSchema>) => {
        console.log("🚀 ~ values >>", values);
        startAnswerTransition(async () => {
            const result = await createAnswer({
                questionId,
                content: values.content,
            });

            if (result.success) {
                form.reset();
                toast.success("Answer posted successfully");
            } else {
                toast.error(result.error?.message);
            }
        });
    };

    return (
        <div>
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
                <h4 className="paragraph-semibold text-dark400_light800">
                    Write your answer here
                </h4>
                <Button
                    type="button"
                    className="btn light-border-2 gap-1.5 rounded-md border px-4 py-2.5 text-primary-500 shadow-none dark:bg-primary-500"
                    disabled={isAISubmitting}
                >
                    {isAISubmitting ? (
                        <>
                            <Loader2 className="mr-2 size-4 animate-spin" />{" "}
                            Generating...
                        </>
                    ) : (
                        <>
                            <Image
                                src="/icons/stars.svg"
                                alt="Generate AI answer"
                                width="12"
                                height="12"
                                className="object-contain"
                            />
                            Generate AI Answer
                        </>
                    )}
                </Button>
            </div>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(handleSubmit)}
                    className="mt-6 flex w-full flex-col gap-10"
                >
                    <FormField
                        control={form.control}
                        name="content"
                        render={({ field }) => (
                            <FormItem className="flex w-full flex-col gap-3">
                                <FormControl className="mt-3.5">
                                    <Editor
                                        value={field.value}
                                        fieldChange={field.onChange}
                                        editorRef={editorRef}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex justify-end">
                        <Button
                            type="submit"
                            className="primary-gradient w-fit"
                            disabled={isAnswering}
                        >
                            {isAnswering ? (
                                <>
                                    <Loader2 className="mr-2 size-4 animate-spin" />{" "}
                                    Posting...
                                </>
                            ) : (
                                "Post Answer"
                            )}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default AnswerForm;
