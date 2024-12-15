"use client";

import { useState } from "react";

import { useDebounceCallback } from "../useDebounceCallback";
import { useEventListener } from "../useEventListener";
import { useIsomorphicLayoutEffect } from "../useIsomorphicLayoutEffect";

/**
 * Hook options.
 * @template InitializeWithValue - If `true` (default), the hook will initialize reading the window size. In SSR, you should set it to `false`, returning `undefined` initially.
 */
type UsePageFragmentOptions<InitializeWithValue extends boolean | undefined> = {
  /**
   * If `true` (default), the hook will initialize reading the window size. In SSR, you should set it to `false`, returning `undefined` initially.
   * @default true
   */
  initializeWithValue: InitializeWithValue;
  /**
   * The delay in milliseconds before the state is updated (disabled by default for retro-compatibility).
   * @default undefined
   */
  debounceDelay?: number;
};
const IS_SERVER = typeof window === "undefined";

// SSR version of usePageFragment
export function usePageFragment(
  options: UsePageFragmentOptions<false>,
): undefined;
// CSR version of usePageFragment
export function usePageFragment(options?: UsePageFragmentOptions<true>): string;

/**
 * Custom hook that tracks the fragment (hash) part of the URL.
 * @param {?UsePageFragmentOptions} [options] - The options for customizing the behavior of the hook (optional).
 * @returns {string | undefined } The current URL fragment without the # prefix
 * @public
 *
 * @example
 * ```tsx
 * const fragment = usePageFragment();
 *
 * // Automatically updates when URL hash changes
 * useEffect(() => {
 * console.log('Current fragment:', fragment);
 * }, [[fragment]]);
 *
 * ```
 */
export function usePageFragment(
  options: Partial<UsePageFragmentOptions<boolean>> = {},
): string | undefined {
  let { initializeWithValue } = options;
  if (IS_SERVER) {
    initializeWithValue = false;
  }

  const [fragment, setFragment] = useState<string | undefined>(() => {
    if (initializeWithValue) {
      return window.location.hash;
    }
    return undefined;
  });

  const debouncedSetFragment = useDebounceCallback(
    setFragment,
    options.debounceDelay,
  );

  const handleHashChange = () => {
    const setFragmentFn = options.debounceDelay
      ? debouncedSetFragment
      : setFragment;
    setFragmentFn(window.location.hash);
  };

  useEventListener("hashchange", handleHashChange);

  // Set fragment at the first client-side render
  useIsomorphicLayoutEffect(() => {
    handleHashChange();
  }, []);

  return fragment;
}
