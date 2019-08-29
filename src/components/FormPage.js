import React from 'react';
import './FormPage.css';
import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";
import { Button,Form,Col, Card, Alert, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import listReactFiles from 'list-react-files'

class FormPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filename: "Deneme" || "Deneme",
      filesize: 0 || 0,
      percent: props.percent || 0
    }
  }

  onDecClick = () => {
    this.setState({ percent: this.state.percent - 10 > 0 ? this.state.percent - 10 : 0 });
  }

  onIncClick = () => {
    listReactFiles(__dirname).then(files => console.log(files))
    this.setState({ filename: "Burak",filesize: this.state.filesize + 1 < 100 ? this.state.percent + 1 : 100, percent: this.state.percent + 1 < 100 ? this.state.percent + 1 : 100 });
  }

  render() {
    return (
      <div style={{ width: "100%" }}>
        <div style={{ width: "50%",margin: "0 auto", marginTop: "100px" }}>
          <Card style={{marginBottom: "10px"}}>
            <Card.Body>
              <Row>
                <Col>
                  <Form.Control size="sm" style={{width:"90%", float: "left",marginRight:"20px",fontSize: "0.875rem"}} type="file" placeholder="First name" />
                  <Button size="sm" onClick={ this.onIncClick } style={{width:"calc(10% - 20px)" , float: "left"}} type="submit">Upload</Button>
                </Col>
              </Row>
            </Card.Body>
          </Card> 
          <Alert variant={"info"} style={{fontSize:"0.875rem"}} size="sm">
            <Row>
              <Col sm={10}>{this.state.filename}</Col>
              <Col sm={2} style={{textAlign:"right"}}>{this.state.filesize}/100</Col>
            </Row>
            <Progress
              style={{marginTop:"10px"}}
              percent={this.state.percent}
              status={this.props.status}
              theme={this.props.theme}
              type={this.props.type}
              width={this.props.width}
              strokeWidth={this.props.strokeWidth}
            />                    
          </Alert>
        </div>
      </div>
    )
  }
}
export default FormPage;
