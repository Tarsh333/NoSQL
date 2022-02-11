import React, { useEffect, useState } from 'react'
import Loading from './Loading'
import Modal from './Modal'
const App = () => {
    const [turns, setTurns] = useState(2)
    const [rotated, setRotated] = useState(0)
    const [score, setScore] = useState(0)
    const [rotating, setRotating] = useState(false)
    const [mounted, setMounted] = useState(false)
    const [scores, setScores] = useState([])
    const [loading, setLoading] = useState(true)
    const setData=async(data)=>{
        const res=await fetch('http://localhost:5000/',{
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            body:JSON.stringify({scores:data})
        })
        const result=await res.json()
        // console.log(result);
    }
    const addScore = (name, score) => {
        const id=Date.now()
        const tempScores=[...scores, { id: id, name: name, score: score }]
        tempScores.sort((a, b) => {
            return b.score - a.score;
        });
        setData(tempScores)
        setScores(tempScores)
    }
    const getData=async()=>{
       const res= await fetch('http://localhost:5000/')
        const result=await res.json()
        if (result.scores!==null) {
            setScores(result.scores)
        }
        // console.log(result);
        setLoading(false)
    }
    useEffect(() => {
      getData()
    }, [])
    
    useEffect(() => {
        setMounted(true)
    }, [])

    useEffect(() => {
        let newScore = rotated % 360
        let newTurns = turns
        let tempscore = score
        // console.log(newScore);
        if (mounted) {
            setTimeout(() => {
                if (newScore < 22.5) {
                    setScore(prev => prev + 2000)
                    tempscore += 2000
                }
                if (newScore >= 22.5 && newScore < 67.5) {
                    setScore(prev => prev + 3000)
                    setTurns(prev => prev + 1)
                    newTurns++
                    tempscore += 3000
                }
                // if (rotated%360>=67.5 && newScore<112.5) {
                //     setScore(prev=>prev+0)
                // }
                if (newScore >= 112.5 && newScore < 157.5) {
                    setScore(prev => prev + 2000)
                    tempscore += 2000
                }
                if (newScore >= 157.5 && newScore < 202.5) {
                    setScore(prev => prev + 1000)
                    tempscore += 1000
                }
                if (newScore >= 247.5 && newScore < 292.5) {
                    setScore(prev => prev + 3000)
                    setTurns(prev => prev + 1)
                    newTurns++
                    tempscore += 3000
                }
                if (newScore >= 292.5 && newScore < 337.5) {
                    setScore(prev => prev + 1000)
                    tempscore += 1000
                }
                if (newScore >= 337.5 && newScore < 360) {
                    setScore(prev => prev + 2000)
                    tempscore += 2000
                }
                if (newTurns <= 0) {
                    const name = window.prompt("Your final score is " + tempscore + " Please enter your name", "Player1")
                    if (name !== null) {
                        addScore(name, tempscore)
                    }
                    setTurns(2)
                    setScore(0)
                }
            }, 5000);
        }
    }, [rotated])

    const rotateWheel = () => {
        setRotating(true)
        setTurns(prev => prev - 1)

        var x = 1440; //4rot
        var y = 7200; //20rot

        var deg = Math.floor(Math.random() * (x - y)) + y;
        // console.log(deg%360,deg);
        document.getElementById('box').style.transform = `rotate(${deg + rotated}deg)`;
        setRotated((prev) => { return (prev + deg) })

        var element = document.getElementById('mainbox');
        element.classList.remove('animate');
        setTimeout(() => {
            element.classList.add('animate');
            // 22.5-67.5 3000+1turn
            // 67.5-112.5 0
            // 112.5-157.5 2000
            // 157.5-202.5 1000
            // 202.5-247.5  0
            // 247.5-292.5 300+1 turn
            // 292.5-337.5 1000
            // 337.5-360 2000
            setRotating(false)
        }, 5000);
    }
    return (
        <div>
            <div className='container'>
                <div id="mainbox" className="mainbox">
                    <div id="box" className="box">
                        <div className="box1">
                            <span className="span1"><b>1000</b></span>
                            <span className="span2"><b>2000</b></span>
                            <span className="span3"><b>3000 + 1 turn</b></span>
                            <span className="span4"><b>0</b></span>
                        </div>
                        <div className="box2">
                            <span className="span1"><b>1000</b></span>
                            <span className="span2"><b>2000</b></span>
                            <span className="span3"><b>3000 + 1 turn</b></span>
                            <span className="span4"><b>0</b></span>
                        </div>
                    </div>

                    <button className="spin" onClick={rotateWheel} disabled={rotating}>SPIN</button>
                    <div align='center' className='turns-score'>
                        Turns Left: {turns}<br />
                        Score: {score}
                    </div>
                </div>
                {loading?<Loading/>:<Modal scores={scores} />}
            </div>
        </div>
    )
}

export default App