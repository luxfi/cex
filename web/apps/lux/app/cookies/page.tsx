'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function CookiePolicy() {
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

          <h1 className="text-4xl lg:text-5xl font-bold mb-6">Cookie Policy</h1>
          <p className="text-muted-1 mb-8">Policy was last reviewed or updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>

          <div className="prose prose-invert max-w-none space-y-8">
            <section>
              <p className="text-muted-1 leading-relaxed">
                Lux Exchange LLC and its service providers, including AlpacaDB, Inc. and its subsidiaries and affiliates (collectively, "Alpaca", "us" or "we") understand that your privacy is important and we are committed to being transparent about the technologies we use. This Cookie Policy explains how and why cookies, web beacons, pixels, and other similar technologies (collectively "cookies and other tracking technologies") may be stored on and accessed from your device when you use or visit any website or app that posts a link to this Cookie Policy (collectively, "Sites"). This Cookie Policy should be read together with our <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">What are Cookies and Other Tracking Technologies?</h2>
              <p className="text-muted-1 leading-relaxed">
                A cookie and other tracking technologies are small files that can be stored on and accessed from your device when you visit one of our Sites, to the extent you agree and opt-in. These collectively enable us to recognize your device and collect information about how you use our Sites. You can find more information at <a href="http://www.allaboutcookies.org" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">http://www.allaboutcookies.org</a> and <a href="http://www.youronlinechoices.eu" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">http://www.youronlinechoices.eu</a>.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">How do our Sites use Cookies and Other Tracking Technologies?</h2>
              <p className="text-muted-1 leading-relaxed mb-4">
                We use cookies and other tracking technologies to identify you, your device, your interests, remember your preferences and track your use of our Sites. This information is used to control access to certain content on our Sites, protect our Sites, and process any requests that you make of us. This helps us analyze data about website traffic and improve our website.
              </p>
              <p className="text-muted-1 leading-relaxed mb-4">
                When you visit our website for the first time, we will ask you to accept or reject our cookies. Thereafter, dependent on the device or location you are visiting from, after a certain period of time we may ask you to accept or reject our cookies again. The purpose is to remember your preferences (e.g. name, language, etc.) for a certain period of time. In this way, you will not have to re-enter your preferences every time.
              </p>
              <p className="text-muted-1 leading-relaxed mb-4">
                Cookies can also be used to compile anonymized statistics on the browsing experience on our Sites.
              </p>
              <p className="text-muted-1 leading-relaxed">
                To administer our Sites, we have contracted with third-party service providers to track and analyze statistical usage from the users of our Sites. These third-party service providers may use persistent cookies to help us improve user experience and analyze how users navigate and utilize our Sites.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">First-party and Third-party Cookies</h2>
              <p className="text-muted-1 leading-relaxed mb-4">
                "First-party Cookies" are cookies that belong to us, that can only be read by our Sites, and are placed on your device whereas "Third-party Cookies" are cookies that third-parties place on your device as you visit our site. We may contract with third-party service providers to send messages to users who have provided us with their contact information. To help measure and improve the effectiveness of our e-mail communications, and/or to determine whether messages have been opened and links clicked on, third-parties may place cookies on the devices of these users.
              </p>
              <p className="text-muted-1 leading-relaxed">
                For more information on how these companies collect and use the information on our behalf, please refer to their respective privacy policies.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Types of Cookies We Use</h2>
              
              <h3 className="text-xl font-semibold mb-3 text-white">Strictly Necessary Cookies</h3>
              <p className="text-muted-1 mb-4">
                We use strictly necessary cookies as they allow us to operate our Sites so you have access to them as requested.
              </p>

              <h3 className="text-xl font-semibold mb-3 text-white">Persistent Cookies</h3>
              <p className="text-muted-1 mb-4">
                We use persistent cookies to improve the experience of using our Sites which includes recording your acceptance of our Cookie Policy. These are cookies that are stored on your computer and are not automatically deleted when you exit the browser (unlike session cookies, which are deleted when you exit the browser or delete your cache).
              </p>

              <h3 className="text-xl font-semibold mb-3 text-white">Session Cookies</h3>
              <p className="text-muted-1 mb-4">
                We use session cookies to help us track your usage as described and are temporary and deleted from your machine when your web browser is closed.
              </p>

              <h3 className="text-xl font-semibold mb-3 text-white">Advertising Cookies</h3>
              <p className="text-muted-1 mb-4">
                We use advertising cookies (or targeting cookies) to collect information about browsing habits associated with your device and used by third parties for services such as 'Like' or 'Share' buttons in addition to providing the requested functionality. Third parties provide these services in return for recognizing that your device visited a certain site. These third parties put down advertising cookies both when you visit our site and when you use their services and navigate away from our site.
              </p>

              <p className="text-muted-1 mt-4">
                The data collected by cookies that have been placed on your device will be kept for as long as necessary to fulfill the purposes mentioned above.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Specific Cookies We Use</h2>
              
              <div className="space-y-6">
                <div className="glass-effect rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-2">Google Analytics</h4>
                  <p className="text-sm text-muted-1 mb-2">Cookies: _ga, _gid, _gcl_au, _gat_gtag, _gat</p>
                  <p className="text-sm text-muted-1">These cookies collect information to measure and understand how visitors use our Site. This includes user activity tracking on this Site, including pages visited and links clicked.</p>
                </div>

                <div className="glass-effect rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-2">Google reCAPTCHA</h4>
                  <p className="text-sm text-muted-1 mb-2">Cookie: _GRECAPTCHA</p>
                  <p className="text-sm text-muted-1">Used for risk analysis to protect against spam and abuse.</p>
                </div>

                <div className="glass-effect rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-2">HotJar</h4>
                  <p className="text-sm text-muted-1 mb-2">Cookies: _hjAbsoluteSessionInProgress, _hjFirstSeen, _hjSessionUser, _hjSession</p>
                  <p className="text-sm text-muted-1">Used to track the beginning of the user's journey for a total session count. It does not contain any identifiable information.</p>
                </div>

                <div className="glass-effect rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-2">LinkedIn</h4>
                  <p className="text-sm text-muted-1 mb-2">Cookies: li_gc, AnalyticsSyncHistory, bcookie, lidc, UserMatchHistory, lang</p>
                  <p className="text-sm text-muted-1">Used to store guest consent to the use of cookies for non-essential purposes and to enable LinkedIn functionalities on the page.</p>
                </div>

                <div className="glass-effect rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-2">Hubspot</h4>
                  <p className="text-sm text-muted-1 mb-2">Cookies: __hstc, __hssc, __hssrc, hubspotutk, messagesUtk, _cfuvid, __cf_bm</p>
                  <p className="text-sm text-muted-1">Used for site analytics and to distinguish between humans and bots.</p>
                </div>

                <div className="glass-effect rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-2">Amplitude</h4>
                  <p className="text-sm text-muted-1 mb-2">Cookies: amplitude_testalpaca.markets, amp_555479</p>
                  <p className="text-sm text-muted-1">Collect information to measure and understand how visitors use our site.</p>
                </div>

                <div className="glass-effect rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-2">Segment.io</h4>
                  <p className="text-sm text-muted-1 mb-2">Cookies: ajs_user_id, ajs_group_id</p>
                  <p className="text-sm text-muted-1">Used to analyze how you use the website.</p>
                </div>

                <div className="glass-effect rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-2">Google Advertising</h4>
                  <p className="text-sm text-muted-1 mb-2">Cookies: test_cookie, IDE, doubleclick.net, _gcl_au</p>
                  <p className="text-sm text-muted-1">Used to determine if the user's browser supports cookies and for experimenting with advertisement efficiency.</p>
                </div>

                <div className="glass-effect rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-2">Meta (Facebook)</h4>
                  <p className="text-sm text-muted-1 mb-2">Cookie: _fbp</p>
                  <p className="text-sm text-muted-1">Used by Meta to deliver a series of advertisement products.</p>
                </div>

                <div className="glass-effect rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-2">Twitter/X</h4>
                  <p className="text-sm text-muted-1 mb-2">Cookies: personalization_id, muc_ads</p>
                  <p className="text-sm text-muted-1">Carries out information about how the end user uses the website and any advertising that the end user may have seen before visiting the site.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Web Beacons</h2>
              <p className="text-muted-1 leading-relaxed mb-4">
                We may collect information about whether you open or click any links in the communications that we send to you through web beacons.
              </p>
              <p className="text-muted-1 leading-relaxed mb-4">
                A web beacon is a graphic image placed on a site or in an email that alone or in conjunction with cookies compiles information about your interaction with our site or email. For example, we may add web beacons to the communications that we send to you to determine whether you have opened our email or clicked a link. The analysis gathered helps us improve the effectiveness of the content and format of our Sites and communications.
              </p>
              <p className="text-muted-1 leading-relaxed">
                <strong className="text-white">How do I refuse or withdraw my consent to the use of Web Beacons?</strong> You may avoid web beacons by configuring your email program to disable the functionality that enables remote images to load and by not clicking on any links in email messages.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">How do I refuse or withdraw my consent to the use of Cookies?</h2>
              <p className="text-muted-1 leading-relaxed mb-4">
                If you do not want cookies to be placed on your device, you can adjust the setting of your Internet browser to reject all or some cookies and to alert you when a cookie is placed on your device. For further information please refer to your browser 'help' / 'tool' or 'edit' section or see <a href="http://www.allaboutcookies.org" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">http://www.allaboutcookies.org</a>. Please note that if you use your browser settings to block all cookies you may not be able to access or use all functionality of our Sites.
              </p>
              <p className="text-muted-1 leading-relaxed mb-4">
                If you want to remove previously stored cookies, you can manually delete the cookies at any time. However, this will not prevent the Sites from placing further cookies on your device unless and until you adjust your Internet browser setting as described above.
              </p>
              <p className="text-muted-1 leading-relaxed">
                For more information on the development of user-profiles and the use of targeting cookies, please see <a href="http://www.youronlinechoices.eu" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">http://www.youronlinechoices.eu</a> if you are located in Europe or <a href="http://www.aboutads.info/choices" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">www.aboutads.info/choices</a> if in the United States.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Delete cookies from your device</h2>
              <p className="text-muted-1 leading-relaxed mb-4">
                You can delete the cookies you already have on your device by deleting the browser history or cache. This will delete cookies from all websites you have visited.
              </p>
              <p className="text-muted-1 leading-relaxed">
                However, you may also lose some of the information you have stored (e.g. login information or preferences for websites).
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Blocking cookies</h2>
              <p className="text-muted-1 leading-relaxed mb-4">
                It is possible to set most modern browsers to not accept cookies on the device you are using by default, but in that case, you may have to manually set a number of preferences each time you visit a Site or page. In addition, some services and features may not work properly (e.g. profile logins).
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Contact us</h2>
              <p className="text-muted-1 leading-relaxed mb-3">
                If you have any other questions about our Cookie Policy, please contact us at:
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
