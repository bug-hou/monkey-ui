import { Ref, ref } from "vue"

import { tween } from "../../../utils";

export function useChange(from: number, to: number, duration: number, displayedValueRef: Ref<number>) {
  const onUpdate = (currentValue: number): void => {
    displayedValueRef.value = Math.round(currentValue)
  }
  const onFinish = (): void => {
    displayedValueRef.value = to;
  }
  tween({ to, from, onFinish, onUpdate, duration })
}

