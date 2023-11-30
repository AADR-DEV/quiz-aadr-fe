export type InterfaceUser = {
    idToken: String,
    user: {
        id: String,
        name: String,
        email: String,
        photo: String,
    },
};

export type AllUserDiamond = {
    data: {
        username: string | undefined,
        mainAvatar: string | undefined,
        total_diamonds: number
    }
}


// interface UserResponse {
//     id: string;
//     name: string;
//     username: string;
//     email: string;
//     mainAvatar: string;
//     avatars: string[];
//     diamonds: Diamond[];
//     total_diamonds: number;
//     total_spent: number;
//     message: string;
//   }
  
//   interface Diamond {
//     id: string;
//     diamondCategory: {
//       id: string;
//       name: string;
//       price: number;
//       amount: number;
//     };
//   }
  
//   // Contoh penggunaan
//   const user: UserResponse = {
//     id: "567b3cb0-a094-4158-9fea-ad24d63becf8",
//     name: "testuser2",
//     username: "testuserUpdate",
//     email: "testuser2@gmail.com",
//     mainAvatar: "premium_fox",
//     avatars: [],
//     diamonds: [
//       {
//         id: "85ad1724-a408-428e-8f6e-230b3ef2468f",
//         diamondCategory: {
//           id: "44f301ab-f65d-442d-84d9-856a2be8ed31",
//           name: "ultra_rare_pack",
//           price: 150000,
//           amount: 1500,
//         },
//       },
//     ],
//     total_diamonds: 1500,
//     total_spent: 150000,
//     message: "User successfully authenticated",
//   };
  