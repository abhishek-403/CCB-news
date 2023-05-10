import React from 'react'
import './headline.scss'
function HeadLine({ news }) {
    return (
        <div className='headline'>
            <div className="content">
                <div className="left center">
                    <div className="image center">
                        <img src={news?.urlToImage} alt="" />

                    </div>

                </div>
                <div className="right">
                    <div className="book-mark">
                        <span>Latest</span>
                    </div>
                    <div className="title center">
                        <p>{news?.title?.substr(0, 60)}...</p>

                    </div>
                    <div className="status">
                        <span>123 Likes</span>
                    </div>


                </div>
            </div>


        </div>
    )
}

export default HeadLine
