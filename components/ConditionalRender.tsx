import { Fragment, memo } from 'react';

import { ConditionalRenderProps } from './types/conditionalRender.type';

/**
 * _ConditionalRender component conditionally renders content based on the provided condition.
 *
 * @param {ConditionalRenderProps} props - The properties for the component.
 * @param {boolean} props.condition - The condition to determine which content to render.
 * @param {ReactNode} props.isFalseComponent - The content to render when the condition is false.
 * @param {ReactNode} props.isTrueComponent - The content to render when the condition is true.
 */
const _ConditionalRender = ({ condition, isFalseComponent, isTrueComponent }: ConditionalRenderProps) => {
  return (
    <Fragment>
      {condition && isTrueComponent}

      {!condition && isFalseComponent}
    </Fragment>
  );
};

const ConditionalRender = memo(_ConditionalRender);

export default ConditionalRender;
