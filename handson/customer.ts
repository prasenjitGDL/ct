import { apiRoot } from "./client";
import {
  ClientResponse,
  Customer,
  CustomerDraft,
  CustomerSignInResult,
  CustomerToken,
  CustomerUpdateAction,
} from "@commercetools/platform-sdk";

export const getCustomerById = (
  ID: string
): Promise<ClientResponse<Customer>> => {
  return apiRoot.customers().withId({ ID }).get().execute();
};

export const getCustomerByKey = (
  key: string
): Promise<ClientResponse<Customer>> => {
  return apiRoot.customers().withKey({ key }).get().execute();
};

export const createCustomer = (
  customerDraft: CustomerDraft
): Promise<ClientResponse<CustomerSignInResult>> => {
  return apiRoot.customers().post({ body: customerDraft }).execute();
};

export const createCustomerToken = (
  customer: ClientResponse<Customer>
): Promise<ClientResponse<CustomerToken>> => {
  return apiRoot
    .customers()
    .emailToken()
    .post({ body: { id: customer.body.id, ttlMinutes: 60, version: customer.body.version } })
    .execute();
};

export const confirmCustomerEmail = (
  token: ClientResponse<CustomerToken>
): Promise<ClientResponse<Customer>> => {
  return apiRoot
    .customers()
    .emailConfirm()
    .post({ body: { tokenValue: token.body.value } })
    .execute();
};

export const assignCustomerToCustomerGroup = (
    customerKey: string,
    customerGroupKey: string
  ) => {
    return getCustomerByKey(customerKey).then((customer: ClientResponse<Customer>) => {
      const updateActions: [CustomerUpdateAction] = [
        {
          action: "setCustomerGroup",
          customerGroup: {
            typeId: "customer-group",
            key: customerGroupKey,
          },
        },
      ];
      return apiRoot
        .customers()
        .withId({ ID: customer.body.id })
        .post({
          body: {
            actions: updateActions,
            version: customer.body.version,
          },
        })
        .execute();
    });
  };
