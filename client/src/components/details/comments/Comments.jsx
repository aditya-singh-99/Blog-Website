import { useContext, useEffect, useState } from "react"
import { DataContext } from "../../../context/DataProvider"
import API from "../../../service/api"
import Comment from "./Comment"
import { useParams } from "react-router-dom"

const Comments = ({ post }) => {
    const url = 'https://static.thenounproject.com/png/12017-200.png'
    const initialValues = {
        name: '',
        postId: '',
        comments: '',
        date: new Date()
    }
    const { id } = useParams()
    const { account } = useContext(DataContext)
    const [comment, setComment] = useState(initialValues)
    const [comments, setComments] = useState([])
    const [toggle, setToggle] = useState(true)

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await API.getAllComments(id)
                if (response.isSuccess) {
                    setComments(response.data)
                }
            } catch (error) {
                console.log("Some error occurred");
            }
        }
        getData()
    }, [toggle])

    const handleChange = (e) => {
        setComment({
            ...comment,
            name: account.username,
            postId: post._id,
            comments: e.target.value
        })
    }
    const addComment = async (e) => {
        try {
            const response = await API.newComment(comment)
            if (response.isSuccess) {
                setComment(initialValues)
            }
            setToggle(!toggle)
        } catch (error) {
            console.log("Some error occurred");
        }
    }
    return (
        <div className="mt-6">
            <div className="flex items-start space-x-4">
                <img
                    src={url}
                    alt="profile"
                    className="w-12 h-12 rounded-full object-cover"
                />
                <textarea
                    rows={5}
                    placeholder="What's on your mind?"
                    className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={comment.comments}
                    onChange={handleChange}
                />
                <button
                    onClick={addComment}
                    className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
                >
                    Publish
                </button>
            </div>

            <div className="space-y-4">
                {comments.length > 0 &&
                    comments.map((comment, ind) => (
                        <Comment key={ind} comment={comment} setToggle={setToggle} />
                    ))}
            </div>
        </div>
    )
}

export default Comments