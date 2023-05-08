import React, { useEffect, useState } from 'react'
import HeadLine from '../../components/EachHeadline/HeadLine'

function Home() {
    const [data, setData] = useState([])
    const [search, setSearch] = useState('apple')


    async function fetchData() {
        const apikey = 'c1d79d52fb78476d8a55a1f11b2d5363'


        const response = await fetch(`https://newsapi.org/v2/everything?q=${search}}&from=2023-05-07&to=2023-05-07&
        pageSize=20&sortBy=popularity&apiKey=${apikey}`)
        const data = await response.json();

        setData(data);


    }
    useEffect(() => {
        fetchData()


    }, [search])



    return (
        <div className='home'>
            <div className="container">
                <div className="content">
                    <div className="top">
                        <input onChange={(e)=>setSearch(e.target.value)} type="text" />
                    </div>
                </div>
            </div>
            <div className="container">
                {
                    data.articles?.map((item, i) => {
                        return (
                            <HeadLine news={item} 
                            key={i}/>
                        )
                    })
                }

            </div>

        </div>
    )
}

export default Home
