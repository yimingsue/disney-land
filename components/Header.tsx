import Image, { ImageLoaderProps } from "next/image";
import Link from "next/link";
import { ThemeToggler } from "./ThemeToggler";
import Disney_Logo from "/public/Disney.png"
import GenreDropdown from "./GenreDropdown";
import SearchInput from "./SearchInput";
export const imageLoader = ({ src, width, quality }: ImageLoaderProps) => {
    return `https://links.papareact.com/a943ae/${src}?w=${width}&q=${quality || 75}`
}

const Header = () => {
    return (
        <header className="fixed w-full flex justify-between items-center z-50 top-0
        p-5 bg-gradient-to-t from-gray-200/0 via-gray-900/25 to-gray-900">
            <Link
                href="/" className="mr-10"
            >
                <Image
                    src={Disney_Logo}
                    // loader={imageLoader}
                    alt={"Disney Land"}
                    width={120}
                    height={100}
                    className={"cursor-pointer invert-0 dark:invert"}
                />
            </Link>
            <div className="flex space-x-2">
                {/* Genre Dropdown */}
                <GenreDropdown />
                {/* Searh Input */}
                <SearchInput />
                {/* Theme Toggler */}
                <ThemeToggler />
            </div>
        </header>
    );
};

export default Header;