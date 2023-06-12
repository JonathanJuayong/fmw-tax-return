import Inline from "@/components/layout/Inline";
import {Button} from "@/components/ui/button";
import {ChevronLeft, ChevronRight} from "lucide-react";
import {useMainFormContext} from "@/components/FormContextProvider";
import {BaseSyntheticEvent} from "react";

interface FormNavigationProps<T> {
  onNavigationClickHandler?: (e: BaseSyntheticEvent) => Promise<T>
  showPrevious?: boolean
  showNext?: boolean
}

export default function FormNavigation<T>(
  {
    onNavigationClickHandler,
    showPrevious = true,
    showNext = true
  }: FormNavigationProps<T>
) {
  const {showPreviousElement, showNextElement} = useMainFormContext()

  const handleShowPrevious = async (e: BaseSyntheticEvent) => {
    if (onNavigationClickHandler) {
      await onNavigationClickHandler(e)
    }
    showPreviousElement()
  }

  const handleShowNext = async (e: BaseSyntheticEvent) => {
    if (onNavigationClickHandler) {
      await onNavigationClickHandler(e)
    }
    showNextElement()
  }

  return (
    <Inline>
      {showPrevious && (
        <Button
          type="button"
          className="self-start mr-auto"
          onClick={handleShowPrevious}
        >
          <ChevronLeft/>
        </Button>
      )}
      {showNext && (
        <Button
          type="button"
          className="self-end ml-auto"
          onClick={handleShowNext}
        >
          <ChevronRight/>
        </Button>
      )}
    </Inline>
  )
}
