import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { images } from "../src/data/images.ts";

const projectRoot = fileURLToPath(new URL("../", import.meta.url));

for (const image of Object.values(images)) {
  const response = await fetch(image.downloadUrl, {
    signal: AbortSignal.timeout(30000),
  });
  if (
    !response.ok ||
    !response.headers.get("content-type")?.startsWith("image/")
  ) {
    throw new Error(`Image download failed: ${image.src} (${response.status})`);
  }
  const target = resolve(projectRoot, "public", image.src.slice(1));
  await mkdir(dirname(target), { recursive: true });
  const bytes = Buffer.from(await response.arrayBuffer());
  await writeFile(target, bytes);
  console.log(`${image.src}: ${Math.round(bytes.length / 1024)} KB`);
}
