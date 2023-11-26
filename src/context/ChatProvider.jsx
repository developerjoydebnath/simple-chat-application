import { createContext, useContext, useState } from "react";

const ChatContext = createContext({});


// eslint-disable-next-line react/prop-types
export const ChatProvider = ({children}) => {
    const [chat, setChat] = useState([]);

    return <ChatContext.Provider value={{chat, setChat}}>{children}</ChatContext.Provider>
}

export const useChat = () => useContext(ChatContext);