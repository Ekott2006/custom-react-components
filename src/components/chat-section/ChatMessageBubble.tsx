// ChatContactCard.tsx
// ChatMessageBubble.tsx

import { ChatMessage } from "./types";

interface ChatMessageBubbleProps {
    message: ChatMessage;
}

export const ChatMessageBubble = ({ message }: ChatMessageBubbleProps) => {
    return (
        <div className={`mb-4 flex ${message.isMe ? "justify-end" : "justify-start"}`}>
            <div
                className={`max-w-[70%] rounded-lg p-3 ${message.isMe
                    ? "bg-purple-600 text-white"
                    : "bg-gray-100 text-gray-800"}`}
            >
                <p>{message.content}</p>
                <p
                    className={`text-xs mt-1 ${message.isMe ? "text-purple-200" : "text-gray-500"}`}
                >
                    {message.time}
                </p>
            </div>
        </div>
    );
};
