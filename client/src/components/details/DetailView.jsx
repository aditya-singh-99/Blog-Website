import { Link, useNavigate, useParams } from "react-router-dom";
import API from "../../service/api";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../context/DataProvider";
import Comments from "./comments/Comments";

const DetailView = () => {
    const { id } = useParams()
    const [post, setPost] = useState({})
    const { account } = useContext(DataContext)
    const navigate = useNavigate()
    const url = post.picture || "https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80";

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await API.getPostById(id);
                if (response.isSuccess) {
                    setPost(response.data);
                }
            } catch (error) {
                console.log("Some error occurred");
            }
        };
        fetchData();
    }, []);

    const deleteBlog = async (e) => {
        e.preventDefault()
        try {
            let response = await API.deletePost(id)
            if (response.isSuccess) {
                navigate('/')
            }
        } catch (error) {
            console.log("Some error occurred");
        }
    }

    return (
        <div className="mx-8 my-12 md:mx-24">
            <img
                src={url}
                alt="post"
                className="w-full h-[50vh] object-cover rounded-md"
            />
            <div className="flex justify-end mt-4 space-x-4">
                {account.username === post.username && (
                    <>
                        <Link to={`/update/${post._id}`} className="p-2 border rounded-md border-gray-400 hover:bg-gray-100">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 512 512"
                                className="w-6 h-6 fill-blue-600"
                            >
                                <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7z" />
                            </svg>
                        </Link>
                        <button onClick={(e) => deleteBlog(e)} className="p-2 border rounded-md border-gray-400 hover:bg-gray-100">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 448 512"
                                className="w-6 h-6 fill-red-600"
                            >
                                <path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z" />
                            </svg>
                        </button>
                    </>
                )}
            </div>

            <p className="text-center text-3xl font-semibold my-4">{post.title}</p>

            <div className="flex items-center justify-between text-gray-600">
                {/* <Link to={`/?username=${post.username}`}className="hover:underline"> */}
                <p>Author:{" "}<span className="font-semibold">{post.username}</span></p>
                <p>{new Date(post.createdDate).toDateString()}</p>
            </div>
            <p className="mt-8 text-lg">{post.description}</p>
            <Comments post={post}/>
        </div>
    );
};

export default DetailView;
