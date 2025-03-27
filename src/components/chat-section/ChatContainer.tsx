import { useState } from "react";
import { ChatSidebar } from "./ChatSidebar";
import { ChatConversation } from "./ChatConversation";
import { ChatContact, ChatMessage } from "./types";

// ChatContainer.tsx
const ChatContainer = () => {
    const [selectedContact, setSelectedContact] = useState<ChatContact | undefined>();
    const [messages, setMessages] = useState<ChatMessage[]>([
        {
            id: 1,
            sender: "Tobi Johnson Obiefo",
            content: "Hello, I have issues with the assessments, can I share it with you, sir?",
            time: "10:30 AM",
            isMe: true,
        },
        {
            id: 2,
            sender: "Mr. Ajelere Samson",
            content: "Yes, please go ahead and share your concerns.",
            time: "10:31 AM",
            isMe: false,
        },
    ]);

    const contacts: ChatContact[] = [
        {
            id: 1,
            name: "Mr. Ajelere Samson",
            lastMessage: "Sure, you can do that",
            time: "just now",
            image:
                "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=50&h=50",
            isActive: true,
        },
    ];

    const handleSendMessage = (content: string) => {
        const newMessage: ChatMessage = {
            id: messages.length + 1,
            sender: "Tobi Johnson Obiefo",
            content,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isMe: true,
        };
        setMessages([...messages, newMessage]);
    };

    return (
        <div className="flex flex-col md:flex-row h-screen bg-gray-50 gap-4">
            <ChatSidebar
                contacts={contacts}
                selectedContact={selectedContact}
                onContactSelect={setSelectedContact}
            />
            <div className="flex-1 flex flex-col border">
                <ChatConversation
                    selectedContact={selectedContact}
                    messages={messages}
                    onSendMessage={handleSendMessage}
                />
            </div>
        </div>
    );
};

export default ChatContainer;