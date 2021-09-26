import { useCallback, useEffect, useState } from 'react'

//// Functions to get visibility stats
const isElementInView = (targetElement) => {
    if (!targetElement) { // If element is null
        return false
    }
    let boundBox = targetElement.getBoundingClientRect()
    return ((boundBox.top < window.innerHeight) && (boundBox.left < window.innerWidth) && (boundBox.bottom >= 0))
}

const getEleVisibleX = (targetElement) => {
    if (!targetElement) { // If element is null
        return null
    }
    let boundBox = targetElement.getBoundingClientRect()
    if (!isElementInView(targetElement)) {
        return 0
    } else if ((boundBox.right <= window.innerWidth) && (boundBox.right >= 0) && (boundBox.left <= window.innerWidth) && (boundBox.left >= 0)) {
        return 1
    } else {
        return Math.min(
            ((window.innerWidth - boundBox.left) / boundBox.width),
            (boundBox.right / boundBox.width)
        )
    }
}

const getEleVisibleY = (targetElement) => {
    if (!targetElement) { // If element is null
        return null
    }
    let boundBox = targetElement.getBoundingClientRect()
    if (!isElementInView(targetElement)) {
        return 0
    } else if ((boundBox.bottom <= window.innerHeight) && (boundBox.bottom >= 0) && (boundBox.top <= window.innerHeight) && (boundBox.top >= 0)) {
        return 1
    } else {
        return Math.min(
            ((window.innerHeight - boundBox.top) / boundBox.height),
            (boundBox.bottom / boundBox.height)
        )
    }
}

const getHeightWidthAndVisible = (targetElement) => {
    if (!targetElement) {
        return ({
            heightVisible: null,
            widthVisible: null,
        })
    }

    let boundBox = targetElement.getBoundingClientRect()
    return ({
        heightVisible: getEleVisibleY(targetElement) * boundBox.height,
        widthVisible: getEleVisibleX(targetElement) * boundBox.width,
    })
}

const getNewWidthHeight = (targetElement) => {
    if (!targetElement) {
        return ({
            height: null,
            width: null
        })
    }

    let boundBox = targetElement.getBoundingClientRect()
    return ({
        height: boundBox.height,
        width: boundBox.width
    })
}

const getXY = (targetElement) => {
    if (!targetElement) {
        return {
            x: null,
            y: null
        }
    }

    let boundBox = targetElement.getBoundingClientRect()
    return {
        x: window.scrollX + boundBox.left,
        y: window.scrollY + boundBox.top
    }
}

// Handles changes in target element such as transitions, or when page scrolls
const handleChange = (ref, setHeight, setwidth, setInView, setVisibleFractionX, setVisibleFractionY, setHeightVisible, setwidthVisible, setX, setY) => {
    setInView(isElementInView(ref.current))
    setVisibleFractionX(getEleVisibleX(ref.current))
    setVisibleFractionY(getEleVisibleY(ref.current))

    let { heightVisible, widthVisible } = getHeightWidthAndVisible(ref.current)
    setHeightVisible(heightVisible)
    setwidthVisible(widthVisible)

    let { x, y } = getXY(ref.current)
    setX(x)
    setY(y)

    let { height, width } = getNewWidthHeight(ref.current)
    setHeight(height)
    setwidth(width)
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
    const [height, setHeight] = useState(getNewWidthHeight(ref.current).height)
    const [width, setwidth] = useState(getNewWidthHeight(ref.current).width)
    const [heightVisible, setHeightVisible] = useState(getHeightWidthAndVisible(ref.current).heightVisible)
    const [widthVisible, setwidthVisible] = useState(getHeightWidthAndVisible(ref.current).widthVisible)
    // Stores targetElement's x,y
    const [x, setX] = useState(getXY(ref.current).x)
    const [y, setY] = useState(getXY(ref.current).y)

    // Sets initial stats when Target element renders (is not null)
    useEffect(() => {
        setInView(isElementInView(ref.current))
        setVisibleFractionX(getEleVisibleX(ref.current))
        setVisibleFractionY(getEleVisibleY(ref.current))

        let { heightVisible, widthVisible } = getHeightWidthAndVisible(ref.current)
        let { height, width } = getNewWidthHeight(ref.current)
        let { x, y } = getXY(ref.current)
        setHeight(height)
        setwidth(width)
        setHeightVisible(heightVisible)
        setwidthVisible(widthVisible)
        setX(x)
        setY(y)
    }, [ref.current])

    //// Function that invokes change handler
    const onChange = useCallback(() => {
        handleChange(ref, setHeight, setwidth, setInView, setVisibleFractionX, setVisibleFractionY, setHeightVisible, setwidthVisible, setX, setY)
    }, [ref])

    //// Hook on to window scroll event
    useEffect(() => {
        window.addEventListener('scroll', onChange)
        return () => { window.removeEventListener('scroll', onChange) }
    }, [])

    //// Hook on to targetElement's transition
    useEffect(() => {
        ref.current?.addEventListener('transitionend', onChange)
        return () => { ref.current?.removeEventListener('transitionend', onChange) }
    }, [])

    //// Hook on to window resize
    useEffect(() => {
        window.addEventListener('resize', onChange)
        return () => { window.removeEventListener('resize', onChange) }
    }, [])

    //// Return stats
    return {
        inView,
        visibleFractionX,
        visibleFractionY,
        height,
        width,
        heightVisible,
        widthVisible,
        x,
        y
    }
}