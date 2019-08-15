import React from "react";
import styled from "styled-components";

const MainComponent = styled.main`
  * {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    text-align: center;
  }

  a {
    text-decoration: none;
    font-size: 1.3em;
    padding: 30px;
  }

  div {
    border: 2px solid rgba(255, 255, 255, 0.781);
    max-width: 525px;
    padding: 10px;
    margin: 0 auto;
  }
`;

const PrivacyPage = () => {
  return (
    <MainComponent>
      <header>
        <h1>Our Privacy and Policy </h1>
      </header>
      <hr />
      <section>
        <h2>
          We don't collect or share personal information.
          <br />
        </h2>

        <p>That's our privacy policy in a nutshell.</p>
        <div>
          <p>
            If you will sign in with Google OAuth
            <br />
            <br />
            We will fetch the your liked videos from your youtube account and
            those videos will be shown to you in the liked page.
            <br />
            <br />
            If you want to like or dislike a particular song you can also do
            that they app will have the basic read write access to your YouTube
            account.
            <br />
            <br />
            We will not use any addition information rather than these, and all
            the things are happening in client side only there is no database or
            server involved in storing any of your data
          </p>
          <p>
            We will store some of our information in your browser local stoarge
            <br />
            Like login credentials, your country, liked songs and songs history.
          </p>

          <p>
            Distribution or downloading of any song is illegal and copyrighted,
            <br />
            All the songs are hosted on YouTube we don't own any of the song
          </p>
          <p>
            Apart from that you can stream to unlimited song without any ads.
            <br />
            This is an open source project for any issues please contact me
            <br />
          </p>
          <a href="mailto:singhshivamkr@gmail.com">singhshivamkr@gmail.com</a>
        </div>
      </section>
    </MainComponent>
  );
};

export default PrivacyPage;
