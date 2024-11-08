export type UserType = {
  avatarUrl: string;
  username: string;
  status: "online" | "offline" | "away";
};

export type ChatMessageType = {
  user: UserType;
  date: number;
  message: string;
  read?: number;
};

export type Event = {
  id: number;
  title: string;
  dateTime: string;
  location: string;
  group: string;
  theme: string;
  category: string;
  perks: string[];
};

export type Forum = {
  title: string;
  creator: UserType;
  messages: ChatMessageType[];
};

export const testUser: UserType = {
  avatarUrl:
    "https://static.wikia.nocookie.net/b72e4978-1af8-49a8-ac03-ec0ef8a47d30/scale-to-width/370",
  username: "Killer Kirb",
  status: "online",
};

export const placeholderUser: UserType = {
  avatarUrl:
    "https://i.pinimg.com/564x/cd/aa/a1/cdaaa1c1b71ab63e8ed183e970f6e61c.jpg",
  username: "John Smeeth",
  status: "online",
};

export const placeholderUser2: UserType = {
  avatarUrl:
    "https://i.pinimg.com/736x/99/27/90/99279086833d4d0662c19f294035630b.jpg",
  username: "First Last",
  status: "offline",
};

export const placeholderUser3: UserType = {
  avatarUrl:
    "https://wallpapers-clan.com/wp-content/uploads/2023/12/danny-phantom-pfp-33.jpg",
  username: "Danny Phantom",
  status: "away",
};

export const events: Event[] = [
  {
    id: 1,
    title: "Tech Meetup 2023",
    dateTime: "2023-11-15T18:00:00",
    location: "San Francisco, CA",
    group: "SF Tech Enthusiasts",
    theme: "Technology",
    category: "Meetup",
    perks: ["Free Food", "Networking Opportunities"],
  },
  {
    id: 2,
    title: "Art Gallery Opening",
    dateTime: "2023-11-20T19:30:00",
    location: "New York, NY",
    group: "NYC Art Collective",
    theme: "Art",
    category: "Networking",
    perks: ["Free Drinks"],
  },
  {
    id: 3,
    title: "Yoga in the Park",
    dateTime: "2023-11-18T09:00:00",
    location: "Central Park, NY",
    group: "Mindful Yogis",
    theme: "Sports",
    category: "Meetup",
    perks: ["Free Drinks", "Swag"],
  },
];

export const forumPosts = [];
