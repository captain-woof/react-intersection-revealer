import React, { useCallback, useEffect, useState } from 'react'

//// Functions to get visibility stats
const isElementInView = (targetElement) => {
    if (!targetElement) { // If element is null
        return false
    }
    let boundBox = targetElement.getBoundingClientRect()
    return ((boundBox.top < window.innerHeight) && (boundBox.left < window.innerWidth))
}

const getEleVisibleX = (targetElement) => {
    if (!targetElement) { // If element is null
        return 0
    }
    let boundBox = targetElement.getBoundingClientRect()
    if (!isElementInView(targetElement)) {
        return 0
    } else if (boundBox.right <= window.innerWidth) {
        return 1
    } else {
        return ((window.innerWidth - boundBox.left) / boundBox.width)
    }
}

const getEleVisibleY = (targetElement) => {
    if (!targetElement) { // If element is null
        return 0
    }
    let boundBox = targetElement.getBoundingClientRect()
    if (!isElementInView(targetElement)) {
        return 0
    } else if (boundBox.bottom <= window.innerHeight) {
        return 1
    } else {
        return ((window.innerHeight - boundBox.top) / boundBox.height)
    }
}

// Below function takes the ref to the element/component that needs to be tracked
export const useIntersectionRevealer = (ref) => {

    // Gets the target element
    const [targetElement, setTargetElement] = useState(ref.current)
    useEffect(() => {
        setTargetElement(ref.current)
        setInView(isElementInView(ref.current))
        setVisibleFractionX(getEleVisibleX(ref.current))
        setVisibleFractionY(getEleVisibleY(ref.current))
    }, [ref.current])

    //// States for tracking data
    // stores element visibility (boolean)
    const [inView, setInView] = useState(isElementInView(targetElement))
    // Stores y-axis visibility (fraction)
    const [visibleFractionX, setVisibleFractionX] = useState(getEleVisibleX(targetElement))
    // Stores y-axis visibility (fraction)
    const [visibleFractionY, setVisibleFractionY] = useState(getEleVisibleY(targetElement))

    //// Hook on to window scroll event
    const handleScroll = useCallback(() => {
        setInView(isElementInView(targetElement))
        setVisibleFractionX(getEleVisibleX(targetElement))
        setVisibleFractionY(getEleVisibleY(targetElement))
    }, [])
    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => { window.removeEventListener('scroll', handleScroll) }
    }, [handleScroll])

    //// Return stats
    return { inView, visibleFractionX, visibleFractionY }
}