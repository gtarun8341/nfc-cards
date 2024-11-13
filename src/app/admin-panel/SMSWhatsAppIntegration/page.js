// pages/sms-whatsapp-integration.js
"use client"; // Next.js Client Component

const SMSWhatsAppIntegrationPage = () => {
    return (
      <div className="max-w-2xl mx-auto p-5 border rounded shadow-lg bg-white">
        <h2 className="text-2xl font-semibold text-center mb-5">SMS / WhatsApp Integration</h2>
        <p>Integrate SMS and WhatsApp for communication:</p>
        <ul className="list-disc list-inside">
          <li>
            <strong>SMS:</strong> Use Twilio or similar services for SMS integration.
          </li>
          <li>
            <strong>WhatsApp:</strong> Use the WhatsApp Business API for integration.
          </li>
        </ul>
      </div>
    );
  };
  
  export default SMSWhatsAppIntegrationPage;
  