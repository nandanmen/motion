import React from "react";

type ElementType = keyof JSX.IntrinsicElements;

type MotionComponentProps = {
  tag: ElementType;
} & Record<string, any>;

export function MotionComponent({ tag, ...props }: MotionComponentProps) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const { animate: to, ...rest } = props;

  React.useEffect(() => {
    animate(ref.current as HTMLDivElement, { to });
  }, []);

  return <div ref={ref} {...rest} />;
}

function animate(ref: HTMLDivElement, { to }) {
  const duration = 2000; // ms
  const { x: xEnd } = to;

  let start: number;
  function update(timestamp: number) {
    if (!start) start = timestamp;

    const elapsed = timestamp - start;
    if (elapsed > duration) return;

    console.log(elapsed / duration);

    const distance = Math.min(easeOutCirc(elapsed / duration) * xEnd, xEnd);
    ref.style.transform = `translateX(${distance}px)`;

    window.requestAnimationFrame(update);
  }

  window.requestAnimationFrame(update);
}

function easeOutCirc(x: number): number {
  return Math.sqrt(1 - Math.pow(x - 1, 2));
}
