import { sendRequest } from "@/components/utils/sendRequest";
import { Unit } from "@/components/types/app.types";
import { HttpMethods } from "@/components/types/http.methods";

const UNIT_API_URL = `http://${process.env.API_HOST}:${process.env.API_PORT}/u`;

export async function GET(req: any) {
  const url = new URL(req.url);
  const searchParams = new URLSearchParams(url.searchParams);
  const buildingId = searchParams.get("buildingId");
  
  const data = await sendRequest(`${UNIT_API_URL}?buildingId=${buildingId}`)
  const units = data.data as Unit[];
  console.log("Response for unit GET = ", units);
  return Response.json(units)
}

export async function POST(request: Request) {
  const body = await request.json();
  const res = await sendRequest(`${UNIT_API_URL}`, HttpMethods.POST, JSON.stringify(body));
  console.log("Response for unit POST=", res);

  return Response.json(res);
}

export async function DELETE(req: any) {
  const url = new URL(req.url);
  const searchParams = new URLSearchParams(url.searchParams);
  const id = searchParams.get("id");

  const res = await fetch(`${UNIT_API_URL}/` + id, { method: 'DELETE' });
  console.log("Response for unit DELETE=", res);
  return Response.json(res);
}

export async function PUT(request: Request) {
  const body = await request.json();
  const res = await sendRequest(`${UNIT_API_URL}`, HttpMethods.PUT, JSON.stringify(body));

  console.log("Response for unit PUT=", res);
  return Response.json(res);
}