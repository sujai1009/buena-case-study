import { downloadFile, sendFileRequest, sendRequest } from "@/components/utils/sendRequest";
import { promisify } from "util";
import stream from 'stream';
import { NextRequest } from "next/server";

const pipeline = promisify(stream.pipeline);

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const pdfUri = searchParams.get('path');

  if (!pdfUri) {
    return new Response('Missing URL parameter', { status: 400 });
  }

  const downloadUrl = `http://localhost:3001/${pdfUri}`

  try {
    const response = await fetch(downloadUrl);
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

export async function GET1(req: any, res: any) {
  console.log("Rquest for file GET=");
  const url = new URL(req.url);
  const searchParams = new URLSearchParams(url.searchParams);
  const path = searchParams.get("path");
  
  const downloadUrl = `http://localhost:3001/${path}`
  // console.log(downloadUrl);
  // const data = await downloadFile(downloadUrl);
  // console.log(data);

  const fileBlob = await fetch(new URL(downloadUrl), {
    headers: {
    },
  }).then((res) => res.blob());

  // This is the key part - set the headers to tell the browser to download the file
  const headers = new Headers();
  // remember to change the filename here
  headers.append("Content-Disposition", 'attachment; filename="test.pdf"');
  headers.append("Content-Type", "application/pdf");

  return new Response(await fileBlob.arrayBuffer(), {
    headers,
  });
}

export async function POST(request: Request) {
  console.log("in file upload")
   const formData = await request.formData();
  const res = await sendFileRequest("http://localhost:3001/f", formData);
  console.log("Response for file POST=", res);
  return Response.json(res);
}