import { Fragment, memo } from 'react';

import { ConditionalRenderProps } from './types/conditionalRender.type';

/**
 * _ConditionalRender component conditionally renders content based on the provided condition.
 *
 * @param {ConditionalRenderProps} props - The properties for the component.
 * @param {boolean} props.condition - The condition to determine which content to render.
 * @param {ReactNode} props.loaded - The content to render when the condition is true.
 * @param {ReactNode} props.loading - The content to render when the condition is false.
 */
const _ConditionalRender = ({ condition, loaded, loading }: ConditionalRenderProps) => {
  return (
    <Fragment>
      {condition && loading}

      {!condition && loaded}
    </Fragment>
  );
};

const ConditionalRender = memo(_ConditionalRender);

export default ConditionalRender;
