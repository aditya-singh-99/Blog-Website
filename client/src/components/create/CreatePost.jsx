import { useContext, useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { DataContext } from "../../context/DataProvider"
import API from "../../service/api"

const CreatePost = () => {
    const initialPost = {
        title: '',
        description: '',
        picture: '',
        username: '',
        categories: '',
        createdDate: new Date()
    }
    const [post, setPost] = useState(initialPost)
    const [file, setFile] = useState('')
    const { account } = useContext(DataContext)
    const [searchParams] = useSearchParams()
    const category = searchParams.get('category')
    const navigate = useNavigate()
    const url = post.picture ? post.picture : "https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80"

    const handleChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value })
    }

    const savePost = async (e) => {
        e.preventDefault()
        try {
            const response = await API.createPost(post)
            if (response.isSuccess) {
                navigate('/')
            }
        } catch (error) {
            console.log('Some error occured')
        }
    }

    useEffect(() => {
        const getImage = async () => {
            if (!file) return
            try {
                const data = new FormData()
                data.append('name', file.name)
                data.append('file', file)
                const response = await API.fileUpload(data)
                setPost({ ...post, picture: response.data })
                console.log(response.data)
            } catch (error) {
                console.log('Some error occured')
            }
        }
        getImage()
        setPost(prevPost => ({
            ...prevPost,
            categories: category || 'All',
            username: account.username
        }))
    }, [file])

    return (
        <div className="my-12 mx-24">
            <img src={url} className="w-full h-[50vh] object-cover" />
            <form className="mt-2 flex">
                <label htmlFor="fileInput">
                <svg xmlns="http://www.w3.org/2000/svg" width={24} viewBox="0 0 448 512" className="mt-3"><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z" /></svg>
                </label>
                <input type="file" id="fileInput" className="hidden" onChange={(e) => { setFile(e.target.files[0]) }} />
                <input type="text" name="title" placeholder="Title"
                    className="mx-8 w-full text-3xl"
                    onChange={(e) => { handleChange(e) }}
                />
                <button className='bg-blue-600 py-3 min-w-48 rounded-md hover:bg-blue-700 transition duration-300' onClick={(e) => savePost(e)}>Publish</button>
            </form>
            <textarea name="description" rows="10" onChange={(e) => { handleChange(e) }}
                className="w-full border-2 mt-12 text-lg"></textarea>
        </div>
    )
}

export default CreatePost