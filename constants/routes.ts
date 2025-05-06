const ROUTES = {
    HOME: "/",
    SIGN_IN: "/sign-in",
    SIGN_UP: "/sign-up",
    PROFILE: (id: string) => `/profile/${id}`,
    COMMUNITY: "/community",
    COLLECTION: "/collection",
    TAGS: (id: string) => `/tags${id}`,
    JOBS: "/find-jobs",
    ASK_QUESTION: "/ask-question",
};

export default ROUTES;
