"use client";

import { useDebounceCallback, usePageFragment } from "@cwe/hooks";
import {
  createContext,
  useCallback,
  useContext,
  type PropsWithChildren,
} from "react";

/**
 * Fragment identifier without the '#' prefix
 * @example 'profile', 'contact', etc.
 */
export type FragmentId = string;

/**
 * Context value type containing methods for managing page fragments
 */
export interface DashboardContextValue {
  /**
   * Callback to invoke when a section becomes visible in the viewport
   * Sets the window.location.hash after a 300ms debounce
   */
  updateFragment: (fragmentId: FragmentId) => void;
  fragment: FragmentId | undefined;
}

// Create context with null as initial value
const DashboardContext = createContext<DashboardContextValue | null>(null);

/**
 * Provider component that manages page fragment state
 * Provides a debounced onVisible callback that updates window.location.hash
 */
export function DashboardProvider({ children }: PropsWithChildren) {
  const fragment = usePageFragment();
  const setHash = useCallback((fragmentId: FragmentId) => {
    window.location.hash = fragmentId;
  }, []);

  // Debounce hash updates to avoid rapid changes when scrolling
  const debouncedSetHash = useDebounceCallback(setHash, 300);

  const contextValue: DashboardContextValue = {
    updateFragment: debouncedSetHash,
    fragment,
  };

  return (
    <DashboardContext.Provider value={contextValue}>
      {children}
    </DashboardContext.Provider>
  );
}

/**
 * Hook to access the page fragment context
 * @throws Error if used outside of PageFragmentProvider
 * @returns PageFragmentContextValue containing updateFragment callback
 */
export function useDashboardContext(): DashboardContextValue {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error(
      "useDashboardContext must be used within a DashboardProvider",
    );
  }
  return context;
}
