export type DiamondCategory = {
    id: string;
    name: string;
    price: number;
    amount: number;
};

export type DiamondCategoryResponse = {
    data: DiamondCategory[];
    message: string;
};

export type DiamondInfo = {
    userId: string;
    diamondCategoryId: string | undefined;
};

