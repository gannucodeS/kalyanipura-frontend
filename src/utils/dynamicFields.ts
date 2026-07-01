import type { Lang } from '../i18n/translations';

export function df(item: Record<string, any> | null | undefined, field: string, lang: Lang): string {
  if (!item) return '';
  const hiField = field + 'Hi';
  if (lang === 'hi' && item[hiField]) return item[hiField];
  return item[field] ?? '';
}
