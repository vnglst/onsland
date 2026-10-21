import assert from 'node:assert/strict';
import { after, test } from 'node:test';
import { fastify } from '../server.js';

after(async () => {
  await fastify.close();
});

test('renders a country page with safely serialized country data', async () => {
  const response = await fastify.inject('/country/netherlands');

  assert.equal(response.statusCode, 200);
  assert.match(response.body, /window\.__COUNTRY__ = "netherlands";/);
});

test('returns not found for unsupported country parameters', async () => {
  const response = await fastify.inject('/country/netherlands%22%3Balert(1)%2F%2F');

  assert.equal(response.statusCode, 404);
  assert.doesNotMatch(response.body, /alert\(1\)/);
});

test('renders the rankings page', async () => {
  const response = await fastify.inject('/rankings');

  assert.equal(response.statusCode, 200);
  assert.match(response.body, /id="rankingsContainer"/);
});
