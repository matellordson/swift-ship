'use client'

import { useEffect } from 'react'
import Script from 'next/script'

declare global {
  interface Window {
    smartsupp: any;
    _smartsupp: any;
  }
}

export default function SmartSupp() {
  useEffect(() => {
    window._smartsupp = window._smartsupp || {};
    window._smartsupp.key = '24d5e79ad033a20740afac9d86fa70088917365f';
    window.smartsupp = window.smartsupp || function() {
      (window.smartsupp._ = window.smartsupp._ || []).push(arguments);
    };
  }, []);

  return (
    <>
      <Script
        id="smartsupp-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.smartsupp||(function(d) {
              var s,c,o=smartsupp=function(){ o._.push(arguments)};o._=[];
              s=d.getElementsByTagName('script')[0];c=d.createElement('script');
              c.type='text/javascript';c.charset='utf-8';c.async=true;
              c.src='https://www.smartsuppchat.com/loader.js?';s.parentNode.insertBefore(c,s);
            })(document);
          `
        }}
      />
      <noscript>
        Powered by <a href="https://www.smartsupp.com" target="_blank" rel="noopener noreferrer">Smartsupp</a>
      </noscript>
    </>
  )
}