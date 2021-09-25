import { useCallback, useEffect, useState } from 'react'

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

const getHeightWidthAndVisible = (targetElement) => {
    let boundBox = targetElement.getBoundingClientRect()
    return ({
        height: boundBox.height,
        width: boundBox.width,
        heightVisible: getEleVisibleY(targetElement) * boundBox.height,
        widthVisible: getEleVisibleX(targetElement) * boundBox.width,
    })
}

//// Hook on to window scroll event
const handleScroll = (ref, setInView, setVisibleFractionX, setVisibleFractionY, setHeight, setwidth, setHeightVisible, setwidthVisible) => {
    setInView(isElementInView(ref.current))
    setVisibleFractionX(getEleVisibleX(ref.current))
    setVisibleFractionY(getEleVisibleY(ref.current))

    let { height, heightVisible, width, widthVisible } = getHeightWidthAndVisible(ref.current)
    setHeight(height)
    setwidth(width)
    setHeightVisible(heightVisible)
    setwidthVisible(widthVisible)
}

// Below function takes the ref to the element/component that needs to be tracked
export const useIntersectionRevealer = (ref) => {
    //// States for tracking data
    // stores element visibility (boolean)
    const [inView, setInView] = useState(isElementInView(ref.current))
    // Stores y-axis visibility (fraction)
    const [visibleFractionX, setVisibleFractionX] = useState(getEleVisibleX(ref.current))
    // Stores y-axis visibility (fraction)
    const [visibleFractionY, setVisibleFractionY] = useState(getEleVisibleY(ref.current))
    // Stores height and width, and their absolute visibility
    const [height, setHeight] = useState()
    const [width, setwidth] = useState()
    const [heightVisible, setHeightVisible] = useState()
    const [widthVisible, setwidthVisible] = useState()

    useEffect(() => {
        setInView(isElementInView(ref.current))
        setVisibleFractionX(getEleVisibleX(ref.current))
        setVisibleFractionY(getEleVisibleY(ref.current))

        let { height, heightVisible, width, widthVisible } = getHeightWidthAndVisible(ref.current)
        setHeight(height)
        setwidth(width)
        setHeightVisible(heightVisible)
        setwidthVisible(widthVisible)
    }, [ref.current])

    //// Hook on to window scroll event
    const onScroll = useCallback(() => {
        handleScroll(ref, setInView, setVisibleFractionX, setVisibleFractionY, setHeight, setwidth, setHeightVisible, setwidthVisible)
    }, [ref])
    useEffect(() => {
        window.addEventListener('scroll', onScroll)
        return () => { window.removeEventListener('scroll', onScroll) }
    }, [])

    //// Return stats
    return {
        inView,
        visibleFractionX,
        visibleFractionY,
        height,
        width,
        heightVisible,
        widthVisible
    }
}