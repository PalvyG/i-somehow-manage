import { HTTPResponse } from "../utils.js";
const resHTTP = new HTTPResponse();

export const errHandler = (err, req, res, next) => {
    console.log(res.status)
    if (res.status === 404) {
        return resHTTP.notFound(res, err.message)
    } else if (res.status === 401) {
        return resHTTP.unauth(res, err.message)
    } else if (res.status === 403) {
        return resHTTP.forb(res, err.message)
    } else {
        return resHTTP.intServErr(res, err.message)
    }
}
