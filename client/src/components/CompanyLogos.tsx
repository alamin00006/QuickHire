const companies = [
  { name: "Vodafone", style: "tracking-widest" },
  { name: "Intel", style: "tracking-wider" },
  { name: "TESLA", style: "tracking-[0.3em] font-light" },
  { name: "AMD", style: "tracking-[0.2em]" },
  { name: "Talkit", style: "tracking-wider italic" },
];

const CompanyLogos = () => {
  return (
    <section className="py-10  border-border bg-background">
      <div className="container mx-auto px-6">
        <p className="text-sm text-muted-foreground mb-8">
          Companies we helped grow
        </p>
        <div className="flex items-center justify-between gap-8 flex-wrap">
          {companies.map((c) => (
            <span
              key={c.name}
              className={`text-2xl md:text-4xl font-bold text-muted-foreground/30 select-none ${c.style}`}
            >
              {c.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CompanyLogos;
