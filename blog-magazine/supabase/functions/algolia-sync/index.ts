import { algoliasearch } from "npm:algoliasearch@5.49.2";

type PostPayload = {
  type: "INSERT" | "UPDATE" | "DELETE";
  record: {
    id: string;
    slug: string;
    title: string;
    dek: string;
    excerpt: string;
    published_at: string;
    author_name: string;
    author_slug: string;
    category_name: string;
    category_slug: string;
    tags: string[];
  } | null;
  old_record?: {
    id: string;
  } | null;
};

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const secret = Deno.env.get("SUPABASE_DB_WEBHOOK_SECRET");
  const providedSecret = request.headers.get("x-webhook-secret");

  if (secret && providedSecret !== secret) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const payload = (await request.json()) as PostPayload;
  const appId = Deno.env.get("ALGOLIA_APP_ID");
  const adminKey = Deno.env.get("ALGOLIA_ADMIN_API_KEY");
  const indexName = Deno.env.get("ALGOLIA_INDEX_NAME") ?? "posts";
  const siteUrl = Deno.env.get("SITE_URL") ?? "https://example.com";

  if (!appId || !adminKey) {
    return new Response(
      JSON.stringify({ error: "Missing Algolia environment variables" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }

  const client = algoliasearch(appId, adminKey);

  if (payload.type === "DELETE") {
    const objectID = payload.old_record?.id;

    if (!objectID) {
      return new Response(JSON.stringify({ error: "Missing old record id" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    await client.deleteObject({
      indexName,
      objectID,
    });
  } else {
    if (!payload.record) {
      return new Response(JSON.stringify({ error: "Missing record payload" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    await client.saveObject({
      indexName,
      body: {
        objectID: payload.record.id,
        slug: payload.record.slug,
        title: payload.record.title,
        dek: payload.record.dek,
        excerpt: payload.record.excerpt,
        category: payload.record.category_name,
        categorySlug: payload.record.category_slug,
        author: payload.record.author_name,
        authorSlug: payload.record.author_slug,
        tags: payload.record.tags,
        publishedAt: payload.record.published_at,
        url: `${siteUrl}/article/${payload.record.slug}`,
      },
    });
  }

  return new Response(JSON.stringify({ ok: true }), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});
