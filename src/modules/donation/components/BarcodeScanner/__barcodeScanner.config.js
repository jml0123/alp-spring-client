import Dynamsoft from "dynamsoft-javascript-barcode";
import config from "../../../../config";

Dynamsoft.BarcodeReader.engineResourcePath = "https://cdn.jsdelivr.net/npm/dynamsoft-javascript-barcode@7.5.0-v1/dist/";
// Please visit https://www.dynamsoft.com/CustomerPortal/Portal/TrialLicense.aspx to get a trial license
// Dynamsoft.BarcodeReader.productKeys = config.PRODUCT_KEY;
// Dynamsoft.BarcodeReader.organizationID = "101048899" 
Dynamsoft.BarcodeReader.productKeys = "t0068NQAAAIrKtqO0FjNUxzJLo688bQJ4TPNB37W195W2vZKZh4x76t5e4bI2GGxYD9C9s19wfMEo9jR+CDbZYvq1dk4Dyrk=";
// Dynamsoft.BarcodeReader._bUseFullFeature = true; // Control of loading min wasm or full wasm.
export default Dynamsoft;