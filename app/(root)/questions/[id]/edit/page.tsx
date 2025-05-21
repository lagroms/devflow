import React from "react";

import QuestionForm from "@/components/forms/QuestionForm";
import { notFound, redirect } from "next/navigation";
import ROUTES from "@/constants/routes";
import { auth } from "@/auth";
import { getQuestion } from "@/lib/actions/question.action";

const EditQuestion = async ({ params }: RouteParams) => {
    const { id } = await params;

    if (!id) return notFound();

    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) redirect(ROUTES.SIGN_IN);

    const { data: question, success } = await getQuestion({
        questionId: id,
    });

    if (!success) return notFound();

    if (question!.author.toString() !== userId)
        return redirect(ROUTES.QUESTION(id));

    return (
        <main>
            <QuestionForm question={question} isEdit />
        </main>
    );
};

export default EditQuestion;
