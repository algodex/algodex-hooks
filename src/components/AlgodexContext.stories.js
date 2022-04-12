import React from 'react';
import {Provider} from './AlgodexContext';

export default {
  title: '@algodex/algodex-hooks/AlgodexContext',
  component: Component,
};

export const AlgodexContext = (...args)=>(
  <Provider {...args}>Context</Provider>
);
