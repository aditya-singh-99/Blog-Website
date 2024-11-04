import { Link, useSearchParams } from "react-router-dom";
import { categories } from "../../configuration/data"

const Categories = () => {
    const [searchParams] = useSearchParams()
    const category = searchParams.get('category')

    return (
        <>
            <Link to={`/create?category=${category || ''}`}>
                <button className='bg-blue-600 w-4/5 py-3 mx-5 my-5 rounded-md hover:bg-blue-700 transition duration-300'>Create Blog</button>
            </Link>
            <div className='shadow-xl w-full'>
                <ul className='pl-5'>
                    <Link to={'/'}>
                        <li className='text-gray-700 py-2 border-b border-gray-300 hover:text-blue-600 transition duration-300 last:border-none'>All Categories</li>
                    </Link>
                    {categories.map((category) => (
                        <Link to={`/?category=${category.type}`} key={category.id}>
                            <li className='text-gray-700 py-2 border-b border-gray-300 hover:text-blue-600 transition duration-300 last:border-none'>{category.type}</li>
                        </Link>
                    ))}
                </ul>
            </div>
        </>
    )
}

export default Categories;
