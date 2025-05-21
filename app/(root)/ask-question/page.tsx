import React from "react";

import QuestionForm from "@/components/forms/QuestionForm";
import { redirect } from "next/navigation";
import ROUTES from "@/constants/routes";
import { auth } from "@/auth";

const AskQuestion = async () => {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) redirect(ROUTES.SIGN_IN);

    return (
        <>
            <h1 className="h1-bold text-dark100_light900">Ask a Question</h1>
            <div className="mt-9">
                <QuestionForm />
            </div>
        </>
    );
};

export default AskQuestion;
