import AllAnswers from "@/components/answers/AllAnswers";
import TagCard from "@/components/cards/TagCard";
import Preview from "@/components/editor/Preview";
import AnswerForm from "@/components/forms/AnswerForm";
import Metric from "@/components/Metric";
import UserAvatar from "@/components/UserAvatar";
import ROUTES from "@/constants/routes";
import { getAnswers } from "@/lib/actions/answer.action";
import { getQuestion, incrementViews } from "@/lib/actions/question.action";
import { formatNumber } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { notFound } from "next/navigation";
import { after } from "next/server";
import React from "react";

const QuestionDetailsPage = async ({ params }: RouteParams) => {
    const { id } = await params;

    const { data: question, success } = await getQuestion({ questionId: id });

    after(async () => {
        await incrementViews({
            questionId: id,
        });
    });

    if (!success || !question) {
        return notFound();
    }

    const {
        data: answersData,
        success: answersSuccess,
        error: answersError,
    } = await getAnswers({
        questionId: id,
        page: 1,
        pageSize: 10,
        filter: "latest",
    });

    const { author, createdAt, answers, views, tags, content, title } =
        question;

    return (
        <>
            <div className="flex-start w-full flex-col">
                <div className="flex w-full flex-col-reverse justify-between">
                    <div className="flex items-center justify-start gap-1">
                        <UserAvatar
                            id={author._id}
                            name={author.name}
                            imageUrl={author.image}
                            className="size-[22px]"
                            fallbackClassName="text-[10px]"
                        />
                        <Link href={ROUTES.PROFILE(author._id)}>
                            <p className="paragraph-semibold text-dark300_light700">
                                {author.name}
                            </p>
                        </Link>
                    </div>
                    <div className="flex justify-end">
                        <p>votes</p>
                    </div>
                </div>
                <h2 className="h2-semibold text-dark200_light900 mt-3.5 w-full">
                    {title}
                </h2>
            </div>
            <div className="mb-8 mt-5 flex flex-wrap gap-4">
                <Metric
                    imgUrl={"/icons/clock.svg"}
                    alt="clock icon"
                    value={` asked ${formatDistanceToNow(new Date(createdAt), {
                        addSuffix: true,
                    })}`}
                    title=""
                    textStyles="small-regular text-dark400_light700"
                />
                <Metric
                    imgUrl={"/icons/message.svg"}
                    alt="message icon"
                    value={answers}
                    title=""
                    textStyles="small-regular text-dark400_light700"
                />
                <Metric
                    imgUrl={"/icons/eye.svg"}
                    alt="eye icon"
                    value={formatNumber(views)}
                    title=""
                    textStyles="small-regular text-dark400_light700"
                />
            </div>
            <Preview content={content} />
            <div className="mt-8 flex flex-wrap gap-2">
                {tags.map((tag: Tag) => (
                    <TagCard
                        key={tag._id}
                        _id={tag._id as string}
                        name={tag.name}
                        compact
                    />
                ))}
            </div>

            <section className="my-5">
                <AllAnswers
                    data={answersData?.answers}
                    success={answersSuccess}
                    error={answersError}
                    totalAnswers={answersData?.totalAnswers || 0}
                />
            </section>

            <section className="my-5">
                <AnswerForm questionId={question._id} />
            </section>
        </>
    );
};

export default QuestionDetailsPage;
