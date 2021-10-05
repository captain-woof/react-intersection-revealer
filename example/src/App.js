// Package imports
import React, { useCallback, useRef } from 'react'
import { useIntersectionRevealer } from 'react-intersection-revealer'

// Styles
import { IndexContainerStyle } from './styles/indexContainerStyle'
import { IndexTextStyle } from './styles/indexTextStyle'
import { IndexTextStyle2 } from './styles/indexTextStyle2'
import { IndexBoxStyle } from './styles/indexBoxStyle'
import { GlobalStyle } from './styles/globalStyle'
import { Button, IndexHeaderStyle, PackageNameText, ButtonContainer } from './styles/indexHeaderStyle'
import { useEffect, useState } from 'react'
import MousePointer from './components/mousePointer'

export default function App() {
  // Reference for the black box
  const boxRef = useRef()

  // Passing ref to hook and getting states
  const { inView, heightVisible, x, y } = useIntersectionRevealer(boxRef)

  // For demo
  const [showStats, setShowStats] = useState(false)
  const allowShowingStats = useCallback(() => {
    setShowStats(true)
    window.removeEventListener('scroll', allowShowingStats)
  }, [])
  useEffect(() => {
    window.addEventListener('scroll', allowShowingStats)
  }, [allowShowingStats])
  useEffect(() => {
    window.addEventListener('resize', allowShowingStats)
  }, [allowShowingStats])

  // For mouse pointer
  const [vanish, setVanish] = useState(false)

  // EXP
  const refContainer = useRef()
  const { scrollYProgress } = useIntersectionRevealer(refContainer)
  useEffect(() => {
    console.log(scrollYProgress)
  }, [scrollYProgress])

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
          ? <>
            <div><b>Black box stats:</b></div>
            <div>{`Rendered at (${Math.round(x)}px, ${Math.round(y)}px)`}</div>
            <div>{`Visible: ${inView}`}</div>
            <div>{`Visible height: ${Math.round(heightVisible)}px`}</div>
          </>
          : <div>Scroll or resize the window to see the black box's visibility stats</div>
        }
      </IndexTextStyle>

      <IndexTextStyle2>
        <div>{`You scrolled through ${Math.round(scrollYProgress * 100)}% of the 1st container`}</div>
      </IndexTextStyle2>

      <IndexContainerStyle ref={refContainer} bgColor="#C59cee">
        <IndexBoxStyle ref={boxRef} />
      </IndexContainerStyle>

      <IndexContainerStyle />
    </>
  )
}
