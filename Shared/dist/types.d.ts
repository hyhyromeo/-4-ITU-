export declare type JWTPayload = {
    id: number;
    email: string;
    icon: string;
    name: string;
    birthday: Date;
    is_admin: boolean;
    is_agent: boolean;
};
export declare type ResponseJSON<T> = {
    ok: true;
    data: T;
} | {
    ok: false;
    error: string;
};
export declare type UpdateProfilePictureResult = {
    icon: string;
    token: string;
};
export declare type addNewsAndPromotionForm = {
    image: File | null;
    title: string | null;
    description: string | null;
};
