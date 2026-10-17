export function cn(...classes: (string | undefined | null | false | Record<string, boolean>)[]) {
  return classes
    .map(c => {
      if (!c) return '';
      if (typeof c === 'string') return c;
      return Object.entries(c)
        .filter(([, val]) => Boolean(val))
        .map(([key]) => key)
        .join(' ');
    })
    .filter(Boolean)
    .join(' ');
}
