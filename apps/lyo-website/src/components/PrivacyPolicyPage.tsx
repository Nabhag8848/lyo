export const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="font-display text-4xl text-black uppercase tracking-wide mb-8">
          Privacy Policy
        </h1>

        <div className="prose prose-stone max-w-none space-y-6">
          <p className="text-stone-600">Last updated: January 2025</p>

          <section>
            <h2 className="font-display text-2xl text-black uppercase tracking-wide mt-8 mb-4">
              Introduction
            </h2>
            <p className="text-stone-600 leading-relaxed">
              LYO ("we", "our", or "us") is committed to protecting your privacy.
              This Privacy Policy explains how we collect, use, and handle your data
              when you use the LYO browser extension and related services.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-black uppercase tracking-wide mt-8 mb-4">
              Data We Collect
            </h2>

            <h3 className="font-semibold text-black mt-4 mb-2">
              Authentication Data
            </h3>
            <p className="text-stone-600 leading-relaxed">
              We use cookies to store your access token for authentication. This token
              is stored in a cookie on lyo.fashion domain and is read by the extension
              to authenticate API requests.
            </p>

            <h3 className="font-semibold text-black mt-4 mb-2">User Profile Data</h3>
            <p className="text-stone-600 leading-relaxed">
              When you use the extension, we collect your user profile information
              including account status and subscription information to provide the
              service.
            </p>

            <h3 className="font-semibold text-black mt-4 mb-2">Reference Photos</h3>
            <p className="text-stone-600 leading-relaxed">
              You may upload full-body photos to create avatars for virtual try-on.
              These photos are stored on our servers and used solely to generate
              virtual try-on images.
            </p>

            <h3 className="font-semibold text-black mt-4 mb-2">
              Product Information
            </h3>
            <p className="text-stone-600 leading-relaxed">
              The extension temporarily stores product metadata (name, brand, image
              URL, price, selected size) from shopping pages you visit. This data is
              stored locally in your browser and is cleared when you navigate away from
              product pages.
            </p>

            <h3 className="font-semibold text-black mt-4 mb-2">Try-On Data</h3>
            <p className="text-stone-600 leading-relaxed">
              When you request a virtual try-on, we process the product information
              and your selected avatar to generate try-on images. Try-on results are
              stored in your virtual wardrobe.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-black uppercase tracking-wide mt-8 mb-4">
              How We Use Your Data
            </h2>
            <ul className="list-disc list-inside text-stone-600 space-y-2">
              <li>To authenticate and maintain your user session</li>
              <li>To generate virtual try-on images using AI technology</li>
              <li>To provide and improve our virtual fitting room service</li>
              <li>To store your wardrobe of try-on results</li>
              <li>To communicate with you about your account and service</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl text-black uppercase tracking-wide mt-8 mb-4">
              Data Storage
            </h2>
            <p className="text-stone-600 leading-relaxed">
              Product metadata and pending try-on status are stored locally in your
              browser using Chrome's storage API. This data is session-based and
              cleared when no longer needed. Your reference photos, try-on results,
              and account data are stored on our secure servers.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-black uppercase tracking-wide mt-8 mb-4">
              Data Sharing
            </h2>
            <p className="text-stone-600 leading-relaxed">
              We do not sell, trade, or share your personal data with third parties.
              Your data is only used to provide the LYO virtual try-on service.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-black uppercase tracking-wide mt-8 mb-4">
              Your Rights
            </h2>
            <p className="text-stone-600 leading-relaxed">
              You have the right to access, update, or delete your personal data. You
              can manage your account and data through the LYO dashboard or by
              contacting us at nabhag@lyo.fashion.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-black uppercase tracking-wide mt-8 mb-4">
              Contact Us
            </h2>
            <p className="text-stone-600 leading-relaxed">
              If you have questions about this Privacy Policy, please contact us at{' '}
              <a
                href="mailto:nabhag@lyo.fashion"
                className="text-brand-pink hover:underline"
              >
                nabhag@lyo.fashion
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

