import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function TermsPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Terms Content */}
      <main className="flex-1 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div
            className={`bg-card rounded-xl p-8 border border-border shadow-xl ${
              mounted ? "animate-fade-in" : "opacity-0"
            }`}
          >
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-white mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Terms of Service
              </h1>
              <p className="text-lg text-gray-300 mb-8">
                Last Updated: March 4, 2025
              </p>
              <div className="space-y-5 text-gray-300">
                <p className="text-lg leading-relaxed">
                  Welcome to Extractify. By accessing or using our service, you
                  agree to be bound by these Terms of Service. Please read them
                  carefully before using Extractify.
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
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-semibold text-white">
                    Service Overview
                  </h2>
                </div>
                <div className="ml-14 space-y-4">
                  <p className="text-gray-300">
                    Extractify is a tool that helps developers extract code from
                    GitHub repositories with proper formatting for AI analysis.
                    Our service allows you to:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-300">
                    <li>Connect to GitHub repositories you have access to</li>
                    <li>Extract code files with proper file names and paths</li>
                    <li>Format code for easy sharing with AI assistants</li>
                    <li>Maintain a history of repositories you've accessed</li>
                  </ul>
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
                        d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
                      />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-semibold text-white">
                    Account Terms
                  </h2>
                </div>
                <div className="ml-14 space-y-4">
                  <div>
                    <h3 className="text-lg font-medium text-white mb-2">
                      GitHub Authentication
                    </h3>
                    <p className="text-gray-300">
                      To use Extractify, you must sign in with a valid GitHub
                      account. You are responsible for maintaining the security
                      of your GitHub credentials and for all activities that
                      occur under your account.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white mb-2">
                      Access Permissions
                    </h3>
                    <p className="text-gray-300">
                      Extractify requests specific OAuth permissions from
                      GitHub. You must grant these permissions to use our
                      service. We only use these permissions for the intended
                      functionality of extracting code from repositories you
                      have access to.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white mb-2">
                      Account Termination
                    </h3>
                    <p className="text-gray-300">
                      We reserve the right to suspend or terminate your account
                      if you violate these terms or if we detect suspicious
                      activity. You may also delete your account at any time by
                      contacting us.
                    </p>
                  </div>
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
                        d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                      />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-semibold text-white">
                    Acceptable Use
                  </h2>
                </div>
                <div className="ml-14 space-y-4">
                  <p className="text-gray-300">
                    You agree not to use Extractify for any purpose that is
                    illegal or prohibited by these terms. Specifically, you
                    agree not to:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-300">
                    <li>
                      Access repositories you do not have legitimate
                      authorization to access
                    </li>
                    <li>
                      Use our service to extract or distribute code in violation
                      of applicable licenses
                    </li>
                    <li>
                      Attempt to probe, scan, or test the vulnerability of our
                      systems
                    </li>
                    <li>
                      Interfere with or disrupt the integrity or performance of
                      our service
                    </li>
                    <li>
                      Use automated methods to extract large volumes of data
                      unless specifically authorized
                    </li>
                    <li>
                      Redistribute or sell access to our service without
                      permission
                    </li>
                  </ul>
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
                        d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                      />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-semibold text-white">
                    Intellectual Property Rights
                  </h2>
                </div>
                <div className="ml-14 space-y-4">
                  <div>
                    <h3 className="text-lg font-medium text-white mb-2">
                      Your Content
                    </h3>
                    <p className="text-gray-300">
                      You retain all rights to the code you extract through our
                      service. Extractify does not claim ownership of any
                      content that you access, extract, or create using our
                      service.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white mb-2">
                      License Compliance
                    </h3>
                    <p className="text-gray-300">
                      You are responsible for ensuring that your use of
                      extracted code complies with the original repository's
                      license terms. Extractify does not modify licensing
                      information and encourages users to respect the original
                      licenses.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white mb-2">
                      Our Intellectual Property
                    </h3>
                    <p className="text-gray-300">
                      The Extractify service, including its design, interface,
                      and software, is owned by us and is protected by
                      copyright, trademark, and other intellectual property
                      laws. You may not copy, modify, or distribute our
                      proprietary material without permission.
                    </p>
                  </div>
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
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-semibold text-white">
                    Disclaimers and Limitations
                  </h2>
                </div>
                <div className="ml-14 space-y-4">
                  <div>
                    <h3 className="text-lg font-medium text-white mb-2">
                      Service Availability
                    </h3>
                    <p className="text-gray-300">
                      Extractify is provided "as is" and "as available." We do
                      not guarantee that our service will be uninterrupted,
                      timely, secure, or error-free. We reserve the right to
                      modify, suspend, or discontinue the service at any time
                      without notice.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white mb-2">
                      No Warranty
                    </h3>
                    <p className="text-gray-300">
                      We disclaim all warranties, express or implied, including
                      but not limited to warranties of merchantability, fitness
                      for a particular purpose, and non-infringement. You use
                      our service at your own risk.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white mb-2">
                      Limitation of Liability
                    </h3>
                    <p className="text-gray-300">
                      In no event shall Extractify, its directors, employees, or
                      affiliates be liable for any indirect, incidental,
                      special, consequential, or punitive damages, including
                      without limitation, loss of profits, data, or other
                      intangible losses, resulting from your use of or inability
                      to use the service.
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
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                      />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-semibold text-white">
                    Changes to Terms
                  </h2>
                </div>
                <div className="ml-14">
                  <p className="text-gray-300">
                    We may update these Terms of Service from time to time. We
                    will notify you of any significant changes by posting the
                    new Terms on this page and updating the "Last Updated" date.
                    Your continued use of Extractify after such changes
                    constitutes your acceptance of the new Terms.
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
                    If you have any questions about these Terms of Service,
                    please contact us at:
                  </p>
                  <p className="text-gray-300 mt-2">
                    <span className="text-primary">
                      videna.psalmeleazar@gmail.com
                    </span>
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
