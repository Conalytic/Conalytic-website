import fs from "node:fs/promises";
import path from "node:path";

const token = process.env.STORYBLOK_MANAGEMENT_TOKEN;
const spaceId = process.env.STORYBLOK_SPACE_ID;

if (!token || !spaceId) {
  console.error("Missing env vars: STORYBLOK_MANAGEMENT_TOKEN and STORYBLOK_SPACE_ID are required.");
  process.exit(1);
}

const schemaPath = path.join(process.cwd(), "storyblok", "components.schema.json");
const raw = await fs.readFile(schemaPath, "utf8");
const parsed = JSON.parse(raw);
const componentDefs = Array.isArray(parsed.components) ? parsed.components : [];

if (!componentDefs.length) {
  console.error("No components found in storyblok/components.schema.json");
  process.exit(1);
}

const baseUrl = `https://mapi.storyblok.com/v1/spaces/${spaceId}`;

async function api(pathname, options = {}) {
  const response = await fetch(`${baseUrl}${pathname}`, {
    ...options,
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Storyblok API ${response.status} ${pathname}: ${body}`);
  }

  return response.json();
}

console.log("Fetching existing components...");
const existingResponse = await api("/components");
const existing = new Map((existingResponse.components || []).map((component) => [component.name, component]));

for (const component of componentDefs) {
  const current = existing.get(component.name);

  if (current) {
    console.log(`Updating component: ${component.name}`);
    await api(`/components/${current.id}`, {
      method: "PUT",
      body: JSON.stringify({ component }),
    });
  } else {
    console.log(`Creating component: ${component.name}`);
    await api("/components", {
      method: "POST",
      body: JSON.stringify({ component }),
    });
  }
}

console.log("Storyblok components synced successfully.");
