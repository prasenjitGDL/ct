import { log } from "./utils/logger";
import { apiRoot } from "./handson/client";

// TODO: Get project settings
const getProject = () => {
  return apiRoot.get().execute();
};

getProject()
  .then(log)
  .catch(log);

// TODO: Get shipping method by id
const getShippingMethod = (id: string) => {
  return apiRoot.shippingMethods().withId({ ID: id }).get().execute();
};

getShippingMethod("shipping_id")
  .then(log)
  .catch(log);


// TODO: Get standard tax category by key
const getTaxCategory = (key: string) => {
    return apiRoot.taxCategories().withKey({key}).get().execute()
}

getTaxCategory("tax_key")
  .then(log)
  .catch(log);
