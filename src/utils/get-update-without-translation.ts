import { Request } from 'express-serve-static-core';
import { getLangFromBody } from './get-lang-from-body';

export const getUpdateWithoutTranslation = (req: Request, keys: string[]) => {
  const body = req.body;
  const updateBody: Object = {};
  const language = getLangFromBody(req);

  for (const property in body) {
    if (keys.includes(property)) {
      updateBody[`${property}${language}`] = body[property];
    } else {
      updateBody[property] = body[property];
    }
  }

  return updateBody;
};
