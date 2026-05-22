import axios from "axios";

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_API_KEY =
  process.env.TMDB_API_KEY ||
  process.env.TMDB_V3_API_KEY ||
  process.env.NEXT_PUBLIC_TMDB_API_KEY;
const TMDB_READ_ACCESS_TOKEN = process.env.TMDB_READ_ACCESS_TOKEN;

const buildTargetUrl = (pathSegments, searchParams) => {
  const path = pathSegments.join("/");
  const targetUrl = new URL(`${TMDB_BASE_URL}/${path}`);

  searchParams.forEach((value, key) => {
    if (key !== "api_key") {
      targetUrl.searchParams.set(key, value);
    }
  });

  if (TMDB_API_KEY) {
    targetUrl.searchParams.set("api_key", TMDB_API_KEY);
  }

  return targetUrl.toString();
};

const forwardRequest = async (request, { params }) => {
  const { path } = await params;

  if (!TMDB_API_KEY) {
    return Response.json(
      { message: "TMDB API key is missing on the server" },
      { status: 500 }
    );
  }

  const targetUrl = buildTargetUrl(path, new URL(request.url).searchParams);

  const headers = TMDB_READ_ACCESS_TOKEN
    ? {
        Authorization: `Bearer ${TMDB_READ_ACCESS_TOKEN}`,
      }
    : undefined;

  try {
    const response = await axios.get(targetUrl, { headers });
    return Response.json(response.data, { status: response.status });
  } catch (error) {
    const status = error?.response?.status || 500;
    const data = error?.response?.data || { message: "TMDB proxy request failed" };
    return Response.json(data, { status });
  }
};

export async function GET(request, context) {
  return forwardRequest(request, context);
}
