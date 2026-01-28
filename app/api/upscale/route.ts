import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { imageBase64 } = await request.json();

    if (!imageBase64) {
      return NextResponse.json(
        { error: 'No image provided' },
        { status: 400 }
      );
    }

    // Try upscayl API
    try {
      const upscaleResponse = await fetch('https://api.upscayl.tech/upscayl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image: imageBase64,
          scale: 4,
          model: 'realesrgan-x4plus',
        }),
      });

      if (upscaleResponse.ok) {
        const upscaledData = await upscaleResponse.json();
        return NextResponse.json(upscaledData);
      }
    } catch (error) {
      console.error('Upscayl API failed:', error);
    }

    // Fallback: try alternative API
    try {
      const formData = new FormData();
      const blob = new Blob([Buffer.from(imageBase64, 'base64')], { type: 'image/jpeg' });
      formData.append('image', blob);

      const altResponse = await fetch('https://upscayl.tech/api/upscale', {
        method: 'POST',
        body: formData,
      });

      if (altResponse.ok) {
        const result = await altResponse.json();
        return NextResponse.json(result);
      }
    } catch (error) {
      console.error('Alternative API failed:', error);
    }

    // If all APIs fail, return error
    return NextResponse.json(
      { error: 'Upscaling service unavailable. Please try again later.' },
      { status: 503 }
    );

  } catch (error) {
    console.error('Upscale API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
