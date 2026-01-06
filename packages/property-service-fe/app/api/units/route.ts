import { sendRequest } from "@/components/utils/sendRequest";
import { Unit } from "@/components/types/app.types";
import { HttpMethods } from "@/components/types/http.methods";

export async function GET(req: any) {
  const url = new URL(req.url);
  const searchParams = new URLSearchParams(url.searchParams);
  const buildingId = searchParams.get("buildingId");
  
  const data = await sendRequest('http://localhost:3001/u?buildingId=' + buildingId)
  const units = data.data as Unit[];
  console.log("Response for unit GET = ", units);
  return Response.json(units)
}

export async function POST(request: Request) {
  const body = await request.json();
  const res = await sendRequest("http://localhost:3001/u", HttpMethods.POST, JSON.stringify(body));
  console.log("Response for unit POST=", res);

  return Response.json(res);
}

export async function DELETE(req: any) {
  const url = new URL(req.url);
  const searchParams = new URLSearchParams(url.searchParams);
  const id = searchParams.get("id");

  const res = await fetch("http://localhost:3001/u/" + id, { method: 'DELETE' });
  console.log("Response for unit DELETE=", res);
  return Response.json(res);
}

export async function PUT(request: Request) {
  const body = await request.json();
  const res = await sendRequest("http://localhost:3001/u", HttpMethods.PUT, JSON.stringify(body));

  console.log("Response for unit PUT=", res);
  return Response.json(res);
}