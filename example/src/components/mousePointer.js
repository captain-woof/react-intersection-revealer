import { MouseStyle } from "../styles/mousePointerStyle"
import React, { useCallback } from "react"
import { useEffect, useState } from "react"

export default function MousePointer({ vanish }) {

    const [x, setX] = useState(window.innerWidth / 2)
    const [y, setY] = useState(window.innerHeight / 2)

    const handleMouseMove = useCallback((e) => {
        setX(e.pageX)
        setY(e.pageY)
    }, [])

    useEffect(() => {
        document.addEventListener('mousemove', handleMouseMove)
        return () => { document.removeEventListener('mousemove', handleMouseMove) }
    }, [handleMouseMove])

    return (
        <MouseStyle vanish={vanish} style={{ top: y, left: x }} />
    )
}