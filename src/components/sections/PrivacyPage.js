import React from "react";
import { Typography, Divider, Container, Link } from "@material-ui/core";

const PrivacyPage = () => {
  return (
    <Container maxWidth="sm">
      <br />
      <header>
        <Typography variant="h5" gutterBottom={true}>
          Our Privacy and Policy{" "}
        </Typography>
      </header>
      <Divider />
      <br />
      <section>
        <Typography gutterBottom={true} variant="subtitle1">
          Shivam built the Ylight app as an Open Source app. This SERVICE is
          provided by Shivam at no cost and is intended for use as is.
          <br />
          This page is used to inform visitors regarding my policies with the
          collection, use, and disclosure of Personal Information if anyone
          decided to use my Service.
          <br />
          The terms used in this Privacy Policy have the same meanings as in our
          Terms and Conditions, which is accessible at Ylight unless otherwise
          defined in this Privacy Policy.
          <br />
        </Typography>
        <Typography variant="h6"> Information Collection and Use</Typography>
        <Typography gutterBottom={true}>
          We never ask you for any of your personal information and device info,
          all the data stays on your device and our Service(s) are intended to
          work from the client-side so you never need to worry about your data
          being collected on our servers.
        </Typography>
        <Typography variant="h6">Log Data</Typography>
        <Typography gutterBottom={true}>
          I want to inform you that whenever you use my Service, you never have
          to worry about any login data or Google OAuth as it works without you
          having to sign-in by any login method to use our Service(s)
        </Typography>
        <Typography variant="h6">Service Providers</Typography>
        <Typography gutterBottom={true}>
          I never employ any third-party companies and individuals except
          YouTube and other related Google services.
        </Typography>

        <Typography variant="h6">Security</Typography>

        <Typography gutterBottom={true}>
          I value your trust in providing us your Personal Information, thus we
          are striving to use commercially acceptable means of protecting it. We
          never store your any personal information on our services. Our Service
          is intended to function fully from the client-side without data being
          collected to our servers.
        </Typography>

        <Typography variant="h6">Changes to This Privacy Policy</Typography>

        <Typography gutterBottom={true}>
          I may update our Privacy Policy from time to time. Thus, you are
          advised to review this page periodically for any changes. I will
          notify you of any changes by posting the new Privacy Policy on this
          page. These changes are effective immediately after they are posted on
          this page.
        </Typography>

        <Typography variant="h6">Contact Us</Typography>

        <Typography gutterBottom={true}>
          If you have any questions or suggestions about my Privacy Policy, do
          not hesitate to contact me at{" "}
          <Link href="mailto:singhshivamkr@gmail.com" target="self">
            singhshivamkr@gmail.com
          </Link>
        </Typography>
      </section>
    </Container>
  );
};

export default PrivacyPage;
