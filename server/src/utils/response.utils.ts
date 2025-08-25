export type StandardResponse = {
    success: boolean,
    message: string,
    data?: {} | [] | null,
    errors?: {} | [] | null
};