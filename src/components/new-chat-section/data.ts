export interface ChatUser {
    id: number;
    name: string;
    profileImage: string;
    isOnline: boolean;
}

export interface ChatMessage {
    id: number;
    senderId: number;
    text: string;
    dateCreated: string;
    dateModified: string;
}

export interface ChatLastMessages {
    friendId: number;
    name: string;
    profileImage: string;
    isOnline: boolean;
    lastMessage: {
        text: string;
        datePosted: string;
    };
}

const data: {
    users: ChatUser[];
    messages: ChatMessage[];
    friendsLastMessages: ChatLastMessages[];
} = {
    "users": [
        {
            "id": 1,
            "name": "Alice Johnson",
            "profileImage": "https://example.com/profiles/alice.jpg",
            "isOnline": true
        },
        {
            "id": 2,
            "name": "Bob Smith",
            "profileImage": "https://example.com/profiles/bob.jpg",
            "isOnline": false
        },
        {
            "id": 3,
            "name": "Charlie Brown",
            "profileImage": "https://example.com/profiles/charlie.jpg",
            "isOnline": true
        }
    ],
    "messages": [
        {
            "id": 101,
            "senderId": 1,
            "text": "Hey, how's it going?",
            "dateCreated": "2025-02-22T14:30:00Z",
            "dateModified": "2025-02-22T14:30:00Z"
        },
        {
            "id": 102,
            "senderId": 2,
            "text": "I'll send the files soon.",
            "dateCreated": "2025-02-21T19:45:00Z",
            "dateModified": "2025-02-21T19:45:00Z"
        },
        {
            "id": 103,
            "senderId": 3,
            "text": "Let's meet up tomorrow.",
            "dateCreated": "2025-02-22T09:15:00Z",
            "dateModified": "2025-02-22T09:15:00Z"
        }
    ],
    "friendsLastMessages": [
        {
            "friendId": 1,
            "name": "Alice Johnson",
            "profileImage": "https://example.com/profiles/alice.jpg",
            "isOnline": true,
            "lastMessage": {
                "text": "Hey, how's it going?",
                "datePosted": "2025-02-22T14:30:00Z"
            }
        },
        {
            "friendId": 2,
            "name": "Bob Smith",
            "profileImage": "https://example.com/profiles/bob.jpg",
            "isOnline": false,
            "lastMessage": {
                "text": "I'll send the files soon.",
                "datePosted": "2025-02-21T19:45:00Z"
            }
        },
        {
            "friendId": 3,
            "name": "Charlie Brown",
            "profileImage": "https://example.com/profiles/charlie.jpg",
            "isOnline": true,
            "lastMessage": {
                "text": "Let's meet up tomorrow.",
                "datePosted": "2025-02-22T09:15:00Z"
            }
        }
    ]
}
