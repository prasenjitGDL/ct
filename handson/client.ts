import { createApiBuilderFromCtpClient as createImportApiBuilderFromCtpClient } from "@commercetools/importapi-sdk";
import { createApiBuilderFromCtpClient } from "@commercetools/platform-sdk";
import {
  AuthMiddlewareOptions,
  ClientBuilder,
  HttpMiddlewareOptions,
  PasswordAuthMiddlewareOptions,
} from "@commercetools/sdk-client-v2";
import fetch from "node-fetch";
import { ApiRoot, ImportApiRoot } from "../types/global";
import { Prefix, Config, readConfig } from "../utils/config";
import dotenv from "dotenv";

dotenv.config();

const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: `https://auth.${readConfig().region}.commercetools.com`,
  projectKey: readConfig().projectKey,
  credentials: {
    clientId: readConfig().clientId,
    clientSecret: readConfig().clientSecret,
  },
  scopes: [readConfig().scope],
  fetch,
};

const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: `https://api.${readConfig().region}.commercetools.com`,
  includeOriginalRequest: true,
  ...fetch,
};

const client = new ClientBuilder()
  .withHttpMiddleware(httpMiddlewareOptions)
  .withProjectKey(readConfig().projectKey)
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withLoggerMiddleware()
  .build();

const createApiClient = () => {
  const apiClient = createApiBuilderFromCtpClient(client).withProjectKey({
    projectKey: readConfig().projectKey,
  });
  return apiClient;
};

// const createImportApiClient = () => {
//     const importApiClient = createImportApiBuilderFromCtpClient(client);
//     return importApiClient;
// }

// const createStoreApiClient = () => {
//     const storeApiClient = createApiBuilderFromCtpClient(client);
//     return storeApiClient;
// }

// const createMyApiClient = () => {
//     const myApiClient = createApiBuilderFromCtpClient(client);
//     return myApiClient;
// }

export const apiRoot = createApiClient();
// export const importApiRoot = createImportApiClient();
// export const storeApiRoot = createStoreApiClient();
// export const myApiRoot = createMyApiClient();
