import React from "react";
import Dynamsoft from "./__barcodeScanner.config";

import "./css/__barcodeScanner.core.css";
class BarcodeScannerCore extends React.Component {
  constructor(props) {
    super(props);
    this.bDestroyed = false;
    this.scanner = null;
    this.elRef = React.createRef();
  }
  async componentDidMount() {
    try {
      this.scanner =
        this.scanner || (await Dynamsoft.DBR.BarcodeScanner.createInstance());

      if (this.bDestroyed) {
        this.scanner.destroy();
        return;
      }

      this.scanner.setUIElement(this.elRef.current);
      this.scanner.onFrameRead = (results) => {
        if (results.length) {
          this.props.onScan(results);
        }
      };
      await this.scanner.updateVideoSettings({
        video: { width: 500, height: 500, facingMode: "environment" },
      });
      await this.scanner.open();
    } catch (ex) {
      console.error(ex);
    }
  }

  componentWillUnmount() {
    this.bDestroyed = true;
    if (this.scanner) {
      this.scanner.destroy();
    }
  }
  shouldComponentUpdate() {
    // Never update UI after mount, dbrjs sdk use native way to bind event, update will remove it.
    return false;
  }
  render() {
    return (
      <div ref={this.elRef} className="component-barcode-scanner">
        <svg
          className="dbrScanner-bg-camera"
          style={{ display: "none" }}
          viewBox="0 0 100 100"
        >
          <path d="M1024 672q119 0 203.5 84.5t84.5 203.5-84.5 203.5-203.5 84.5-203.5-84.5-84.5-203.5 84.5-203.5 203.5-84.5zm704-416q106 0 181 75t75 181v896q0 106-75 181t-181 75h-1408q-106 0-181-75t-75-181v-896q0-106 75-181t181-75h224l51-136q19-49 69.5-84.5t103.5-35.5h512q53 0 103.5 35.5t69.5 84.5l51 136h224zm-704 1152q185 0 316.5-131.5t131.5-316.5-131.5-316.5-316.5-131.5-316.5 131.5-131.5 316.5 131.5 316.5 316.5 131.5z"></path>
        </svg>
        <video className="dbrScanner-video" playsInline={true}></video>
        <canvas className="dbrScanner-cvs-drawarea"></canvas>
        <div className="dbrScanner-cvs-scanarea">
          <div
            className="dbrScanner-scanlight"
            style={{ display: "none" }}
          ></div>
        </div>
      </div>
    );
  }
}

export default BarcodeScannerCore;
