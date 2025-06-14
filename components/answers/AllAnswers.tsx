import { EMPTY_ANSWERS } from "@/constants/states";

import AnswerCard from "../cards/AnswerCard";
import DataRenderer from "../DataRenderer";

interface Props extends ActionResponse<Answer[]> {
    totalAnswers: number;
}

const AllAnswers = ({ data, success, error, totalAnswers }: Props) => {
    return (
        <div className="mt-11">
            <div className="flex items-center justify-between">
                <h3 className="primary-text-gradient">
                    {totalAnswers} {totalAnswers === 1 ? "Answer" : "Answers"}
                </h3>
                <p>Filters</p>
            </div>

            <DataRenderer
                data={data}
                error={error}
                success={success}
                empty={EMPTY_ANSWERS}
                render={(answers) =>
                    answers
                        .map((answer, index) => {
                            return (
                                <AnswerCard
                                    key={answer._id}
                                    _id={answer._id}
                                    author={answer.author}
                                    content={answer.content}
                                    createdAt={answer.createdAt}
                                />
                            );
                        })
                        .filter(Boolean)
                }
            />
        </div>
    );
};

export default AllAnswers;
