import { sendRequest } from "@/components/utils/sendRequest";
import { Property } from "@/components/types/app.types";
import { HttpMethods } from "@/components/types/http.methods";

export const allowedPropertyTypes = ["weg", "mv", "all"]

export async function GET(req: any, res: any) {
  const url = new URL(req.url);
  const searchParams = new URLSearchParams(url.searchParams);
  const propertyType = searchParams.get("propertyType");
  
  if (!allowedPropertyTypes.includes(propertyType)) {
    return Response.json(
      { error: 'Not allowed Property type' }, 
      { status: 500 }
    );
  }
  
  const data = await sendRequest('http://localhost:3001/p?type=' + propertyType)
  const porperties = data.data as Property[];
  console.log("Response for property GET=", porperties)
  return Response.json(porperties)
}

export async function POST(request: Request) {
  const body = await request.json();
  const res = await sendRequest("http://localhost:3001/p", HttpMethods.POST, JSON.stringify(body));
  console.log("Response for property POST=", res)
  return Response.json(res);
}

export async function DELETE(req: any) {
  const url = new URL(req.url);
  const searchParams = new URLSearchParams(url.searchParams);
  const id = searchParams.get("id");

  const res = await fetch("http://localhost:3001/p/" + id, { method: 'DELETE' });
  console.log("Response for property DELETE=", res);
  return Response.json(res);
}

export async function PUT(request: Request) {
  const body = await request.json();
  console.log("Request for property PUT=", body);
  const res = await sendRequest("http://localhost:3001/p", HttpMethods.PUT, JSON.stringify(body));

  console.log("Response for property PUT=", res);
  return Response.json(res);
}