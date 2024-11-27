import { Data } from "./hooks/useData";

export const BASE_URL = "/481-Assignment";

export type UserType = {
  id: number;
  email: string;
  avatarUrl: string;
  username: string;
  status: "online" | "offline" | "away";
  leaderGroupIds: number[];
  memberGroupIds: number[];
  rsvpIds: number[];
};

export type ChatMessageType = {
  user: UserType;
  dateTime: string;
  message: string;
  read?: number;
};

export type Event = {
  id: number;
  title: string;
  description: string;
  startDateTime: string;
  endDateTime: string;
  location: string;
  groupId: number;
  categories: string[];
  bannerUrl: string;
};

export type Forum = {
  id: number;
  title: string;
  groupId: number;
  messages: ChatMessageType[];
};

export type PrivateChat = {
  id: number;
  participantIds: number[];
  messages: ChatMessageType[];
};

export type NotificationType = "chat" | "group" | "event";

export type Notification = {
  id: number;
  type: NotificationType;
  subtype: string;
  title: string;
  // description: string;
  time: string;
};

export type ChatNotification = Notification & {
  type: "chat";
  description: string;
};

export type Group = {
  id: number;
  name: string;
  bannerUrl?: string;
  description: string;
  isCourse?: boolean;
  leaderId?: number;
};

// const now = new Date();
const hour = 60 * 60 * 1000;
const day = hour * 24;
const week = day * 7;
const month = day * 30;

const testUser: UserType = {
  id: 0,
  email: "joseph.ballance@ucalgary.ca",
  avatarUrl:
    "https://www.fakepersongenerator.com/Face/male/male20161086420389465.jpg",
  username: "Joseph Ballance",
  status: "online",
  leaderGroupIds: [5],
  memberGroupIds: [0, 1, 8],
  rsvpIds: [0],
};

const placeholderUser: UserType = {
  id: 1,
  email: "debbie.hopkins@ucalgary.ca",
  avatarUrl: "https://randomuser.me/api/portraits/women/26.jpg",
  username: "Debbie Hopkins",
  status: "online",
  leaderGroupIds: [],
  memberGroupIds: [],
  rsvpIds: [],
};

const placeholderUser2: UserType = {
  id: 2,
  email: "sergio.barnes@ucalgary.ca",
  avatarUrl:
    "https://www.fakepersongenerator.com/Face/male/male1085778558166.jpg",
  username: "Sergio Barnes",
  status: "offline",
  leaderGroupIds: [],
  memberGroupIds: [5],
  rsvpIds: [],
};

const placeholderUser3: UserType = {
  id: 3,
  email: "brenda.pease@ucalgary.ca",
  avatarUrl: "https://randomuser.me/api/portraits/women/18.jpg",
  username: "Brenda Pease",
  status: "away",
  leaderGroupIds: [],
  memberGroupIds: [],
  rsvpIds: [],
};

const users = [testUser, placeholderUser, placeholderUser2, placeholderUser3];

