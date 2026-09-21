import React from "react";
import { BLOCKS, Document, MARKS } from "@contentful/rich-text-types";
import { Highlight, themes } from "prism-react-renderer";
import { documentToReactComponents, Options } from "@contentful/rich-text-react-renderer";
import RenderImage from "./renderImage";

export default function parsedContent(content: Document) {
  const Bold: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <strong className="font-semibold text-ink">{children}</strong>
  );

  const options = {
    renderMark: {
      [MARKS.BOLD]: (text: string) => <Bold>{text}</Bold>,
      [MARKS.ITALIC]: (text: string) => <em className="italic">{text}</em>,
      [MARKS.UNDERLINE]: (text: string) => <u className="underline">{text}</u>,
      [MARKS.CODE]: (text: string) => {
        let code = text;
        const regex = /^lang:(\w+)/;
        let language = "javascript";
        if (regex.test(text)) {
          language = regex.exec(text)![1];
          code = code.split("\n").slice(1).join("\n");
        }

        return (
          <Highlight
            theme={themes.gruvboxMaterialDark}
            code={code}
            language={language}
          >
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
              <pre
                suppressHydrationWarning
                className={`${className} p-4 rounded-lg overflow-x-auto text-sm md:text-base`}
                style={style}
              >
                {tokens.map((line, i) => (
                  <div key={i} {...getLineProps({ line, key: i })}>
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token, key })} />
                    ))}
                  </div>
                ))}
              </pre>
            )}
          </Highlight>
        );
      },
    },
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node: any, children: any) => (
        <p className="my-4 text-base leading-relaxed text-ink-soft">{children}</p>
      ),
      [BLOCKS.HEADING_1]: (node: any, children: any) => (
        <h1 className="font-display text-3xl font-semibold text-ink mt-10 mb-4">{children}</h1>
      ),
      [BLOCKS.HEADING_2]: (node: any, children: any) => (
        <h2 className="font-display text-2xl font-semibold text-ink mt-10 mb-3">{children}</h2>
      ),
      [BLOCKS.HEADING_3]: (node: any, children: any) => (
        <h3 className="font-display text-xl font-semibold text-ink mt-10 mb-2">{children}</h3>
      ),
      [BLOCKS.EMBEDDED_ASSET]: (node: any) => <RenderImage node={node} />,
    },
    renderText: (text: string) => text.replace("!", "?"),
  } as Options;

  return documentToReactComponents(content, options) || null;
}
