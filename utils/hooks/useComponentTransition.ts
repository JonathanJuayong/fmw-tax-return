import {ReactElement, useState} from "react";

export default function useComponentTransition(elements: ReactElement[]) {
  const [activeIndex, setActiveIndex] = useState(0);
  const showNextElement = () => {
    if (activeIndex < elements.length - 1) {
      return setActiveIndex(prev => prev + 1)
    }
  }

  const showPreviousElement = () => {
    if (activeIndex > 0) {
      return setActiveIndex(prev => prev - 1)
    }
  }

  const jumpTo = (index: number) => setActiveIndex(index)

  return {
    currentElement: elements[activeIndex],
    activeIndex,
    showNextElement,
    showPreviousElement,
    jumpTo
  }
}
