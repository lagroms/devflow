import Image from "next/image";
import Link from "next/link";
import React from "react";

import ROUTES from "@/constants/routes";
import { getHotQuestions } from "@/lib/actions/question.action";
import { getTopTags } from "@/lib/actions/tag.action";

import TagCard from "../cards/TagCard";
import DataRenderer from "../DataRenderer";

const RightSidebar = async () => {
    const [
        { success, data: hotQuestions, error },
        { success: tagSuccess, data: tags, error: tagError },
    ] = await Promise.all([getHotQuestions(), getTopTags()]);

    return (
        <section className="pt-36 custom-scrollbar background-light900_dark200 light-border sticky right-0 top-0 h-screen flex flex-col w-[350px] gap-6 overflow-y-auto border-l p-6 shadow-light-300 dark:shadow-none max-xl:hidden">
            <div>
                <h3 className="h3-bold text-dark200_light900">Top Questions</h3>

                <div className="mt-7 flex w-full flex-col gap-[30px]">
                    <DataRenderer
                        data={hotQuestions}
                        empty={{
                            title: "No questions found",
                            message: "No questions have been asked yet",
                        }}
                        success={success}
                        error={error}
                        render={(hotQuestions) => (
                            <div className="flex w-full flex-col gap-[30px]">
                                {hotQuestions.map(({ _id, title }) => (
                                    <Link
                                        href={ROUTES.QUESTION(_id)}
                                        key={_id}
                                        className="flex-between cursor-pointer gap-7"
                                    >
                                        <p className="body-medium text-dark500_light700 line-clamp-2">
                                            {title}
                                        </p>
                                        <Image
                                            src="/icons/chevron-right.svg"
                                            alt="chevron-right"
                                            width={20}
                                            height={20}
                                        />
                                    </Link>
                                ))}
                            </div>
                        )}
                    />
                </div>
            </div>

            <div className="mt-6">
                <h3 className="h3-bold text-dark200_light900">Popular Tags</h3>

                <div className="mt-7 flex w-full flex-col gap-[30px]">
                    <DataRenderer
                        data={tags}
                        empty={{
                            title: "No tags found",
                            message: "No tags have been created yet",
                        }}
                        success={tagSuccess}
                        error={tagError}
                        render={(tags) => (
                            <div className="flex flex-col gap-4">
                                {tags.map(({ _id, name, questions }) => (
                                    <TagCard
                                        key={_id}
                                        _id={_id}
                                        name={name}
                                        questions={questions}
                                        showCount
                                        compact
                                    />
                                ))}
                            </div>
                        )}
                    />
                </div>
            </div>
        </section>
    );
};

export default RightSidebar;