const events: Event[] = [
  {
    id: 0,
    title: "Mystery & Thriller Book Night",
    description:
      "Join Bookmarked for an in-depth discussion on the gripping novel 'The Silent Patient' by Alex Michaelides. Dive into plot twists, character analysis, and predictions for the next month's genre pick. Enjoy snacks and connect with fellow book enthusiasts.",
    startDateTime: new Date(Date.now() + day).toISOString(),
    endDateTime: new Date(Date.now() + day + hour).toISOString(),
    location: "TFDL, Room 340",
    groupId: 3,
    categories: ["Literature", "Social", "Discussion"],
    bannerUrl:
      "https://www.novelsuspects.com/wp-content/uploads/2020/12/MysterySuspenseBooks2020_NovelSuspects.png",
  },
  {
    id: 1,
    title: "Late-Night Study Jam with Coffee Tasting",
    description:
      "Need motivation for your late-night study session? Join Caffeine Crusaders for an evening of productive studying with complimentary specialty coffees. Sample unique blends while staying focused in a supportive group setting.",
    startDateTime: new Date(Date.now() + week).toISOString(),
    endDateTime: new Date(Date.now() + week + hour).toISOString(),
    location: "MacKimmie Tower, 2nd Floor Lounge",
    groupId: 5,
    categories: ["Food & Drink", "Study Support", "Social"],
    bannerUrl:
      "https://t4.ftcdn.net/jpg/05/77/79/67/360_F_577796709_RnfoWC88Q60VMLvuiJ0SVcwq16Ec4YDa.jpg",
  },
  {
    id: 2,
    title: "Beginner Python Workshop",
    description:
      "Want to start coding or improve your skills? Calgary Coders presents a hands-on workshop for beginners on Python fundamentals. Learn the basics of programming, build simple projects, and get tips from experienced student mentors.",
    startDateTime: new Date(Date.now() + month).toISOString(),
    endDateTime: new Date(Date.now() + month + hour).toISOString(),
    location: "Engineering Building, Room ENE 233",
    groupId: 0,
    categories: ["Education", "Technology", "Workshop"],
    bannerUrl: "https://www.linux.org/attachments/python-banner-png.7508/",
  },
  {
    id: 3,
    title: "Classic Movie Night: 'Casablanca' Screening",
    description:
      "Cinephiles of Calgary invites you to a special screening of the timeless classic, Casablanca. Following the film, there will be a group discussion on its cinematic impact and historical significance.",
    startDateTime: new Date(Date.now() + week).toISOString(),
    endDateTime: new Date(Date.now() + week + hour).toISOString(),
    location: "Rozsa Centre, Main Theatre",
    groupId: 7,
    categories: ["Arts", "Film", "Social"],
    bannerUrl:
      "https://prod-images.tcm.com/Master-Profile-Images/casablanca1942.610.jpg",
  },
];

// export const notifications: (Notification | ChatNotification)[] = [
//   {
//     id: 1,
//     type: "chat",
//     title: "John Smeeth sent a message",
//     description: "Hey, how are you doing?",
//     time: "2m ago",
//   },
//   {
//     id: 2,
//     type: "group",
//     title: "Guy Fieri requested to join the Jazz Band club",
//     time: "15m ago",
//   },
//   {
//     id: 3,
//     type: "event",
//     title: '"Beginner Python Workshop" starts in 1 hour',
//     time: "1h ago",
//   },
// ];

