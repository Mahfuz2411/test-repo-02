import { FaGithub } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white">
            <div className="max-w-6xl mx-auto py-6 px-4">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <h2 className="text-xl font-bold tracking-wide">
                        Movie<span className="text-yellow-400">Expo</span>
                    </h2>
                    <p className="text-gray-400 text-sm">
                        &copy; 2026 MovieExpo. All rights reserved.
                    </p>
                    <div className="flex gap-4">
                        <a href="https://github.com/Mahfuz2411/test-repo-02" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white text-2xl">
                            <FaGithub />
                        </a>
                        <a href="https://www.facebook.com/mahfuzibnesyful/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white text-2xl">
                            <FaFacebook />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
};

export default Footer;