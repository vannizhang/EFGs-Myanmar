import { BottomPanel } from '@components/BottomPanel/BottomPanel'
import { Map } from '@components/Map/'
import { SidePanel } from '@components/SidePanel/SidePanel'
import React from 'react'

export const Layout = () => {
  return (
    <>
      <SidePanel></SidePanel>
      <Map />
    </>
  )
}
