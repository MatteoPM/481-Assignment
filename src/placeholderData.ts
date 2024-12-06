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
  seenForumIds: number[];
  bio: string;
  notifications: Notification[];
  isSuMember?: boolean;
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
  deleted?: boolean;
};

export type PrivateChat = {
  id: number;
  participantIds: number[];
  messages: ChatMessageType[];
  seenIds: number[];
};

export type NotificationType = "chat" | "group" | "event";

export type Notification = {
  id: number;
  category: NotificationType;
  time: string;
  read?: boolean;
} & (
  | {
      category: "chat";
      type: "message";
      data: {
        senderId: number;
        chatId: number;
        message: string;
      };
    }
  | {
      type: "joinRequest";
      data: {
        requesterId: number;
        clubId: number;
      };
    }
  | {
      type: "eventReminder";
      data: {
        eventId: number;
      };
    }
);

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
  isPrivate?: boolean;
  applicationIds: number[];
};

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
  memberGroupIds: [0, 1, 8, 9, 10, 11],
  rsvpIds: [0],
  seenForumIds: [],
  bio: "I'm the leader of the Caffeine Crusaders! Ask me about anything related to coffee!",
  notifications: [
    {
      id: 0,
      category: "chat",
      type: "message",
      time: new Date(Date.now() - 0.3 * hour).toISOString(),
      data: {
        senderId: 1,
        chatId: 0,
        message: "Joined :)",
      },
    },
    {
      id: 1,
      category: "group",
      type: "joinRequest",
      time: new Date(Date.now() - 0.7 * hour).toISOString(),
      data: {
        requesterId: 1,
        clubId: 5,
      },
    },
    {
      id: 2,
      category: "event",
      type: "eventReminder",
      time: new Date(Date.now() - 5 * hour).toISOString(),
      data: {
        eventId: 0,
      },
    },
  ],
};

const placeholderUser: UserType = {
  id: 1,
  email: "debbie.hopkins@ucalgary.ca",
  avatarUrl: "https://randomuser.me/api/portraits/women/26.jpg",
  username: "Debbie Hopkins",
  status: "online",
  leaderGroupIds: [],
  memberGroupIds: [8, 5],
  rsvpIds: [],
  seenForumIds: [],
  bio: "Coffee cofeeeee cofFlfffe cOoofe CCCOOOOFFFFEEEE",
  notifications: [],
};

const placeholderUser2: UserType = {
  id: 2,
  email: "sergio.barnes@ucalgary.ca",
  avatarUrl:
    "https://www.fakepersongenerator.com/Face/male/male1085778558166.jpg",
  username: "Sergio Barnes",
  status: "offline",
  leaderGroupIds: [0, 1, 2, 3, 4, 6, 7],
  memberGroupIds: [5, 8],
  rsvpIds: [],
  seenForumIds: [],
  bio: "Just trying to get by",
  notifications: [],
};

const placeholderUser3: UserType = {
  id: 3,
  email: "brenda.pease@ucalgary.ca",
  avatarUrl: "https://randomuser.me/api/portraits/women/18.jpg",
  username: "Brenda Pease",
  status: "away",
  leaderGroupIds: [],
  memberGroupIds: [11],
  rsvpIds: [],
  seenForumIds: [],
  bio: "Nice to meet you!",
  notifications: [],
  isSuMember: true,
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
  {
    id: 4,
    title: "Midnight Meetup",
    description:
      "This event is hosted by a private group, so only members of the The Midnight Society should be able to see this.",
    startDateTime: new Date(Date.now() + week).toISOString(),
    endDateTime: new Date(Date.now() + week + hour).toISOString(),
    location: "Tonken Plaza",
    groupId: 4,
    categories: ["Social"],
    bannerUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4xK-EXpM8Pec036XLlu5crmx9fqFBM5sElg&s",
  },
];

