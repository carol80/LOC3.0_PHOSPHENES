import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import Header from './Header'
class Formjs extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        topic:null,
        location:null,
        destination:null,
        date:null,
        stime:null,
        etime:null
    }
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
      this.setState({value: event.target.value});
    }
  
    handleSubmit(event) {
        
    }
    render(){
        return (
            <div>
                <Header/>
            <Form>
              <FormGroup>
                <Label  for="topic">Topic</Label>
                <Input type="text" name="topic" id="topic" placeholder="topic" />
              </FormGroup>
              <FormGroup>
                <Label for="Location">Location</Label>
                <Input type="text" name="location"  placeholder="location" />
              </FormGroup>
              <FormGroup>
                <Label for="Destination">Destination</Label>
                <Input type="text" name="destination"  placeholder="Destination" />
              </FormGroup>
              <FormGroup>
                <Label for="Date">Date</Label>
                <Input
                  type="date"
                  name="date"
                  placeholder="date"
                />
              </FormGroup>
              <FormGroup>
                <Label for="startTime">Start Time</Label>
                <Input
                  type="time"
                  name="stime"
                  placeholder="start time"
                />
              </FormGroup>
              <FormGroup>
                <Label for="endTime">Start Time</Label>
                <Input
                  type="time"
                  name="etime"
                  placeholder="end time"
                />
              </FormGroup>
              
              
              
              
              
              <Button>Submit</Button>
            </Form>
            </div>
            
          );
    }
  
}

export default Formjs;