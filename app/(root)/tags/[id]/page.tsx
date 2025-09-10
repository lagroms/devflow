import QuestionCard from "@/components/cards/QuestionCard";
import DataRenderer from "@/components/DataRenderer";
import Pagination from "@/components/Pagination";
import LocalSearch from "@/components/search/LocalSearch";
import { EMPTY_QUESTION } from "@/constants/states";
import { getTagQuestions } from "@/lib/actions/tag.action";

const TagQuestions = async ({ params, searchParams }: RouteParams) => {
    const { id } = await params;
    const { page, pageSize, query } = await searchParams;

    const { success, data, error } = await getTagQuestions({
        tagId: id,
        page: Number(page) || 1,
        pageSize: Number(pageSize) || 10,
        query: query || "",
    });

    const { tag, questions, isNext } = data || {};

    if (!success) {
        return <div>{error?.message}</div>;
    }

    return (
        <>
            <section className="w-full flex flex-col-reverse sm:flex-row justify-between gap-4 sm:items-center">
                <h1 className="h1-bold text-dark100_light900">{tag?.name}</h1>
            </section>
            <section className="mt-11">
                <LocalSearch
                    // route={ROUTES.HOME}
                    imgSrc="/icons/search.svg"
                    placeholder="Search tags..."
                    otherClasses="flex-1"
                />
            </section>

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

export default TagQuestions;
