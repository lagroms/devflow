"use client";

import {
    MDXEditor,
    UndoRedo,
    BoldItalicUnderlineToggles,
    toolbarPlugin,
    CodeToggle,
    InsertCodeBlock,
    codeBlockPlugin,
    headingsPlugin,
    listsPlugin,
    linkPlugin,
    quotePlugin,
    thematicBreakPlugin,
    markdownShortcutPlugin,
    ListsToggle,
    linkDialogPlugin,
    CreateLink,
    InsertImage,
    InsertTable,
    tablePlugin,
    imagePlugin,
    codeMirrorPlugin,
    ConditionalContents,
    ChangeCodeMirrorLanguage,
    Separator,
    InsertThematicBreak,
    diffSourcePlugin,
    MDXEditorMethods,
} from "@mdxeditor/editor";
import { basicDark } from "cm6-theme-basic-dark";
import { useTheme } from "next-themes";
import { Ref } from "react";

import "@mdxeditor/editor/style.css";
import "./dark-editor.css";

interface Props {
    value: string;
    editorRef: Ref<MDXEditorMethods> | null;
    fieldChange: (value: string) => void;
}

const Editor = ({ value, editorRef, fieldChange }: Props) => {
    const { resolvedTheme } = useTheme();

    const themeExtension = resolvedTheme === "dark" ? [basicDark] : [];

    return (
        <MDXEditor
            key={resolvedTheme}
            markdown={value}
            ref={editorRef}
            onChange={fieldChange}
            className="background-light800_dark200 light-border-2 markdown-editor dark-editor grid w-full border"
            plugins={[
                headingsPlugin(),
                listsPlugin(),
                linkPlugin(),
                linkDialogPlugin(),
                quotePlugin(),
                thematicBreakPlugin(),
                tablePlugin(),
                imagePlugin(),
                codeBlockPlugin({ defaultCodeBlockLanguage: "" }),
                codeMirrorPlugin({
                    codeBlockLanguages: {
                        css: "css",
                        txt: "txt",
                        sql: "sql",
                        html: "html",
                        sass: "sass",
                        scss: "scss",
                        bash: "bash",
                        json: "json",
                        js: "javascript",
                        ts: "typescript",
                        r: "r",
                        R: "r",
                        RR: "r",
                        python: "python",
                        py: "python",
                        shell: "shell",
                        sh: "shell",
                        "": "unspecified",
                        tsx: "TypeScript (React)",
                        jsx: "JavaScript (React)",
                    },
                    autoLoadLanguageSupport: true,
                    codeMirrorExtensions: themeExtension,
                }),
                diffSourcePlugin({ viewMode: "rich-text", diffMarkdown: "" }),
                toolbarPlugin({
                    toolbarContents: () => (
                        <ConditionalContents
                            options={[
                                {
                                    when: (editor) =>
                                        editor?.editorType === "codeblock",
                                    contents: () => (
                                        <ChangeCodeMirrorLanguage />
                                    ),
                                },
                                {
                                    fallback: () => (
                                        <>
                                            <UndoRedo />
                                            <Separator />

                                            <BoldItalicUnderlineToggles />
                                            <CodeToggle />
                                            <Separator />

                                            <ListsToggle />
                                            <Separator />

                                            <CreateLink />
                                            <InsertImage />
                                            <Separator />

                                            <InsertTable />
                                            <InsertThematicBreak />
                                            <Separator />

                                            <InsertCodeBlock />
                                        </>
                                    ),
                                },
                            ]}
                        />
                    ),
                }),
                markdownShortcutPlugin(),
            ]}
        />
    );
};

export default Editor;

// "use client";
// // InitializedMDXEditor.tsx
// import { forwardRef } from "react";
// import {
//     headingsPlugin,
//     listsPlugin,
//     quotePlugin,
//     thematicBreakPlugin,
//     markdownShortcutPlugin,
//     MDXEditor,
//     type MDXEditorMethods,
//     toolbarPlugin,
//     ConditionalContents,
//     ChangeCodeMirrorLanguage,
//     UndoRedo,
//     Separator,
//     BoldItalicUnderlineToggles,
//     ListsToggle,
//     CreateLink,
//     InsertImage,
//     InsertTable,
//     InsertThematicBreak,
//     InsertCodeBlock,
//     linkPlugin,
//     linkDialogPlugin,
//     tablePlugin,
//     imagePlugin,
//     codeBlockPlugin,
//     codeMirrorPlugin,
//     diffSourcePlugin,
// } from "@mdxeditor/editor";

