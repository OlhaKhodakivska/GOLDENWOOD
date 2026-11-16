import fs from "node:fs/promises";
import { spawn } from "node:child_process";
// Vinext type generation uses Next's default paths. Keep the primary
// Next.js declarations intact after preparing the optional Sites artifact.
const paths = ["next-env.d.ts", ".next/types/routes.d.ts"];
const snapshots = await Promise.all(
  paths.map(async (path) => ({
    path,
    data: await fs.readFile(path).catch((error) => {
      if (error.code === "ENOENT") return null;
      throw error;
    }),
  })),
);
let code = 1;
try {
  code = await new Promise((resolve, reject) => {
    const child = spawn(
      process.execPath,
      ["node_modules/vinext/dist/cli.js", "build"],
      {
        stdio: "inherit",
        env: { ...process.env, WRANGLER_LOG_PATH: ".wrangler/wrangler.log" },
      },
    );
    child.on("error", reject);
    child.on("exit", (value) => resolve(value ?? 1));
  });
} finally {
  for (const { path, data } of snapshots) {
    if (data === null) await fs.rm(path, { force: true });
    else await fs.writeFile(path, data);
  }
}
process.exitCode = code;
