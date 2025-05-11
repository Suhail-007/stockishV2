export type ConditionalRenderProps = {
  condition: boolean;
  isTrueComponent: JSX.Element;
  isFalseComponent: JSX.Element | null;
};
