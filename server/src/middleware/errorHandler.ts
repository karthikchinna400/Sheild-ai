import { Request, Response, NextFunction } from 'express';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction): void => {
  // Safe sanitized logging without exposing credentials or internal tokens
  console.error(`[Error] ${req.method} ${req.path} - ${err.message}`);

  if (err.name === 'MulterError') {
    if (err.code === 'LIMIT_FILE_SIZE') {
      res.status(400).json({ error: 'Image file size exceeds the 10 MB limit.' });
      return;
    }
    res.status(400).json({ error: `File upload error: ${err.message}` });
    return;
  }

  // Never expose raw stack traces to the public or client
  res.status(err.status || 500).json({
    error: err.message || 'An unexpected internal error occurred. Please try again later.',
  });
};

