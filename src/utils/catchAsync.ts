import { Request, Response, NextFunction } from "express";

export const catchAsync = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>,
) => {
  return (req: any, res: any, next: any) => {
    fn(req, res, next).catch(next);
  };
};
