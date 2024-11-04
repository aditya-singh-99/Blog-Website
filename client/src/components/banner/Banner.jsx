const Banner = () => {
    return (
        <div className="bg-[url('https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg')] bg-center bg-cover bg-no-repeat w-full h-[50vh] flex justify-center items-center flex-col">
            <p className="text-5xl md:text-7xl text-white font-bold leading-snug text-center">
                BLOG
            </p>
            <p className="text-lg md:text-xl bg-white px-4 py-2 mt-3 rounded-md shadow-md text-gray-800">
                All your ideas
            </p>
        </div>
    )
}

export default Banner;
