"use client";
import {
  analytics,
  trackConversion,
  trackEvent,
  trackPageView
} from "./chunk-MH6OW7CL.mjs";

// src/providers.tsx
import { useEffect, createContext, useContext, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
var AnalyticsContext = createContext({
  trackPageView,
  trackEvent,
  trackConversion
});
function AnalyticsTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  useEffect(() => {
    if (pathname) {
      const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "");
      trackPageView({ path: url });
    }
  }, [pathname, searchParams]);
  return null;
}
function AnalyticsProvider({
  children,
  config
}) {
  useEffect(() => {
    analytics.initialize(config);
  }, [config]);
  return /* @__PURE__ */ jsxs(AnalyticsContext.Provider, { value: { trackPageView, trackEvent, trackConversion }, children: [
    /* @__PURE__ */ jsx(Suspense, { fallback: null, children: /* @__PURE__ */ jsx(AnalyticsTracker, {}) }),
    children
  ] });
}
function useAnalytics() {
  return useContext(AnalyticsContext);
}
function GoogleAnalytics({ measurementId }) {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      "script",
      {
        async: true,
        src: `https://www.googletagmanager.com/gtag/js?id=${measurementId}`
      }
    ),
    /* @__PURE__ */ jsx(
      "script",
      {
        id: "google-analytics",
        dangerouslySetInnerHTML: {
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${measurementId}', {
              page_path: window.location.pathname,
              anonymize_ip: true,
            });
          `
        }
      }
    )
  ] });
}
function FacebookPixel({ pixelId }) {
  return /* @__PURE__ */ jsx(
    "script",
    {
      id: "facebook-pixel",
      dangerouslySetInnerHTML: {
        __html: `
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${pixelId}');
          fbq('track', 'PageView');
        `
      }
    }
  );
}
function TwitterPixel({ pixelId }) {
  return /* @__PURE__ */ jsx(
    "script",
    {
      id: "twitter-pixel",
      dangerouslySetInnerHTML: {
        __html: `
          !function(e,t,n,s,u,a){e.twq||(s=e.twq=function(){s.exe?s.exe.apply(s,arguments):s.queue.push(arguments);
          },s.version='1.1',s.queue=[],u=t.createElement(n),u.async=!0,u.src='https://static.ads-twitter.com/uwt.js',
          a=t.getElementsByTagName(n)[0],a.parentNode.insertBefore(u,a))}(window,document,'script');
          twq('config','${pixelId}');
        `
      }
    }
  );
}
export {
  AnalyticsProvider,
  FacebookPixel,
  GoogleAnalytics,
  TwitterPixel,
  useAnalytics
};
