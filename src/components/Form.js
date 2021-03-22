/* global gapi */

import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import Header from './Header'
import { gapi } from 'gapi-script';

class Formjs extends React.Component {
    componentDidMount() {
        gapi.load('auth2', () => {
            // Retrieve the singleton for the GoogleAuth library and set up the client.
            this.auth2 = window.gapi.auth2.init({
                client_id: process.env.REACT_APP_CLIENT_ID,
                cookiepolicy: 'single_host_origin',
            });
    
            this.auth2.attachClickHandler(this.refs.googleButton, {},
                (googleUser) => {
                    this.googleLogin(googleUser.getBasicProfile());
                }, (error) => {
                    console.log(error);
                });
        });
    }
    render(){
        
        var CLIENT_ID = process.env.REACT_APP_CLIENT_ID
        var API_KEY = process.env.REACT_APP_API_KEY
        var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"]
        var SCOPES = "https://www.googleapis.com/auth/calendar"
        const handleClick = () => {
          gapi.load('client:auth2', () => {
            console.log('loaded client')
      
            gapi.client.init({
              apiKey: API_KEY,
              clientId: CLIENT_ID,
              discoveryDocs: DISCOVERY_DOCS,
              scope: SCOPES,
            })
      
            gapi.client.load('calendar', 'v3', () => console.log('bam!'))
      
            gapi.auth2.getAuthInstance().signIn()
            .then(() => {
              
              var event = {
                'summary': 'Awesome Event!',
                'location': '800 Howard St., San Francisco, CA 94103',
                'description': 'Really great refreshments',
                'start': {
                  'dateTime': '2021-03-21T09:00:00-07:00',
                  'timeZone': 'Asia/Kolkata'
                },
                'end': {
                  'dateTime': '2021-03-21T17:00:00-07:00',
                  'timeZone': 'Asia/Kolkata'
                },
                'recurrence': [
                  'RRULE:FREQ=DAILY;COUNT=2'
                ],
                'attendees': [
                  {'email': 'lpage@example.com'},
                  {'email': 'sbrin@example.com'}
                ],
                'reminders': {
                  'useDefault': false,
                  'overrides': [
                    {'method': 'email', 'minutes': 24 * 60},
                    {'method': 'popup', 'minutes': 10}
                  ]
                }
              }
      
              var request = gapi.client.calendar.events.insert({
                'calendarId': "8320.carol.becomp@gmail.com",
                'resource': event,
              })
      
              request.execute(event => {
                console.log(event)
                window.open(event.htmlLink)
              })
              
      
              /*
                  Uncomment the following block to get events
              */
              /*
              // get events
              gapi.client.calendar.events.list({
                'calendarId': 'primary',
                'timeMin': (new Date()).toISOString(),
                'showDeleted': false,
                'singleEvents': true,
                'maxResults': 10,
                'orderBy': 'startTime'
              }).then(response => {
                const events = response.result.items
                console.log('EVENTS: ', events)
              })
              */
          
      
            })
          })
        }
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
                <Input type="text" name="Destination"  placeholder="Destination" />
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
              
              
              
              
              
              <Button onClick={handleClick}>Submit</Button>
            </Form>
            </div>
            
          );
    }
    


  
}

export default Formjs;