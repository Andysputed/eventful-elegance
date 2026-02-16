import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-stone-50">
      <Navbar />
      <main className="pt-28 md:pt-32">
        <section className="max-w-4xl mx-auto py-12 px-6 text-neutral-800">
          <h1 className="text-3xl md:text-4xl font-bold text-green-900 mb-3">Privacy Policy</h1>
          <p className="text-sm text-neutral-600 mb-8">Last Updated: February 16, 2026</p>

          <div className="space-y-8 leading-relaxed">
            <section>
              <h2 className="text-2xl font-semibold text-green-900 mb-3">1. Introduction</h2>
              <p>
                Bamboo Woods ("we", "our", or "us") respects your privacy. This Privacy Policy explains how
                we collect, use, and protect your information when you visit our website and make online
                reservations.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-green-900 mb-3">2. Information We Collect</h2>
              <p className="mb-3">When you use our booking form or contact us, we may collect:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Full name</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Reservation details (date, guest count, special requests)</li>
                <li>Technical usage information such as browser/device type</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-green-900 mb-3">3. How We Use Your Information</h2>
              <ul className="list-disc pl-6 space-y-1">
                <li>To process and manage reservations</li>
                <li>To contact you about your booking or requests</li>
                <li>To improve our website and customer experience</li>
                <li>To comply with legal or operational requirements</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-green-900 mb-3">4. Sharing of Information</h2>
              <p>
                We do not sell your personal information. We may share limited information with trusted
                service providers who help us run our website or reservation services, subject to appropriate
                confidentiality and security obligations.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-green-900 mb-3">5. Data Security</h2>
              <p>
                We use reasonable administrative and technical measures to protect your information. While no
                system is completely secure, we work to keep your data safe from unauthorized access.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-green-900 mb-3">6. Data Retention</h2>
              <p>
                We keep personal data only as long as needed for reservation management, customer service, and
                legal compliance, then securely delete or anonymize it.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-green-900 mb-3">7. Your Choices</h2>
              <p>
                You may request access, correction, or deletion of your personal information by contacting us.
                We may request verification before completing such requests.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-green-900 mb-3">8. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. Any changes will be posted on this page
                with a revised "Last Updated" date.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-green-900 mb-3">9. Contact Us</h2>
              <p>
                If you have questions about this Privacy Policy, contact us at{" "}
                <a className="text-green-900 underline" href="mailto:hello@bamboowoods.com">
                  hello@bamboowoods.com
                </a>{" "}
                or call{" "}
                <a className="text-green-900 underline" href="tel:+254742776921">
                  +254 742 776 921
                </a>
                .
              </p>
            </section>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
