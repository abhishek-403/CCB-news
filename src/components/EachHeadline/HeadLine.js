import React from 'react'
import './headline.scss'

function HeadLine({ news }) {
    return (
        <div className='headline'>
            <div className="container">
                
                <div className="content">
                    <div className="left">
                        {news.title}
                    </div>
                    <div className="right">
                        <img src={news.urlToImage} alt="" />

                    </div>
                </div>


            </div>

        </div>
    )
}

export default HeadLine
