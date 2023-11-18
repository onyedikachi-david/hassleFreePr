'use client'

import Image from 'next/image'
import Link from "next/link";
import {Button} from "@/components/ui/button";

export default function Home() {

  const handleInstallClick = () => {

    window.location.href = 'https://github.com/apps/hasselfreepr'

  }
  return (
      <div className="flex flex-col min-h-screen bg-gradient-to-r from-blue-400 via-pink-500 to-yellow-500">
        <header className="px-4 lg:px-6 h-14 flex items-center">
          <Link className="flex items-center justify-center" href="#">
            <svg
                className=" h-6 w-6"
                fill="none"
                height="24"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
              <path d="M9 18c-4.51 2-5-2-7-2" />
            </svg>
            <span className="ml-2 font-semibold text-xl text-white">hasselFreePr</span>
          </Link>
          <nav className="ml-auto flex gap-4 sm:gap-6">
            <Link className="text-sm font-medium text-white hover:underline underline-offset-4" href="#">
              Features
            </Link>
            <Link className="text-sm font-medium text-white hover:underline underline-offset-4" href="#">
              Benefits
            </Link>
            <Link className="text-sm font-medium text-white hover:underline underline-offset-4" href="#">
              Testimonials
            </Link>
          </nav>
        </header>
        <main className="flex-1">
          <section className="w-full py-6 sm:py-12 md:py-24 lg:py-32 xl:py-48">
            <div className="container px-4 md:px-6">
              <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
                <div className="flex flex-col justify-center space-y-4">
                  <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-white">
                      AI-Powered GitHub Project Management
                    </h1>
                    <p className="max-w-[600px] text-white md:text-xl">
                      Manage your GitHub projects effortlessly with hasselFreePr. Install now to get started.
                    </p>
                  </div>
                  <Button className="bg-white text-blue-600 px-6 py-3 rounded-md shadow-lg hover:bg-gray-100" onClick={handleInstallClick }>
                    Install on GitHub
                  </Button>
                </div>
                <div className="mx-auto lg:order-last">
                  <Image
                      alt="Hero"
                      className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full"
                      height="338"
                      src="/img.png"
                      width="338"
                  />
                </div>
              </div>
            </div>
          </section>
          <section className="w-full py-12 md:py-24 lg:py-32 bg-blue-100 dark:bg-blue-800" id="features">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <div className="inline-block rounded-lg bg-zinc-100 px-3 py-1 text-sm dark:bg-zinc-800">Features</div>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-blue-800">Key Features</h2>
                  <p className="max-w-[900px] text-zinc-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-zinc-400">
                    Explore the features that make hasselFreePr the best choice for managing your GitHub projects.
                  </p>
                </div>
              </div>
              <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
                <Image
                    alt="Feature"
                    className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
                    height="338"
                    src="/img_1.png"
                    width="338"
                />
                <div className="flex flex-col justify-center space-y-4">
                  <ul className="grid gap-6">
                    <li>
                      <div className="grid gap-1">
                        <h3 className="text-xl font-bold text-blue-800">AI-Powered</h3>
                        <p className="text-zinc-500 dark:text-zinc-400">
                          Utilize the power of AI for smart project management.
                        </p>
                      </div>
                    </li>
                    <li>
                      <div className="grid gap-1">
                        <h3 className="text-xl font-bold text-blue-800">GitHub Integration</h3>
                        <p className="text-zinc-500 dark:text-zinc-400">
                          Seamless integration with GitHub for easy setup and use.
                        </p>
                      </div>
                    </li>
                    <li>
                      <div className="grid gap-1">
                        <h3 className="text-xl font-bold text-blue-800">Effortless Management</h3>
                        <p className="text-zinc-500 dark:text-zinc-400">
                          Manage your projects effortlessly with intuitive features.
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
          <section className="w-full py-12 md:py-24 lg:py-32 bg-pink-100 dark:bg-pink-800" id="benefits">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <div className="inline-block rounded-lg bg-zinc-100 px-3 py-1 text-sm dark:bg-zinc-800">Benefits</div>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-pink-800">
                    Why Choose hasselFreePr
                  </h2>
                  <p className="max-w-[900px] text-zinc-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-zinc-400">
                    Discover why developers around the world choose hasselFreePr for their GitHub project management
                    needs.
                  </p>
                </div>
              </div>
              <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
                <Image
                    alt="Benefits"
                    className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
                    height="310"
                    src="/img_2.png"
                    width="550"
                />
                <div className="flex flex-col justify-center space-y-4">
                  <ul className="grid gap-6">
                    <li>
                      <div className="grid gap-1">
                        <h3 className="text-xl font-bold text-pink-800">Time Saving</h3>
                        <p className="text-zinc-500 dark:text-zinc-400">
                          Save valuable time with automated project management.
                        </p>
                      </div>
                    </li>
                    <li>
                      <div className="grid gap-1">
                        <h3 className="text-xl font-bold text-pink-800">Increased Productivity</h3>
                        <p className="text-zinc-500 dark:text-zinc-400">
                          Enhance your productivity with smart features and intuitive interface.
                        </p>
                      </div>
                    </li>
                    <li>
                      <div className="grid gap-1">
                        <h3 className="text-xl font-bold text-pink-800">Improved Collaboration</h3>
                        <p className="text-zinc-500 dark:text-zinc-400">
                          Improve collaboration among team members with effective project management.
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
          <section className="w-full py-12 md:py-24 lg:py-32 bg-yellow-100 dark:bg-yellow-800" id="testimonials">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <div className="inline-block rounded-lg bg-zinc-100 px-3 py-1 text-sm dark:bg-zinc-800">
                    Testimonials
                  </div>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-yellow-800">Our Happy Users</h2>
                  <p className="max-w-[900px] text-zinc-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-zinc-400">
                    Hear from our users about how hasselFreePr has transformed their GitHub project management.
                  </p>
                </div>
              </div>
              <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
                <Image
                    alt="Testimonials"
                    className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
                    height="310"
                    src="/img_3.png"
                    width="550"
                />
                <div className="flex flex-col justify-center space-y-4">
                  <div className="p-4 rounded-md shadow-lg bg-white dark:bg-zinc-900">
                    <p className="text-zinc-500 dark:text-zinc-400">
                      "hasselFreePr has transformed the way we manage our GitHub projects. The AI-powered features are a
                      game changer."
                    </p>
                    <h4 className="mt-4 text-lg font-bold text-yellow-800">John Doe</h4>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">Software Developer, ABC Corp</p>
                  </div>
                  <div className="p-4 rounded-md shadow-lg bg-white dark:bg-zinc-900">
                    <p className="text-zinc-500 dark:text-zinc-400">
                      "With hasselFreePr, we've been able to enhance our productivity and collaboration. It's a must-have
                      tool for any team using GitHub."
                    </p>
                    <h4 className="mt-4 text-lg font-bold text-yellow-800">Jane Smith</h4>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">Project Manager, XYZ Inc</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
        <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-white">
          <p className="text-xs text-white">© hasselFreePr. All rights reserved.</p>
          <nav className="sm:ml-auto flex gap-4 sm:gap-6">
            <Link className="text-xs text-white hover:underline underline-offset-4" href="#">
              Terms of Service
            </Link>
            <Link className="text-xs text-white hover:underline underline-offset-4" href="#">
              Privacy
            </Link>
          </nav>
        </footer>
      </div>
  )
}