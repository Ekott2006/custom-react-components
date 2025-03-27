export interface ChatContact {
    id: number;
    name: string;
    lastMessage: string;
    time: string;
    image: string;
    isActive: boolean;
}

export interface ChatMessage {
    id: number;
    sender: string;
    content: string;
    time: string;
    isMe: boolean;
}