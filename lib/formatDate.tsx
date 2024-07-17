export const formatDate = (datetime: string): string => {
  const date = new Date(datetime);
  return date.toLocaleDateString('fr-FR', {
    year: '2-digit',
    month: 'numeric',
    day: 'numeric',
  });
};
