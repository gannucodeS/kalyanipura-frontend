import { useState } from 'react';
import { X, Mail, Phone, MapPin, Clock, Check, Send } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}
const TOPICS = ['General Inquiry', 'Prayer Request', 'Volunteering', 'Baptism', 'Membership', 'Pastoral Counsel'];

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('General Inquiry');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;
    setSuccess(true);
    setTimeout(() => { setSuccess(false); setName(''); setEmail(''); setMessage(''); onClose(); }, 3500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-4 bg-[#1a1625]/50 backdrop-blur-sm overflow-y-auto">
      <div className="w-full max-w-2xl bg-white border border-[#e5e0ec] p-8 space-y-8 relative my-4">
        <button onClick={onClose} className="absolute top-5 right-5 text-[#8a8299] hover:text-[#1a1625] transition cursor-pointer">
          <X className="w-5 h-5" />
        </button>
        <div>
          <div className="label mb-2">Get in Touch</div>
          <h2 className="h3 text-[#1a1625]">Contact Us</h2>
          <div className="divider w-10 mt-3" style={{ background: '#7b6ba3' }} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {/* Info */}
          <div className="space-y-6">
            <p className="text-sm text-[#4a4456] leading-relaxed">We'd love to hear from you. Our team responds within 24 hours.</p>
            <div className="space-y-3">
              {[
                { Icon: Mail, text: 'hello@kalyanipurachurch.org' },
                { Icon: Phone, text: '(555) 123-4567' },
                { Icon: MapPin, text: '123 Serenity Way, Kalyanipura' },
                { Icon: Clock, text: 'Mon–Sat, 9 AM – 5 PM' },
              ].map(({ Icon, text }) => (
                <div key={text} className="flex items-center gap-3 text-sm text-[#4a4456]">
                  <Icon className="w-4 h-4 text-[#7b6ba3] shrink-0" /> {text}
                </div>
              ))}
            </div>
            <div className="border border-[#e5e0ec] p-4 space-y-1">
              <div className="label text-[10px]">Sunday Service</div>
              <div className="font-semibold text-[#1a1625] text-sm">9:00 AM & 11:00 AM</div>
              <div className="text-xs text-[#8a8299]">Main Sanctuary · Also available online</div>
            </div>
          </div>
          {/* Form */}
          {!success ? (
            <form onSubmit={handleSubmit} className="space-y-3">
              <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Your full name" className="input-field w-full" />
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email address" className="input-field w-full" />
              <select value={topic} onChange={e => setTopic(e.target.value)} className="input-field w-full cursor-pointer">
                {TOPICS.map(t => <option key={t}>{t}</option>)}
              </select>
              <textarea value={message} onChange={e => setMessage(e.target.value)} placeholder="Your message..." rows={4} className="input-field w-full resize-none" />
              <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2">
                <Send className="w-4 h-4" /> Send Message
              </button>
            </form>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
              <div className="w-14 h-14 border-2 border-[#7b6ba3] flex items-center justify-center">
                <Check className="w-7 h-7 text-[#7b6ba3]" />
              </div>
              <h3 className="h3 text-[#1a1625]">Message Sent!</h3>
              <p className="text-sm text-[#4a4456] text-center">We'll get back to you within 24 hours. Blessings!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
