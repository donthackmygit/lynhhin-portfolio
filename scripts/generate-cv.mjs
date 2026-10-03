import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { profile } from "../src/data/profile.ts";
import { experiences } from "../src/data/experiences.ts";
import { skillGroups } from "../src/data/skills.ts";
import { achievements } from "../src/data/achievements.ts";

const builder = fileURLToPath(new URL("./generate-cv.py", import.meta.url));
const projectRoot = fileURLToPath(new URL("../", import.meta.url));
const result = spawnSync(
  process.env.PORTFOLIO_PYTHON || "python",
  ["-X", "utf8", builder],
  {
    cwd: projectRoot,
    input: JSON.stringify({ profile, experiences, skillGroups, achievements }),
    encoding: "utf8",
  },
);
if (result.stdout) process.stdout.write(result.stdout);
if (result.stderr) process.stderr.write(result.stderr);
if (result.error) throw result.error;
process.exitCode = result.status ?? 1;
