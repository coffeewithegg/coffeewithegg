import { nearEquals } from "../../number";

/**
 * Scroll to the given element with the given options and call the callback function when the scroll is finished.
 * @param element The element to scroll to
 * @param options The scroll options
 * @param callback The callback function to call when the scroll is finished
 * @example
 * ```ts
 * const element = document.getElementById("my-element");
 * scrollToWithCallback(element, { top: 0, behavior: "smooth" }, () => {
 *  console.log("Scrolling finished");
 *  });
 *  ```
 **/
export function scrollToWithCallback(
  element: HTMLElement,
  options: ScrollToOptions,
  callback?: () => void,
) {
  const onScroll = () => {
    // Remove the event listener after the scroll event has been triggered
    if (!nearEquals(element.scrollTop, options.top || 0, 0.01)) {
      return;
    }
    element.removeEventListener("scroll", onScroll);
    callback?.();
  };
  element.addEventListener("scroll", onScroll);
  onScroll();
  element.scrollTo(options);
}
