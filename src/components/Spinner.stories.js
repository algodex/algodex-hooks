import {default as Component} from './Spinner';
import React from 'react';
import styled from '@emotion/styled';
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: #F8FAFC;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 0;
  margin: 0;
`;
export default {
  title: '@algodex/components/Spinner',
  component: Component,
  parameters: {layout: 'fullscreen'},
  argTypes: {
    color: {
      options: [
        '#EDF2F6',
        '#E2E8F0',
        '#CBD5E0',
        '#A1AEC0',
        '#4A5568',
      ],
      control: {type: 'select'},
    },
    flex: {
      options: [true, false],
      control: {type: 'radio'},
    },
    size: {
      control: {type: 'range', min: 1, max: 10},
    },
  },
  decorators: [
    (Story) => (
      <Container>
        <Story />
      </Container>
    ),
  ],
};

const Template = (args) => <Component {...args} />;

export const Spinner = Template.bind({});
Spinner.args = {
  color: 'gray.600',
  flex: true,
  size: 5,
};
