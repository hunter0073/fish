/**
 * Mock API layer — simulates an async backend (e.g. the base44 data service).
 * Every getter returns a Promise that resolves after a short, deterministic
 * delay so pages can exercise real loading / error states.
 *
 * Swap the bodies of these functions for real `fetch()` calls to go live;
 * the page-facing contract (Promise<T>) stays identical.
 */

const DEFAULT_DELAY = 350;

/** Resolve `data` after a simulated network round-trip. */
export function mockFetch<T>(data: T, delayMs: number = DEFAULT_DELAY): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), delayMs);
  });
}

/** Reject after a delay — handy for manually testing error states. */
export function mockFail(message: string, delayMs: number = DEFAULT_DELAY): Promise<never> {
  return new Promise((_, reject) => {
    setTimeout(() => reject(new Error(message)), delayMs);
  });
}
