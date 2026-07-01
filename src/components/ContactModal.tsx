import { useState } from 'react';
import { X, Mail, Phone, MapPin, Clock, Check, Send } from 'lucide-react';
import { submitContact } from '../api';
import { useLanguage } from '../i18n/LanguageContext';
import { t } from '../i18n/translations';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}
const TOPICS = ['General Inquiry', 'Prayer Request', 'Volunteering', 'Baptism', 'Membership', 'Pastoral Counsel'];

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const { lang } = useLanguage();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('General Inquiry');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  if (!isOpen) return null;

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      setSuccess(false);
      setName('');
      setEmail('');
      setMessage('');
      onClose();
    }, 300);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;
    try {
      await submitContact({ name, email, topic, message });
      setSuccess(true);
      setTimeout(() => { handleClose(); }, 3500);
    } catch {}
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-start sm:items-center justify-center p-4 bg-[#1a1625]/60 backdrop-blur-md overflow-y-auto modal-overlay ${isClosing ? 'closing' : ''}`}>
      <div className={`w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 space-y-6 sm:space-y-8 relative shd-card-lg my-4 modal-content ${isClosing ? 'closing' : ''}`}>
        <button onClick={handleClose}
          className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#6b5c93]/5 text-[#6b6580] hover:text-[#1a1625] transition cursor-pointer">
          <X className="w-4 h-4" />
        </button>
        <div>
          <span className="label-tag mb-3 block">{t('contactModal', 'getInTouch', lang)}</span>
          <h2 className="heading-md text-[#1a1625]">{t('contactModal', 'contactUs', lang)}</h2>
          <div className="w-10 h-[3px] mt-3 rounded-full bg-gradient-to-r from-[#e07a68] to-[#7b6ba3] shimmer-line" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {/* Info */}
          <div className="space-y-6">
            <p className="text-sm text-[#6b6580] leading-relaxed">{t('contactModal', 'description', lang)}</p>
            <div className="space-y-3">
              {[
                { Icon: Mail, text: 'hello@kalyanipurachurch.org' },
                { Icon: Phone, text: '(555) 123-4567' },
                { Icon: MapPin, text: t('contactModal', 'address', lang) },
                { Icon: Clock, text: t('contactModal', 'hours', lang) },
              ].map(({ Icon, text }) => (
                <div key={text} className="flex items-center gap-3 text-sm text-[#6b6580]">
                  <div className="w-8 h-8 rounded-lg bg-[#6b5c93]/5 flex items-center justify-center shrink-0">
                    <Icon className="w-3.5 h-3.5 text-[#6b5c93]" />
                  </div>
                  {text}
                </div>
              ))}
            </div>
            <div className="bg-[#6b5c93]/5 rounded-xl p-4 space-y-1">
              <span className="label-tag text-[0.55rem] block">{t('contactModal', 'sundayService', lang)}</span>
              <div className="font-semibold text-[#1a1625] text-sm">9:00 AM & 11:00 AM</div>
              <div className="text-xs text-[#6b6580]">Main Sanctuary &middot; {t('contactModal', 'alsoAvailable', lang)}</div>
            </div>
          </div>
          {/* Form */}
          {!success ? (
            <form onSubmit={handleSubmit} className="space-y-3">
              <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder={t('contactModal', 'yourFullName', lang)} className="input" />
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder={t('contactModal', 'emailAddress', lang)} className="input" />
              <select value={topic} onChange={e => setTopic(e.target.value)} className="input cursor-pointer">
                {TOPICS.map(t => <option key={t}>{t}</option>)}
              </select>
              <textarea value={message} onChange={e => setMessage(e.target.value)} placeholder={t('contactModal', 'yourMessage', lang)} rows={4} className="input resize-none" />
              <button type="submit"
                className="inline-flex items-center justify-center gap-2 w-full bg-[#6b5c93] text-white font-semibold text-xs uppercase tracking-wider px-6 py-3 rounded-xl cursor-pointer transition-all duration-300 hover:bg-[#4a3d6e]"
                style={{ fontFamily: 'var(--font-heading)' }}>
                <Send className="w-4 h-4" /> {t('contactModal', 'sendMessage', lang)}
              </button>
            </form>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
              <div className="w-14 h-14 rounded-full bg-[#6b5c93]/10 flex items-center justify-center">
                <Check className="w-7 h-7 text-[#6b5c93]" />
              </div>
              <h3 className="heading-md text-[#1a1625]">{t('contactModal', 'messageSent', lang)}</h3>
              <p className="text-sm text-[#6b6580] text-center">{t('contactModal', 'messageSentMsg', lang)}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
