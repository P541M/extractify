import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function PrivacyPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Navbar */}
      <header className="bg-card shadow-lg border-b border-border sticky top-0 z-50 backdrop-blur-sm bg-opacity-90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative w-8 h-8 transition-transform duration-300 group-hover:scale-110">
              <Image
                src="/file.svg"
                alt="Extractify Logo"
                fill
                className="object-contain"
              />
            </div>
            <span className="text-2xl font-bold text-white bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Extractify
            </span>
          </Link>
          <nav className="flex items-center space-x-6">
            <Link
              href="/extract"
              className="text-gray-300 hover:text-primary transition-colors duration-300 font-medium"
            >
              Extract
            </Link>
            <Link
              href="/login"
              className="bg-gradient-to-r from-primary to-secondary text-white px-5 py-2 rounded-lg hover:from-primary/90 hover:to-secondary/90 transition-all duration-300 hover:shadow-md font-medium"
            >
              Dashboard
            </Link>
          </nav>
        </div>
      </header>

      {/* Privacy Content */}
      <main className="flex-1 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div
            className={`bg-card rounded-xl p-8 border border-border shadow-xl ${
              mounted ? "animate-fade-in" : "opacity-0"
            }`}
          >
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-white mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Privacy Policy
              </h1>
              <p className="text-lg text-gray-300 mb-8">
                Last Updated: March 4, 2025
              </p>
              <div className="space-y-5 text-gray-300">
                <p className="text-lg leading-relaxed">
                  At Extractify, we take your privacy seriously. This Privacy
                  Policy explains how we collect, use, and protect your
                  information when you use our service. By using Extractify, you
                  consent to the data practices described in this policy.
                </p>
              </div>
            </div>

            <div className="space-y-10">
              <section className="bg-background/50 p-6 rounded-xl border border-border">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center mr-4">
                    <svg
                      className="w-5 h-5 text-primary"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
                      />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-semibold text-white">
                    Information We Collect
                  </h2>
                </div>
                <div className="ml-14 space-y-4">
                  <div>
                    <h3 className="text-lg font-medium text-white mb-2">
                      GitHub Account Information
                    </h3>
                    <p className="text-gray-300">
                      When you authenticate with GitHub, we receive basic
                      account information such as your username, email address,
                      and profile picture. This information is used to create
                      and maintain your Extractify account.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white mb-2">
                      GitHub Access Tokens
                    </h3>
                    <p className="text-gray-300">
                      We store GitHub OAuth tokens to access repositories on
                      your behalf. These tokens are encrypted and securely
                      stored to protect your GitHub account.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white mb-2">
                      Repository Data
                    </h3>
                    <p className="text-gray-300">
                      We temporarily process code from repositories you choose
                      to extract. We store references to repositories you have
                      accessed to provide a history feature, but we do not
                      permanently store the actual code content from these
                      repositories.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white mb-2">
                      Usage Information
                    </h3>
                    <p className="text-gray-300">
                      We collect anonymized data about how you use Extractify,
                      including features used, extraction frequency, and
                      application performance metrics. This helps us improve our
                      service.
                    </p>
                  </div>
                </div>
              </section>

              <section className="bg-background/50 p-6 rounded-xl border border-border">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-secondary/20 rounded-lg flex items-center justify-center mr-4">
                    <svg
                      className="w-5 h-5 text-secondary"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-semibold text-white">
                    How We Use Your Information
                  </h2>
                </div>
                <div className="ml-14 space-y-4">
                  <p className="text-gray-300">
                    We use the information we collect to:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-300">
                    <li>Provide, maintain, and improve Extractify services</li>
                    <li>
                      Authenticate you with GitHub and access repositories on
                      your behalf
                    </li>
                    <li>Store your repository history for convenient access</li>
                    <li>
                      Monitor and analyze usage patterns to enhance features
                    </li>
                    <li>Detect and address technical issues</li>
                    <li>
                      Communicate updates and information about our service
                    </li>
                  </ul>
                </div>
              </section>

              <section className="bg-background/50 p-6 rounded-xl border border-border">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center mr-4">
                    <svg
                      className="w-5 h-5 text-primary"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-semibold text-white">
                    Data Security
                  </h2>
                </div>
                <div className="ml-14 space-y-4">
                  <p className="text-gray-300">
                    We implement appropriate security measures to protect your
                    personal information:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-300">
                    <li>
                      All data transmission is protected with HTTPS encryption
                    </li>
                    <li>GitHub access tokens are encrypted at rest</li>
                    <li>
                      We utilize secure Firebase authentication and storage
                      systems
                    </li>
                    <li>
                      Regular security reviews and updates to maintain best
                      practices
                    </li>
                    <li>
                      Limited employee access to user data on a need-to-know
                      basis
                    </li>
                  </ul>
                  <p className="text-gray-300 mt-4">
                    While we implement these safeguards, no internet
                    transmission or electronic storage is 100% secure. We cannot
                    guarantee absolute security of your data.
                  </p>
                </div>
              </section>

              <section className="bg-background/50 p-6 rounded-xl border border-border">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-secondary/20 rounded-lg flex items-center justify-center mr-4">
                    <svg
                      className="w-5 h-5 text-secondary"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-semibold text-white">
                    Data Retention
                  </h2>
                </div>
                <div className="ml-14">
                  <p className="text-gray-300">
                    We retain your account information and repository history as
                    long as your account is active. You can delete your
                    repository history at any time through the application
                    interface. If you wish to completely delete your account and
                    all associated data, please contact us at{" "}
                    <span className="text-primary">privacy@extractify.com</span>
                    .
                  </p>
                </div>
              </section>

              <section className="bg-background/50 p-6 rounded-xl border border-border">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center mr-4">
                    <svg
                      className="w-5 h-5 text-primary"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-semibold text-white">
                    Your Rights
                  </h2>
                </div>
                <div className="ml-14 space-y-4">
                  <p className="text-gray-300">
                    Depending on your location, you may have certain rights
                    regarding your personal information:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-300">
                    <li>Access and receive a copy of your personal data</li>
                    <li>Correct inaccurate information</li>
                    <li>Request deletion of your personal information</li>
                    <li>Object to or restrict processing of your data</li>
                    <li>Data portability</li>
                  </ul>
                  <p className="text-gray-300 mt-4">
                    To exercise these rights, please contact us at{" "}
                    <span className="text-primary">privacy@extractify.com</span>
                    .
                  </p>
                </div>
              </section>

              <section className="bg-background/50 p-6 rounded-xl border border-border">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-secondary/20 rounded-lg flex items-center justify-center mr-4">
                    <svg
                      className="w-5 h-5 text-secondary"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-semibold text-white">
                    Changes to This Policy
                  </h2>
                </div>
                <div className="ml-14">
                  <p className="text-gray-300">
                    We may update our Privacy Policy from time to time. We will
                    notify you of any changes by posting the new Privacy Policy
                    on this page and updating the "Last Updated" date. You are
                    advised to review this Privacy Policy periodically for any
                    changes.
                  </p>
                </div>
              </section>

              <section className="bg-background/50 p-6 rounded-xl border border-border">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center mr-4">
                    <svg
                      className="w-5 h-5 text-primary"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-semibold text-white">
                    Contact Us
                  </h2>
                </div>
                <div className="ml-14">
                  <p className="text-gray-300">
                    If you have any questions about this Privacy Policy or our
                    data practices, please contact us at:
                  </p>
                  <p className="text-gray-300 mt-2">
                    <span className="text-primary">privacy@extractify.com</span>
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-card py-6 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="relative w-5 h-5 mr-2">
                <Image
                  src="/file.svg"
                  alt="Extractify Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-lg font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Extractify
              </span>
            </div>
            <div className="flex space-x-6 mb-4 md:mb-0">
              <Link
                href="/about"
                className="text-gray-400 hover:text-white transition-colors duration-300 text-sm"
              >
                About
              </Link>
              <Link
                href="/privacy"
                className="text-gray-400 hover:text-white transition-colors duration-300 text-sm"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="text-gray-400 hover:text-white transition-colors duration-300 text-sm"
              >
                Terms
              </Link>
            </div>
            <div className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Extractify. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
