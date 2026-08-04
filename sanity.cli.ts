import { defineCliConfig } from "sanity/cli";
import { dataset, projectId } from "./lib/sanity/config";

export default defineCliConfig({
  api: { projectId, dataset },
  studioHost: "ninaraasch",
  deployment: {
    appId: "dp4dxmrzsadb66gapp414p5j",
  },
});
