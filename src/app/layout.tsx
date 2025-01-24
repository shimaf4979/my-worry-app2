import type { Metadata } from "next";
// app/layout.tsx
import { RootLayout } from "@/components/layout/RootLayout";
import "./globals.css";

export const metadata: Metadata = {
  title: "CRTI 理系学生の心の声",
  description:
    "理系大学生が抱える心の声を汲み取り、ベストな解決策を提案します！",
  openGraph: {
    title: "CRTI 理系学生の心の声",
    description:
      "理系大学生が抱える心の声を汲み取り、ベストな解決策を提案します！",
    url: "https://my-worry-app2-delta.vercel.app/",
    images: [
      {
        url: "ogp1.png",
        width: 1200,
        height: 630,
      },
    ],
  },
};

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <body
//         className={`${geistSans.variable} ${geistMono.variable} antialiased`}
//       >
//         {children}
//       </body>
//     </html>
//   );
// }
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ja'>
      <head>
        <link
          href='https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap'
          rel='stylesheet'
        />
      </head>
      <body>
        <RootLayout>{children}</RootLayout>
      </body>
    </html>
  );
}
