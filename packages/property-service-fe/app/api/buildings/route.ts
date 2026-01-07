import { sendRequest } from "@/components/utils/sendRequest";
import { Building } from "@/components/types/app.types";
import { HttpMethods } from "@/components/types/http.methods";

const BUILDING_API_URL = `http://${process.env.API_HOST}:${process.env.API_PORT}/b`;

export async function GET(req: any) {
  const url = new URL(req.url);
  const searchParams = new URLSearchParams(url.searchParams);
  const propertyId = searchParams.get("propertyId");
  console.log("Response for building GET=", propertyId)
  console.log("BUILDING_API_URL=" , BUILDING_API_URL);
  const data = await sendRequest(`${BUILDING_API_URL}?propertyId=${propertyId}`)
  const buildings = data.data as Building[];
  console.log("Response for building GET=", buildings)
  return Response.json(buildings);
}

export async function POST(request: Request) {
  const body = await request.json();
  const res = await sendRequest(`${BUILDING_API_URL}`, HttpMethods.POST, JSON.stringify(body));

  console.log("Response for building POST=", res);
  return Response.json(res);
}

export async function DELETE(req: any) {
  const url = new URL(req.url);
  const searchParams = new URLSearchParams(url.searchParams);
  const id = searchParams.get("id");

  const res = await fetch(`${BUILDING_API_URL}/` + id, { method: 'DELETE' });
  console.log("Response for building DELETE=", res);
  return Response.json(res);
}

export async function PUT(request: Request) {
  const body = await request.json();
  const res = await sendRequest(`${BUILDING_API_URL}`, HttpMethods.PUT, JSON.stringify(body));

  console.log("Response for building PUT=", res);
  return Response.json(res);
}