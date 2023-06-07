import React, { createContext, useState } from "react";
import { ContextType } from "~/types";

export const FilterUserContext = createContext({} as ContextType) 

interface UserContext {
    children: React.ReactNode
}

export const FilterUserProvider = ({children}: UserContext) => {
    const [filters, setFilters] = useState({
        type: "Cilente" || "Vendedor"
    })

    const handlerFilters = (filter: string) => {
        setFilters(prev => {
            return {
              ...prev,
                prev: filter
            }
        })
    }

    return (
        <FilterUserContext.Provider value={{filters, handlerFilters}}>
            {children}
        </FilterUserContext.Provider>
    )
}