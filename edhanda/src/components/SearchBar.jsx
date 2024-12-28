import { useContext,useEffect,useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import { useLocation } from "react-router-dom";



const SearchBar = () => {
    const {search, setSearch,showSearch,setShowSearch} = useContext(ShopContext);
    const location = useLocation();
    const [visible,setVisible] = useState(false);

    useEffect(() => {
        if(location.pathname.includes('collection')){
            setVisible(true)
        } else{
            setVisible(false)
        }
    },[location])
  return showSearch && visible ? (
    <div className="border-b border-t bg-gray-50 text-center">
        <div className="inline-flex items-center justify-center border border-gray-400 py-2 px-5 my-5 mx-3 rounded-full w-3/4 sm:w-1/2">
        <input type="search" className="flex-1 outline-none text-sm bg" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search"/>
        <img src={assets.search_icon} className="w-4" />
        </div>
        <img src={assets.cross_icon} className="w-3 inline cursor-pointer" onClick={() => setShowSearch(false)}/>
    </div>
  ):null
}

export default SearchBar