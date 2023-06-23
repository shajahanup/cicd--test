import { Request } from 'express';

export const getLangFromBody = (req: Request) => {
  const language = req.body.lang;
  if (language == 'en') return 'En';
  else return 'De';
};
