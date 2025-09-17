import { useEffect, useRef } from "react";

type ParamsType = {
  onChange: () => void;
};

const useObserveDocument = ({ onChange }: ParamsType) => {
  const observerRef = useRef<MutationObserver | null>(null);

  useEffect(() => {
    observerRef.current = new MutationObserver(() => {
      onChange();
    });

    observerRef.current.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, [onChange]);
};

export default useObserveDocument;
