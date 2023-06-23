import { Request } from 'express';

export const getLanguageHeader = (req: Request) => {
  const language = req.headers['accept-language'];
  const supportedLanguages = ['en', 'de'];
  if (supportedLanguages.includes(language)) {
    return language;
  }
  return 'en';
};
