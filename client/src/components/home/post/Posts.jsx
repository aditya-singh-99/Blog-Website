import { Link, useSearchParams } from "react-router-dom"
import { useEffect, useState } from "react"
import API from "../../../service/api"
import Post from "./Post"

const Posts = () => {
    const [searchParams] = useSearchParams()
    const category = searchParams.get('category')
    const [posts, setPosts] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            try {
                let response = await API.getAllPosts({ category: category || '' });
                if (response.isSuccess) {
                    setPosts(response.data)
                }
            } catch (error) {
                console.log('Some error occured')
            }
        }
        fetchData()
    }, [category])
    return (
        <>
            {
                posts && posts.length > 0
                    ? posts.map((post, ind) => <Post key={ind} post={post} />)
                    : <div className="text-gray-600 my-8 mx-20 text-xl">No data available to display</div>
            }
        </>
    )
}

export default Posts