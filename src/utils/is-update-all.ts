import { Request } from 'express';
import { getLanguageHeader } from './get-lang-header';

export const isUpdateAll = (req: Request) => {
  const language = req.body.lang;
  const languageHeader = getLanguageHeader(req);
  if (language !== languageHeader) {
    return false;
  }
  return true;
};
