import * as React from 'react';
import { afterEach, describe, expect, test } from 'vitest';
import { render } from 'vitest-browser-react';
import { Alert } from '../components/Alert/Alert';
import { Calendar } from '../components/Calendar/Calendar';
import { DatePicker } from '../components/DatePicker/DatePicker';
import { FileUpload } from '../components/FileUpload/FileUpload';
import { Loader } from '../components/Loader/Loader';
import { Pagination } from '../components/Pagination/Pagination';
import { TimePicker } from '../components/TimePicker/TimePicker';
import { config, configure, DEFAULT_LABELS } from './config';

const q = (sel: string) => document.querySelector(sel) as HTMLElement;
const name = (sel: string) => q(sel).getAttribute('aria-label');

// configure() changes settings for the whole page; put the defaults back after each test.
afterEach(() => { configure({ locale: undefined }); config.labels = { ...DEFAULT_LABELS }; });

describe('configure({ labels })', () => {
  test('replaces the words the components say on their own', async () => {
    configure({ labels: { dismiss: 'Abaikan', previousPage: 'Sebelumnya', nextPage: 'Berikutnya', pagination: 'Halaman', page: (n) => 'Halaman ' + n, loading: 'Memuat' } });
    await render(<>
      <Alert title="Saved" onDismiss={() => {}} />
      <Pagination count={3} defaultPage={2} />
      <Loader delay={0} />
    </>);
    expect(name('.dk-alert__dismiss')).toBe('Abaikan');
    expect(name('.dk-pagination')).toBe('Halaman');
    const arrows = [...document.querySelectorAll('.dk-pagination__arrow')].map((a) => a.getAttribute('aria-label'));
    expect(arrows).toEqual(['Sebelumnya', 'Berikutnya']);
    expect(document.querySelector('[aria-current="page"]')?.getAttribute('aria-label')).toBe('Halaman 2');
    expect(name('.dk-loader')).toBe('Memuat');
  });

  test('a component prop still wins, and keys left out keep their words', async () => {
    configure({ labels: { dismiss: 'Abaikan' } });
    configure({ labels: { close: 'Tutup' } });
    await render(<>
      <Alert id="a" title="One" onDismiss={() => {}} />
      <Alert id="b" title="Two" onDismiss={() => {}} dismissLabel="Hide" />
      <FileUpload multiple />
    </>);
    expect(q('#a .dk-alert__dismiss').getAttribute('aria-label')).toBe('Abaikan');
    expect(q('#b .dk-alert__dismiss').getAttribute('aria-label')).toBe('Hide');
    expect(q('.dk-file-upload__title').textContent).toBe('Drag files here');
    expect(config.labels.close).toBe('Tutup');
  });

  test('returns the settings, and an empty label is ignored', () => {
    const now = configure({ labels: { close: '' } });
    expect(now.labels.close).toBe('Close');
    expect(now.locale).toBeUndefined();
  });
});

describe('configure({ locale })', () => {
  test('dates and times follow it when the component has no locale prop', async () => {
    configure({ locale: 'de-DE' });
    await render(<>
      <Calendar id="cal" defaultMonth={new Date(2026, 2, 1)} />
      <DatePicker id="dp" aria-label="Datum" defaultValue={new Date(2026, 2, 5)} />
      <TimePicker id="tp" aria-label="Zeit" defaultValue="14:05" />
      <DatePicker id="en" aria-label="Date" locale="en-US" defaultValue={new Date(2026, 2, 5)} />
    </>);
    expect(q('#cal').textContent).toContain('März 2026');
    // Monday first in German.
    expect(q('#cal th').getAttribute('abbr')).toBe('Montag');
    expect((q('#dp') as HTMLInputElement).value).toBe('05.03.2026');
    expect((q('#tp') as HTMLInputElement).value).toBe('14:05');
    expect((q('#en') as HTMLInputElement).value).toBe('03/05/2026');
  });
});
