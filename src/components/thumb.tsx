import React from "react";

export default function Thumb({
  meta,
  index,
  active,
  onClick,
}: {
  meta: { id: string; url: string; alt: string };
  index: number;
  active: boolean;
  onClick: () => void;
}) {
  const ref = React.useRef<HTMLButtonElement | null>(null);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { root: el.parentElement, rootMargin: "200px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <button
      ref={ref}
      data-idx={index}
      onClick={onClick}
      role="option"
      aria-selected={active}
      style={{
        scrollSnapAlign: "center",
        border: active ? "2px solid" : "1px solid transparent",
        borderRadius: 8,
        padding: 0,
        background: "transparent",
        width: 140,
        height: 90,
      }}
    >
      {visible ? (
        <img
          src={meta.url.replace("/1200/800", "/160/120")}
          alt={meta.alt}
          width={140}
          height={90}
          loading="lazy"
          style={{ display: "block", width: "100%", height: "100%", objectFit: "cover", borderRadius: 8 }}
        />
      ) : (
        <div style={{ width: 140, height: 90, background: "#eee", borderRadius: 8 }} />
      )}
    </button>
  );
}
