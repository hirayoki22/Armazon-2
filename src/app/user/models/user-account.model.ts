export interface UserAccount {
  avatarUrl?: string;
  firstName: string;
  lastName: string;
  fullName: string;
  mobile: string;
  username: string;
  email: string;
  signupDate: Date;
  accountRole: 'ADMIN' | 'USER' | 'BUYER'
}