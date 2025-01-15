import { useContext } from "react"
import { SharedStateContext } from "../context/SharedStateContext";

export const useSharedState = () => {
  const context = useContext(SharedStateContext);
  if(context === undefined) {
    throw new Error('useSharedState must be used within a SharedStateProvider');
  }
  return context
}