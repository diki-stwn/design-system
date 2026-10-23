import * as React from 'react';
import { act } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { renderToString } from 'react-dom/server';
import { composeStories } from '@storybook/react-vite';
import { afterEach, describe, expect, test, vi } from 'vitest';
import * as ALL_ICONS from '../material/icons';
import { registerIcons } from '../icons';

// Server rendering, then hydration in the browser, for every story: the HTML the server sends must be what the
// first client render produces. A mismatch makes React throw the server HTML away and render again (a flash, lost
// focus and input), and only shows as a console error, so nothing else catches it. Ids from useId, dates, random
// values and reading window or localStorage during render are the usual causes.
registerIcons(ALL_ICONS);

type Stories = Record<string, unknown>;
const files = import.meta.glob<Stories>('../components/*/*.stories.tsx', { eager: true });
const cases = Object.entries(files).flatMap(([file, mod]) => {
  const composed = composeStories(mod as Parameters<typeof composeStories>[0]) as Record<string, React.ComponentType & { tags?: string[] }>;
  const component = file.split('/')[2];
  return Object.entries(composed)
    .filter(([, Story]) => !(Story.tags || []).includes('!hydration'))
    .map(([name, Story]) => [`${component} ${name}`, Story] as const);
});

const roots: { unmount: () => void }[] = [];
afterEach(() => { act(() => { for (const r of roots.splice(0)) r.unmount(); }); document.body.replaceChildren(); vi.restoreAllMocks(); });

describe('every story hydrates without a mismatch', () => {
  test.each(cases)('%s', async (_name, Story) => {
    const html = renderToString(<Story />);
    const box = document.createElement('div');
    box.innerHTML = html;
    document.body.appendChild(box);
    const errors: string[] = [];
    const error = vi.spyOn(console, 'error').mockImplementation((...a: unknown[]) => { errors.push(a.map(String).join(' ')); });
    await act(async () => {
      roots.push(hydrateRoot(box, <Story />, { onRecoverableError: (e) => errors.push(String((e as Error)?.message || e)) }));
    });
    error.mockRestore();
    expect(errors.filter((e) => /hydrat|did not match|server rendered/i.test(e))).toEqual([]);
  });
});
