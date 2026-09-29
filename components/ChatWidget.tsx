"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import dynamic from "next/dynamic";

const LottieAvatar = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [animLoaded, setAnimLoaded] = useState(false);
  useEffect(() => {
    let anim: any = null;
    let cancelled = false;

    Promise.all([
      import("lottie-web").then((m) => m.default || m),
      fetch("/husqy-avatar.json").then((res) => res.json()),
    ])
      .then(([lottieInstance, data]) => {
        if (cancelled || !containerRef.current || !data?.v) return;
        anim = lottieInstance.loadAnimation({
          container: containerRef.current,
          renderer: "svg",
          loop: true,
          autoplay: true,
          animationData: data,
        });
        setAnimLoaded(true);
      })
      .catch(() => {});

    return () => {
      cancelled = true;
      if (anim) anim.destroy();
    };
  }, []);

  return (
    <>
      {!animLoaded && <MessageCircle size={16} />}
      <div
        ref={containerRef}
        className={`h-full w-full scale-125 ${!animLoaded ? "hidden" : ""}`}
      />
    </>
  );
};

const Chatbot = dynamic(() => import("./chatbot/Chatbot"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-white">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#0171c1] border-t-transparent"></div>
    </div>
  ),
});

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [agentStatus, setAgentStatus] = useState<"online" | "unavailable">("online");

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    const handleStatus = (e: any) => {
      const status = e.detail;
      if (status === "online" || status === "unavailable") {
        setAgentStatus(status);
      }
    };
    window.addEventListener("open-chatbot", handleOpen);
    window.addEventListener("husqy-status", handleStatus);
    return () => {
      window.removeEventListener("open-chatbot", handleOpen);
      window.removeEventListener("husqy-status", handleStatus);
    };
  }, []);

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <Motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-[96px] right-6 z-[9998] flex h-[750px] max-h-[calc(100vh-120px)] w-[350px] flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-2xl md:w-[380px]"
          >
            <div className="relative z-[9999] flex items-center justify-between border-b border-gray-100 bg-gradient-to-r from-blue-50 via-white to-orange-50 p-3.5 px-4 text-[#001A3D]">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-[#0171c1] text-white shadow-sm">
                  <LottieAvatar />
                </div>
                <div>
                  <h4 className="text-sm font-bold leading-none text-[#001A3D]">HusQy</h4>
                  <div className="mt-1 flex items-center gap-1.5">
                    <span
                      className={`inline-block h-2 w-2 rounded-full transition-colors duration-300 ${
                        agentStatus === "online" ? "animate-pulse bg-emerald-500" : "bg-amber-500"
                      }`}
                    />
                    <span
                      className={`text-[11px] font-bold transition-colors duration-300 ${
                        agentStatus === "online" ? "text-emerald-600" : "text-amber-600"
                      }`}
                    >
                      {agentStatus === "online" ? "Online" : "Unavailable"}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-full bg-black/5 p-1.5 text-gray-500 transition-colors hover:bg-black/10 hover:text-gray-800"
                aria-label="Close chat window"
              >
                <X size={18} />
              </button>
            </div>
            <div
              id="chatbot-widget-root"
              className="chatbot-widget-container relative flex-grow overflow-auto bg-white"
            >
              <Chatbot />
            </div>

            {/* Bottom Footer Branding */}
            <div className="z-[9999] flex shrink-0 select-none items-center justify-center border-t border-gray-100 bg-gray-50/90 py-2 text-center">
              <span className="text-[10px] font-medium tracking-wide text-gray-400">
                HusQy AI Powered by{" "}
                <span className="font-semibold text-[#001A3D]">Hutech Solutions</span>
              </span>
            </div>
          </Motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        <Motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          className="fixed bottom-6 right-6 z-[9999]"
        >
          <Motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close chat assistant" : "Open chat assistant"}
            className="relative flex h-16 w-16 items-center justify-center rounded-full border-2 border-white/10 bg-[#001A3D] text-white shadow-2xl shadow-[#001A3D]/30"
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <Motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  className="flex items-center justify-center"
                >
                  <X size={28} />
                </Motion.div>
              ) : (
                <Motion.div
                  key="chat"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  className="flex items-center justify-center"
                >
                  <MessageCircle size={28} fill="currentColor" />
                </Motion.div>
              )}
            </AnimatePresence>
            {!isOpen && (
              <span className="absolute right-0 top-0 h-4 w-4 animate-pulse rounded-full border-2 border-[#001A3D] bg-green-500"></span>
            )}
          </Motion.button>
        </Motion.div>
      </AnimatePresence>
    </>
  );
}
