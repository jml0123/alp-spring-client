import Dynamsoft from "dynamsoft-javascript-barcode";
import config from "../../../../config";

Dynamsoft.DBR.BarcodeScanner.engineResourcePath =
  "https://cdn.jsdelivr.net/npm/dynamsoft-javascript-barcode@8.8.7/dist/";
Dynamsoft.DBR.BarcodeScanner.organizationID = config.DYNAMSOFT_ORG_ID;
export default Dynamsoft;
