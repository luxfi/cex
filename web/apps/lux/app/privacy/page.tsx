'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-success hover:text-success/80 mb-8 transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Home
          </Link>

          <h1 className="text-4xl lg:text-5xl font-bold mb-6">Privacy Policy</h1>
          <p className="text-muted-1 mb-2">Effective Date: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
          <p className="text-muted-1 mb-8">Policy was last reviewed or updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>

          <div className="prose prose-invert max-w-none space-y-8">
            <section>
              <p className="text-muted-1 leading-relaxed">
                Lux Exchange LLC and its service providers, including AlpacaDB, Inc. and its subsidiaries and affiliates (collectively, "Alpaca", "us" or "we") understand that your privacy is important and we are committed to respecting your privacy and protecting your personal data, which is any information that is capable of identifying you as an individual person. This Privacy Policy describes how we handle and protect your personal data in connection with our business activities, like user accounts, brokerage accounts, digital asset accounts, and client services, and on websites, applications, and communications that post a link to this Privacy Policy (collectively, "the Sites"), in our capacity as data controllers.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Your Acceptance of this Privacy Policy</h2>
              <p className="text-muted-1 leading-relaxed">
                Please read and understand this Privacy Policy. By browsing our Sites and using our services and expressly consenting where required, you agree to be bound by this Privacy Policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">What data do we collect?</h2>
              <p className="text-muted-1 leading-relaxed mb-3">
                We collect personal data in the course of our business activities, including in connection with the opening of brokerage accounts, digital asset accounts, and some client services. We also collect personal data on certain areas of the Sites when you register for or apply for jobs through our recruitment portal, create a user profile, register for newsletters and alerts, and/or participate in public user posting areas (such as bulletin boards, discussion forums, and surveys). The personal data we collect and may be provided by you includes:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-1 ml-4">
                <li>Name</li>
                <li>Telephone number</li>
                <li>E-mail address</li>
                <li>Physical address</li>
                <li>Tax or government ID</li>
                <li>Investment profile information</li>
                <li>Background information (education, work experience) required to apply for a job</li>
              </ul>
              <p className="text-muted-1 leading-relaxed mt-4">
                We limit our data collection to information that is necessary for the specific purposes outlined in this policy and do not collect personal data beyond what is reasonably required for those purposes.
              </p>
              <p className="text-muted-1 leading-relaxed mt-4">
                We may also automatically collect information about the devices you use to interact with our Sites. The information we automatically collect may include IP address, device identifier, web browser, and browsing information collected through cookies, web beacons, pixels, clear gifs, and other similar technologies (collectively "Cookies and Other Tracking Technologies") on our Sites. We may also automatically collect information about how you use the Sites, such as what you have searched for and viewed on the Sites. The information automatically collected may be associated with a unique identifier as well as with any other personal data you have provided.
              </p>
              <p className="text-muted-1 leading-relaxed mt-4">
                We may also collect personal data about you from third parties, such as data brokers or aggregators, in the course of our business activities including in connection with some client services. This includes demographic, professional, and other information that is publicly available online, including information you choose to make public through social media platforms and other public online forums. We may combine this data with existing information we have about you or use it independently, for our benchmarking and market data analytics activities. We will always seek to confirm that the third party has provided transparent information about its use of this data, including its disclosure to third parties like us, in compliance with applicable law.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">How will we use your data?</h2>
              <p className="text-muted-1 leading-relaxed">
                We use your personal data to fulfill your requests to open accounts, process your requests to fund or de-fund accounts, evaluate and improve our services, distribute newsletters and alerts to you, recruit and evaluate job applicants, analyze the Sites' performance and functionality, prevent fraud, enforce our terms and conditions, comply with all applicable laws and corporate reporting obligations, enforce our agreements, and accomplish other purposes you may initiate or request. In some situations, the collection of personal data may be required for the operation of the Sites, or we may use it in the course of our business activities, including in connection with some client services, for example, to provide certain services or products such as our market data products. We may combine and/or analyze personal data to evaluate and offer content and services most relevant to you. We may keep any of your personal data on file and use it to contact you. We limit the collection of personal data to what is relevant for the specific, legitimate purposes for which we process it. We will not process your personal data in a way that is incompatible with the purposes for which it has been collected.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">The legal basis by which we process your personal data</h2>
              <p className="text-muted-1 leading-relaxed mb-3">
                Our processing of your personal data for the purposes mentioned above is based:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-1 ml-4">
                <li>in part, on our legitimate interests in promoting and protecting our business, building and maintaining relationships, recruitment, and providing our services;</li>
                <li>in part, on your consent, for example, if you create a user profile, or register for our newsletters or alerts, or for business purposes that support web operations such as understanding and enhancing the quality of your experience on our Sites;</li>
                <li>in part, to comply with the law, when certain information is necessary to satisfy our legal or regulatory obligations.</li>
              </ul>
              <p className="text-muted-1 leading-relaxed mt-4">
                In those cases where the legal basis for the processing of your data requires your consent, we will require it expressly and in advance.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Disclosure of personal data: data recipients and international data transfers</h2>
              <p className="text-muted-1 leading-relaxed mb-4">
                <strong className="text-white">International Data Transfer:</strong> If you are located outside the United States, your personal data may be transferred to and processed in the United States, which may have different privacy laws than your country.
              </p>
              <p className="text-muted-1 leading-relaxed mb-4">
                Personal data collected in the course of our business activities, including in connection with some client services, as well as on the Sites may be transferred from time to time to our subsidiaries and affiliates and their personnel across our global organization, as well as to our third-party service providers located throughout the world. Where required by law, we have put in place mechanisms designed to ensure adequate data protection of your personal data that is processed by our subsidiaries, affiliates, and third-party service providers, including the transfer of your personal data to countries other than the one in which you reside. By using any of the Sites and providing information on any of them, you voluntarily consent to such trans-border transfer and hosting of such information.
              </p>
              <p className="text-muted-1 leading-relaxed mb-4">
                We will not sell your personal data to third parties for marketing purposes. We may share your personal data with third parties only in the following circumstances: We may provide access to your personal data to third-party service providers engaged by us to provide services related to the Sites as well as related to our business activities, including in connection with some client services, in the manner agreed upon in our services agreements. We maintain processes designed to ensure that any processing of personal data by third-party service providers is consistent with this Privacy Policy and protects the confidentiality, integrity, and availability of your personal data. We are responsible and liable for personal data that we receive and subsequently transfer to a third party.
              </p>
              <p className="text-muted-1 mb-3">In addition, we may disclose information about you:</p>
              <ul className="list-disc list-inside space-y-2 text-muted-1 ml-4">
                <li>If we are required to do so by law or legal process;</li>
                <li>To law enforcement authorities or other government officials;</li>
                <li>When we believe disclosure is necessary or appropriate to prevent physical harm or financial loss or in connection with an investigation of suspected or actual fraudulent or illegal activity;</li>
                <li>If disclosure is necessary to protect the vital interests of a person;</li>
                <li>To enforce our Terms and Conditions;</li>
                <li>To protect our property, services, and legal rights;</li>
                <li>To prevent fraud against us, our subsidiaries, affiliates, and/or business partners;</li>
                <li>To support auditing, compliance, legal, and corporate governance functions;</li>
                <li>To prospective purchasers and assignees in the event our business, or a portion thereof, is sold or assigned;</li>
                <li>To other third parties as may be required for the purposes set forth within this notice, or where we have obtained the appropriate authorization, if required; and</li>
                <li>To comply with all applicable laws and regulations including in response to lawful requests by public authorities to meet national security or law enforcement requirements.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Security and how we store your data</h2>
              <p className="text-muted-1 leading-relaxed">
                We have implemented generally accepted standards of technology and operational security designed to protect personal data from loss, misuse, alteration, accidental, unlawful, or authorized destruction, from disclosure or access or use as well as any other unlawful forms of processing.
              </p>
              <p className="text-muted-1 leading-relaxed mt-4">
                Only authorized personnel and third-party service providers are provided access to personal data, and these employees and service providers are required to treat this information as confidential. Despite these precautions, however, we cannot guarantee that unauthorized persons will not obtain access to your personal data and we cannot be held responsible for any actions resulting from a breach of security when information is supplied over the internet or any public computer network.
              </p>
              <p className="text-muted-1 leading-relaxed mt-4">
                In the event of an incident or breach of personal data, we will assess the risk to your data and notify you shortly after the assessment is complete or sooner if local laws stipulate otherwise. We will provide you the contact details of our Data Protection Officer or another point of contact where you can obtain further information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Data retention</h2>
              <p className="text-muted-1 leading-relaxed">
                We retain personal data, as necessary, for the duration of the relevant business relationship. We may also retain personal data for longer than the duration of the business relationship should we need to retain it to protect ourselves against legal claims, to meet regulatory requirements, use it for analysis or historical record-keeping, or comply with our data management policies. If you request that we delete your personal data, we will make reasonable attempts to delete all instances of your data in their entirety.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Children</h2>
              <p className="text-muted-1 leading-relaxed">
                These sites are not designed for or directed at children under 18 years of age. We do not knowingly collect personal data from anyone under 18 years of age. If we become aware that we have collected personal data from someone under 18, we will promptly delete such information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Your Data Protection Rights</h2>
              <p className="text-muted-1 leading-relaxed mb-3">
                Where granted by applicable law, you may have the right to request access to the personal data that we have collected about you to review, modify, or requesting deletion of the data. You may also have the right to request a copy of the personal data that we have collected about you and to have any inaccuracies in that data corrected. In certain circumstances, you may also request that we cease processing your personal data. If this is requested, we may not be able to provide the services as described.
              </p>
              <p className="text-muted-1 leading-relaxed mb-4">
                If you would like to make a request to access, review, or correct the personal data we have collected about you, or to discuss how we process your personal data, please contact us at privacy@luxprotrader.com. To help protect your privacy and security, we will take reasonable steps to verify your identity, such as requiring a password and user ID, before granting access to your personal data.
              </p>
              <p className="text-muted-1 leading-relaxed">
                In addition, and where granted by local law, you have the legal right to lodge a complaint with a competent data protection authority in your respective region.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Your California Privacy Rights</h2>
              <p className="text-muted-1 leading-relaxed mb-4">
                If you are a California resident under the age of 18, and a registered user of any of the Sites where this Privacy Policy is posted, California Business and Professions Code Section 22581 permits you to request and obtain removal of content or information you have publicly posted.
              </p>
              <p className="text-muted-1 leading-relaxed">
                As required by the California Consumer Privacy Act (CCPA), this Privacy Policy describes the categories of personal data collected, processed, and disclosed by us, the categories of sources for that data, and the business or commercial purposes for which that data is collected, processed, and disclosed. When we process your request, we require you to provide certain personal data about yourself to verify your identity in accordance with requirements under CCPA. We will not discriminate against you based on your exercise of any of these rights.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Changes to this Privacy Policy</h2>
              <p className="text-muted-1 leading-relaxed">
                By using the Sites, you consent to the collection, use, and storage of your personal data by us in the manner described in this Privacy Policy and elsewhere on the Sites. We reserve the right to make changes to this Privacy Policy from time to time. We will alert you to any such changes by updating this Privacy Policy. If we make material changes to this Privacy Policy that increase our rights to use personal data that we have previously collected about you, we will obtain your consent either through an email to your registered email address or by prominently posting information about the changes on our Sites.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
              <p className="text-muted-1 leading-relaxed mb-3">
                If you have any questions about our Privacy Policy, please contact us at:
              </p>
              <div className="glass-effect rounded-lg p-6">
                <p className="text-white mb-2"><strong>Lux Exchange LLC</strong></p>
                <p className="text-muted-1">
                  Privacy Department<br />
                  The Trump Building<br />
                  40 Wall Street, Suite 2702<br />
                  New York, NY 10005
                </p>
                <p className="text-muted-1 mt-3">Email: privacy@luxprotrader.com</p>
                <p className="text-muted-1">Phone: +1 (973) 224-7098</p>
              </div>
            </section>

            <section className="border-t pt-8">
              <p className="text-sm text-muted-1">
                Services provided by <strong>Lux Exchange LLC</strong> through Alpaca Securities LLC (member FINRA/SIPC) and Alpaca Crypto LLC (NMLS # 2160858).
              </p>
              <p className="text-sm text-muted-1 mt-2">
                © {new Date().getFullYear()} Lux Exchange LLC. All rights reserved.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