const groups: Group[] = [
  {
    id: 0,
    name: "Calgary Coders",
    description:
      "Join a dynamic community of UofC students passionate about coding and software development! Whether you're a beginner or an advanced programmer, Calgary Coders offers workshops, hackathons, and coding challenges to level up your skills and connect with fellow tech enthusiasts.",
    bannerUrl: BASE_URL + "/CalgaryCodersImage.jpg",
    leaderId: 2,
  },
  {
    id: 1,
    name: "UCalgary Art Collective",
    description:
      "Express yourself in the UCalgary Art Collective! From visual arts and dance to music and theater, this creative community brings together students who want to share their passion for the arts. Join us for workshops, collaborative projects, and showcases to inspire and be inspired.",
    bannerUrl: BASE_URL + "/art gallery opening.jpg",
    leaderId: 2,
  },
  {
    id: 2,
    name: "Global Connectors",
    description:
      "Embrace diversity with Global Connectors, a cultural exchange group where local and international students come together to celebrate each other's cultures. Through food, festivals, and meaningful conversations, we promote global awareness and lifelong friendships.",
    bannerUrl: BASE_URL + "/Global Connectors.jpg",
    leaderId: 2,
  },
  {
    id: 3,
    name: "Bookmarked",
    description:
      "Calling all book lovers! Bookmarked is UofC’s official book club, open to readers of all genres. Join us for monthly book discussions, author talks, and fun reading challenges. Escape into a new world of literature with us!",
    bannerUrl: BASE_URL + "/Bookmarked.jpg",
    leaderId: 2,
  },
  {
    id: 4,
    name: "The Midnight Society",
    description:
      "For the night owls of UofC, The Midnight Society is your haven! Join us for late-night study sessions, cozy movie marathons, and stargazing adventures. Meet like-minded students who thrive after dark!",
    bannerUrl: BASE_URL + "/The Midnight Society.jpg",
    leaderId: 2,
  },
  {
    id: 5,
    name: "Caffeine Crusaders",
    description:
      "If you’re a coffee enthusiast, Caffeine Crusaders is the group for you! We explore Calgary’s best coffee spots, talk all things caffeine, and host study jams to keep the energy flowing. Join us for a unique blend of coffee culture and camaraderie!",
    bannerUrl: BASE_URL + "/Caffeine Crusaders.jpg",
    leaderId: 0,
  },
  {
    id: 6,
    name: "Dinos on Wheels",
    description:
      "Discover Calgary on two wheels with Dinos on Wheels! Whether you’re into casual rides or intense trails, this cycling club is for students who love exploring the city and its surroundings. Meet new friends, stay active, and enjoy the ride!",
    bannerUrl: BASE_URL + "/Dinos on Wheels.jpg",
    leaderId: 2,
  },
  {
    id: 7,
    name: "Cinephiles of Calgary",
    description:
      "Film buffs, unite! Cinephiles of Calgary is the go-to group for watching classic and indie films, debating blockbusters, and even trying your hand at short filmmaking. Share your love for cinema with fellow film enthusiasts!",
    bannerUrl: BASE_URL + "/Cinephiles of Calgary.jpg",
    leaderId: 2,
  },
  {
    id: 8,
    name: "CPSC 481",
    description:
      "Fundamental theory and practice of the design, implementation, and evaluation of human-computer interfaces. Topics include: principles of design; methods for evaluating interfaces with or without user involvement; techniques for prototyping and implementing graphical user interfaces.",
    bannerUrl:
      "https://s.brightspace.com/course-images/images/9a6e566b-3c24-4b23-8bf1-d1e90be1a208/tile-high-density-max-size.jpg",
    isCourse: true,
  },
  {
    id: 9,
    name: "SENG 511",
    description:
      "Analysis of methods, tools, and techniques for software process improvement and software project management as an effort to achieve quality software products.",
    bannerUrl:
      "https://s.brightspace.com/course-images/images/3df1f453-8388-488f-8670-6271097e9c81/tile-low-density-max-size.jpg",
    isCourse: true,
  },
  {
    id: 10,
    name: "ENSF 545",
    description:
      "Introduce VR technologies. Emphasize on engineering methodologies of creating VR systems. Characterize VR systems, hardware and software, user 3D interaction, and VR applications and future.",
    bannerUrl:
      "https://s.brightspace.com/course-images/images/933f3bb9-b9e1-403e-82e9-e4a554ae6763/tile-low-density-max-size.jpg",
    isCourse: true,
  },
  {
    id: 11,
    name: "ENEL 500",
    description:
      "Preliminary and detailed engineering design and implementation of an engineering system that applies engineering knowledge to solving a real-life problem. The emphasis is on the design process as it is associated with electrical, computer and software engineering, design methodology, general design principles for engineers, teamwork and project management.",
    bannerUrl:
      "https://s.brightspace.com/course-images/images/ed6d01d6-56ae-437e-85ac-4ec2c5a2f878/tile-low-density-max-size.jpg",
    isCourse: true,
  },
];

const forums: Forum[] = [
  {
    id: 0,
    title: "I LOVE COFFEE",
    groupId: 5,
    messages: [
      {
        user: placeholderUser,
        message: "RRRRRGH COFFEEEEEE",
        dateTime: "2024-11-14T19:30:00",
      },
      {
        user: testUser,
        message: "Bro chill",
        dateTime: "2024-11-15T19:30:00",
      },
    ],
  },
  {
    id: 1,
    title: "How to Create Minecraft?",
    groupId: 0,
    messages: [
      {
        user: placeholderUser2,
        message:
          "like i learned how to print hellow world so i think i'm ready to make minecraft?",
        dateTime: "2024-11-10T12:30:00",
      },
      {
        user: placeholderUser3,
        message: 'Just do "import Minecraft" smh my head',
        dateTime: "2024-11-10T13:20:00",
      },
    ],
  },
];

const privateChats: PrivateChat[] = [
  {
    id: 0,
    participantIds: [0, 1],
    messages: [
      {
        user: placeholderUser,
        dateTime: "2024-11-14T19:30:00",
        message: "What is love",
      },
      {
        user: placeholderUser,
        dateTime: "2024-11-14T19:30:00",
        message: "Baby don't hurt me",
      },
      {
        user: placeholderUser,
        dateTime: "2024-11-14T19:30:00",
        message: "Don't hurt me",
      },
      {
        user: testUser,
        dateTime: "2024-11-14T19:30:00",
        message: "No more",
        read: Date.now(),
      },
    ],
  },
];

export const defaultData: Data = {
  currentUser: testUser,
  users,
  groups,
  forums,
  events,
  privateChats,
};
