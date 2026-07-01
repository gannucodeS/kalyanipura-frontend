const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

async function request(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;
  const config = {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  };

  const res = await fetch(url, config);
  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.message || `Request failed (${res.status})`);
  }

  return json.data ? json.data : json;
}

export async function getServiceTimes() {
  const res = await request('/service-times');
  return Array.isArray(res) ? res : res.data || [];
}

export async function getGallery() {
  const res = await request('/gallery');
  return Array.isArray(res) ? res : res.data || [];
}

export async function getMinistries() {
  const res = await request('/ministries');
  return Array.isArray(res) ? res : res.data || [];
}

export async function getEvents() {
  const res = await request('/events');
  return Array.isArray(res) ? res : res.data || [];
}

export async function getPrayerRequests() {
  const res = await request('/prayer-requests');
  return Array.isArray(res) ? res : res.data || [];
}

export async function submitPrayerRequest(data) {
  return request('/prayer-requests', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function prayForRequest(id) {
  return request(`/prayer-requests/${id}/pray`, { method: 'POST' });
}

export async function submitContact(data) {
  return request('/contact', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function submitGiving(data) {
  return request('/giving', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function submitRsvp(eventId, data) {
  return request(`/events/${eventId}/rsvp`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function submitMinistryInterest(ministryId, data) {
  return request('/ministry-interests', {
    method: 'POST',
    body: JSON.stringify({ ...data, ministry: ministryId }),
  });
}
