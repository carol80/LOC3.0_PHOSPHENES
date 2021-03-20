import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import Header from './Header'

import { history } from '../routes/AppRouter';
import { database } from '../firebase/firebase';
const { google } = require('googleapis')
const calendar = google.calendar({ version: "v3" });


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
      this.ScheduleMeet=this.ScheduleMeet.bind(this);
    }
    
    
    ScheduleMeet(start,end,date) {

        const dbSubjectKey = history.location.search.slice(1, history.location.search.length).split(/[=&]+/)[7];
        var studentID = new Array();
        var TeacherID;
        var userType;
        database.ref('users/' + this.props.dbUserKey).on('value', (user) => {
			userType = user.val().userType;
            if (user.val().userSubjects.val().dbSubjectKey == dbSubjectKey){
                if (user.val().userType === 'Student'){
                    studentID.push(user.val().userEmail);
                }
                else{
                    TeacherID = user.val().userEmail;
                }
            }
		});

        const calendarId = TeacherID;
        const resource = {
        start:{ dateTime: "2021-03-20T00:00:00.000+09:00" },
        end: { dateTime: "2021-03-20T00:45:00.000+09:00" },
        attendees: [{ email: studentID }],
        conferenceData: {
            createRequest: {
            requestId: "sample123",
            conferenceSolutionKey: { type: "hangoutsMeet" },
            },
        },
        summary: "sample event with Meet link",
        description: "sample description",
        };
        calendar.events
        .insert({
            calendarId: calendarId,
            resource: resource,
            conferenceDataVersion: 1,
        })
        .then(({ data }) => console.log(data))
        .catch(({ errors }) => console.log(errors));
        
        history.push('/');
    };


    handleChange(event) {
      this.setState({value: event.target.value});
    }
  
    handleSubmit(event) {
        this.ScheduleMeet(this.state.stime,this.state.etime,this.state.date);
    }
    render(){
        return (
            <div>
                <Header/>
            <Form>
              <FormGroup>
                <Label  for="topic">Topic</Label>
                <Input type="text" onChange={this.handleChange} name="topic" id="topic" placeholder="topic" />
              </FormGroup>
              <FormGroup>
                <Label for="Location">Location</Label>
                <Input type="text" onChange={this.handleChange} name="location"  placeholder="location" />
              </FormGroup>
              <FormGroup>
                <Label for="Destination">Destination</Label>
                <Input type="text" name="destination" onChange={this.handleChange} placeholder="Destination" />
              </FormGroup>
              <FormGroup>
                <Label for="Date">Date</Label>
                <Input
                  type="date"
                  name="date"
                  placeholder="date"
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="startTime">Start Time</Label>
                <Input
                  type="time"
                  name="stime"
                  placeholder="start time"
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="endTime">Start Time</Label>
                <Input
                onChange={this.handleChange}
                  type="time"
                  name="etime"
                  placeholder="end time"
                />
              </FormGroup>
              
              
              
              
              
              <Button onClick={this.handleSubmit}>Submit</Button>
            </Form>
            </div>
            
          );
    }
  
}

export default Formjs;