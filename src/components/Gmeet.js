// Require google from googleapis package.
const { google } = require('googleapis')

// Create a new event start date instance for temp uses in our calendar.
const eventStartTime = new Date()
eventStartTime.setDate(eventStartTime.getDay() + 2)

// Create a new event end date instance for temp uses in our calendar.
const eventEndTime = new Date()
const calendar = google.calendar({ version: "v3", auth });


ScheduleMeet() {

        const dbSubjectKey = history.location.search.slice(1, history.location.search.length).split(/[=&]+/)[7];
        var studentID = new Array();
        var TeacherID;
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
        start: { dateTime: "2020-12-01T00:00:00.000+09:00" },
        end: { dateTime: "2020-12-01T00:45:00.000+09:00" },
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
    });
}
