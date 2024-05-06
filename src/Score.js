import React, { useEffect, useState } from 'react';
import ReactConfetti from 'react-confetti';
import candy from './tasty.mp3';
import delicious from './delicious.mp3';
import victory from './candy_crush_victory.mp3'

function Score({ score }) {
    let starIcon = <i className="fa-solid fa-star fa-1x fa-beat" style={{ color: '#FFD43B' }}></i>;
    let stars = null;
    if (score > 150) {
        stars = (
            <React.Fragment>
                {starIcon}
                {starIcon}
                {starIcon}
            </React.Fragment>
        );
   } else if (score > 50) {
        stars = (
            <React.Fragment>
                {starIcon}
                {starIcon}
            </React.Fragment>
        );
    } else if (score > 10) {
        stars = starIcon;
       
    }
    const [audioPlayed,setAudioPlayed]=useState(false);
    const [audioPlayedtwo,setAudioPlayedTwo]=useState(false);
    const [audioPlayedThree,setAudioPlayedThree]=useState(false);

    useEffect(()=>{
        if(score>100 && !audioPlayed){
            const audio=new Audio(delicious);
            audio.play();
            setAudioPlayed(true);
        }
    },[score,audioPlayed]);
    useEffect(()=>{
        if(score>50 && !audioPlayedtwo ){
            const audio=new Audio(candy);
            audio.play();
            setAudioPlayedTwo(true);
         }

    },[score,audioPlayed]);
    useEffect(()=>{
        if(score>150 && !audioPlayedThree){
            const audio=new Audio(victory);
            audio.play();
            setAudioPlayedThree(true);
            audio.onended=()=>{
                window.location.href = '/';            
            }
        }
    },[score,audioPlayed]);

    const confettiConfig = {
        angle: 90,
        spread: 360,
        startVelocity: 40,
        elementCount: 1500,
        decay: 0.98,
        colors: ['#FFD700', '#FFA500', '#FF4500'],
    };


    return (
        <div className='scoreBoard'>
            {score > 150 && <ReactConfetti active config={confettiConfig} />}
            <p>Your score: {score} <br />
                <div style={{ paddingLeft: '35px' }}>{stars}</div>
            </p>
        </div>
    );
}

export default Score;