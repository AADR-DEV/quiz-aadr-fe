export type AvatarCat = {
    data: {
        id: String,
        name: String,
        price: Number,
        url: String,
        type: String,
    }
}

export type AvatarInfo = {
    userId: String | undefined,
    avatarCategoryId: String,
}