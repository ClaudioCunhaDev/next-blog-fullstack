"use client";
import { createContext, useState, useContext } from "react";
import { useRouter } from "next/navigation";

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const router = useRouter();

  const fetchSearchResults = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.API}/search?searchQuery=${searchQuery}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch search results");
      }
      const data = await response.json();
      router.push(`/search?searchQuery=${searchQuery}`);
      //console.log("search results => ", data);
      setSearchResults(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SearchContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        searchResults,
        setSearchResults,
        fetchSearchResults,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);
