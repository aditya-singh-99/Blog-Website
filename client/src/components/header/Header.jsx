import { Link } from "react-router-dom";

const Header = () => {
    return (
        <div className="fixed top-0 w-full bg-white shadow-lg z-50">
            <div className="flex justify-center space-x-10 py-4">
                <Link to={'/'} className="text-gray-700 font-semibold hover:text-blue-600 transition duration-300">
                    HOME
                </Link>
                <Link to={'/about'} className="text-gray-700 font-semibold hover:text-blue-600 transition duration-300">
                    ABOUT
                </Link>
                <Link to={'/contact'} className="text-gray-700 font-semibold hover:text-blue-600 transition duration-300">
                    CONTACT
                </Link>
                <Link to={'/login'} className="text-gray-700 font-semibold hover:text-blue-600 transition duration-300">
                    LOGOUT
                </Link>
            </div>
        </div>
    );
};

export default Header;
