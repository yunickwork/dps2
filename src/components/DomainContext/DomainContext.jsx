import React, { createContext, useContext, useState } from 'react';

const DomainContext = createContext(null);

export const useDomain = () => useContext(DomainContext);

export const DomainProvider = ({ children }) => {
    const [domain, setDomain] = useState(window.location.hostname);

    return (
        <DomainContext.Provider value={{ domain, setDomain }}>
            {children}
        </DomainContext.Provider>
    );
};
