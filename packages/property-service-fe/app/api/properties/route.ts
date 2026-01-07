import { sendRequest } from "@/components/utils/sendRequest";
import { Property } from "@/components/types/app.types";
import { HttpMethods } from "@/components/types/http.methods";

export const allowedPropertyTypes = ["weg", "mv", "all"]

let PROPERTY_API_URL = `http://${process.env.API_HOST}:${process.env.API_PORT}/p`;

console.log("PROPERTY_API_URL=", PROPERTY_API_URL);
console.log("API_HOST=", process.env.API_HOST);
console.log("API_PORT=", process.env.API_PORT);

export async function GET(req: any, res: any) {
  console.log("Request for property GET")
  const url = new URL(req.url);
  const searchParams = new URLSearchParams(url.searchParams);
  const propertyType:any = searchParams.get("propertyType");
  
  if (!allowedPropertyTypes.includes(propertyType)) {
    return Response.json(
      { error: 'Not allowed Property type' }, 
      { status: 500 }
    );
  }

  console.log("URL::", `${PROPERTY_API_URL}/p?type=${propertyType}`);
  const data = await sendRequest(`${PROPERTY_API_URL}?type=${propertyType}`);
  const porperties = data.data as Property[];
  console.log("Response for property GET=", porperties)
  return Response.json(porperties)
}

export async function POST(request: Request) {
  const body = await request.json();
  const res = await sendRequest(`${PROPERTY_API_URL}`, HttpMethods.POST, JSON.stringify(body));
  console.log("Response for property POST=", res)
  return Response.json(res);
}

export async function DELETE(req: any) {
  const url = new URL(req.url);
  const searchParams = new URLSearchParams(url.searchParams);
  const id = searchParams.get("id");

  const res = await fetch(`${PROPERTY_API_URL}/` + id, { method: 'DELETE' });
  console.log("Response for property DELETE=", res);
  return Response.json(res);
}

export async function PUT(request: Request) {
  const body = await request.json();
  console.log("Request for property PUT=", body);
  const res = await sendRequest(`${PROPERTY_API_URL}`, HttpMethods.PUT, JSON.stringify(body));

  console.log("Response for property PUT=", res);
  return Response.json(res);
}