export async function GET() {
  const hasV3Key = Boolean(
    process.env.TMDB_API_KEY ||
      process.env.TMDB_V3_API_KEY ||
      process.env.NEXT_PUBLIC_TMDB_API_KEY
  );
  const hasReadToken = Boolean(process.env.TMDB_READ_ACCESS_TOKEN);

  return Response.json({
    configured: hasV3Key || hasReadToken,
    authMode: hasReadToken ? "bearer" : hasV3Key ? "api_key" : "missing",
    hasV3Key,
    hasReadToken,
  });
}
