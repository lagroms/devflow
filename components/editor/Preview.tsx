import { Code } from "bright";
import { MDXRemote } from "next-mdx-remote/rsc";
import React from "react";

Code.theme = {
    dark: "github-dark",
    light: "github-light",
    lightSelector: "html.light",
};

const Preview = ({ content }: { content: string }) => {
    const formattedContent = content.replace(/\\/g, "").replace(/&#20;/g, "");
    return (
        <section className="markdown prose grid break-words">
            <MDXRemote
                source={formattedContent}
                components={{
                    pre: (props) => (
                        <Code
                            {...props}
                            lineNumbers
                            className="shadow-light-200 dark:shadow-dark-200"
                        />
                    ),
                }}
            />
        </section>
    );
};

export default Preview;
