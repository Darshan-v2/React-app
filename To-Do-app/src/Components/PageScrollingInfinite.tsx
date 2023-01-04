import axios from "axios"
import React, { useEffect, useState } from "react"
import InfiniteScroll from "react-infinite-scroll-component"

interface IUser {
    avatar: string
    first_name: string
    last_name: string
    email: string
}

const PageScrollingInfinite = () => {

    const Per_Page = 2
    const apiPath = "https://reqres.in/api/users"
    const [UserLists, setUserLists] = useState<Array<IUser>>([])
    const [total, setTotal] = useState<Number>(0)

    const getList = () => {
        const perpage = (UserLists.length / Per_Page) + 1
        const pagechange = "?page=" + perpage + "&per_page=" + Per_Page
        const finalUrl = apiPath + pagechange

        axios.get(finalUrl)
            .then((res) => {
                const apiRes = res.data.data
                setTotal(res.data.total)
                console.log("total", setTotal)
                const mergeData = [...UserLists, ...apiRes]
                setUserLists(mergeData)
            })
            .catch((err) => {
                console.error("Loading Error", err)
            })
    }

    useEffect(() => {
        getList()
    }, [])

    const fetchMoreData = () => {
        setTimeout(() => getList(), 1000)
    }

    return (
        <>
            <div className='container'>
                <InfiniteScroll
                    height={"250px"}
                    dataLength={UserLists.length}
                    next={fetchMoreData}
                    hasMore={UserLists.length < total}
                    loader={<h4 className="loading">Loading...</h4>}>

                    {UserLists?.map((key) => {

                        return (
                            <>
                                <div className='cards'>
                                    <div className="image-block">
                                        <img
                                            className='userimg'
                                            src={key?.avatar}
                                            alt="test img"
                                        />
                                    </div>
                                    <div className='content-block'>
                                        <div>
                                            <h3>
                                                {key?.first_name} {key?.last_name}
                                            </h3>
                                        </div>
                                        <div className="user-email">{key?.email}
                                        </div>
                                    </div>
                                </div>
                            </>
                        )
                    })}
                </InfiniteScroll>
            </div>
        </>
    )
}

export default PageScrollingInfinite