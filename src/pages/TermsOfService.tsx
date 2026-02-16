import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-stone-50">
      <Navbar />
      <main className="pt-28 md:pt-32">
        <section className="max-w-4xl mx-auto py-12 px-6 text-neutral-800">
          <h1 className="text-3xl md:text-4xl font-bold text-green-900 mb-3">Terms of Service</h1>
          <p className="text-sm text-neutral-600 mb-8">Last Updated: February 16, 2026</p>

          <div className="space-y-8 leading-relaxed">
            <section>
              <h2 className="text-2xl font-semibold text-green-900 mb-3">1. Acceptance of Terms</h2>
              <p>
                By accessing or using the Bamboo Woods website, you agree to these Terms of Service. If you do
                not agree, please do not use this site.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-green-900 mb-3">2. Reservations and Booking</h2>
              <p>
                Our website allows you to submit reservation requests. A reservation is not final until
                confirmed by Bamboo Woods. We may contact you using the details you provide to confirm,
                modify, or cancel a request.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-green-900 mb-3">3. Accurate Information</h2>
              <p>
                You agree to provide complete and accurate information, including your name, email, phone
                number, and reservation details. Incorrect information may result in delayed or failed booking
                confirmations.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-green-900 mb-3">4. Cancellations and Changes</h2>
              <p>
                If you need to change or cancel a reservation, contact us as early as possible. We reserve the
                right to update reservation policies for peak periods, special events, or private functions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-green-900 mb-3">5. Pricing and Availability</h2>
              <p>
                Menu items, pricing, and availability may change without notice. We strive for accuracy but do
                not guarantee that all content on the website is always current or error-free.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-green-900 mb-3">6. Allergies and Dietary Requirements</h2>
              <p>
                Please inform us in advance of any allergies or dietary requirements. While we take reasonable
                care, we cannot guarantee a completely allergen-free environment.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-green-900 mb-3">7. Intellectual Property</h2>
              <p>
                All website content, including text, branding, logos, and images, is owned by or licensed to
                Bamboo Woods and may not be reused without permission.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-green-900 mb-3">8. Limitation of Liability</h2>
              <p>
                To the fullest extent allowed by law, Bamboo Woods is not liable for indirect, incidental, or
                consequential damages resulting from use of the website or reservation services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-green-900 mb-3">9. Governing Law</h2>
              <p>
                These Terms are governed by the laws applicable in Kenya. Any disputes arising from these Terms
                are subject to the jurisdiction of competent Kenyan courts.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-green-900 mb-3">10. Contact Us</h2>
              <p>
                For questions regarding these Terms, contact us at{" "}
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

export default TermsOfService;
