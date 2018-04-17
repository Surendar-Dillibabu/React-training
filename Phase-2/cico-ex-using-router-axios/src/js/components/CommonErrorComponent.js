import React from 'react';

const CommonErrorComponent = (props) => {
  return (
    <div className="cntr">
      <div className="bld">Error page</div>
      <p>{props.errorMsg}</p>
    </div>
  );
}

export default CommonErrorComponent;