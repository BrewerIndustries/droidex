import { useEffect, useRef, useState } from 'react';

interface Options {
  /** How far down the page must be before hiding is allowed at all. */
  offset?: number;
  /** Movement below this is treated as jitter and ignored. */
  delta?: number;
}

/**
 * True while the page is being scrolled *down*, false the moment it turns back up.
 *
 * For a bar that should get out of the way while reading and come back the
 * instant you reach for it. The turn is what it watches, not the position:
 * from the bottom of 87 droids, one flick upward brings the bar down rather
 * than making you scroll all the way to the top to reach it.
 *
 * Only the window is watched. Above the `lg` breakpoint the collection panel
 * scrolls inside itself while the page does not move at all, and the bar is on
 * screen the whole time — hiding it as the list scrolled would take away a
 * control that was never in the way.
 */
export function useHideOnScroll({ offset = 96, delta = 6 }: Options = {}) {
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    lastY.current = window.scrollY;

    // Deliberately not coalesced into an animation frame. The handler reads one
    // already-computed value and hands React a boolean it mostly ignores as
    // unchanged, so there is nothing to save — and a "frame pending" flag has a
    // failure mode this does not: when frames stop coming, as they do in a
    // background tab, the flag stays set and every later scroll is dropped.
    const onScroll = () => {
      const y = window.scrollY;
      const moved = y - lastY.current;

      // Near the top the bar sits in its own space, so there is nothing to gain
      // by hiding it and it should never flicker there.
      if (y <= offset) {
        lastY.current = y;
        setHidden(false);
        return;
      }

      // Small movements are a thumb resting, or the bounce at the end of a
      // fling. Reacting to those makes the bar flicker.
      if (Math.abs(moved) < delta) return;

      lastY.current = y;
      setHidden(moved > 0);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [offset, delta]);

  return hidden;
}
