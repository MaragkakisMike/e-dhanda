import Button from "./Button";
import { Link } from "react-router-dom";
import { MdMenu } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { useContext, useState } from "react";
import ResponsiveMenu from "./ResponsiveMenu";
import { ShopContext } from "../context/ShopContext";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { setShowSearch, getCartCount } = useContext(ShopContext);
  return (
    <>
      <header className="bg-accent3 flex items-center justify-between h-16 pt-0">
        <a href="#" className="ml-32 -md:ml-12 -xs:ml-6 -xs:mt-3">
          <img src="/logo.png" className="-xs:h-4" />
        </a>
        <nav className="-md:hidden">
          <Link
            to="/"
            className="text-accent4 ml-8 font-medium hover:text-accent2 transition-colors duration-300 ease-out -lg:text-sm"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="text-accent4 ml-8 font-medium hover:text-accent2 transition-colors duration-300 ease-out -lg:text-sm"
          >
            About
          </Link>
          <Link
            to="/collections"
            className="text-accent4 ml-8 font-medium hover:text-accent2 transition-colors duration-300 ease-out -lg:text-sm"
          >
            Collections
          </Link>
          <Link
            to="/contact"
            className="text-accent4 ml-8 font-medium hover:text-accent2 transition-colors duration-300 ease-out -lg:text-sm"
          >
            Contact Us
          </Link>
        </nav>

        <div className="ml-10 mr-24 -md:ml-[12rem] -md:mt-3 -md:mr-0 flex -xs:ml-0">
          <IoSearch
            onClick={() => setShowSearch(true)}
            className="text-2xl text-primary mt-1.5 mr-8 font-bold transition-colors duration-300 ease-out hover:text-accent2"
          />
          <Link to={"/cart"}>
            <FaShoppingCart
              onClick={getCartCount}
              className="text-2xl text-primary mt-1.5 mr-8 transition-colors duration-300 ease-out hover:text-accent2"
            />
          </Link>
          <span className="-md:hidden">
            <Button text="Sign Up" />
          </span>
        </div>
        <MdMenu
          className="text-4xl text-primary mt-2.5 mr-8 hidden -md:block"
          onClick={() => setIsOpen(!isOpen)}
        />
      </header>
      <ResponsiveMenu isOpen={isOpen} />
    </>
  );
};

export default Navbar;
