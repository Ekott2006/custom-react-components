import { useState } from "react";
import { ChatMessageBubble } from "./ChatMessageBubble";
import { ChatContact, ChatMessage } from "./types";
interface ChatConversationProps {
    selectedContact?: ChatContact;
    messages: ChatMessage[];
    onSendMessage: (message: string) => void;
}

// ChatConversation.tsx
export const ChatConversation = ({ selectedContact, messages, onSendMessage }: ChatConversationProps) => {
    const [messageInput, setMessageInput] = useState("");

    const handleSendMessage = () => {
        if (messageInput.trim()) {
            onSendMessage(messageInput);
            setMessageInput("");
        }
    };

    if (!selectedContact) {
        return (
            <div className="flex-1 flex items-center justify-center text-gray-500">
                Select a contact to start messaging
            </div>
        );
    }

    return (
        <div className="bg-white">
            <div className="p-4 bg-white border-b flex items-center gap-4">
                <img
                    src={selectedContact.image}
                    alt={selectedContact.name}
                    className="w-10 h-10 rounded-full object-cover" />
                <div>
                    <h3 className="font-medium">{selectedContact.name}</h3>
                    {selectedContact.isActive && (
                        <p className="text-sm text-green-500">Active Now</p>
                    )}
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
                {messages.map((message) => (
                    <ChatMessageBubble key={message.id} message={message} />
                ))}
            </div>

            <div className="p-4 bg-white border-t">
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                        placeholder="Type your message"
                        className="flex-1 px-4 py-2 rounded-lg bg-gray-100 border-none focus:ring-2 focus:ring-purple-500" />
                    <button
                        onClick={handleSendMessage}
                        className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
                    >
                        Send
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <line x1="22" y1="2" x2="11" y2="13" />
                            <polygon points="22 2 15 22 11 13 2 9 22 2" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};
