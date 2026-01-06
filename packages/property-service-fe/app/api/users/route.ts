import { sendRequest } from "@/components/utils/sendRequest";

export async function GET(req: any) {  
  const data = await sendRequest('http://localhost:3001/user')
  console.log("Response for users GET = ", data);
  return Response.json(data)
}