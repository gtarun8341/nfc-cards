// pages/payment-gateway-integration.js
"use client"; // Next.js Client Component

const PaymentGatewayIntegrationPage = () => {
    return (
      <div className="max-w-2xl mx-auto p-5 border rounded shadow-lg bg-white">
        <h2 className="text-2xl font-semibold text-center mb-5">Payment Gateway Integration</h2>
        <p className="mb-3">
          Integrate Razorpay by following the instructions below:
        </p>
        <ol className="list-decimal list-inside">
          <li>Install Razorpay's SDK:</li>
          <code>npm install razorpay</code>
          <li>Import Razorpay in your component and create a new instance.</li>
          <li>Use the key and amount to process payments.</li>
          <li>Handle success and failure callbacks appropriately.</li>
        </ol>
      </div>
    );
  };
  
  export default PaymentGatewayIntegrationPage;
  