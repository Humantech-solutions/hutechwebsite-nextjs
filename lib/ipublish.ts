/**
 * Fetches all published contents from the iPublish CMS.
 */
export async function getIPublishContents() {
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3NzUwYmFlYy1lOTllLTRkYzAtOTM5Yy1hYTVjMWQ1MGFhNWYiLCJvcmdfaWQiOiI0ZjdlYmE4YS05OGZjLTQyODEtODJjZi1jYmM4YzIwZmY0NWUiLCJleHAiOjE3ODc2NTg5NTZ9.5de3WJVbeHA5oXjGaj5QMW-GbNlcmVU5tXYkldLZvt0";
  try {
    const res = await fetch(`https://apis.ipublish.hutechsolutions.ai/api/v1/content/published`, {
      headers: {
        "Authorization": `Bearer ${token}`
      },
      next: { revalidate: 60 } // Revalidate every minute
    });

    if (!res.ok) {
      console.warn("[iPublish] Failed to fetch published contents:", res.status);
      return [];
    }

    const data = await res.json();
    return data || [];
  } catch (error) {
    console.error("[iPublish] Error fetching contents:", error);
    return [];
  }
}

/**
 * Fetches a single published content by ID from the iPublish CMS.
 */
export async function getIPublishContentById(id: string) {
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3NzUwYmFlYy1lOTllLTRkYzAtOTM5Yy1hYTVjMWQ1MGFhNWYiLCJvcmdfaWQiOiI0ZjdlYmE4YS05OGZjLTQyODEtODJjZi1jYmM4YzIwZmY0NWUiLCJleHAiOjE3ODc2NTg5NTZ9.5de3WJVbeHA5oXjGaj5QMW-GbNlcmVU5tXYkldLZvt0";
  try {
    const res = await fetch(`https://apis.ipublish.hutechsolutions.ai/api/v1/content/${id}`, {
      headers: {
        "Authorization": `Bearer ${token}`
      },
      next: { revalidate: 60 }
    });

    if (!res.ok) {
      console.warn(`[iPublish] Failed to fetch content ${id}:`, res.status);
      return null;
    }

    return await res.json();
  } catch (error) {
    console.error(`[iPublish] Error fetching content ${id}:`, error);
    return null;
  }
}
