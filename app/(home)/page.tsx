import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col min-h-screen">
      {/* Hero Section */}
      <section
        className="flex flex-col items-center justify-center text-center px-6 py-32"
        style={{ background: "var(--apple-bg-secondary)" }}
      >
        <p
          className="text-sm font-semibold uppercase tracking-widest mb-4"
          style={{ color: "var(--apple-text-secondary)" }}
        >
          Tutorials
        </p>
        <h1
          className="text-5xl md:text-6xl font-bold tracking-tight mb-6"
          style={{ color: "var(--apple-text)" }}
        >
          Next Robotics
        </h1>
        <p
          className="text-xl md:text-2xl max-w-2xl mb-10"
          style={{ color: "var(--apple-text-secondary)" }}
        >
          Learn the fundamentals of building and programming your robot with
          step-by-step tutorials.
        </p>
        <Link
          href="/docs"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-white font-semibold text-lg transition-all hover:scale-105"
          style={{ background: "var(--apple-blue)" }}
        >
          Get Started
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            className="ml-1"
          >
            <path
              d="M1 7h12m0 0L8 2m5 5L8 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </section>

      {/* Tutorial Cards */}
      <section className="max-w-5xl mx-auto px-6 py-20 w-full">
        <h2
          className="text-3xl font-bold tracking-tight mb-12 text-center"
          style={{ color: "var(--apple-text)" }}
        >
          Explore Tutorials
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <TutorialCard
            href="/docs/introduction"
            title="Introduction"
            description="Understand the Rev Control Hub and how all the parts connect."
            color="#007AFF"
          />
          <TutorialCard
            href="/docs/connecting-to-robot"
            title="Connecting to Robot"
            description="Power on and wirelessly connect to your Control Hub."
            color="#34C759"
          />
          <TutorialCard
            href="/docs/how-to-program"
            title="Programming"
            description="Open the Blocks editor and create your first OpMode."
            color="#FF9500"
          />
          <TutorialCard
            href="/docs/configuring-hardware"
            title="Configuring Hardware"
            description="Tell the Control Hub what motors and sensors are plugged in."
            color="#AF52DE"
          />
          <TutorialCard
            href="/docs/programming-motors"
            title="Programming Motors"
            description="Make your robot move by controlling motors with code."
            color="#FF3B30"
          />
          <TutorialCard
            href="/docs/programming-servos"
            title="Programming Servos"
            description="Control grippers and mechanisms with precise servo positions."
            color="#5AC8FA"
          />
        </div>
      </section>
    </main>
  );
}

function TutorialCard({
  href,
  title,
  description,
  color,
}: {
  href: string;
  title: string;
  description: string;
  color: string;
}) {
  return (
    <Link
      href={href}
      className="group block rounded-2xl overflow-hidden transition-all hover:-translate-y-1"
      style={{
        background: "var(--apple-card)",
        border: "1px solid var(--apple-border)",
        boxShadow: "0 2px 8px var(--apple-card-shadow)",
      }}
    >
      <div className="h-2" style={{ background: color }} />
      <div className="p-6">
        <h3
          className="text-lg font-semibold mb-2 group-hover:underline"
          style={{ color: "var(--apple-text)" }}
        >
          {title}
        </h3>
        <p
          className="text-sm leading-relaxed"
          style={{ color: "var(--apple-text-secondary)" }}
        >
          {description}
        </p>
      </div>
    </Link>
  );
}
