"use client";

import { motion as Motion } from "framer-motion";
import { Meta } from "@/components/Meta";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export default function CookiePolicy() {
  return (
    <div className="flex flex-col bg-white">
      <Meta
        title="Cookie Policy | Hutech Solutions"
        description="Learn how Hutech Solutions uses cookies and similar technologies."
      />
      <Breadcrumbs variant="light" />

      <section className="relative overflow-hidden bg-[#001A3D] py-20 text-white">
        <div className="relative z-10 mx-auto max-w-[1280px] px-6 lg:px-20">
          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <h1 className="display-font mb-6 text-4xl font-semibold tracking-tight md:text-5xl">
              Cookie <span className="text-[#F99D1C]">Policy</span>
            </h1>
            <p className="text-lg text-gray-300">Effective Date: March 15, 2026</p>
          </Motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-20">
          <div className="prose prose-blue max-w-4xl space-y-8 leading-relaxed text-gray-600">
            <div>
              <h2 className="mb-4 text-2xl font-bold text-[#001A3D]">1. What Are Cookies</h2>
              <p>
                As is common practice with almost all professional websites this site uses cookies,
                which are tiny files that are downloaded to your computer, to improve your
                experience. This page describes what information they gather, how we use it and why
                we sometimes need to store these cookies.
              </p>
            </div>

            <div>
              <h2 className="mb-4 text-2xl font-bold text-[#001A3D]">2. How We Use Cookies</h2>
              <p>
                We use cookies for a variety of reasons detailed below. Unfortunately in most cases
                there are no industry standard options for disabling cookies without completely
                disabling the functionality and features they add to this site. It is recommended
                that you leave on all cookies if you are not sure whether you need them or not in
                case they are used to provide a service that you use.
              </p>
            </div>

            <div>
              <h2 className="mb-4 text-2xl font-bold text-[#001A3D]">3. Disabling Cookies</h2>
              <p>
                You can prevent the setting of cookies by adjusting the settings on your browser
                (see your browser Help for how to do this). Be aware that disabling cookies will
                affect the functionality of this and many other websites that you visit. Disabling
                cookies will usually result in also disabling certain functionality and features of
                this site.
              </p>
            </div>

            <div>
              <h2 className="mb-4 text-2xl font-bold text-[#001A3D]">4. The Cookies We Set</h2>
              <ul className="list-disc space-y-2 pl-6">
                <li>Account related cookies</li>
                <li>Email newsletters related cookies</li>
                <li>Forms related cookies</li>
                <li>Site preferences cookies</li>
              </ul>
            </div>

            <div>
              <h2 className="mb-4 text-2xl font-bold text-[#001A3D]">5. More Information</h2>
              <p>
                Hopefully that has clarified things for you and as was previously mentioned if there
                is something that you aren't sure whether you need or not it's usually safer to
                leave cookies enabled in case it does interact with one of the features you use on
                our site.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
