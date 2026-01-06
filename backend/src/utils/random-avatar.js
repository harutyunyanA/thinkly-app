const avatars = [
  "https://api.dicebear.com/9.x/thumbs/svg?seed=Sophia",
  "https://api.dicebear.com/9.x/thumbs/svg?seed=Ryker",
  "https://api.dicebear.com/9.x/thumbs/svg?seed=Jocelyn",
  "https://api.dicebear.com/9.x/thumbs/svg?seed=Easton",
  "https://api.dicebear.com/9.x/thumbs/svg?seed=Liliana",
  "https://api.dicebear.com/9.x/thumbs/svg?seed=Emery",
  "https://api.dicebear.com/9.x/thumbs/svg?seed=Eliza",
  "https://api.dicebear.com/9.x/thumbs/svg?seed=Andrea",
  "https://api.dicebear.com/9.x/thumbs/svg?seed=Adrian",
  "https://api.dicebear.com/9.x/thumbs/svg?seed=Avery",
  "https://api.dicebear.com/9.x/thumbs/svg?seed=Sawyer",
  "https://api.dicebear.com/9.x/thumbs/svg?seed=Sara",
  "https://api.dicebear.com/9.x/thumbs/svg?seed=Eden",
  "https://api.dicebear.com/9.x/thumbs/svg?seed=Jack",
  "https://api.dicebear.com/9.x/thumbs/svg?seed=Aidan",
  "https://api.dicebear.com/9.x/thumbs/svg?seed=Christopher",
  "https://api.dicebear.com/9.x/thumbs/svg?seed=Katherine",
  "https://api.dicebear.com/9.x/thumbs/svg?seed=Liam",
  "https://api.dicebear.com/9.x/thumbs/svg?seed=Riley",
  "https://api.dicebear.com/9.x/thumbs/svg?seed=Luis",
];

export function randomAvatar() {
  const i = Math.floor(Math.random() * 20);
  return avatars[i];
}

