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

const createApiClient = () => {
  const {
    clientId,
    clientSecret,
    projectKey,
    oauthHost,
    host,
  } = readConfig(Prefix.DEV);

  const authMiddlewareOptions: AuthMiddlewareOptions = {
    host: oauthHost,
    projectKey,
    credentials: {
      clientId,
      clientSecret
    },
    fetch
  };

  const httpMiddlewareOptions: HttpMiddlewareOptions = {
    host: host,
    fetch
  };

  const client = new ClientBuilder()
    .withClientCredentialsFlow(authMiddlewareOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .build();

  const apiRoot = createApiBuilderFromCtpClient(client)
    .withProjectKey({ projectKey });

  return apiRoot;

}

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

export const apiRoot: ApiRoot = createApiClient();
// export const importApiRoot = createImportApiClient();
// export const storeApiRoot = createStoreApiClient();
// export const myApiRoot = createMyApiClient();
