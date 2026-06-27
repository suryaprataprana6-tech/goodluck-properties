interface LimitRecord {
  count: number;
  resetTime: number;
}

const rateLimitCache = new Map<string, LimitRecord>();

/**
 * Basic in-memory rate-limiter for Next.js server context.
 * Default: Maximum of 5 submissions per IP every 2 minutes.
 */
export function isRateLimited(ip: string, limit = 5, windowMs = 120000): boolean {
  const now = Date.now();
  const record = rateLimitCache.get(ip);

  if (!record) {
    rateLimitCache.set(ip, {
      count: 1,
      resetTime: now + windowMs,
    });
    return false;
  }

  if (now > record.resetTime) {
    // Window has elapsed, reset count
    rateLimitCache.set(ip, {
      count: 1,
      resetTime: now + windowMs,
    });
    return false;
  }

  record.count += 1;
  if (record.count > limit) {
    return true;
  }

  return false;
}
