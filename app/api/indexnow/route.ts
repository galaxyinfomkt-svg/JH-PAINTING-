import { NextResponse } from 'next/server'

// IndexNow API key - also needs to be in public folder as {key}.txt
const INDEXNOW_KEY = 'jhpaintingservices2025'

export async function POST(request: Request) {
  try {
    const { urls } = await request.json()

    if (!urls || !Array.isArray(urls) || urls.length === 0) {
      return NextResponse.json({ error: 'URLs array required' }, { status: 400 })
    }

    // Submit to IndexNow (Bing, Yandex, etc.)
    const response = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        host: 'jhpaintingservices.com',
        key: INDEXNOW_KEY,
        keyLocation: `https://jhpaintingservices.com/${INDEXNOW_KEY}.txt`,
        urlList: urls.slice(0, 10000), // Max 10,000 URLs per request
      }),
    })

    if (response.ok || response.status === 200 || response.status === 202) {
      return NextResponse.json({
        success: true,
        message: 'URLs submitted to IndexNow',
        urlsSubmitted: urls.length,
      })
    }

    return NextResponse.json({
      error: 'IndexNow submission failed',
      status: response.status,
    }, { status: response.status })

  } catch (error) {
    console.error('IndexNow error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'IndexNow API endpoint',
    usage: 'POST with { "urls": ["https://jhpaintingservices.com/page1", ...] }',
  })
}
