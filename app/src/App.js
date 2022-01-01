import React from 'react'
import Demo from './components/DemoComponent'
import {Typography, Container} from '@mui/material'
import UiMessages from './components/UiMessages/UiMessages'

export default function App() {
  return (
      <React.Fragment>
        <header>
          <Container>
            <Typography variant={'overline'}>
              Demo
            </Typography>
            <Typography variant={'h1'}>
              React-Mui-Sw
            </Typography>
          </Container>
        </header>
        <UiMessages/>
        <Demo/>
      </React.Fragment>
  )
}




