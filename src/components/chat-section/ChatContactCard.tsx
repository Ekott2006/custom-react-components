import { ChatContact } from "./types";

export interface ChatContactCardProps {
    contact: ChatContact;
    isSelected: boolean;
    onClick: () => void;
}

export const ChatContactCard = ({ contact, isSelected, onClick }: ChatContactCardProps) => {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`w-full p-4 flex items-center gap-3 hover:bg-gray-50 transition-colors ${isSelected ? "bg-purple-50" : ""}`}
        >
            <div className="relative">
                <img
                    src={contact.image}
                    alt={contact.name}
                    className="size-12 rounded-full object-cover" />
                {contact.isActive && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                )}
            </div>
            <div className="flex-1 text-left">
                <h3 className="font-medium">{contact.name}</h3>
                <p className="text-sm text-gray-500 truncate">{contact.lastMessage}</p>
            </div>
            <span className="text-xs text-gray-400">{contact.time}</span>
        </button>
    );
};
