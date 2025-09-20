import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { url } = await request.json();
    
    if (!url || !url.startsWith('http')) {
      return NextResponse.json(
        { error: 'Invalid URL provided' },
        { status: 400 }
      );
    }

    // Fetch the job posting
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status}`);
    }

    const html = await response.text();
    
    // Extract text content from HTML
    // Remove scripts, styles, and HTML tags
    const textContent = html
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .replace(/&nbsp;/g, ' ')
      .replace(/&[a-z]+;/gi, '')
      .trim();

    // Limit length to prevent token overflow
    const maxLength = 8000;
    const truncatedContent = textContent.length > maxLength 
      ? textContent.substring(0, maxLength) + '...'
      : textContent;

    return NextResponse.json({ 
      content: truncatedContent,
      source: url 
    });

  } catch (error) {
    console.error('Error fetching job URL:', error);
    return NextResponse.json(
      { error: 'Failed to fetch job description. Please copy and paste the text directly.' },
      { status: 500 }
    );
  }
}
