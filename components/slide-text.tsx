export default function SlideText({ children }: { children: React.ReactNode }) {
  return (
    <span className="relative inline-block overflow-hidden align-top">
      <span className="block transition-transform duration-300 group-hover:-translate-y-full">{children}</span>
      <span className="absolute top-full left-0 transition-transform duration-300 group-hover:-translate-y-full" aria-hidden>{children}</span>
    </span>
  );
}
