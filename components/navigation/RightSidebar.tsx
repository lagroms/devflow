import Image from "next/image";
import Link from "next/link";
import React from "react";

import ROUTES from "@/constants/routes";

import TagCard from "../cards/TagCard";

const hotQuestions = [
    {
        _id: "1",
        title: "How to create a custom hook?",
    },
    {
        _id: "2",
        title: "What is the best way to learn React?",
    },
    {
        _id: "3",
        title: "How to use useEffect?",
    },
    {
        _id: "4",
        title: "How to use useContext?",
    },
    {
        _id: "5",
        title: "How to use useReducer?",
    },
];

const popularTags = [
    {
        _id: "1",
        name: "React",
        questions: 144,
    },
    {
        _id: "2",
        name: "JavaScript",
        questions: 7856,
    },
    {
        _id: "3",
        name: "Next.js",
        questions: 2523,
    },
    {
        _id: "4",
        name: "CSS",
        questions: 3242,
    },
    {
        _id: "5",
        name: "HTML",
        questions: 34,
    },
];

const RightSidebar = () => {
    return (
        <section className="pt-36 custom-scrollbar background-light900_dark200 light-border sticky right-0 top-0 h-screen flex flex-col w-[350px] gap-6 overflow-y-auto border-l p-6 shadow-light-300 dark:shadow-none max-xl:hidden">
            <div>
                <h3 className="h3-bold text-dark200_light900">Top Questions</h3>

                <div className="mt-7 flex w-full flex-col gap-[30px]">
                    {hotQuestions.map(({ _id, title }) => (
                        <Link
                            href={ROUTES.PROFILE(_id)}
                            key={_id}
                            className="flex-between cursor-pointer gap-7"
                        >
                            <p className="body-medium text-dark500_light700">
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
            </div>

            <div className="mt-16">
                <h3 className="h3-bold text-dark200_light900">Popular Tags</h3>

                <div className="mt-7 flex flex-col gap-4">
                    {popularTags.map(({ _id, name, questions }) => (
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
            </div>
        </section>
    );
};

export default RightSidebar;
