import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import React from "react";

import ROUTES from "@/constants/routes";


import Preview from "../editor/Preview";
import UserAvatar from "../UserAvatar";

const AnswerCard = ({ _id, content, createdAt, author }: Answer) => {
    return (
        <article className="light-border border-b py-10">
            <span className="hash-span" id={JSON.stringify(_id)} />
            <div className="mb-5 flex flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
                <div className="flex flex-1 items-start gap-1 sm:items-center">
                    <UserAvatar
                        id={author._id}
                        name={author.name}
                        imageUrl={author.image}
                        className="size-5 rounded-full object-cover max-sm:mt-2"
                    />
                    <Link
                        href={ROUTES.PROFILE(author._id)}
                        className="flex flex-col sm:flex-row sm:items-center max-sm:ml-1"
                    >
                        <p className="body-semibold text-dark300_light700">
                            {author.name}
                        </p>
                        <p className="small-regular text-dark400_light500 ml-0.5 mt-0.5 line-clamp-1">
                            <span className="max-sm:hidden"> • </span> answered{" "}
                            {formatDistanceToNow(new Date(createdAt), {
                                addSuffix: true,
                            })}
                        </p>
                    </Link>
                </div>

                <div className="flex justify-end">Votes</div>
            </div>

            <Preview content={content} />
        </article>
    );
};

export default AnswerCard;
