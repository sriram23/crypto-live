import React from 'react';

const Socket = ({data}) => {

  return (
    <div>
      <h2>{data.s.endsWith('USDT')?data.s.slice(0, -4): data.s.endsWith('BTC')?data.s.slice(0, -3):data.s}</h2>
        <div>
          <p><strong>Symbol:</strong> {data.s}</p>
          <p>{data.P}%</p>
          <p>${data.c}</p>
        </div>
    </div>
  );
};

export default Socket;
