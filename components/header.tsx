import { z } from "zod";
import { ImageBlock, parseProps, Block } from "codehike/blocks";
import Image from "next/image";

const HeaderSchema = Block.extend({
  preview: ImageBlock.optional(),
});

export function Header(props: unknown) {
  const data = parseProps(props, HeaderSchema);

  return (
    <header className="flex flex-col md:flex-row items-center gap-12 py-16 px-8 max-w-6xl mx-auto mb-12">
      {/* Left Side: Description & Title */}
      <div className="flex-1 space-y-6">
        {data.title && (
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight ">
            {data.title}
          </h1>
        )}
        <div className="prose prose-lg prose-slate max-w-none leading-relaxed">
          {data.children}
        </div>
      </div>

      {/* Right Side: Image Preview */}
      {data.preview && (
        <div className="flex-1 w-full max-w-lg shrink-0">
          <div className="rounded-2xl overflow-hidden flex items-center justify-center relative aspect-video">
            <Image
              src={data.preview.url}
              alt={data.preview.alt || "Header preview"}
              fill
              className="object-cover"
            />
          </div>
        </div>
      )}
    </header>
  );
}
