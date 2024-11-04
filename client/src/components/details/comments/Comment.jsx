import { useContext } from "react"
import { DataContext } from "../../../context/DataProvider"
import API from "../../../service/api"

const Comment = ({ comment, setToggle }) => {
    const { account } = useContext(DataContext)
    const removeComment = async () => {
        try {
            const response = await API.deleteComment(comment._id)
            if (response.isSuccess) {
                setToggle(toggle => !toggle)
            }
        } catch (error) {
            console.log("Some error occurred");
        }
    }

    return (
        <div className="mt-8 bg-gray-200 p-4 rounded-md shadow-sm">
      <div className="flex items-center mb-2">
        <p className="font-semibold text-lg mr-6">{comment.name}</p>
        <p className="text-sm text-gray-500">
          {new Date(comment.date).toDateString()}
        </p>

        {comment.name === account.username && (
          <button
            onClick={removeComment}
            className="ml-auto p-1 rounded-full hover:bg-gray-200 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              className="w-5 h-5 fill-gray-600"
            >
              <path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z" />
            </svg>
          </button>
        )}
      </div>

      <p className="text-base text-gray-800">{comment.comments}</p>
    </div>
    )
}

export default Comment