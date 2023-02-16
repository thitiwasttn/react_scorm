import React from "react";
import { withScorm } from "react-scorm-provider";
import { BlobReader, BlobWriter, ZipReader } from "@zip.js/zip.js";

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: []
    };
  }
  handleUpload(file) {
    let entrylist = [];
    const zipFileReader = new BlobReader(file);
    const zipReader = new ZipReader(zipFileReader);
    const firstEntry = zipReader.getEntries();
    firstEntry.then((res) => {
      res.map((r) => entrylist.push(r));
      this.setState({ list: entrylist });
    });
  }
  async getBlob(res) {
    const bb = res.getData(new BlobWriter());
    let link = await bb.then((b) => {
      console.log(b);
    });
    return link;
  }

  render() {
    return (
      <div>
        <iframe
          src="http://localhost/scorm_test_1/res/"
          width="500"
          height="500"
        />
        <br />
        <button
          onClick={() => {
            console.log(this.props.sco.get("cmi.success.status"));
            console.log(this.props.sco.get("cmi.session_time"));
            console.log(this.props.sco.get("cmi.suspend_data"));
            console.log(this.props.sco.get("cmi.learner_name"));
          }}
        >
          Click Me
        </button>
        <br />
        {/** zipFile */}
        <br />
        <input
          type="file"
          onChange={(v) => this.handleUpload(v.target.files[0])}
        />{" "}
        <br />
        <text>result</text>
        <div style={{ backgroundColor: "#f8effe", minHeight: "100px" }}>
          {this.state.list.map((l) => {
            this.getBlob(l);
            return <div>{l.filename}</div>;
          })}
        </div>
      </div>
    );
  }
}

export default withScorm()(Question);
