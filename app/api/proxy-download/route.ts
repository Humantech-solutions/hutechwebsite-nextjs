import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');

  if (!url) {
    return new NextResponse('Missing url', { status: 400 });
  }

  try {
    let fetchUrl = url;
    
    // Auto-convert Google Docs edit URLs to PDF export URLs
    if (fetchUrl.includes('docs.google.com/document/d/') && fetchUrl.includes('/edit')) {
      fetchUrl = fetchUrl.replace(/\/edit.*$/, '/export?format=pdf');
    }

    const response = await fetch(fetchUrl);
    
    if (!response.ok) {
      return new NextResponse(`Failed to fetch upstream: ${response.statusText}`, { status: response.status });
    }

    const blob = await response.blob();
    return new NextResponse(blob, {
      headers: {
        'Content-Type': response.headers.get('Content-Type') || 'application/pdf',
        'Content-Disposition': `attachment; filename="document.pdf"`
      }
    });
  } catch (error) {
    console.error("[Proxy Download] Error:", error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
