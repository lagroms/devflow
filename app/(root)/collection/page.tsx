import QuestionCard from "@/components/cards/QuestionCard";
import DataRenderer from "@/components/DataRenderer";
import CommonFilter from "@/components/filters/CommonFilter";
import Pagination from "@/components/Pagination";
import LocalSearch from "@/components/search/LocalSearch";
import { CollectionFilters } from "@/constants/filters";
import { EMPTY_QUESTION } from "@/constants/states";
import { getSavedQuestions } from "@/lib/actions/collection.action";

const Collections = async ({ searchParams }: RouteParams) => {
    const { page, pageSize, query, filter } = await searchParams;

    const { success, data, error } = await getSavedQuestions({
        page: Number(page) || 1,
        pageSize: Number(pageSize) || 10,
        query: query || "",
        filter: filter || "",
    });

    const { collections, isNext } = data || {};

    return (
        <>
            <h1 className="h1-bold text-dark100_light900">Saved Questions</h1>

            <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
                <LocalSearch
                    // route={ROUTES.HOME}
                    imgSrc="/icons/search.svg"
                    placeholder="Search questions..."
                    otherClasses="flex-1"
                />
                <CommonFilter
                    filters={CollectionFilters}
                    otherClasses="min-h-[56px] sm:min-w-[170px] max-sm:w-full"
                />
            </div>

            <DataRenderer
                success={success}
                error={error}
                data={collections}
                empty={EMPTY_QUESTION}
                render={(collections) => (
                    <div className="mt-10 flex w-full flex-col gap-6">
                        {collections.map((item) => (
                            <QuestionCard
                                key={item._id}
                                question={item.question}
                            />
                        ))}
                    </div>
                )}
            />

            <Pagination page={page} isNext={isNext || false} />
        </>
    );
};
export default Collections;
