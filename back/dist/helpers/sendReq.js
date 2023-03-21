var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import fetch from "node-fetch";
export default (method, { url = "", payload, accessToken = "", params = {} }) => __awaiter(void 0, void 0, void 0, function* () {
    const urlInst = new URL(url);
    const config = {
        method,
        headers: {
            "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    };
    if (method !== "GET" && payload) {
        config.body = JSON.stringify(payload); // body data type must match "Content-Type" header
    }
    if (params) {
        Object.keys(params).forEach((key) => {
            const value = params[key];
            urlInst.searchParams.append(key, JSON.stringify(value));
        });
    }
    if (accessToken.length > 0) {
        config.headers["Authorization"] = "Bearer " + accessToken; // body data type must match "Content-Type" header
    }
    const response = yield fetch(urlInst.toString(), config);
    return response
        .json()
        .then((data) => ({ code: response.status, body: data }));
});
//# sourceMappingURL=sendReq.js.map