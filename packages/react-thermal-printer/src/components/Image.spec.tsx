import fs from 'node:fs';
import type { Image as ImageData } from '@react-thermal-printer/image';
import { getPrinter } from '@react-thermal-printer/printer';
import { render } from '@testing-library/react';
import { PNG } from 'pngjs';
import { resetPrinter } from '../utils/resetPrinter';
import { Image } from './Image';

function readPNG(filename: string) {
  return new Promise<ImageData>((resolve, reject) => {
    fs.createReadStream(filename)
      .pipe(new PNG())
      .on('parsed', function onParsed(data) {
        resolve({
          data: new Uint8Array(data.buffer),
          width: this.width,
          height: this.height,
        });
      })
      .on('error', err => {
        reject(err);
      });
  });
}

it('render <img /> in DOM', () => {
  const { container } = render(<Image src="https://via.placeholder.com/300.png" />);
  const img = container.querySelector('img');
  expect(img).not.toBeNull();
  expect(img).toHaveAttribute('src', 'https://via.placeholder.com/300.png');
});

it('has ".rtp-image" css class', () => {
  const { container } = render(<Image src="https://via.placeholder.com/300.png" />);
  expect(container.querySelector('.rtp-image')).not.toBeNull();
});

it('print image', async () => {
  const src = 'fixtures/epson-thermal-printer.png';
  const actual = getPrinter({ type: 'epson' });
  const expected = getPrinter({ type: 'epson' });

  await Image.print(<Image src={src} reader={({ props: { src } }) => readPNG(src)} />, {
    printer: actual,
    width: 44,
    reset: () => resetPrinter(actual),
  });

  const png = await readPNG(src);
  expect(actual.getData()).toEqual(expected.image(png).getData());
});
