import React from 'react'
import spinner from '../../assets/spin.gif'

function Spinner() {
    return (
        <div>
            <div className="container">
                <img className='center' style={{width:"45px",margin:"20px auto"}} src={spinner} alt="" />
            </div>

        </div>
    )
}

export default Spinner
