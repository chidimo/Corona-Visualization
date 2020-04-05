import React from 'react';
import { Link } from '@reach/router';

export const SideNavLinks = (props) => {
  // eslint-disable-next-line react/prop-types
  const { className } = props;
  return (
    <Link
      {...props}
      getProps={({ isCurrent }) => {
        // the object returned here is passed to the
        // anchor element's props
        return {
          className: isCurrent ? `${className} active-side-nav` : className,
        };
      }}
    />
  );
};
