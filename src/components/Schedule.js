import React from 'react';
import emailjs from 'emailjs-com';


export default function formapp() {

  function sendEmail(e) {
      console.log(e);
    e.preventDefault();

    emailjs.sendForm('service_pm9b9gs', 'template_im97ejk', e.target, 'user_oNghXCY2eTVS4ThsFdjqi')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
  }

  return (
    <form className="contact-form" onSubmit={sendEmail}>
      <input type="hidden" name="contact_number" />
      <label>Name</label>
      <input type="text" name="user_name" />
      <label>Email</label>
      <input type="email" name="user_email" />
      <label>Message</label>
      <textarea name="message" />
      <input type="submit" value="Send" />
    </form>
  );
}