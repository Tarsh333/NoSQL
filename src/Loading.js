import React from 'react'

const Loading = () => {
  return (
    <div>
        <div className='leaderboard'>
                <table border="1"><tr><th>Rank</th><th>Player Name</th><th>Score</th></tr>
                 <tr className='full-tr'><td colSpan="3"><h2 align="center">Loading...</h2></td></tr>
                </table>
            </div>
    </div>
  )
}

export default Loading