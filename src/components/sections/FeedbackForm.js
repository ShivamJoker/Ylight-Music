import React from "react";
import { FormControl, TextField, Button, Grid } from "@material-ui/core";
import { loadReCaptcha, ReCaptcha } from "react-recaptcha-v3";
import axios from "axios";

let captchaToken;
const FeedbackForm = () => {
  const formEl = React.useRef(null);

  const submitForm = e => {
    const formData = new FormData(formEl.current);
    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");
    console.log(name, email, message);
    e.preventDefault();

    const post = {
      name: name,
      email: email,
      message: message,
      captcha: captchaToken
    };

    axios
      .post("https://xmailerr.glitch.me/contact", post)
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  React.useEffect(() => {
    loadReCaptcha("6Le1toEUAAAAAITyNwqEMaz3hFAYzciSJDMomrgN");
    
  }, []);

  const verifyCallback = token => {
    // console.log(token);
    captchaToken = token;
    const captchaBox = document.querySelector(".grecaptcha-badge");
    captchaBox.remove();
    // remove captcha badge
  };

  return (
    <Grid
      component="form"
      ref={formEl}
      onSubmit={submitForm}
      container
      required
      justify="center"
      style={{ width: "90%", maxWidth: "500px", margin: "0 auto" }}
    >
      <ReCaptcha
        sitekey="6Le1toEUAAAAAITyNwqEMaz3hFAYzciSJDMomrgN"
        action="action_name"
        verifyCallback={verifyCallback}
      />
      <TextField
        id="outlined-email-input"
        label="Name"
        type="text"
        name="name"
        autoComplete="name"
        margin="normal"
        variant="outlined"
        fullWidth
        color="primary"
        required
      />
      <TextField
        id="outlined-email-input"
        label="Email"
        type="email"
        name="email"
        autoComplete="email"
        margin="normal"
        variant="outlined"
        fullWidth
        color="primary"
        required
      />
      <TextField
        id="outlined-email-input"
        label="Feedback"
        multiline
        rows="4"
        type="text"
        name="message"
        autoComplete="feedback"
        margin="normal"
        variant="outlined"
        fullWidth
        color="primary"
        required
      />

      <Button
        variant="outlined"
        color="primary"
        onClick={submitForm}
        type="submit"
      >
        Submit
      </Button>
    </Grid>
  );
};

export default FeedbackForm;
