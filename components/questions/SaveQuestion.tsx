"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";
import { use, useState } from "react";
import { toast } from "sonner";

import { toggleSaveQuestion } from "@/lib/actions/collection.action";

const SaveQuestion = ({
    questionId,
    hasSavedPromise,
}: {
    questionId: string;
    hasSavedPromise: Promise<ActionResponse<{ saved: boolean }>>;
}) => {
    const session = useSession();

    const userId = session?.data?.user?.id;
    const [isLoading, setIsLoading] = useState(false);

    // const hasSaved = false;
    const { data } = use(hasSavedPromise);
    const { saved: hasSaved } = data || {};

    const handleSave = async () => {
        if (isLoading) return;
        if (!userId) {
            return toast.error("Please login to save questions");
        }
        setIsLoading(true);
        try {
            const { success, data, error } = await toggleSaveQuestion({
                questionId,
            });
            if (success) {
                toast.success(
                    data?.saved
                        ? "Question saved successfully"
                        : "Question removed from saved questions"
                );
            } else {
                toast.error(error?.message || "Failed to save question");
            }
        } catch {
            toast.error("Failed to save question");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Image
            src={hasSaved ? "/icons/star-filled.svg" : "/icons/star-red.svg"}
            alt="save"
            width={18}
            height={18}
            className={`cursor-pointer ${isLoading ? "opacity-50" : ""}`}
            aria-label="Save question"
            onClick={handleSave}
        />
    );
};

export default SaveQuestion;
