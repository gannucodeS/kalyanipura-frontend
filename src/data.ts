import type { ServiceTime, GalleryItem, MinistryItem, EventItem } from './types';

export const SERVICE_TIMES: ServiceTime[] = [
  { id: '1', title: 'Sunday Worship', time: '9:00 AM & 11:00 AM', tagline: 'LIVE & ONLINE', category: 'SANCTUARY', icon: 'sun' },
  { id: '2', title: 'Wednesday Prayer', time: '7:00 PM', tagline: 'MID-WEEK RENEWAL', category: 'CHAPEL', icon: 'moon' },
  { id: '3', title: 'Youth Fellowship', time: 'Saturdays at 5:00 PM', tagline: 'GRADES 7–12', category: 'YOUTH HALL', icon: 'users' }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  { id: 'g1', imageUrl: 'https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=1200&q=80', description: 'Sunday morning fellowship and coffee in the courtyard lounge.', category: 'Fellowship' },
  { id: 'g2', imageUrl: 'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?auto=format&fit=crop&w=1200&q=80', description: 'Our beautifully designed sanctuary chapel glowing warmly during twilight.', category: 'Architecture' },
  { id: 'g3', imageUrl: 'https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?auto=format&fit=crop&w=1200&q=80', description: 'Serene sunset view framing the church grounds, invoking peaceful wonder.', category: 'Worship' },
  { id: 'g4', imageUrl: 'https://images.unsplash.com/photo-1438032005730-c779502df39b?auto=format&fit=crop&w=1200&q=80', description: 'A view from the back pews as natural sunlight illuminates the sanctuary.', category: 'Interior' }
];

export const MINISTRIES: MinistryItem[] = [
  { id: 'm1', title: "Children's Ministry", description: "Nurturing the youngest hearts in a safe, fun, and Christ-centered environment every Sunday morning.", tagline: "WELCOME HOME CHILDS", iconName: "smile", detailedDescription: "Kalyanipura Kids is our dedicated children's ministry where kids of all ages (newborn through 5th grade) can discover God's love through age-appropriate stories, creative crafts, energetic worship, and small group discussions.", meetingTimes: "Every Sunday at 9:00 AM & 11:00 AM", contactEmail: "kids@kalyanipurachurch.org", volunteerNeeds: "We are always looking for warm small group leaders, welcoming check-in hosts, and creative teachers." },
  { id: 'm2', title: "Small Groups", description: "Doing life together. Join a local group for fellowship, prayer, and deep biblical study in homes across the city.", tagline: "WALK TOGETHER", iconName: "users", detailedDescription: "Growth happens best in relationships. Our Small Groups are cozy gatherings of 8 to 15 people that meet weekly or bi-weekly — studying scripture, sharing meals, seeking prayer, and supporting one another.", meetingTimes: "Dispersed schedule (Mon–Fri evenings, various homes)", contactEmail: "smallgroups@kalyanipurachurch.org", volunteerNeeds: "Host homes and group facilitators are needed as we continue launching new circles across Kalyanipura." },
  { id: 'm3', title: "Outreach & Missions", description: "Being the hands and feet of Jesus in our local community and supporting missions across the globe.", tagline: "SERVE OTHERS", iconName: "heart", detailedDescription: "Kalyanipura Outreach partners with local food pantries, shelter homes, and rehabilitation programs. We also directly sponsor field missionaries globally to support development, medical aid, and spiritual education.", meetingTimes: "First Saturday of each month (Outreach days) & seasonal trips", contactEmail: "missions@kalyanipurachurch.org", volunteerNeeds: "Active volunteers for our monthly food drive, shelter lunch servers, and global mission trip applicants." }
];

export const EVENTS: EventItem[] = [
  { id: 'e1', day: '24', month: 'OCT', title: 'Harvest Community Festival', time: '4:00 PM – 8:00 PM', location: 'Main Courtyard', description: 'Join us for an evening of celebration, seasonal food, and community games for all ages. Perfect for families looking to connect!', rsvpCount: 142 },
  { id: 'e2', day: '02', month: 'NOV', title: "Men's Breakfast & Study", time: '8:00 AM – 10:00 AM', location: 'Fellowship Hall', description: 'A morning of great food and even better conversation as we dive deep into our current biblical study series together.', rsvpCount: 57 },
  { id: 'e3', day: '24', month: 'DEC', title: 'Christmas Candlelight Service', time: '6:00 PM & 8:00 PM', location: 'Main Sanctuary', description: 'Gather with us for a beautiful candlelit evening celebrating the birth of Christ through traditional carols, beautiful choir arrangements, and a heartfelt message.', rsvpCount: 310 }
];
