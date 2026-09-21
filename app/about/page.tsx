export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:px-6">
      <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#87614a]">Our story</p>
          <h1 className="mt-3 text-4xl font-black tracking-[-0.06em] text-on-dark sm:text-5xl lg:text-6xl">Coffee that feels like a ritual.</h1>
        </div>
        <div className="rounded-[30px] border border-[#2d1b12]/10 bg-white/70 p-6 text-base leading-8 text-muted-on-light shadow-[0_18px_45px_rgba(71,47,26,0.04)]">
          Velvet Roast began with a simple idea: great coffee should be as thoughtful as the people who brew it. We work directly with producers who care about quality, sustainability, and long-term relationships across harvest regions.
        </div>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {[
          { title: "Direct trade", body: "We buy in small lots from farms that value transparency and quality over volume." },
          { title: "Roasted fresh", body: "Every roast is small-batch and timed to reach your cup at peak flavor." },
          { title: "Built for ritual", body: "From espresso bars to pour-over setups, we design coffee to fit your everyday rhythm." },
        ].map((item) => (
          <div key={item.title} className="rounded-[28px] border border-[#2d1b12]/10 bg-white/70 p-6">
            <h2 className="text-xl font-semibold text-on-light">{item.title}</h2>
            <p className="mt-3 text-sm leading-7 text-muted-on-light">{item.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
