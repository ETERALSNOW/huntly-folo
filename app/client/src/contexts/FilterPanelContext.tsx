import React, {createContext, ReactNode, useContext, useState} from "react";

type FilterPanelContextType = {
  filterContent: ReactNode | null;
  setFilterContent: (content: ReactNode | null) => void;
};

const FilterPanelContext = createContext<FilterPanelContextType | undefined>(undefined);

export const FilterPanelProvider = ({children}: {children: ReactNode}) => {
  const [filterContent, setFilterContent] = useState<ReactNode | null>(null);

  return (
    <FilterPanelContext.Provider value={{filterContent, setFilterContent}}>
      {children}
    </FilterPanelContext.Provider>
  );
};

export const useFilterPanel = () => {
  const ctx = useContext(FilterPanelContext);
  if (!ctx) {
    throw new Error("useFilterPanel must be used within FilterPanelProvider");
  }
  return ctx;
};
