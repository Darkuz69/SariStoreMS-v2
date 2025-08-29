export type StandardRequest = {
    resource: string,
    action: string,
    payload: Record<string, unknown>,
    meta: {
        requestedBy: string,
        timestamp: Date,
    }
};