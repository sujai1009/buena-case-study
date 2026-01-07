import { sendFileRequest } from "@/components/utils/sendRequest";
import { NextRequest } from "next/server";

const FILE_API_URL = `http://${process.env.API_HOST}:${process.env.API_PORT}/f`;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const pdfUri = searchParams.get('path');

  if (!pdfUri) {
    return new Response('Missing URL parameter', { status: 400 });
  }

  try {
    const response = await fetch(`${FILE_API_URL}/${pdfUri}`);
    const blob = await response.blob();

    return new Response(blob, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="download.pdf"',
      },
    });
  } catch (error) {
    return new Response('Failed to fetch PDF', { status: 500 });
  }
}

export async function POST(request: Request) {
  console.log("in file upload")
   const formData = await request.formData();
  const res = await sendFileRequest(`${FILE_API_URL}`, formData);
  console.log("Response for file POST=", res);
  return Response.json(res);
}