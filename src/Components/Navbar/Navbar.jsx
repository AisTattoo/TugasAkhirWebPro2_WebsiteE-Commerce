import React, { useContext, useRef, useState } from "react";
import "./Navbar.css";
import logo from "../Assets/logo.png";
import cart_icon from "../Assets/cart_icon.png";
import { Link } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";
import nav_dropdown from '../Assets/nav_dropdown.png'

const Navbar = () => {
  
  const [menu, setMenu] = useState("shop");
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false); // State untuk toggle search
  const {getTotalCartItems} = useContext(ShopContext);
  const menuRef = useRef();

  const dropdown_toggle = (e) => {
      menuRef.current.classList.toggle('nav-menu-visible');
      e.target.classList.toggle('open');
  }

  // Toggle search visibility
  const toggleSearch = () => {
    setShowSearch(!showSearch);
    if (showSearch) {
      setSearchQuery(""); // Clear search when closing
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      console.log("Searching for:", searchQuery);
      // Implementasi pencarian di sini
      // navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={logo} alt="Logo" />
        <p>ShowMy</p>
      </div>
      <img className="nav-dropdown" onClick={dropdown_toggle} src={nav_dropdown} alt="Menu" />
      <ul ref={menuRef} className="nav-menu">
        <li className={menu === "shop" ? "active" : ""} onClick={() => setMenu("shop")}>
          <Link to="/">Shop</Link>
        </li>
        <li className={menu === "mens" ? "active" : ""} onClick={() => setMenu("mens")}>
          <Link to="/mens">Men</Link>
        </li>
        <li className={menu === "womens" ? "active" : ""} onClick={() => setMenu("womens")}>
          <Link to="/womens">Women</Link>
        </li>
        <li className={menu === "kids" ? "active" : ""} onClick={() => setMenu("kids")}>
          <Link to="/kids">Kids</Link>
        </li>
      </ul>

      {/* Search Section - Updated dengan toggle functionality */}
      <div className="nav-search">
        {/* Search Toggle Button */}
        <div className="search-toggle" onClick={toggleSearch}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path 
              d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Search Box - Hidden by default, shown when showSearch is true */}
        <div className={`search-box ${showSearch ? 'active' : ''}`}>
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <div className="search-close" onClick={toggleSearch}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path 
                d="M18 6L6 18M6 6l12 12" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="nav-login-cart">
        <Link to="/login">
          <button>Login</button>
        </Link>
        <Link to="/cart">
          <img src={cart_icon} alt="Cart" />
        </Link>
        <div className="nav-cart-count">{getTotalCartItems()}</div>
      </div>
    </div>
  );
};

export default Navbar;