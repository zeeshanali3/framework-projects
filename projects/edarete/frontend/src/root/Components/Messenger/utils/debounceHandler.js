import { debounce } from "lodash";
import { formatDisplayDate } from "./formatTime";
const debouncedScrollHandler = debounce(
  (
    containerRef,
    dayRefs,
    lastScrollPosition,
    setShowJumpToBottom,
    setLastScrollPosition,
    setCurrentLabel,
    setIsNearBottom // new
  ) => {
    const container = containerRef.current;
    if (!container) return;

    const currentScrollPos = container.scrollTop;
    const scrollHeight = container.scrollHeight;
    const clientHeight = container.clientHeight;

    // Larger threshold for comfort
    const isNearBottom = scrollHeight - currentScrollPos <= clientHeight + 300;
    setShowJumpToBottom(!isNearBottom);
    setIsNearBottom(isNearBottom); // store in state
    setLastScrollPosition(currentScrollPos);

    // Date label logic
    const entries = Object.entries(dayRefs.current);
    for (let i = entries.length - 1; i >= 0; i--) {
      const [key, el] = entries[i];
      if (el && el.getBoundingClientRect().top < 100) {
        setCurrentLabel(formatDisplayDate(key));
        break;
      }
    }
  },
  150
);

export default debouncedScrollHandler;
