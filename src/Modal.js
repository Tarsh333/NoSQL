import React, { useState } from 'react'
import { FaCrown } from 'react-icons/fa'
const Modal = ({ scores }) => {
    return (
        <div>
           <div className='leaderboard'>
                <table border="1"><tr><th>Rank</th><th>Player Name</th><th>Score</th></tr>
                {scores.length > 0 ? scores.map((score, index) => {
                    return (<tr key={score.id} className='score'>
                        <td> {index == 0 ? <FaCrown />:index+1}</td>
                        <td> {score.name}</td>
                        <td> {score.score}</td>
                    </tr>)
                }) : <tr className='full-tr'><td colspan="3"><h2 align="center">No scores to show</h2></td></tr>}
                </table>
            </div>
            
        </div>
    )
}

export default Modal