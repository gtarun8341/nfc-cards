import AllFooter from "../components/AllFooter";
import Footer from "../components/Footer";

export default function PrivacyPolicyPage() {
  return (
    <div>
      <div className="bg-white text-gray-800 px-6 md:px-20 py-10 space-y-6">
        <h1 className="text-3xl font-bold mb-4 text-[#FDB98F]">
          Privacy Policy
        </h1>
        <p>
          <strong>Effective Date:</strong> [Insert Date]
        </p>
        <p>
          <strong>Last Updated:</strong> [Insert Date]
        </p>
        <p>
          Welcome to <strong>[Your Company Name]</strong> ("we", "our", or
          "us"). This Privacy Policy explains how we collect, use, disclose, and
          protect your information when you visit our website{" "}
          <strong>[yourdomain.com]</strong> and purchase our products, including
          NFC business cards and digital services.
        </p>
        <p>
          We collect personal information such as your name, phone number, email
          address, billing and shipping address, and company details (if
          applicable). We also collect payment-related information through
          secure third-party payment gateways like Razorpay or PayPal. We do not
          store your card or CVV details on our servers. Additionally, we
          collect technical data such as your IP address, browser type, and
          device information through cookies and analytics tools to improve our
          website performance and detect fraudulent activity.
        </p>
        <p>
          We use your information to process orders, manage digital card
          profiles, send service-related updates, and provide customer support.
          Your data helps us improve our services and secure your user
          experience. You may also receive occasional marketing communications,
          which you can opt out of at any time.
        </p>
        <p>
          We do not sell or rent your personal data. However, we may share your
          information with trusted service providers such as payment processors,
          shipping partners, and hosting platforms. We may also share data when
          required by law or to protect our rights and systems.
        </p>
        <p>
          You have the right to access, correct, or delete your data. You can
          also request to opt-out of promotional emails. For such requests,
          contact us at [your support email].
        </p>
        <p>
          {" "}
          We use cookies and similar technologies to enhance user experience,
          remember preferences, and analyze traffic. You can control cookie
          settings through your browser.
        </p>{" "}
        <p>
          {" "}
          We take appropriate security measures to protect your data, but no
          system is entirely secure. Please ensure your credentials are kept
          safe when using our services.
        </p>
        <p>
          {" "}
          Our website may contain links to external websites. We are not
          responsible for the privacy practices or content of those third-party
          sites.
        </p>{" "}
        <p>
          {" "}
          Our services are not intended for children under 13, and we do not
          knowingly collect information from minors.
        </p>{" "}
        <p>
          We may update this Privacy Policy from time to time. Any changes will
          be posted on this page with the updated date.{" "}
        </p>
        <p>
          If you have any questions or concerns about this Privacy Policy,
          please contact us at [support@yourdomain.com] or call us at
          [+91-XXXXXXXXXX]. You can also reach us at our office address: [Your
          Physical or Registered Address].
        </p>
      </div>
      <AllFooter />
    </div>
  );
}
