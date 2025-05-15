import Link from "next/link";
import { type SearchParams } from "nuqs/server";

import QuestionCard from "@/components/cards/QuestionCard";
import HomeFilter from "@/components/filters/HomeFilter";
import LocalSearch from "@/components/search/LocalSearch";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";

type PageProps = {
    searchParams: Promise<SearchParams>;
};

const questions = [
    {
        _id: "1",
        title: "Who created Next.js?",
        description:
            "Next.js is a React framework for building server-side rendered (SSR), static, and hybrid web applications using React. It is a popular choice for building scalable and performant web applications.",
        tags: [
            { _id: "1", name: "Next.js" },
            { _id: "2", name: "React" },
            { _id: "3", name: "Web Development" },
        ],
        author: {
            _id: "1",
            name: "John Doe",
            image: "https://avatar.iran.liara.run/public",
        },
        createdAt: new Date(),
        upvotes: 10,
        views: 100,
        answers: 5,
    },
    {
        _id: "2",
        title: "How to learn JavaScript",
        description:
            "Next.js is a React framework for building server-side rendered (SSR), static, and hybrid web applications using React. It is a popular choice for building scalable and performant web applications.",
        tags: [{ _id: "4", name: "JavaScript" }],
        author: {
            _id: "1",
            name: "John Doe",
            image: "https://avatar.iran.liara.run/public",
        },
        createdAt: new Date(),
        upvotes: 10,
        views: 100,
        answers: 5,
    },
    {
        _id: "3",
        title: "Who created Ruby on Rails?",
        description:
            "Next.js is a React framework for building server-side rendered (SSR), static, and hybrid web applications using React. It is a popular choice for building scalable and performant web applications.",
        tags: [{ _id: "5", name: "Ruby on Rails" }],
        author: {
            _id: "1",
            name: "John Doe",
            image: "https://avatar.iran.liara.run/public",
        },
        createdAt: new Date(),
        upvotes: 10,
        views: 100,
        answers: 5,
    },
];

const Home = async ({ searchParams }: PageProps) => {
    const { query = "", filter = "" } = await searchParams;

    const filteredQuestions = questions.filter((question) => {
        const searchQuery = Array.isArray(query) ? query[0] : query;
        const filterValue = Array.isArray(filter) ? filter[0] : filter;

        const matchesSearch = question.title
            .toLowerCase()
            .includes(searchQuery.toLowerCase());

        // If no filter is selected, only filter by search
        if (!filterValue) return matchesSearch;

        // Check if any of the question's tags match the filter
        const matchesFilter = question.tags.some(
            (tag: Tag) => tag.name.toLowerCase() === filterValue.toLowerCase()
        );

        return matchesSearch && matchesFilter;
    });

    return (
        <>
            <section className="w-full flex flex-col-reverse sm:flex-row justify-between gap-4 sm:items-center">
                <h1 className="h1-bold text-dark100_light900">All Questions</h1>
                <Button
                    className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900"
                    asChild
                >
                    <Link href={ROUTES.ASK_QUESTION}>Ask a Question</Link>
                </Button>
            </section>
            <section className="mt-11">
                <LocalSearch
                    // route="/"
                    imgSrc="/icons/search.svg"
                    placeholder="Search questions..."
                    otherClasses="flex-1"
                />
            </section>
            <HomeFilter />
            <div className="mt-10 flex w-full flex-col gap-6">
                {filteredQuestions.map((question) => (
                    <QuestionCard key={question._id} question={question} />
                ))}
            </div>
        </>
    );
};
export default Home;
