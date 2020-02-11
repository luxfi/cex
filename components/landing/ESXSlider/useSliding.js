import { useState, useRef, useEffect } from 'react'

const PADDINGS = 110

const useSliding = (elementWidth, countElements) => {
  const containerRef = useRef(null)
  const [containerWidth, setContainerWidth] = useState(0)
  const [distance, setDistance] = useState(0)
  const [totalInViewport, setTotalInViewport] = useState(0)
  const [viewed, setViewed] = useState(0)

  useEffect(() => {
    const containerWidth = containerRef.current.clientWidth - PADDINGS
    setContainerWidth(containerWidth)
    setTotalInViewport(Math.floor(containerWidth / elementWidth))
  }, [containerRef.current])
  // },)

  const recalc = () => {
    const containerWidth = containerRef.current.clientWidth - PADDINGS
    setContainerWidth(containerWidth)
    const totalInViewport = Math.floor(containerWidth / elementWidth)
    setTotalInViewport(totalInViewport)
    return { containerWidth, totalInViewport }
  }

  const handlePrev = () => {
    const { containerWidth, totalInViewport } = recalc()
    setViewed(viewed - totalInViewport)
    setDistance(distance + containerWidth)
  }

  const handleNext = () => {
    const { containerWidth, totalInViewport } = recalc()
    setViewed(viewed + totalInViewport)
    setDistance(distance - containerWidth)
  }

  const slideProps = {
    style: { transform: `translate3d(${distance}px, 0, 0)` }
  }

  const hasPrev = distance < 0
  const hasNext = (viewed + totalInViewport) < countElements

  return { handlePrev, handleNext, slideProps, containerRef, hasPrev, hasNext }
}

export default useSliding
