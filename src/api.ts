import type { ServiceTime, GalleryItem, MinistryItem, EventItem, PrayerRequest } from './types';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

async function request(endpoint: string, options: RequestInit = {}) {
  const url = `${API_BASE}${endpoint}`;
  const config: RequestInit = {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  };

  const res = await fetch(url, config);
  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.message || `Request failed (${res.status})`);
  }

  return json;
}

function mapId(item: Record<string, unknown>) {
  return { ...item, id: item._id || item.id };
}

export async function getServiceTimes(): Promise<ServiceTime[]> {
  const json = await request('/service-times');
  const items = json.data && Array.isArray(json.data) ? json.data : json;
  return Array.isArray(items) ? items.map(mapId) as ServiceTime[] : [];
}

export async function getGallery(): Promise<GalleryItem[]> {
  const json = await request('/gallery');
  const items = json.data && Array.isArray(json.data) ? json.data : json;
  return Array.isArray(items) ? items.map(mapId) as GalleryItem[] : [];
}

export async function getMinistries(): Promise<MinistryItem[]> {
  const json = await request('/ministries');
  const items = json.data && Array.isArray(json.data) ? json.data : json;
  return Array.isArray(items) ? items.map(mapId) as MinistryItem[] : [];
}

export async function getEvents(): Promise<EventItem[]> {
  const json = await request('/events');
  const items = json.data && Array.isArray(json.data) ? json.data : json;
  return Array.isArray(items) ? items.map(mapId) as EventItem[] : [];
}

export async function getPrayerRequests(): Promise<PrayerRequest[]> {
  const json = await request('/prayer-requests?sort=-createdAt');
  const items = json.data && Array.isArray(json.data) ? json.data : json;
  return Array.isArray(items) ? items.map(mapId) as PrayerRequest[] : [];
}

export async function submitPrayerRequest(data: Record<string, unknown>) {
  return request('/prayer-requests', { method: 'POST', body: JSON.stringify(data) });
}

export async function prayForRequest(id: string) {
  return request(`/prayer-requests/${id}/pray`, { method: 'POST' });
}

export async function submitContact(data: Record<string, unknown>) {
  return request('/contact', { method: 'POST', body: JSON.stringify(data) });
}

export async function submitGiving(data: Record<string, unknown>) {
  return request('/giving', { method: 'POST', body: JSON.stringify(data) });
}

export async function submitRsvp(eventId: string, data: Record<string, unknown>) {
  return request(`/events/${eventId}/rsvp`, { method: 'POST', body: JSON.stringify(data) });
}

export async function submitMinistryInterest(ministryId: string, data: Record<string, unknown>) {
  return request('/ministry-interests', { method: 'POST', body: JSON.stringify({ ...data, ministry: ministryId }) });
}
