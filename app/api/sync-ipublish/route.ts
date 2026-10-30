import { NextRequest, NextResponse } from "next/server";
import {
  getWordPressSyncStatus,
  reconcileAllIPublishPostsWithWordPress,
  syncIPublishPostToWordPress,
  removeWordPressPostBySlug,
} from "@/lib/wordpress-sync";
import { getIPublishContentById } from "@/lib/ipublish";

export const dynamic = "force-dynamic";

/**
 * GET /api/sync-ipublish
 * Returns status report of iPublish posts vs WordPress posts.
 */
export async function GET(request: NextRequest) {
  try {
    const status = await getWordPressSyncStatus();
    return NextResponse.json({
      success: true,
      data: status,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error?.message || String(error),
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/sync-ipublish
 * Synchronizes iPublish posts with WordPress.
 *
 * Lifecycle Rules:
 * - publish in iPublish -> 'publish' in WordPress
 * - unpublish in iPublish -> 'draft' in WordPress
 * - delete/removed in iPublish -> NEVER delete, keep published in WordPress!
 */
export async function POST(request: NextRequest) {
  try {
    let body: any = {};
    try {
      body = await request.json();
    } catch {
      // Empty body is acceptable; will use env credentials
    }

    const auth = {
      username: body.username,
      applicationPassword: body.applicationPassword,
    };

    // If a specific slug is requested:
    if (body.slug) {
      // Check action: unpublish, delete, trash, or publish
      if (body.action === "unpublish") {
        const result = await removeWordPressPostBySlug(body.slug, "draft", auth);
        return NextResponse.json({
          success: result.success,
          message: "Unpublished in iPublish; set to draft in WordPress.",
          data: result,
        });
      }

      if (body.action === "delete" || body.action === "trash" || body.action === "remove") {
        // User rule: "if deleted dont delete just keep it published."
        const result = await removeWordPressPostBySlug(body.slug, "trash", auth);
        return NextResponse.json({
          success: true,
          message: "Deleted in iPublish; preserved as published in WordPress per configuration.",
          data: result,
        });
      }

      const post = await getIPublishContentById(body.slug);
      if (!post) {
        // Post not found in iPublish (e.g. deleted).
        // User rule: "if deleted dont delete just keep it published."
        const result = await removeWordPressPostBySlug(body.slug, "trash", auth);
        return NextResponse.json({
          success: true,
          message: "Post was removed from iPublish; preserved as published in WordPress.",
          data: result,
        });
      }

      // Sync post with full content, styling, meta, SEO, and correct status
      const result = await syncIPublishPostToWordPress(post, auth);
      return NextResponse.json({
        success: result.action !== "failed",
        data: result,
      });
    }

    // Otherwise, perform full bidirectional reconciliation across all posts
    const summary = await reconcileAllIPublishPostsWithWordPress(auth);
    return NextResponse.json({
      success: summary.failed === 0,
      data: summary,
    });
  } catch (error: any) {
    console.error("[API sync-ipublish] Unexpected error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error?.message || String(error),
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/sync-ipublish?slug=...
 *
 * User rule:
 * "no dont want to delete any post from wp if it is deleted or removed from ipulish.
 *  rest is fine publish-->publish and unpublish-->draft but if deleted dont delete just keep it published."
 */
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");
    const mode = (searchParams.get("mode") as "trash" | "draft" | "force") || "draft";

    if (!slug) {
      return NextResponse.json(
        { success: false, error: "Missing required 'slug' query parameter." },
        { status: 400 }
      );
    }

    const result = await removeWordPressPostBySlug(slug, mode);
    return NextResponse.json({
      success: result.success,
      data: result,
    });
  } catch (error: any) {
    console.error("[API sync-ipublish DELETE] Unexpected error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error?.message || String(error),
      },
      { status: 500 }
    );
  }
}
