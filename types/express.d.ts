import "express";

declare global {
  namespace Express {
    interface Request {
      requestTime?: string; // Add custom properties here
    }
  }
}

export {};
