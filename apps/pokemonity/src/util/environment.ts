import { getConfigFilesSync } from "@constantiner/resolve-node-configs-hierarchy";

export const getEnvironmentFiles = (path: string): string[] => getConfigFilesSync(path);
