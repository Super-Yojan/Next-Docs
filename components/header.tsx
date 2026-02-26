import { ImageBlock, parseProps, Block } from "codehike/blocks";
import { ImageZoom } from "fumadocs-ui/components/image-zoom";

const HeaderSchema = Block.extend({
  preview: ImageBlock.optional(),
});

export function Header(props: unknown) {
  const data = parseProps(props, HeaderSchema);

  return (
    <header
      className="rounded-2xl overflow-hidden mb-12"
      style={{
        background: "var(--apple-bg-secondary)",
        border: "1px solid var(--apple-border)",
      }}
    >
      <div className="flex flex-col md:flex-row items-center gap-10 p-10 md:p-14">
        {/* Left Side */}
        <div className="md:w-2/5 space-y-5">
          {data.title && (
            <h1
              className="text-3xl md:text-4xl font-bold tracking-tight"
              style={{ color: "var(--apple-text)" }}
            >
              {data.title}
            </h1>
          )}
          <div
            className="text-[16px] leading-relaxed"
            style={{ color: "var(--apple-text-secondary)" }}
          >
            {data.children}
          </div>
        </div>

        {/* Right Side: Image Preview */}
        {data.preview && (
          <div className="md:w-3/5 w-full">
            <div
              className="rounded-xl overflow-hidden"
              style={{
                boxShadow: "0 4px 24px var(--apple-card-shadow)",
              }}
            >
              <Image
                src={data.preview.url}
                alt={data.preview.alt || "Header preview"}
              />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

async function Image({ src, alt }: { src: string; alt: string }) {
  const isGithubActions = process.env.NEXT_PUBLIC_GITHUB_ACTIONS === "true";
  const basePath = isGithubActions ? "/Next-Docs" : "";
  const fullSrc = src.startsWith("/") ? `${basePath}${src}` : src;
  return (
    <ImageZoom
      width="1200"
      height="800"
      className="w-full h-auto object-contain"
      src={fullSrc}
      alt={alt}
    />
  );
}
