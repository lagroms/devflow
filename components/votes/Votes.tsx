"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { toast } from "sonner";

import { formatNumber } from "@/lib/utils";

interface VotesProps {
    upvotes: number;
    downvotes: number;
    hasupVoted: boolean;
    hasdownVoted: boolean;
}

const Votes = ({
    upvotes,
    downvotes,
    hasupVoted,
    hasdownVoted,
}: VotesProps) => {
    const session = useSession();
    const userId = session.data?.user?.id;

    const [isLoading, setIsLoading] = useState(false);

    const handleVote = async (voteType: "upvote" | "downvote") => {
        if (!userId) {
            return toast.error("Please login to vote", {
                description: "Only authenticated users can vote",
            });
        }
        setIsLoading(true);
        try {
            const successMessage =
                voteType === "upvote"
                    ? `Upvote ${!hasupVoted ? "added" : "removed"} successfully`
                    : `Downvote ${!hasdownVoted ? "added" : "removed"} successfully`;

            toast.success(successMessage, {
                description: "Your vote has been recorded",
            });
        } catch {
            toast.error("Something went wrong", {
                description: "Please try again later",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex-center gap-2.5">
            <div className="flex-center gap-1.5">
                <Image
                    src={
                        hasupVoted ? "/icons/upvoted.svg" : "/icons/upvote.svg"
                    }
                    alt="upvote"
                    width={18}
                    height={18}
                    className={`cursor-pointer ${isLoading ? "opacity-50" : ""}`}
                    aria-label="Upvote"
                    onClick={() => !isLoading && handleVote("upvote")}
                />

                <div className="flex-center background-light700_dark400 min-w-5 rounded-sm p-1">
                    <p className="subtle-medium text-dark400_light900">
                        {formatNumber(upvotes)}
                    </p>
                </div>
            </div>

            <div className="flex-center gap-1.5">
                <Image
                    src={
                        hasdownVoted
                            ? "/icons/downvoted.svg"
                            : "/icons/downvote.svg"
                    }
                    alt="downvote"
                    width={18}
                    height={18}
                    className={`cursor-pointer ${isLoading ? "opacity-50" : ""}`}
                    aria-label="Downvote"
                    onClick={() => !isLoading && handleVote("downvote")}
                />

                <div className="flex-center background-light700_dark400 min-w-5 rounded-sm p-1">
                    <p className="subtle-medium text-dark400_light900">
                        {formatNumber(downvotes)}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Votes;
