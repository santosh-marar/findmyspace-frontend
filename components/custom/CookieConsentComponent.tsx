// 'use client';
// import React, { useState, useEffect } from 'react';
// import Cookies from 'js-cookie';

// const CookieConsent = () => {
//   const [consentGiven, setConsentGiven] = useState(false);

//   useEffect(() => {
//     const serverCookie = Cookies.get('spToken');
//     const userConsentCookie = Cookies.get('spaceProviderToken');

//     if (
//       userConsentCookie === 'true' ||
//       serverCookie === 'server-sent-cookie-value'
//     ) {
//       setConsentGiven(true);
//     }
//   }, []);

//   const handleConsent = () => {
//     localStorage.setItem('cookieConsent', 'true');
//     Cookies.set('spaceProviderToken', 'true', { expires: 58 });

//     // Optionally, replace the server-sent cookie with your consent cookie
//     Cookies.set('spToken', 'true', { expires: 58 });

//     setConsentGiven(true);
//   };

//   return !consentGiven ? (
//     <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4 text-center">
//       <p>
//         This website uses cookies to enhance the user experience. By continuing
//         to use this site, you agree to our use of cookies.
//       </p>
//       <button
//         onClick={handleConsent}
//         className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
//       >
//         Accept Cookies
//       </button>
//     </div>
//   ) : null;
// };

// export default CookieConsent;
