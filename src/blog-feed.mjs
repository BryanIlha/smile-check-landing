export function parseBlogFeed(value, product) {
  if (!value || value.schemaVersion !== 1 || !Array.isArray(value.articles)) throw new Error('Feed inválido');
  const ids = new Set();
  return value.articles.map(item => {
    if (!item || !Array.isArray(item.products) || !item.products.includes(product) || !['news', 'patch-notes'].includes(item.kind)) throw new Error('Produto inválido');
    for (const key of ['id', 'title', 'summary', 'date', 'status', 'availabilityNote', 'url']) {
      if (typeof item[key] !== 'string' || !item[key].trim()) throw new Error('Artigo inválido');
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(item.date) || Number.isNaN(Date.parse(item.date))) throw new Error('Data inválida');
    const url = new URL(item.url);
    if (url.origin !== 'https://hawksbi.com.br' || !/^\/blog\/[a-z0-9-]+\/$/.test(url.pathname) || url.search || url.hash || url.username || url.password) throw new Error('URL inválida');
    if (ids.has(item.id)) throw new Error('Artigo duplicado');
    ids.add(item.id);
    return item;
  }).sort((a, b) => b.date.localeCompare(a.date) || a.id.localeCompare(b.id));
}