const groups: Group[] = [
  {
    id: 0,
    name: "Calgary Coders",
    description:
      "Join a dynamic community of UofC students passionate about coding and software development! Whether you're a beginner or an advanced programmer, Calgary Coders offers workshops, hackathons, and coding challenges to level up your skills and connect with fellow tech enthusiasts.",
    bannerUrl: BASE_URL + "/CalgaryCodersImage.jpg",
    leaderId: 2,
    applicationIds: [],
  },
  {
    id: 1,
    name: "UCalgary Art Collective",
    description:
      "Express yourself in the UCalgary Art Collective! From visual arts and dance to music and theater, this creative community brings together students who want to share their passion for the arts. Join us for workshops, collaborative projects, and showcases to inspire and be inspired.",
    bannerUrl: BASE_URL + "/art gallery opening.jpg",
    leaderId: 2,
    applicationIds: [],
  },
  {
    id: 2,
    name: "Global Connectors",
    description:
      "Embrace diversity with Global Connectors, a cultural exchange group where local and international students come together to celebrate each other's cultures. Through food, festivals, and meaningful conversations, we promote global awareness and lifelong friendships.",
    bannerUrl: BASE_URL + "/Global Connectors.jpg",
    leaderId: 2,
    applicationIds: [],
  },
  {
    id: 3,
    name: "Bookmarked",
    description:
      "Calling all book lovers! Bookmarked is UofC’s official book club, open to readers of all genres. Join us for monthly book discussions, author talks, and fun reading challenges. Escape into a new world of literature with us!",
    bannerUrl: BASE_URL + "/Bookmarked.jpg",
    leaderId: 2,
    applicationIds: [],
  },
  {
    id: 4,
    name: "The Midnight Society",
    description:
      "For the night owls of UofC, The Midnight Society is your haven! Join us for late-night study sessions, cozy movie marathons, and stargazing adventures. Meet like-minded students who thrive after dark!",
    bannerUrl: BASE_URL + "/The Midnight Society.jpg",
    leaderId: 2,
    applicationIds: [],
    isPrivate: true,
  },
  {
    id: 5,
    name: "Caffeine Crusaders",
    description:
      "If you’re a coffee enthusiast, Caffeine Crusaders is the group for you! We explore Calgary’s best coffee spots, talk all things caffeine, and host study jams to keep the energy flowing. Join us for a unique blend of coffee culture and camaraderie!",
    bannerUrl:
      "https://media.istockphoto.com/id/1007194468/photo/people-drinking-coffee-high-angle-view.jpg?s=612x612&w=0&k=20&c=dIdvLUd5X_QB1Zjf0noSuno0OpZqyIN4uhzL0mLi-u8=",
    applicationIds: [],
    leaderId: 0,
  },
  {
    id: 6,
    name: "Dinos on Wheels",
    description:
      "Discover Calgary on two wheels with Dinos on Wheels! Whether you’re into casual rides or intense trails, this cycling club is for students who love exploring the city and its surroundings. Meet new friends, stay active, and enjoy the ride!",
    bannerUrl: BASE_URL + "/Dinos on Wheels.jpg",
    applicationIds: [],
    leaderId: 2,
  },
  {
    id: 7,
    name: "Cinephiles of Calgary",
    description:
      "Film buffs, unite! Cinephiles of Calgary is the go-to group for watching classic and indie films, debating blockbusters, and even trying your hand at short filmmaking. Share your love for cinema with fellow film enthusiasts!",
    bannerUrl: BASE_URL + "/Cinephiles of Calgary.jpg",
    applicationIds: [],
    leaderId: 2,
  },
  {
    id: 8,
    name: "CPSC 481",
    description:
      "Fundamental theory and practice of the design, implementation, and evaluation of human-computer interfaces. Topics include: principles of design; methods for evaluating interfaces with or without user involvement; techniques for prototyping and implementing graphical user interfaces.",
    bannerUrl:
      "https://s.brightspace.com/course-images/images/9a6e566b-3c24-4b23-8bf1-d1e90be1a208/tile-high-density-max-size.jpg",
    applicationIds: [],
    isCourse: true,
  },
  {
    id: 9,
    name: "SENG 511",
    description:
      "Analysis of methods, tools, and techniques for software process improvement and software project management as an effort to achieve quality software products.",
    bannerUrl:
      "https://s.brightspace.com/course-images/images/3df1f453-8388-488f-8670-6271097e9c81/tile-low-density-max-size.jpg",
    applicationIds: [],
    isCourse: true,
  },
  {
    id: 10,
    name: "ENSF 545",
    description:
      "Introduce VR technologies. Emphasize on engineering methodologies of creating VR systems. Characterize VR systems, hardware and software, user 3D interaction, and VR applications and future.",
    bannerUrl:
      "https://s.brightspace.com/course-images/images/933f3bb9-b9e1-403e-82e9-e4a554ae6763/tile-low-density-max-size.jpg",
    applicationIds: [],
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
    applicationIds: [],
  },
];

