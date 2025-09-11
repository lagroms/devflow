const ROUTES = {
    HOME: "/",
    SIGN_IN: "/sign-in",
    SIGN_UP: "/sign-up",
    PROFILE: (id: string) => `/profile/${id}`,
    COMMUNITY: "/community",
    COLLECTION: "/collection",
    TAGS: "/tags",
    TAG: (id: string) => `/tags/${id}`,
    JOBS: "/find-jobs",
    ASK_QUESTION: "/ask-question",
    QUESTION: (id: string) => `/questions/${id}`,
    SIGN_IN_WITH_OAUTH: "signin-with-oauth",
    EDIT_PROFILE: "/profile/edit",
};

export default ROUTES;
