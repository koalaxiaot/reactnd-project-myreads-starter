import React from 'react';

// reference: http://tobiasahlin.com/spinkit/
const Loading = () => {
  return (
    <div className="loading-container">
      <div className="container">
        <div className="spinner">
          <div className="double-bounce1"></div>
          <div className="double-bounce2"></div>
        </div>
      </div>
    </div>
  )
}

export default Loading;