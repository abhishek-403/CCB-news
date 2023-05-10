import React, { useEffect, useRef} from 'react'
import HeadLine from '../../components/EachHeadline/HeadLine'
import EachSlide from '../../components/EachSlide/EachSlide'
import './home.scss'
import InfiniteScroll from 'react-infinite-scroll-component'
import Spinner from '../../components/Spinner/Spinner'
import Glider from 'react-glider'
import 'glider-js/glider.min.css';
import { useDispatch, useSelector } from 'react-redux'
import { fetchData, fetchMore } from '../../redux/slices/UtilsSlice'



function Home() {
    const search = useRef(null)

    const dispatch = useDispatch();
    const data = useSelector(s => s.utilsReducer.data)
    const isLoading = useSelector(s => s.utilsReducer.isLoading)



    async function fetchMoreData() {
        dispatch(fetchMore({
            cat: data.cat,
            page: data.page
        }))

    }
    useEffect(() => {
        console.log(data);


    }, [data])



    return (

        <div className='home'>
            {
                isLoading ? <Spinner /> : <div className="container">
                    <div className="content">

                        <div className="top center">
                            <div className="searchBar center">
                                <input placeholder='Search' ref={search} type="text" />
                                <span className="btn btn-prim" onClick={() => dispatch(fetchData({ query: search.current.value }))}>Search<i className="uil uil-search"></i></span>

                            </div>



                        </div>


                        <div className="slider">
                            <Glider className='glider'
                                dots={'#dots'}
                                arrows={{
                                    prev: '#buttonPrev',
                                    next: '#buttonNext',
                                }}
                                draggable
                                hasDots
                                hasArrows
                                rewind
                                scrollLock
                                slidesToShow={2}>

                                {
                                    (data.articles)?.map((item, i) => {
                                        if (item !== null) {
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
                            dataLength={data.articles?.length}
                            next={fetchMoreData}
                            hasMore={data.articles?.length < data.totalResults}
                            loader={<Spinner />}
                        >

                            <div id='bottom' className="bottom">

                                {
                                    data.articles?.map((item, i) => {
                                        if (item !== null) {
                                            return (
                                                <div className="center">
                                                    
                                                    <HeadLine news={item}
                                                        key={i} />
                                                </div>
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
