import { NextRequest } from 'next/server';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const imageUrl = searchParams.get('url');
    
    if (!imageUrl) {
      return Response.json({ error: 'URL parameter is required' }, { status: 400 });
    }

    // Validate that it's a Google image URL for security
    if (!imageUrl.includes('googleusercontent.com') && !imageUrl.includes('googleapis.com')) {
      return Response.json({ error: 'Invalid image source' }, { status: 400 });
    }

    // Fetch the image from Google
    const imageResponse = await fetch(imageUrl, {
      headers: {
        'User-Agent': 'ScanCycle/1.0',
      },
    });

    if (!imageResponse.ok) {
      return Response.json({ error: 'Failed to fetch image' }, { status: imageResponse.status });
    }

    const imageBuffer = await imageResponse.arrayBuffer();
    const contentType = imageResponse.headers.get('content-type') || 'image/jpeg';

    return new Response(imageBuffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=86400', // Cache for 24 hours
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error) {
    console.error('Error proxying image:', error);
    return Response.json({ error: 'Failed to proxy image' }, { status: 500 });
  }
}