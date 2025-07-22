export interface Profile {
  id: string;
  userId: string; // Owner of the profile
  name: string;
  email: string;
  phone: string;
  company?: string;
  title?: string;
  bio?: string;
  website?: string;
  linkedin?: string;
  twitter?: string;
  createdAt: Date;
  qrCode?: string;
  isShared: boolean; // Whether this profile is shared publicly
  sharedBy?: string; // User ID who shared this profile (for received profiles)
}
