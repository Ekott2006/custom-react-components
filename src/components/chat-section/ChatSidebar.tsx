import { ChatContactCard } from "./ChatContactCard";
import { ChatContact } from "./types";

interface ChatSidebarProps {
    contacts: ChatContact[];
    selectedContact?: ChatContact;
    onContactSelect: (contact: ChatContact) => void;
}

export const ChatSidebar = ({ contacts, selectedContact, onContactSelect }: ChatSidebarProps) => {
    return (
        <div className="w-full md:w-[23rem] bg-white border-r md:border-r-0 p-4 md:p-6 border">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Message</h2>
                <div className="w-full md:w-1/2">
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                        Select by Category
                    </label>
                    <select
                        id="category"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 text-sm"
                    >
                        <option value="">Select Category</option>
                        <option value="teacher">Teacher</option>
                        <option value="mate">Mate</option>
                    </select>
                </div>
            </div>

            <div className="relative mb-4">
                <input
                    type="search"
                    placeholder="Search contacts..."
                    className="w-full px-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" />
            </div>

            <div className="overflow-y-auto h-[calc(100vh-300px)] md:h-[calc(100vh-200px)]">
                {contacts.map((contact) => (
                    <ChatContactCard
                        key={contact.id}
                        contact={contact}
                        isSelected={selectedContact?.id === contact.id}
                        onClick={() => onContactSelect(contact)} />
                ))}
            </div>
        </div>
    );
};
