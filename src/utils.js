import { dirname } from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcrypt';

export const __dirname = dirname(fileURLToPath(import.meta.url));


export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const isValidPassword = (password, user) => bcrypt.compareSync(password, user.password);

export const newTicketCode = async () => {
  return Date.now().toString(36) + Math.floor(Math.pow(10, 12) + Math.random() * 9 * Math.pow(10, 12)).toString(36)
}

const statusHTTP = {
  notFound: 404,
  unauthorized: 401,
  forbidden: 403,
  internalServerError: 500
};

export class HTTPResponse {
  notFound(res, data) {
    return res.status(statusHTTP.notFound).json({
      status: statusHTTP.notFound,
      message: '(!) Data not found.',
      error: data
    });
  };

  unauth(res, data) {
    return res.status(statusHTTP.unauthorized).json({
      status: statusHTTP.unauthorized,
      message: '(!) Your credentials are invalid. Please, use valid credentials.',
      error: data
    });
  };

  forb(res, data) {
    return res.status(statusHTTP.forbidden).json({
      status: statusHTTP.forbidden,
      message: '(!) You are not authorized to access this endpoint.',
      error: data
    });
  };

  intServErr(res, data) {
    return res.status(statusHTTP.internalServerError).json({
      status: statusHTTP.internalServerError,
      message: '(!) Whoops, something went wrong on our end! Please, try again later.',
      error: data
    });
  };
};