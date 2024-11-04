import { Link } from "react-router-dom";
import { addEllipsis } from "../../../utils/common-utils";

const Post = ({ post }) => {
    const url = post.picture
        ? post.picture
        : 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=752&q=80';

    return (
        <>
            <div className="w-[95%] md:w-[30%] lg:w-[22%] box-border border border-gray-300 rounded-lg mt-4 text-center h-80">
                <Link to={`/details/${post._id}`} >
                    <img
                        src={url}
                        alt="post"
                        className="w-full h-36 object-cover rounded-t-lg"
                    />
                    <p className="text-gray-500 text-sm p-2">{post.categories}</p>
                    <p className="text-lg font-semibold px-2">
                        {addEllipsis(post.title, 20)}
                    </p>
                    <p className="text-gray-500 text-sm px-2">Author: {post.username}</p>
                    <p className="text-sm px-2 break-words">
                        {addEllipsis(post.description, 100)}
                    </p>
                </Link>
            </div>
        </>
    );
};

export default Post;
