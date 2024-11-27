import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get('url'); // Get the original image URL from query params

  if (!url) {
    return NextResponse.json({ error: 'URL is required' }, { status: 400 });
  }

  try {
    // Fetch the image from the original server
    const response = await fetch(url, {
      headers: {
        // Include any headers necessary for the original request
      },
    });

    // Check if the request was successful
    if (!response.ok) {
      throw new Error(`Failed to fetch from the original URL: ${response.statusText}`);
    }

    // Return the fetched content with CORS headers
    const imageBuffer = await response.arrayBuffer();
    return new NextResponse(imageBuffer, {
      status: response.status,
      headers: {
        'Content-Type': response.headers.get('Content-Type') || 'image/jpeg',
        'Access-Control-Allow-Origin': '*', // Allow all origins
      },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