// import "@mdxeditor/editor/style.css";
// import "./dark-editor.css";
// import { basicDark } from "cm6-theme-basic-dark";
// import { useTheme } from "next-themes";

// interface EditorProps {
//     value: string;
//     fieldChange: (value: string) => void;
// }

// const codeBlockLanguages = [
//     "",
//     "javascript",
//     "typescript",
//     "css",
//     "xml",
//     "json",
//     "markdown",
//     "sql",
//     "java",
//     "python",
//     "php",
//     "ruby",
//     "swift",
//     "kotlin",
//     "go",
//     "rust",
//     "elixir",
//     "erlang",
//     "haskell",
//     "scala",
//     "clojure",
//     "groovy",
//     "perl",
//     "html",
//     "sql",
//     "bash",
//     "json",
//     "js",
//     "ts",
//     "jsx",
//     "tsx",
// ];

// // Only import this to the next file
// const Editor = forwardRef<MDXEditorMethods, EditorProps>(
//     ({ value, fieldChange, ...props }, ref) => {
//         const { resolvedTheme } = useTheme();
//         const theme = resolvedTheme === "dark" ? [basicDark] : [];

//         return (
//             <MDXEditor
//                 ref={ref}
//                 key={resolvedTheme}
//                 plugins={[
//                     // Example Plugin Usage
//                     headingsPlugin(),
//                     listsPlugin(),
//                     linkPlugin(),
//                     linkDialogPlugin(),
//                     quotePlugin(),
//                     thematicBreakPlugin(),
//                     tablePlugin(),
//                     imagePlugin(),
//                     codeBlockPlugin({ defaultCodeBlockLanguage: "txt" }),
//                     codeMirrorPlugin({
//                         codeBlockLanguages: codeBlockLanguages.reduce(
//                             (acc: Record<string, string>, language: string) => {
//                                 acc[language] = language;
//                                 return acc;
//                             },
//                             {}
//                         ),
//                         // codeBlockLanguages: {
//                         //     css: "css",
//                         //     txt: "txt",
//                         //     sql: "sql",
//                         //     html: "html",
//                         //     saas: "saas",
//                         //     scss: "scss",
//                         //     bash: "bash",
//                         //     json: "json",
//                         //     js: "javascript",
//                         //     ts: "typescript",
//                         //     "": "Text",
//                         //     tsx: "TypeScript (React)",
//                         //     jsx: "JavaScript (React)",
//                         // },
//                         autoLoadLanguageSupport: true,
//                         codeMirrorExtensions: theme,
//                     }),
//                     diffSourcePlugin({
//                         viewMode: "rich-text",
//                         diffMarkdown: "",
//                     }),
//                     toolbarPlugin({
//                         toolbarContents: () => (
//                             <ConditionalContents
//                                 options={[
//                                     {
//                                         when: (editor) =>
//                                             editor?.editorType === "codeblock",
//                                         contents: () => (
//                                             <ChangeCodeMirrorLanguage />
//                                         ),
//                                     },
//                                     {
//                                         fallback: () => (
//                                             <>
//                                                 <UndoRedo />
//                                                 <Separator />

//                                                 <BoldItalicUnderlineToggles />
//                                                 <Separator />

//                                                 <ListsToggle />
//                                                 <Separator />

//                                                 <CreateLink />
//                                                 <InsertImage />
//                                                 <Separator />

//                                                 <InsertTable />
//                                                 <InsertThematicBreak />

//                                                 <InsertCodeBlock />
//                                             </>
//                                         ),
//                                     },
//                                 ]}
//                             />
//                         ),
//                     }),
//                     markdownShortcutPlugin(),
//                 ]}
//                 {...props}
//                 className="background-light800_dark200 light-border-2 markdown-editor dark-editor w-full border grid"
//                 markdown={value}
//                 onChange={fieldChange}
//                 // contentEditableClassName="prose"
//             />
//         );
//     }
// );
// Editor.displayName = "Editor";
// export default Editor;
