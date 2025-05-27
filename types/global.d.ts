import { NextResponse } from "next/server";

declare global {
    interface Tag {
        _id: string;
        name: string;
    }

    interface Author {
        _id: string;
        name: string;
        image: string;
    }

    interface Question {
        _id: string;
        title: string;
        content: string;
        tags: Tag[];
        author: Author;
        createdAt: Date;
        upvotes: number;
        views: number;
        answers: number;
    }

    type ActionResponse<T = null> = {
        success: boolean;
        data?: T;
        error?: {
            message: string;
            details?: Record<string, any>;
        };
        status?: number;
    };

    type SuccessResponse<T = null> = ActionResponse<T> & {
        success: true;
    };

    type ErrorResponse = ActionResponse<undefined> & {
        success: false;
    };

    type APIErrorResponse = NextResponse<ErrorResponse>;

    type APIResponse<T = null> = NextResponse<
        SuccessResponse<T> | APIErrorResponse
    >;

    interface RouteParams {
        params: Promise<Record<string, string>>;
        searchParams: Promise<Record<string, string>>;
    }

    interface PaginatedSearchParams {
        page?: number;
        pageSize?: number;
        query?: string;
        filter?: string;
        sort?: string;
    }
}
