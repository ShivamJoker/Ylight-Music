import React from "react";
import {
  FormControl,
  TextField,
  Button,
  Grid,
  CircularProgress,
  LinearProgress
} from "@material-ui/core";
import { loadReCaptcha, ReCaptcha } from "react-recaptcha-v3";
import axios from "axios";
import { GlobalContext } from "../GlobalState";

let captchaToken;
const FeedbackForm = () => {
  const { setSnackbarMsg } = React.useContext(GlobalContext);
  const [isSending, setIsSending] = React.useState(false);
  const formEl = React.useRef(null);

  const submitForm = e => {
    // set state to sending
    setIsSending(true);
    const formData = new FormData(formEl.current);
    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");

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
        console.log(response.data.status);
        // also clear the form
        formEl.current.reset();
        setSnackbarMsg(response.data.status);
        setIsSending(false);
      })
      .catch(function(error) {
        // console.log(error.response.status);
        if (error.response) {
          if (error.response.status === 429) {
            formEl.current.reset();

            setSnackbarMsg("We accept limited feedback!");
          }
        }
        setIsSending(false);
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
      {isSending ? (
        <LinearProgress
          style={{
            width: "100%",
            transform: "translateY(-12px)",
            borderRadius: "2px"
          }}
        />
      ) : null}
      <Button
        style={{ marginTop: "10px" }}
        variant="outlined"
        color="primary"
        type="submit"
        disabled={isSending ? true : false}
      >
        {/* if sending is true then show circular progress */}
        {isSending ? "Sending Feedback" : "Send Feedback"}
      </Button>
    </Grid>
  );
};

export default FeedbackForm;
