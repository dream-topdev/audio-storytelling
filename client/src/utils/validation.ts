export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): string[] => {
  const errors: string[] = [];
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  
  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  
  return errors;
};

export const validateSignupData = (
  email: string,
  password: string,
  confirmPassword: string
): string[] => {
  const errors: string[] = [];

  if (!validateEmail(email)) {
    errors.push('Invalid email address');
  }

  errors.push(...validatePassword(password));

  if (password !== confirmPassword) {
    errors.push('Passwords do not match');
  }

  return errors;
}; 