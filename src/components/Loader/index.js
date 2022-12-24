import React from 'react';

const Loader = () => {
  return (
    <>
      <div className='loading'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          style={{ margin: 'auto', background: 'none', display: 'block', shapeRendering: 'auto' }}
          width='100px'
          height='100px'
          viewBox='0 0 100 100'
          preserveAspectRatio='xMidYMid'
        >
          <circle
            cx='50'
            cy='50'
            r='32'
            strokeWidth='8'
            stroke='#0d933b'
            strokeDasharray='50.26548245743669 50.26548245743669'
            fill='none'
            strokeLinecap='round'
          >
            <animateTransform
              attributeName='transform'
              type='rotate'
              repeatCount='indefinite'
              dur='1s'
              keyTimes='0;1'
              values='0 50 50;360 50 50'
            ></animateTransform>
          </circle>
        </svg>
      </div>
    </>
  );
};

export default Loader;
