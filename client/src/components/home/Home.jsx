import Banner from "../banner/Banner"
import Categories from "./Categories"
import Posts from "./post/Posts"

const Home = () => {
    return (
        <>
            <Banner />
            <div className="flex flex-wrap">
                <div className="w-full md:w-1/6">
                    <Categories />
                </div>
                <div className="w-full md:w-5/6 flex flex-wrap justify-evenly">
                    <Posts />
                </div>
            </div>
        </>
    )
}

export default Home