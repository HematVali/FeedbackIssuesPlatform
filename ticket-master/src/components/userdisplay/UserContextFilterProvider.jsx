import React, { useState } from 'react';
export const FilterContext = React.createContext();
export const SearchContext = React.createContext();

const UserContextFilterProvider = ({ children }) => {
    const [filter, setFilter] = useState("All Users");
    const [search, setSearch] = useState("");

    return (
        <FilterContext.Provider value={{ filter, setFilter }}>
            <SearchContext.Provider value={{ search, setSearch }}>
                {children}
            </SearchContext.Provider>
        </FilterContext.Provider>
    );
}
export default UserContextFilterProvider;