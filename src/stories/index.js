import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import LazyObject from '../index';

import 'react-aspect-ratio/aspect-ratio.css';

storiesOf('Lazy Object', module)
  .add('Lazy Image', () => (
    <div>
      <div style={{ height: '600px' }}>Scroll down to load image</div>
      <LazyObject
        aspectRatioProps={{
          ratio: '576/1024',
          style: { maxWidth: '400px' }
        }}
        onLoad={() => action('Image loaded')}
        src='https://c1.staticflickr.com/1/427/32495946961_ce3835680c_b.jpg'
      />
    </div>
  ))
  .add('Lazy Ifame', () => (
    <div>
      <LazyObject
        aspectRatioProps={{
          ratio: '560/315',
          style: { maxWidth: '400px', marginBottom: '200px' }
        }}
        nodeName='iframe'
        onLoad={() => action('Iframe loaded, Adele Carpool Karaoke')}
        frameBorder='0'
        allowFullScreen
        src='https://www.youtube.com/embed/Nck6BZga7TQ'
      />
      <LazyObject
        aspectRatioProps={{
          ratio: '560/315',
          style: { maxWidth: '400px', marginBottom: '200px' }
        }}
        nodeName='iframe'
        onLoad={() => action('Iframe loaded, Bruno Mars Carpool Karaoke')}
        frameBorder='0'
        allowFullScreen
        src='https://www.youtube.com/embed/AFxCO_DyzYM'
      />
      <LazyObject
        aspectRatioProps={{
          ratio: '560/315',
          style: { maxWidth: '400px' }
        }}
        nodeName='iframe'
        onLoad={() => action('Iframe loaded, Chris Martin Carpool Karaoke')}
        frameBorder='0'
        allowFullScreen
        src='https://www.youtube.com/embed/SADub7W22Zg'
      />
    </div>
  )).add('Lazy Background Image', () => (
    <div>
      <div style={{ height: '600px' }}>Scroll down to load image</div>
      <LazyObject
        aspectRatioProps={{
          ratio: '576/1024',
          style: { maxWidth: '400px' }
        }}
        nodeName='div'
        onLoad={() => action('Image loaded')}
        src='https://c1.staticflickr.com/1/427/32495946961_ce3835680c_b.jpg'
      />
    </div>
  ));
