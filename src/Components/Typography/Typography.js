import React from 'react';

//style
import './typography.scss';

const Typography = ({ p, h1, h2, h3, h4, span, children }) => {
  return (
    <React.Fragment>
      {p ? (
        <p className="typography__p">{children}</p>
      ) : h1 ? (
        <h1 className="typography__h1">{children}</h1>
      ) : h2 ? (
        <h2 className="typography__h2">{children}</h2>
      ) : h3 ? (
        <h3 className="typography__h3">{children}</h3>
      ) : h4 ? (
        <h4 className="typography__h4">{children}</h4>
      ) : span ? (
        <span className="typography__span">{children}</span>
      ) : null}
    </React.Fragment>
  );
};

export default Typography;
