import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Landing.css'

function Landing() {
  const [swingDirection, setSwingDirection] = useState('right');

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSwingDirection(prevDirection => prevDirection === 'left' ? 'right' : 'left');}, 2000); 

    return () => clearInterval(intervalId);
  }, []);

  return (
  <div>
      <div className="landing-container">
        <img
          src="https://i.postimg.cc/Hnr1STCJ/kisspng-candy-crush-saga-candy-crush-soda-saga-bubble-witc-candy-crush-5abf518f050756-30835780152248.png"
          alt=""
          className={`logo swing-${swingDirection}`}/>
          <Link to={'/home'}>
        <div>
          <button type='button' className='play'>
                      Play
          </button>
        </div>
     </Link>
      </div>
     
  </div>
  );
}

export default Landing;
