import { z } from "zod";
import {
  Selection,
  Selectable,
  SelectionProvider,
} from "codehike/utils/selection";
import { Block, CodeBlock, parseProps, ImageBlock } from "codehike/blocks";
import { Pre, RawCode, highlight } from "codehike/code";

import { tokenTransitions } from "@/components/annotations/token-transitions";
import { wordWrap } from "./annotations/word-wrap";
import { ImageZoom } from "fumadocs-ui/components/image-zoom";

const Schema = Block.extend({
  // preview: ImageBlock.optional(),
  steps: z.array(
    Block.extend({
      code: CodeBlock.optional(),
      preview: ImageBlock.optional(),
    }),
  ),
});

export function Scrollycoding(props: unknown) {
  const { steps } = parseProps(props, Schema);
  return (
    <SelectionProvider className="flex gap-4">
      <div className="flex-1 mt-32 mb-[9vh] ml-2 prose min-w-60">
        {steps.map((step, i) => (
          <Selectable
            key={i}
            index={i}
            selectOn={["click", "scroll"]}
            className="border-l-4 data-[selected=true]:border-blue-400 px-5 py-2 mb-24 rounded bg-card"
          >
            <h2 className="mt-4 text-xl">{step.title}</h2>
            <div>{step.children}</div>
          </Selectable>
        ))}
      </div>
      <div className="w-1/2 bg-card">
        <div className="top-16 sticky overflow-auto max-h-[calc(100vh-16rem)]">
          <Selection
            from={steps.map((step) => (
              <>
                {step.code ? (
                  <Code codeblock={step.code} />
                ) : (
                  <div className="w-full flex items-center justify-center min-h-[20rem] rounded-lg">
                    {step.preview ? (
                      <Image src={step.preview.url} alt={step.preview.alt} />
                    ) : (
                      <div className="h-16">No Preview Available</div>
                    )}
                  </div>
                )}
              </>
            ))}
          />
        </div>
      </div>
    </SelectionProvider>
  );
}

async function Code({ codeblock }: { codeblock: RawCode }) {
  const highlighted = await highlight(codeblock, "github-from-css");
  return (
    <Pre
      code={highlighted}
      handlers={[tokenTransitions, wordWrap]}
      className="min-h-[40rem]"
    />
  );
}

async function Image({ src, alt }: { src: string; alt: string }) {
  const isGithubActions = process.env.NEXT_PUBLIC_GITHUB_ACTIONS === "true";
  const basePath = isGithubActions ? "/Next-Docs" : "";
  const fullSrc = src.startsWith("/") ? `${basePath}${src}` : src;
  return (
    <ImageZoom
      width="500"
      height="300"
      className="w-full"
      src={fullSrc}
      alt={alt}
    />
  );
}
