import { log } from "./utils/logger";
import { apiRoot } from "./handson/client";

// TODO: Complete the functions in
// ./handson/client.ts

// So this code displays the project configuration
// https://docs.commercetools.com/api/projects/project#get-project

// TODO: Get project settings
const getProject = () => {
  return apiRoot.get().execute();
};

getProject()
  .then((res) => log(res))
  .catch((error) => log(error));

// TODO: Get shipping method by id
// const getShippingMethod = (id: string) => {
//   return apiRoot.shippingMethods().withId({ ID: id }).get().execute();
// };

// getShippingMethod("shipping_id")
//   .then((res) => log(res))
//   .catch((error) => log(error));


// TODO: Get standard tax category by key
// const getTaxCategory = (key: string) => {
//     return apiRoot.taxCategories().withKey({key}).get().execute()
// }

// getTaxCategory("tax_key")
//   .then((res) => log(res))
//   .catch((error) => log(error));
