// Package imports
import React, { useCallback, useRef } from 'react'
import { useIntersectionRevealer } from 'react-intersection-revealer'

// Styles
import { IndexContainerStyle } from './styles/indexContainerStyle'
import { IndexTextStyle } from './styles/indexTextStyle'
import { IndexBoxStyle } from './styles/indexBoxStyle'
import { GlobalStyle } from './styles/globalStyle'
import { Button, IndexHeaderStyle, PackageNameText, ButtonContainer } from './styles/indexHeaderStyle'
import { useEffect, useState } from 'react'
import MousePointer from './components/mousePointer'

export default function App() {
  // Reference for the black box
  const boxRef = useRef()

  // Passing ref to hook and getting states
  const { inView, heightVisible } = useIntersectionRevealer(boxRef)

  // For demo
  const [showStats, setShowStats] = useState(false)
  const handleScroll = useCallback(() => {
    setShowStats(true)
  }, [])
  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => { window.removeEventListener('scroll', handleScroll) }
  }, [handleScroll])

  // For mouse pointer
  const [vanish, setVanish] = useState(false)

  return (
    <>
      <GlobalStyle />
      <MousePointer vanish={vanish} />
      <IndexHeaderStyle>
        <PackageNameText>react-intersection-revealer</PackageNameText>
        <ButtonContainer>
          <Button onMouseEnter={() => { setVanish(true) }} onMouseLeave={() => { setVanish(false) }} href="https://github.com/captain-woof/react-intersection-revealer" target="_blank">
            Github
          </Button>
          <Button onMouseEnter={() => { setVanish(true) }} onMouseLeave={() => { setVanish(false) }} href="https://github.com/captain-woof/react-intersection-revealer/blob/master/README.md" target="_blank">
            README
          </Button>
        </ButtonContainer>
      </IndexHeaderStyle>

      <IndexTextStyle>
        {showStats
          ? <><div>{`Visible: ${inView}`}</div>
            <div>{`Visible height: ${Math.round(heightVisible)}px`}</div></>
          : <div>Scroll to see the black box's visibility stats</div>
        }
      </IndexTextStyle>

      <IndexContainerStyle>
        <IndexBoxStyle ref={boxRef} />
      </IndexContainerStyle>

      <IndexContainerStyle>
        
      </IndexContainerStyle>
    </>
  )
}
