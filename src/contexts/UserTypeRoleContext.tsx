import { createContext, useContext } from "react";
import { useLocalStorage } from "usehooks-ts";

type UserTypeRole = "Cliente" | "Vendedor";

type UserContextType = {
    userTypeRole: UserTypeRole;
    toggleUserTypeRole: () => void;
};

export const UserContext = createContext<UserContextType>({
    userTypeRole: "Cliente",
    toggleUserTypeRole: () => null,
});

type UserProviderProps = {
    children: React.ReactNode;
};

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [userTypeRole, setUserTypeRole] = useLocalStorage<UserTypeRole>("userTypeRole", "Cliente");

    const toggleUserTypeRole = () => {
        setUserTypeRole(userTypeRole === "Cliente" ? "Vendedor" : "Cliente");
    };

    return (
        <UserContext.Provider value={{ userTypeRole, toggleUserTypeRole }}>
            {children}
        </UserContext.Provider>
    );
};

// A custom hook to conveniently access the UserContext
export const useUserRoleType = () => useContext(UserContext);
