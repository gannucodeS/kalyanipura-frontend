export interface ServiceTime {
  id: string;
  title: string;
  time: string;
  tagline: string;
  category: string;
  icon: 'sun' | 'moon' | 'users';
}

export interface GalleryItem {
  id: string;
  imageUrl: string;
  description: string;
  category: string;
}

export interface MinistryItem {
  id: string;
  title: string;
  description: string;
  tagline: string;
  iconName: 'smile' | 'users' | 'heart';
  detailedDescription: string;
  meetingTimes: string;
  contactEmail: string;
  volunteerNeeds: string;
}

export interface EventItem {
  id: string;
  day: string;
  month: string;
  title: string;
  time: string;
  location: string;
  description: string;
  rsvpCount: number;
}

export interface PrayerRequest {
  id: string;
  name: string;
  category: string;
  request: string;
  requestHi?: string;
  isAnonymous: boolean;
  prayedCount: number;
  isApproved: boolean;
  createdAt: string;
}
