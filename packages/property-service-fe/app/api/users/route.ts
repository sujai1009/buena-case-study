import { sendRequest } from "@/components/utils/sendRequest";

const USER_API_URL = `http://${process.env.API_HOST}:${process.env.API_PORT}/user`;

export async function GET(req: any) {  
  const data = await sendRequest(`${USER_API_URL}`);
  console.log("Response for users GET = ", data);
  return Response.json(data)
}