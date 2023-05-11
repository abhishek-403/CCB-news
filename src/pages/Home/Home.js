import React, { useState } from 'react'
import HeadLine from '../../components/EachHeadline/HeadLine'
import EachSlide from '../../components/EachSlide/EachSlide'
import './home.scss'
import InfiniteScroll from 'react-infinite-scroll-component'
import Spinner from '../../components/Spinner/Spinner'
import Glider from 'react-glider'
import 'glider-js/glider.min.css';
import { useDispatch, useSelector } from 'react-redux'
import { fetchData, fetchMore } from '../../redux/slices/UtilsSlice'
import { Link} from 'react-router-dom'



function Home() {
    const [search, setsearch] = useState("")

    const dispatch = useDispatch();
    const data = useSelector(s => s.utilsReducer.data)
    const qweryState = useSelector(s => s.utilsReducer.qwery)
    const isLoading = useSelector(s => s.utilsReducer.isLoading)



    async function fetchMoreData() {
        dispatch(fetchMore({
            cat: data.cat,
            page: data.page,
            qwery:qweryState===("" || " ")? undefined:qweryState
        }))

    }
    function fetchFirstData(){

        dispatch(fetchData({ qwery: search }));
    }
 



    return (

        <div className='home'>
            {
                isLoading ? <Spinner /> : <div className="container">
                    <div className="content">

                        <div className="top center">
                            <div className="searchBar center">
                                <input onChange={(e)=>setsearch(e.target.value)} onKeyDown={(e)=>e.key==='Enter'?fetchFirstData():null}  placeholder={ qweryState!==undefined?qweryState:'Search'} type="text" />
                                <span className="btn btn-prim" onClick={fetchFirstData}>Search<i className="uil uil-search"></i></span>

                            </div>



                        </div>


                        <div className="slider">
                            <Glider className='glider'
                                dots={'#dots'}
                                arrows={{
                                    prev: '#buttonPrev',
                                    next: '#buttonNext',
                                }}
                                draggable={{
                                    cursor:'pointer'

                                }}

                                hasDots
                                hasArrows
                                rewind
                                scrollLock
                                slidesToShow={2}>

                                {
                                    (data.articles)?.map((item, i = 0) => {
                                        if (item !== null && i++ <= 5) {
                                            return (
                                                <EachSlide key={i} img={item?.urlToImage} />

                                            )
                                        }
                                        return false

                                    })
                                }





                            </Glider>
                            <div className="slider-controller">

                                <div id='buttonPrev' className="arrow center left-icon">
                                    <i className="uil uil-angle-left-b"></i>
                                </div>
                                <div id="dots">

                                </div>
                                <div id='buttonNext' className="arrow center left-icon">
                                    <i className="uil uil-angle-right-b"></i>
                                </div>

                            </div>






                        </div>

                        <InfiniteScroll
                            dataLength={data.articles?.length || 0}
                            next={fetchMoreData}
                            hasMore={data.articles?.length < data.totalResults}
                            loader={<Spinner />}
                        >

                            <div id='bottom' className="bottom">

                                {
                                    data.articles?.map((item, i) => {
                                        if (item !== null) {
                                            return (
                                                <Link target='_blank' to={`${item.url}`}  key={i}  className="center">

                                                    <HeadLine news={item}
                                                      />
                                                </Link>
                                            )
                                        }
                                        return false

                                    })
                                }

                            </div>
                        </InfiniteScroll>
                    </div>
                </div>

            }


        </div >

    )
}

export default Home
