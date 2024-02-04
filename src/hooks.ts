import { EffectCallback, DependencyList, useRef, useEffect } from "react";

export function useEffectOnce(effect: EffectCallback, deps?: DependencyList) {
  const effectRan = useRef(false);

  useEffect(() => {
    if (import.meta.env.PROD || !effectRan.current) {
      effect();
    }

    return () => {
      effectRan.current = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
