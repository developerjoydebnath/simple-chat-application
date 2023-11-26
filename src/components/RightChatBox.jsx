import { useEffect, useRef, useState } from "react";
import { useChat } from "../context/ChatProvider";
import Icon from "../icons/Icon";

const RightChatBox = () => {
    const messageEndRef = useRef(null);
    const [messageText, setMessageText] = useState('')
    const {chat, setChat} = useChat()
    // console.log(chat);

    // always scroll to the last message
    useEffect(() => {
        messageEndRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "end",
        });
    }, [chat.length]);

    // clean up the input filed after submission
    const clearForm = () => setMessageText('')

    
    // handle sending message
    const sendMessage = (e) => {
        e.preventDefault()
        const id = chat.length === 0 ? 1 : chat.length + 1;

        // Get the current date and time
        const currentDate = new Date();

        // Get hours and minutes
        let hours = currentDate.getHours();
        let minutes = currentDate.getMinutes();

        // Determine if it's AM or PM
        var meridiem = hours >= 12 ? 'PM' : 'AM';

        // Convert hours to 12-hour format
        hours = hours % 12;
        hours = hours ? hours : 12; // Handle midnight (0 hours)

        // Add leading zero to single-digit minutes
        minutes = minutes < 10 ? '0' + minutes : minutes;

        // Create a formatted time string
        const formattedTime = hours + ':' + minutes + ' ' + meridiem;

        const time = formattedTime;

        const messageBody = {
            id,
            sender: 'user-2',
            message: messageText,
            time
        }
        messageText.trim().length > 0 && setChat([...chat, messageBody])
        clearForm();
    }

    return (
        <section className='border'>
            {/* chat header section  */}
            <div className="border-b">
                <div className="px-2 py-2 flex justify-start items-center gap-3">
                    <div className="bg-slate-300 h-10 w-10 rounded-full relative">
                        <div className="absolute h-3 w-3 rounded-full bg-green-500 bottom-0.5 right-0.5 border-2 border-white"></div>
                    </div>
                    <div className="">
                        <h3 className="text-lg">User 2</h3>
                    </div>
                </div>
            </div>

            {/* chat section  */}
            <div className="h-[600px] w-[500px] overflow-auto p-2">

                {/* single chat  */}

                {
                    chat.length > 0 ? 
                    chat.map((c, i) =>
                    <div key={i} className="text-left my-1">
                        <div className={`flex items-start gap-2 ${c.sender === 'user-2' ? 'justify-end': 'justify-start'}`}>
                            <div className="bg-slate-300 h-7 w-7 rounded-full relative order-1">
                                <div className="absolute h-2.5 w-2.5 rounded-full bg-green-500 bottom-0.5 right-0.5 border-2 border-white"></div>
                            </div>
                            <div className="order-2">
                                <div className={`border inline-block px-4 py-1.5 rounded-xl max-w-[350px] ${c.sender === 'user-2' ? 'bg-green-300' : 'bg-orange-300'}`}>
                                    <p className="text-sm me-10">{c.message}</p>
                                    <p className="text-[10px] text-end">{c.time}</p>
                                </div>
                                
                            </div>
                        </div>  
                    </div>
                    )
                    : 
                    <div className="">
                        <h1 className="text-slate-500 mt-5">Say hello !</h1>
                    </div>
                }

                
                <div className="" ref={messageEndRef}></div>
            </div>

            {/* message sending section  */}
            <div>
                <div className="border-t">
                    <form className="flex items-center px-2 py-1.5" onSubmit={sendMessage}>
                        <input 
                            type="text" 
                            className="border px-5 py-2 outline-none w-full rounded-full" placeholder="Message..."
                            value={messageText}    
                            onChange={e => setMessageText(e.target.value)}
                        />

                        <div className="p-1 cursor-pointer">
                            <label htmlFor="submit">
                                <Icon className="h-7 w-7 cursor-pointer fill-slate-500"/>
                            </label>
                            <input className="hidden" type="submit" id="submit" value="" />
                        </div>
                    </form>
                    
                </div>
            </div>
        </section>
    );
};

export default RightChatBox;