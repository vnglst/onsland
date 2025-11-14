import { useEffect, useRef, useState } from 'preact/hooks';

export function useIntersectionObserver(options = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observerOptions = {
      root: null,
      rootMargin: options.rootMargin || '200px',
      threshold: options.threshold || 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        setIsIntersecting(entry.isIntersecting);
        if (entry.isIntersecting && !hasIntersected) {
          setHasIntersected(true);
        }
      });
    }, observerOptions);

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [options.rootMargin, options.threshold, hasIntersected]);

  return [elementRef, isIntersecting, hasIntersected];
}
