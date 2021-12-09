import axios from "axios";

export default async function () {
  let url = `${process.env.MGMT_API_URL}/oauth/token`;
  let body = {
    client_id: `${process.env.MGMT_API_CLIENT_ID}`,
    client_secret: `${process.env.MGMT_API_CLIENT_SECRET}`,
    audience: `${process.env.MGMT_API_URL}/api/v2/`,
    grant_type: "client_credentials",
  };

  const { data } = await axios.post(url, body);
  return data;
}
