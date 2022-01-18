import React from 'react'
import styled from 'styled-components'
import Component from './Layout'

import { Section } from 'components/Section'

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: ${({ theme }) => theme.colors.gray['800']};
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
`

export default {
  title: '@algodex/components',
  component: Component,
  argTypes: {
    rowHeight: {
      control: { type: 'range', min: 0, max: 100 }
    }
  },
  decorators: [
    (Story) => (
      <Container>
        <Story />
      </Container>
    )
  ]
}

const Template = (args) => <Component {...args} />

export const Layout = Template.bind({})
Layout.parameters = {
  layout: 'fullscreen',
  controls: {
    include: [
      'rowHeight',
      'sidebarCollapsed',
      'sidebarExpanded',
      'controlsCollapsed',
      'controlsExpanded',
      'footerCollapsed'
    ]
  }
}
Layout.args = {
  asset: {
    id: 15322902,
    deleted: false,
    txid: 'NOFSUK4EXHFFXJK3ZA6DZMGE6CAGQ7G5JT2X7FYTYQBSQEBZHY4Q',
    timestamp: 1618666459,
    decimals: 6,
    name: 'LAMP',
    txns: 377155,
    fullName: 'Lamps',
    circulating: 99989339745,
    verified: false,
    url: null,
    total: 100000000000
  },
  rowHeight: 70,
  sidebarCollapsed: false,
  sidebarExpanded: false,
  controlsCollapsed: false,
  controlsExpanded: true,
  footerCollapsed: false,

  components: {
    Sidebar: (props) => <Section {...props}>Sidebar</Section>,
    Footer: (props) => <Section {...props}>Footer</Section>,
    Content: (props) => <Section {...props}>Content</Section>,
    Controls: (props) => <Section {...props}>Controls</Section>
  }
}
export const MobileLayout = Template.bind({})
MobileLayout.parameters = {
  layout: 'fullscreen',
  controls: {
    include: [
      'rowHeight',
      'sidebarCollapsed',
      'sidebarExpanded',
      'controlsCollapsed',
      'controlsExpanded',
      'footerCollapsed'
    ]
  }
}
MobileLayout.args = {
  asset: {
    id: 15322902,
    deleted: false,
    txid: 'NOFSUK4EXHFFXJK3ZA6DZMGE6CAGQ7G5JT2X7FYTYQBSQEBZHY4Q',
    timestamp: 1618666459,
    decimals: 6,
    name: 'LAMP',
    txns: 377155,
    fullName: 'Lamps',
    circulating: 99989339745,
    verified: false,
    url: null,
    total: 100000000000
  },
  rowHeight: 85,
  sidebarCollapsed: true,
  sidebarExpanded: false,
  controlsCollapsed: true,
  controlsExpanded: true,
  footerCollapsed: false,

  components: {
    Sidebar: (props) => <Section {...props}>Sidebar</Section>,
    Footer: (props) => <Section {...props}>Footer</Section>,
    Content: (props) => <Section {...props}>Content</Section>,
    Controls: (props) => <Section {...props}>Controls</Section>
  }
}
