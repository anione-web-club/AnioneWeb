import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "@/styles/globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        <Header />
        <div id="wrapper">
          <div className="headerMargin" />
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