const forums: Forum[] = [
  {
    id: 0,
    title: "Best Type of Coffee",
    groupId: 5,
    messages: [
      {
        user: placeholderUser,
        message:
          "What’s the best type of coffee? I’m torn between a classic espresso and a good ol’ cappuccino.",
        dateTime: new Date(Date.now() - 2 * hour).toISOString(),
      },
      {
        user: testUser,
        message:
          "Espresso, hands down! Pure flavor, no distractions. Plus, you can really taste the bean’s profile.",
        dateTime: new Date(Date.now() - 0.5 * hour).toISOString(),
      },
      {
        user: placeholderUser2,
        message:
          "Espresso is great, but nothing beats a pour-over for me. The flavors are so clean and complex—totally different vibe!",
        dateTime: new Date(Date.now() - 2 * hour).toISOString(),
      },
      {
        user: placeholderUser,
        message: "Y'all are heretics.",
        dateTime: new Date(Date.now() - 1 * hour).toISOString(),
      },
    ],
  },
  {
    id: 1,
    title: "Getting Into Web Dev - Help?",
    groupId: 0,
    messages: [
      {
        user: placeholderUser2,
        message:
          "Just starting web dev and feeling lost! Should I focus on tools, languages, or frameworks first?",
        dateTime: new Date(Date.now() - 1.5 * day).toISOString(),
      },
      {
        user: placeholderUser,
        message:
          "Start with HTML, CSS, and JavaScript. Learn the basics first; frameworks like React come later. Build small projects to practice!",
        dateTime: new Date(Date.now() - 1.2 * day).toISOString(),
      },
      {
        user: testUser,
        message:
          "Agree! Also, learn Git for version control. Once you’re good with basics, try responsive design and deployment tools like Netlify.",
        dateTime: new Date(Date.now() - 1.1 * day).toISOString(),
      },
    ],
  },
  {
    id: 2,
    title: '"The Night Circus"',
    groupId: 3,
    messages: [
      {
        user: placeholderUser3,
        message:
          "Just finished The Night Circus! What did you all think? I loved the magical atmosphere, but I’m still processing that ending.",
        dateTime: new Date(Date.now() - 1.5 * day).toISOString(),
      },
      {
        user: testUser,
        message:
          "Same here! The writing was so vivid, it felt like I was there. But the romance felt a bit underdeveloped, don’t you think?",
        dateTime: new Date(Date.now() - 1.5 * day).toISOString(),
      },
      {
        user: placeholderUser,
        message:
          "Agreed. I loved the magic and the circus itself—it was like another character! But I wanted more action in the plot.",
        dateTime: new Date(Date.now() - 1.5 * day).toISOString(),
      },
      {
        user: placeholderUser3,
        message:
          "Good point about the plot. It was more about the vibe than the story. Who was your favorite character?",
        dateTime: new Date(Date.now() - 1.5 * day).toISOString(),
      },
      {
        user: testUser,
        message:
          "Celia, for sure. Her journey with the magic and her dad was so intense.",
        dateTime: new Date(Date.now() - 1.5 * day).toISOString(),
      },
    ],
  },
  {
    id: 3,
    title: "For Members of Midnight Society",
    groupId: 4,
    messages: [
      {
        user: placeholderUser2,
        message:
          "This club is private, so only members of the Midnight Society should be able to see this forum.",
        dateTime: new Date(Date.now() - 1.5 * day).toISOString(),
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
        dateTime: new Date(Date.now() - 2.2 * hour).toISOString(),
        message: "I heard you like coffee :)",
      },
      {
        user: testUser,
        dateTime: new Date(Date.now() - 2 * hour).toISOString(),
        message: "You heard right! Join the Caffeine Crusaders.",
      },
      {
        user: placeholderUser,
        dateTime: new Date(Date.now() - 0.3 * hour).toISOString(),
        message: "Joined :)",
      },
    ],
    seenIds: [1],
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
