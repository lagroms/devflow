// import { filter } from "@mdxeditor/editor";
import Link from "next/link";

import QuestionCard from "@/components/cards/QuestionCard";
import DataRenderer from "@/components/DataRenderer";
import CommonFilter from "@/components/filters/CommonFilter";
import HomeFilter from "@/components/filters/HomeFilter";
import Pagination from "@/components/Pagination";
import LocalSearch from "@/components/search/LocalSearch";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constants/filters";
import ROUTES from "@/constants/routes";
import { EMPTY_QUESTION } from "@/constants/states";
import { getQuestions } from "@/lib/actions/question.action";

const Home = async ({ searchParams }: RouteParams) => {
    const { page, pageSize, query, filter } = await searchParams;

    const { success, data, error } = await getQuestions({
        page: Number(page) || 1,
        pageSize: Number(pageSize) || 10,
        query: query || "",
        filter: filter || "",
    });

    const { questions, isNext } = data || {};

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
            <section className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
                <LocalSearch
                    // route={ROUTES.HOME}
                    imgSrc="/icons/search.svg"
                    placeholder="Search questions..."
                    otherClasses="flex-1"
                />
                <CommonFilter
                    filters={HomePageFilters}
                    otherClasses="min-h-[56px] sm:min-w-[170px] max-sm:w-full"
                    containerClasses="hidden max-md:flex max-sm:w-full"
                />
            </section>
            <HomeFilter />
            <DataRenderer
                success={success}
                error={error}
                data={questions}
                empty={EMPTY_QUESTION}
                render={(questions) => (
                    <div className="mt-10 flex w-full flex-col gap-6">
                        {questions.map((question) => (
                            <QuestionCard
                                key={question._id}
                                question={question}
                            />
                        ))}
                    </div>
                )}
            />
            <Pagination page={page} isNext={isNext || false} />
        </>
    );
};
export default Home;
