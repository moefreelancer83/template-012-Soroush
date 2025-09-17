import { useEffect, useRef } from "react";

const useAbortController = () => {
  const controllerRef = useRef<AbortController | null>(null);
  useEffect(() => {
    const controller = new AbortController();
    controllerRef.current = controller;

    return () => {
      controller?.abort();
    };
  }, []);

  return controllerRef.current;
};

export default useAbortController;
