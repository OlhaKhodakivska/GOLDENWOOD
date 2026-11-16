import sharp from "sharp";
import fs from "node:fs/promises";
const manifest = JSON.parse(await fs.readFile("asset-manifest.json", "utf8"));
for (const asset of manifest.assets) {
  for (const width of [640, 1280, 1536]) {
    const base = `public/images/${asset.name}-${width}`;
    await sharp(`assets/originals/${asset.name}-original.png`)
      .resize({ width, withoutEnlargement: true })
      .avif({ quality: 52, effort: 4 })
      .toFile(base + ".avif");
    await sharp(`assets/originals/${asset.name}-original.png`)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 82 })
      .toFile(base + ".webp");
  }
  asset.files = [640, 1280, 1536].flatMap((w) =>
    ["avif", "webp"].map((f) => `/images/${asset.name}-${w}.${f}`),
  );
  delete asset.source;
}
await fs.writeFile("asset-manifest.json", JSON.stringify(manifest, null, 2));
