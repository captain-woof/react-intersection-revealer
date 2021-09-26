# react-intersection-revealer

<p align="center">
  <img width="640" height="232" src="https://drive.google.com/uc?export=download&id=1tJxmTfwqaCCKnDlcFNIA7S85ijLJdvvO">
</p>

![GitHub search hit counter](https://img.shields.io/github/search/captain-woof/react-intersection-revealer/goto?color=%23ffee00) ![npm bundle size](https://img.shields.io/bundlephobia/minzip/react-intersection-revealer?color=%236969b3) ![npm](https://img.shields.io/npm/dm/react-intersection-revealer?color=%2351ae17) ![NPM](https://img.shields.io/npm/l/react-intersection-revealer?color=%23f55d3e) ![npm](https://img.shields.io/npm/v/react-intersection-revealer?color=%2366101f)

> Think `react-intersection-observer`, but with more features.

## Introduction

**`react-intersection-revealer` is a easy-to-use React hook that tells you whether a component/element is visible on the viewport currently, and if yes, how much of it is visible.** The stats get updated when a relevant event occurs.

## Install

Installing is easy. Do it like any other package.

```bash
npm install --save react-intersection-revealer
```

## Quick Start

This example below is enough to get you started on how to use `react-intersection-revealer`.

```jsx
import React, {useRef} from 'react'
import {useIntersectionRevealer} from 'react-intersection-revealer'

export default function YourAwesomeComponent(){
  const ref = useRef()
  const {heightVisible} = useIntersectionRevealer(ref)

  return(
    <>
      <div className="need-to-track" ref={ref}>...</div>
      <p>{`${heightVisible}px (height) of the tracked element is on screen`}</p>
    </>
  )
}
```
**Here's a [demo](https://sohail-saha.in/react-intersection-revealer/) to show `react-intersection-revealer`'s capabilities.**

## Usage

**The `useIntersectionRevealer` hook provides you with 9 states that hold stats of the target element:**

- **inView** *(Boolean)*: True if the element is visible, even if only partially. False otherwise.
- **visibleFractionX** *(Decimal)*: Fraction of the element's width which is visible; range: [0,1].
- **visibleFractionY** *(Decimal)*: Fraction of the element's height which is visible; range: [0,1].
- **height** *(Decimal)*: The element's height, in pixels.
- **width** *(Decimal)*: The element's width, in pixels.
- **heightVisible** *(Decimal)*: The width (pixels) of the element's height which is visible.
- **widthVisible** *(Decimal)*: The width (pixels) of the element's width which is visible.
- **x** *(Decimal)*: The x coordinate (pixels) of the element from origin where it's rendered.
- **y** *(Decimal)*: The y coordinate (pixels) of the element from origin where it's rendered.

**These stats get updated on any of these events:**
  - Viewport resize *(window - onresize)*
  - Page scroll *(window - onscroll)*
  - Target element transition-end *(targetElement - ontransitionend)*

**The hook requires a reference to the element to be tracked.** Use the `useRef` hook (from React), get a reference, and pass it to both the `useIntersectionRevealer` hook and the element/component you want to track.

That's all you need to do.

**Take a look at the [demo site](https://sohail-saha.in/react-intersection-revealer/), and [its source code](https://github.com/captain-woof/react-intersection-revealer/tree/master/example) to get an idea.**

## License

MIT © [captain-woof](https://github.com/captain-woof)

## Author

**[Sohail Saha (aka CaptainWoof)](https://sohail-saha.in)**

[![Buy me a coffee](https://img.buymeacoffee.com/button-api/?text=Buy%20me%20a%20coffee&emoji=&slug=captainwoof&button_colour=FFDD00&font_colour=000000&font_family=Lato&outline_colour=000000&coffee_colour=ffffff)](https://www.buymeacoffee.com/captainwoof)

*Please consider supporting me if you find this package useful in your work.*
