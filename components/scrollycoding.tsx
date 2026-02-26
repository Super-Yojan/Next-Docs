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
    <SelectionProvider className="flex gap-6">
      {/* Steps on the left */}
      <div className="w-[380px] shrink-0 mt-8 mb-[90vh]">
        {steps.map((step, i) => (
          <Selectable
            key={i}
            index={i}
            selectOn={["click", "scroll"]}
            className="swiftui-step"
          >
            <span className="swiftui-step-label">Step {i + 1}</span>
            <h2 className="swiftui-step-title">{step.title}</h2>
            <div className="swiftui-step-body">{step.children}</div>
          </Selectable>
        ))}
      </div>

      {/* Sticky preview on the right */}
      <div className="flex-1 min-w-0">
        <div className="sticky top-20 max-h-[calc(100vh-6rem)] flex items-start justify-center">
          <div className="swiftui-preview">
            <Selection
              from={steps.map((step) => (
                <>
                  {step.code ? (
                    <Code codeblock={step.code} />
                  ) : step.preview ? (
                    <Image src={step.preview.url} alt={step.preview.alt} />
                  ) : (
                    <div className="swiftui-preview-empty">
                      No Preview Available
                    </div>
                  )}
                </>
              ))}
            />
          </div>
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
      className="min-h-[30rem]"
    />
  );
}

async function Image({ src, alt }: { src: string; alt: string }) {
  const isGithubActions = process.env.NEXT_PUBLIC_GITHUB_ACTIONS === "true";
  const basePath = isGithubActions ? "/Next-Docs" : "";
  const fullSrc = src.startsWith("/") ? `${basePath}${src}` : src;
  return (
    <ImageZoom
      width="1400"
      height="900"
      className="w-full h-auto object-contain"
      src={fullSrc}
      alt={alt}
    />
  );
}
