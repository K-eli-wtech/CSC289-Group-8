import React, { useState } from "react"
import './Card.css'

function Card(username, game_review_title_1, game_review_1) {
    const [username, setUsername] = useState('Your Username');
    const [game_review_title_1, setGameReviewTitle1] = useState('Review Title');
    const [game_review_1, setGameReview1] = useState('Your Review');
    
    return(
        <div className='Card'>
            <div className='upper-container'>
                <div className='image-container'>
                    <img src=" " alt='' height="100px" width="100px" />
                </div>
            </div>
            <div className="lower-container">
                <h3> {username} </h3>
                <h4> {game_review_title_1} </h4>
                <p>{game_review_1}</p>
            </div>
        </div>
    )
}

export default Card