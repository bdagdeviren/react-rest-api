import React from 'react';
import './content.css';
import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";
import { Button,Form,Col, Card, Alert, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';

class Content extends React.Component {
  sleep(time){
    return new Promise((resolve)=>setTimeout(resolve,time)
    )
  }

  async uploadFileToServer() {

    const data = new FormData();
    data.append("file",this.state.selectedFile[0]);

    console.log(this.state.selectedFile[0]);

    await axios.post("http://192.168.1.7:8080/upload", data)
        .then(res => { // then print response status
          console.log('upload success');
        })
        .catch(err => { // then print response status
          console.log('upload fail');
        })

  }

  async getFileListAndSetFileSize() {
    await axios.get(`http://192.168.1.7:8080/getfilelist`)
        .then(res => {
          const persons = res.data.files;
          this.setState({ persons: persons});
        }).catch(function (error) {
          console.log(error);
     });

    this.setState({filesize: this.state.persons.length });
  }


  constructor(props) {
    super(props);

    this.state = {
      filename: "" ,
      filesize: 0 || 0 ,
      filecount: 0 ,
      error: "",
      persons: [],
      percent: props.percent || 0,
      selectedFile: null,
      displayError: "none",
      errorMessage: ""
    }
  }

  onEventHandler = (event) => {
    let files = event.target.files;
    this.setState({
      selectedFile: files
    })
  };


  onIncClick = async () => {
    await this.uploadFileToServer();

    await this.getFileListAndSetFileSize();

    for (let i=0; i<this.state.filesize;i++) {
      const data = new FormData();
      data.append("file",this.state.persons[i] );

      let splittedArray = this.state.persons[i].split("/");
      let filename = splittedArray.slice(-1)[0];
      //await this.sleep(50).then(async ()=>{
        await axios.post("http://192.168.1.7:8080/uploadtonexus", data)
            .then(res => {
              if(res.data.status === "Error"){
                this.setState({ displayError: "block",errorMessage: this.state.errorMessage +" "+filename });
              }
            })
            .catch(err => {
              if(err != null){
                this.setState({ displayError: "block",errorMessage: " "+err });
              }
            });
        await this.setState({
          filename: filename,
          filecount: this.state.filecount + 1 < this.state.filesize ? this.state.filecount + 1 : this.state.filesize,
          percent: this.state.percent + (100 / this.state.filesize) < 100 ? this.state.percent + (100 / this.state.filesize) : 100
        });
      //});
    }
  };

  render() {
    return (
      <div style={{ width: "100%" }}>
        <div style={{ width: "80%",margin: "0 auto", marginTop: "1rem" }}>
          <Card style={{marginBottom: "1rem"}}>
            <Card.Body>
              <Row>
                <Col>
                  <Form.Control className={"fileInput"} size="sm" style={{width:"90%", float: "left",marginRight:"20px",fontSize: "0.875rem"}} onChange={this.onEventHandler} type="file" />
                  <Button className={"submitBtn"} size="sm" onClick={ this.onIncClick } style={{width:"calc(10% - 20px)" , float: "left"}} type="submit">Upload</Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
          <Alert variant={"info"} style={{fontSize:"0.875rem"}} size="sm">
            <Row>
              <Col sm={9}>Filename:{this.state.filename}</Col>
              <Col sm={3} style={{textAlign:"right"}}>FileCount:{this.state.filecount}/{this.state.filesize}</Col>
            </Row>
             <Progress
               style={{marginTop:"20px"}}
               percent={Math.floor(this.state.percent)}
               status={this.props.status}
               theme={this.props.theme}
               type={this.props.type}
               width={this.props.width}
               strokeWidth={this.props.strokeWidth}
            />
          </Alert>
          <Alert variant={"danger"} size="sm" style={{ maxHeight: "400px", overflow: "auto",fontSize:"0.875rem", display: this.state.displayError}}>
            Uploading Error Messages:
            {this.state.errorMessage}
          </Alert>
        </div>
      </div>
    )
  }
}
export default Content;
