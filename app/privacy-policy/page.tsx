import { GridLayout } from "@/components/layout/GridLayout";

export default function PrivacyPolicy() {
  return (
    <GridLayout>
      <section className="mt-20 col-span-6 col-start-4 text-body mb-20">
        <h3 className="text-heading-large">Privacy Policy</h3>
        <p className="text-heading-medium mt-10">Responsible Entity</p>
        <ul>
          <li>Name: Joschua Rothenbacher</li>
          <li>E-Mail: j.rothenbacher@yahoo.de</li>
        </ul>
        <h3 className="text-heading-medium mt-5">General Information</h3>
        <p>
          Protecting your personal data is very important to me. This privacy
          policy explains the type, scope, and purpose of the processing of
          personal data on my website.
        </p>
        <h3 className="text-heading-medium mt-5">
          Data Collection on This Website
        </h3>
        <p>
          The data processing on this website is carried out by the website
          operator. You can find the contact details in the imprint of this
          website.
        </p>
        <h3 className="text-heading-medium mt-5">Hosting</h3>
        <p>
          This website is hosted on servers of a hosting provider. Access data
          such as browser type, operating system, referrer URL, IP address, and
          time of access may be automatically stored in log files. These data
          are used exclusively to ensure the smooth operation of the website and
          are regularly deleted.
        </p>
        <h3 className="text-heading-medium mt-5">
          Vercel Analytics and Speed insights
        </h3>
        <p>
          This website uses Vercel Analytics and Speed Insights to collect
          anonymous usage data for statistical purposes. These services do not
          collect or store any personal information that would enable the
          reconstruction of an individual&apos;s browsing session or identify a
          user. The data collected includes:
        </p>
        <ul className="list-main">
          <li className="list-item">Route and URL Network speed</li>
          <li className="list-item">Browser type and version Device type and operating system</li>
          <li className="list-item">Country (ISO 3166-1 alpha-2 code)</li>
          <li className="list-item">Web Vital metrics</li>
          <li className="list-item">SDK information</li>
        </ul>
        <p>
          This data is used to analyze overall trends in website traffic and
          improve performance. No personal data is collected, and no cookies are
          used for these services.
        </p>
        <h3 className="text-heading-medium mt-5">Embedded YouTube Videos</h3>
        <p>
          I embed YouTube videos on my website. The provider is Google Ireland
          Limited, Gordon House, Barrow Street, Dublin 4, Ireland. When you play
          a video, a connection to YouTube&apos;s servers is established. The
          YouTube server is informed about which pages you have visited. If you
          are logged into your YouTube account, you allow YouTube to associate
          your browsing behavior directly with your personal profile. You can
          prevent this by logging out of your YouTube account. Furthermore, when
          starting a video, YouTube may store various cookies on your device or
          use similar recognition technologies (e.g., device fingerprinting).
          This allows YouTube to collect information about visitors to this
          website. This information is used, among other things, to collect
          video statistics, improve user experience, and prevent fraud attempts.
          The use of YouTube is in the interest of an appealing presentation of
          my online offerings. This constitutes a legitimate interest pursuant
          to Art. 6 (1) lit. f GDPR. If consent has been requested, the
          processing is based exclusively on Art. 6 (1) lit. a GDPR; consent can
          be revoked at any time. For more information on how user data is
          handled, please refer to YouTube&apos;s privacy policy:
          https://policies.google.com/privacy?hl=en.
        </p>
        <h3 className="text-heading-medium mt-5">Use of Fonts</h3>
        <p>
          I use the Geist font via next/font on my website. next/font is a
          feature provided by Next.js that allows fonts to be hosted and
          optimized locally. This means no connection to external servers is
          established to load the font. As a result, no personal data is
          transmitted to third parties.
        </p>
        <h3 className="text-heading-medium mt-5">Your Rights</h3>
        <p>
          I reserve the right to amend this privacy policy in order to comply
          with current legal requirements or to reflect changes in my services
          in this privacy policy. The new privacy policy will apply for your
          next visit. Effective Date: 04.03.2025.
        </p>
      </section>
    </GridLayout>
  );
}
