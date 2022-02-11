import React from 'react'

const Loading = () => {
  return (
    <div>
      <div className='leaderboard'>
        <table border="1">
          <thead>
            <tr><th>Rank</th><th>Player Name</th><th>Score</th></tr>
          </thead>
          <tbody>
            <tr className='full-tr'><td colSpan="3"><h2 align="center">Loading...</h2></td></tr>
          </tbody>
        </table>
      </div>
    </div >
  )
}

export default Loading