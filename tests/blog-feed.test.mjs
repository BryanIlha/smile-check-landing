import assert from 'node:assert/strict';
import test from 'node:test';
import { parseBlogFeed } from '../src/blog-feed.mjs';
const article = { id: 'visto-exemplo', products: ['visto'], kind: 'patch-notes', title: 'Uma melhoria real', summary: 'Descrição para o usuário.', date: '2026-10-13', status: 'Em preparação', availabilityNote: 'Publicação pendente.', url: 'https://hawksbi.com.br/blog/visto-exemplo/' };
const feed = articles => ({ schemaVersion: 1, articles });
test('preserves availability and sorts public entries by date', () => {
  const older = { ...article, id: 'older', date: '2026-10-08', url: 'https://hawksbi.com.br/blog/older/' };
  assert.deepEqual(parseBlogFeed(feed([older, article]), 'visto').map(x => x.id), ['visto-exemplo', 'older']);
  assert.equal(parseBlogFeed(feed([article]), 'visto')[0].availabilityNote, 'Publicação pendente.');
});
test('empty product feed is valid', () => assert.deepEqual(parseBlogFeed(feed([]), 'visto'), []));
test('rejects entries from a different product', () => assert.throws(() => parseBlogFeed(feed([article]), 'agendo')));
test('rejects unknown schema and duplicate entries', () => {
  assert.throws(() => parseBlogFeed({schemaVersion: 2, articles: []}, 'visto'));
  assert.throws(() => parseBlogFeed(feed([article, article]), 'visto'));
});
test('rejects executable, external and credential-bearing URLs', () => {
  for (const url of ['javascript:alert(1)', 'https://evil.example/blog/post/', 'https://secret@hawksbi.com.br/blog/post/', 'https://hawksbi.com.br/blog/post/?secret=value']) assert.throws(() => parseBlogFeed(feed([{...article, url}]), 'visto'));
});
test('rejects missing availability or invalid dates', () => {
  assert.throws(() => parseBlogFeed(feed([{...article, status: ''}]), 'visto'));
  assert.throws(() => parseBlogFeed(feed([{...article, date: 'invalid'}]), 'visto'));
});
test('supports a post associated with multiple products', () => assert.equal(parseBlogFeed(feed([{...article, products:['visto','agendo']}]), 'agendo').length, 1));
