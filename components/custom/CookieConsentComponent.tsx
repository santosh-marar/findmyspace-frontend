import React from 'react';
import CookieConsent from 'react-cookie-consent';

const CookieConsentComponent: React.FC = () => {
  return (
    <CookieConsent
      location="top"
      buttonText="Accept"
      cookieName="spToken"
      style={{ background: '#2B373B' }}
      buttonStyle={{ color: '#4e503b', fontSize: '13px' }}
      expires={58} // Set the expiration time in days
    >
      This website uses cookies to enhance your experience.
    </CookieConsent>
  );
};

export default CookieConsentComponent;