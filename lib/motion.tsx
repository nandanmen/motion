import { MotionComponent } from "./motion-component";

type ElementType = keyof JSX.IntrinsicElements;

export const motion = new Proxy({} as Record<ElementType, Function>, {
  get(_, prop) {
    return (props: Record<string, unknown>) => (
      <MotionComponent tag={prop as ElementType} {...props} />
    );
  },
});
