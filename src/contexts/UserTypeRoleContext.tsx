import { createContext, useState, useEffect, useContext } from "react";

type UserTypeRole = "Cliente" | "Vendedor";

type UserContextType = {
    userTypeRole: UserTypeRole;
    toggleUserTypeRole: () => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

type UserProviderProps = {
    children: React.ReactNode;
};

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [userTypeRole, setUserTypeRole] = useState<UserTypeRole>("Cliente");

    const toggleUserTypeRole = () => {
        setUserTypeRole((prevRole) => (prevRole === "Cliente" ? "Vendedor" : "Cliente"));
    };

    useEffect(() => {
        const storedRole = localStorage.getItem("userTypeRole");
        if (storedRole) {
            setUserTypeRole(storedRole as UserTypeRole);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("userTypeRole", userTypeRole);
    }, [userTypeRole]);

    return (
        <UserContext.Provider value={{ userTypeRole, toggleUserTypeRole }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserRoleType = (): UserContextType => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUserContext must be used within a UserProvider");
    }
    return context;
};
