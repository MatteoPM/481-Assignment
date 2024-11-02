export type UserType = {
  avatarUrl: string;
  username: string;
  status: "online" | "offline" | "away";
};

export type ChatMessageType = {
  user: UserType;
  date: number;
  message: string;
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
