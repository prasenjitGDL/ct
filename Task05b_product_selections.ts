import { getProductsInStore, addProductSelectionToStore } from "./handson/store";
import {
    getProductSelectionByKey,
    createProductSelection,
    addProductsToProductSelection,
    getProductsInProductSelection
} from "./handson/productSelections";

import { log } from "./utils/logger";

const productSelectionKey = "finest-selection-1";

createProductSelection(productSelectionKey, "main store").then(log).catch(log);

getProductSelectionByKey(productSelectionKey).then(log).catch(log);

addProductsToProductSelection(productSelectionKey, ['maternity_top']).then(log).catch(log);

getProductsInProductSelection(productSelectionKey).then(log).catch(log);

addProductSelectionToStore("random-key-123", productSelectionKey).then(log).catch(log);

getProductsInStore("random-key-123").then(log).catch(log);