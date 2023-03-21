declare const _default: (method: "GET" | "POST" | "PUT" | "DELETE", { url, payload, accessToken, params }: any) => Promise<{
    code: number;
    body: unknown;
}>;
export default _default;
