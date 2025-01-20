export class AppError extends Error {
  constructor(
    message: string,
    public code: string,
    public status: number = 400
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export const handleApiError = (error: unknown): AppError => {
  if (error instanceof AppError) {
    return error;
  }

  if (error instanceof Error) {
    return new AppError(
      error.message,
      'UNKNOWN_ERROR',
      500
    );
  }

  return new AppError(
    'An unknown error occurred',
    'UNKNOWN_ERROR',
    500
  );
};

export const isApiError = (error: unknown): error is AppError => {
  return error instanceof AppError;
}; 