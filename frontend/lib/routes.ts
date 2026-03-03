/**
 * Centralized application routes
 * Use these constants instead of hardcoding paths
 */

export const ROUTES = {
  HOME: "/",
  DASHBOARD: "/dashboard",
  CHECK_CAMERA: "/check-camera",
  INTERVIEW: {
    SETUP: "/interview/setup",
    CAMERA_CHECK: "/interview/camera-check",
    LIVE: "/interview/live",
    FEEDBACK: "/interview/feedback",
  },
} as const;

/**
 * Build interview live URL with type query param
 */
export function interviewLiveUrl(type: string): string {
  return `${ROUTES.INTERVIEW.LIVE}?type=${encodeURIComponent(type)}`;
}
