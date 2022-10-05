/* eslint-disable @next/next/no-script-in-document */
/* eslint-disable @next/next/next-script-for-ga */
import { ColorModeScript } from '@chakra-ui/react'
import NextDocument, { Html, Head, Main, NextScript } from 'next/document'
import theme from '../libs/theme'
import Script from 'next/script'
export default class Document extends NextDocument {
    render() {
        return (
            <Html lang="en">
                <Head>
                    <Script
                        id="gtm"
                        strategy="afterInteractive"
                        dangerouslySetInnerHTML={{
                            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer',${process.env.NEXT_PUBLIC_GOOGLE_TAGS_MANAGER});
          `
                        }}
                    />
                </Head>
                <body>
                    <noscript
                        dangerouslySetInnerHTML={{
                            __html: `
            <iframe src="https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GOOGLE_TAGS_MANAGER}"
              height="0" width="0" style="display:none;visibility:hidden"></iframe>
            `
                        }}
                    />
                    <ColorModeScript
                        initialColorMode={theme.config.initialColorMode}
                    />
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}
