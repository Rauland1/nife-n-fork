import axios from "axios";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import mobileSearch from "../../utils/mobileSearch";
import { MdSearch, MdRestaurantMenu, MdClose } from "react-icons/md";

import styles from "../../styles/Searchbar.module.scss";

const Searchbar = () => {
  const router = useRouter();

  const [results, setResults] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const [isOnHeader, setIsOnHeader] = useState(false);

  // Fetch results from the API
  const fetchResults = async (input) => {
    try {
      const {
        data: { message: results },
      } = await axios.get(`/api/search?q=${input}`);

      if (window.innerWidth > 768) {
        setResults([...results.slice(0, 5)]);
      } else setResults([...results]);
    } catch (error) {
      console.error("No restaurant matching the input have been found!");
    }
  };

  useEffect(() => {
    if (searchInput.length) fetchResults(searchInput.toLowerCase());
    else setResults([]);
  }, [searchInput]);

  const handleSelection = (id) => {
    setResults([]);
    setSearchInput("");
    mobileSearch(false);
    router.push(`/restaurant/${id}`);
  };

  useEffect(() => {
    if (window.innerWidth > 768 && router.pathname !== "/") {
      setIsOnHeader(true);
      document.querySelector("#searchbar").style.border = "1px solid black";
      document.querySelector("#searchResults").style.border = "1px solid black";
    } else {
      setIsOnHeader(false);
      document.querySelector("#searchbar").style.border = "none";
      document.querySelector("#searchResults").style.border = "none";
    }
  }, [router.pathname]);

  return (
    <div className={styles.searchWrapper}>
      <div className={styles.overlay} id="searchbarOverlay"></div>
      <div className={styles.searchbar} id="searchbar">
        <div
          className={styles.searchIcon}
          onClick={() => {
            mobileSearch(true);
          }}
        >
          <MdSearch />
        </div>
        <input
          type="text"
          id="restaurantSearchInput"
          placeholder="Search for a restaurant..."
          className={styles.searchInput}
          onClick={() => mobileSearch(true)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <div
          className={styles.searchIcon}
          style={{ display: "none" }}
          onMouseDown={() => {
            mobileSearch(false);
            setSearchInput("");
            setResults([]);
          }}
          id="closeIcon"
        >
          <MdClose />
        </div>
        <div
          className={
            isFocused && results.length && !isOnHeader
              ? styles.searchResults
              : isOnHeader && isFocused && results.length
              ? styles.headerSearch
              : styles.hidden
          }
          id="searchResults"
        >
          {results.length &&
            results.map((result) => {
              return (
                <div
                  className={styles.result}
                  key={result._id}
                  onMouseDown={() => handleSelection(result._id)}
                >
                  <div className={styles.searchIcon}>
                    <MdRestaurantMenu />
                  </div>
                  <div className={styles.resultData}>
                    <div className={styles.resultName}>{result.name}</div>
                    <div className={styles.resultLocation}>
                      {result.address?.street}, {result.address?.city}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Searchbar;
