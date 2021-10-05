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

const getScrollYAndProgress = (targetElement) => {
    if (!targetElement) {
        return { scrollY: null, scrollYProgress: null }
    }

    let boundBox = targetElement.getBoundingClientRect()
    if ((window.innerHeight < boundBox.top) || ((window.innerHeight > boundBox.top) && (boundBox.top > 0))) {
        // If target element has not been scrolled over yet
        // OR, If target element is partially visible, coming from below
        return { scrollY: 0, scrollYProgress: 0 }
    } else if ((boundBox.top <= 0) && (boundBox.bottom >= 0)) { // If target element is partially visible, going above
        return { scrollY: -boundBox.top, scrollYProgress: ((-boundBox.top) / boundBox.height) }
    } else { // Element has been fully scrolled over
        return { scrollY: boundBox.height, scrollYProgress: 1 }
    }
}

const getScrollXAndProgress = (targetElement) => {
    if (!targetElement) {
        return { scrollX: null, scrollXProgress: null }
    }

    let boundBox = targetElement.getBoundingClientRect()
    if ((window.innerWidth < boundBox.left) || ((window.innerWidth > boundBox.left) && (boundBox.left > 0))) {
        // If target element has not been scrolled over yet
        // OR, If target element is partially visible, coming from below
        return { scrollX: 0, scrollXProgress: 0 }
    } else if ((boundBox.left <= 0) && (boundBox.right >= 0)) { // If target element is partially visible, going above
        return { scrollX: -boundBox.left, scrollXProgress: ((-boundBox.left) / boundBox.width) }
    } else { // Element has been fully scrolled over
        return { scrollX: boundBox.height, scrollXProgress: 1 }
    }
}

// Handles changes in target element such as transitions, or when page scrolls
const handleChange = (ref, setHeight, setwidth, setInView, setVisibleFractionX, setVisibleFractionY, setHeightVisible, setwidthVisible, setX, setY, setScrollX, setScrollXProgress, setScrollY, setScrollYProgress) => {
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

    let { scrollY, scrollYProgress } = getScrollYAndProgress(ref.current)
    setScrollY(scrollY)
    setScrollYProgress(scrollYProgress)

    let { scrollX, scrollXProgress } = getScrollXAndProgress(ref.current)
    setScrollX(scrollX)
    setScrollXProgress(scrollXProgress)
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
    // Stores scroll progress
    let { scrollY: initialScrollY, scrollYProgress: initialScrollYProgress } = getScrollYAndProgress(ref.current)
    const [scrollY, setScrollY] = useState(initialScrollY)
    const [scrollYProgress, setScrollYProgress] = useState(initialScrollYProgress)

    let { scrollX: initialScrollX, scrollXProgress: initialScrollXProgress } = getScrollXAndProgress(ref.current)
    const [scrollX, setScrollX] = useState(initialScrollX)
    const [scrollXProgress, setScrollXProgress] = useState(initialScrollXProgress)

    // Sets initial stats when Target element renders (is not null)
    useEffect(() => {
        handleChange(ref, setHeight, setwidth, setInView, setVisibleFractionX, setVisibleFractionY, setHeightVisible, setwidthVisible, setX, setY, setScrollX, setScrollXProgress, setScrollY, setScrollYProgress)
    }, [ref.current])

    //// Function that invokes change handler
    const onChange = useCallback(() => {
        handleChange(ref, setHeight, setwidth, setInView, setVisibleFractionX, setVisibleFractionY, setHeightVisible, setwidthVisible, setX, setY, setScrollX, setScrollXProgress, setScrollY, setScrollYProgress)
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
        y,
        scrollX,
        scrollXProgress,
        scrollY,
        scrollYProgress
    }
}