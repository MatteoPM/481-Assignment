export type UserType = {
  avatarUrl: string;
  username: string;
};

export type ChatMessageType = {
  user: UserType;
  date: number;
  message: string;
};

export const placeholderUser: UserType = {
  avatarUrl:
    "https://i.pinimg.com/564x/cd/aa/a1/cdaaa1c1b71ab63e8ed183e970f6e61c.jpg",
  username: "John Smeeth",
};

export const placeholderUser2: UserType = {
  avatarUrl:
    "https://i.pinimg.com/736x/99/27/90/99279086833d4d0662c19f294035630b.jpg",
  username: "First Last",
};

export const placeholderUser3: UserType = {
  avatarUrl:
    "https://wallpapers-clan.com/wp-content/uploads/2023/12/danny-phantom-pfp-33.jpg",
  username: "Danny Phantom",
};
