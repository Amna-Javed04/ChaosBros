"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "../lib/utils";

interface JoinBrotherhoodModalProps {
  isOpen: boolean;
  onClose: () => void;
  isFromChaosBro: boolean;
}

interface FormData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  description: string;
}

export const JoinBrotherhoodModal: React.FC<JoinBrotherhoodModalProps> = ({
  isOpen,
  onClose,
  isFromChaosBro,
}) => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    description: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Check if Formspree form ID is available
      const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID;
      if (!formspreeId) {
        throw new Error(
          "Configuration error: Missing Formspree form ID. Please contact support."
        );
      }

      // Prepare data for Formspree
      const submissionData = {
        Name: `${formData.firstName} ${formData.lastName}`,
        'First Name': formData.firstName,
        'Last Name': formData.lastName,
        Email: formData.email,
        Phone: formData.phoneNumber,
        Description: formData.description,
       'Joined As': isFromChaosBro ? "ChaosBros" : "ChaosDoll",
      };

      // Submit directly to Formspree
      const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submissionData),
      });

      if (response.ok) {
        setIsSuccess(true);

        // Auto-close after success
        setTimeout(() => {
          onClose();
          setIsSuccess(false);
          setFormData({
            firstName: "",
            lastName: "",
            phoneNumber: "",
            email: "",
            description: "",
          });
        }, 2000);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || "Form submission failed");
      }
    } catch (error) {
      console.error("Form submission error:", error);

      // Handle different types of errors
      let errorMessage =
        "There was an error submitting your application. Please try again.";

      if (error instanceof TypeError && error.message.includes("fetch")) {
        errorMessage =
          "Network error. Please check your internet connection and try again.";
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      alert(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const modalVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const contentVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" as const },
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      y: 20,
      transition: { duration: 0.2 },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border border-gray-700 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <h2 className="text-2xl md:text-3xl font-bold text-white font-orbitron">
                <span className="bg-gradient-to-r from-emerald-400 via-emerald-500 to-cyan-400 bg-clip-text text-transparent">
                  {`${
                    isFromChaosBro
                      ? "Join the Brotherhood"
                      : "Join as Chaos Dolls"
                  }`}
                </span>
              </h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors p-1"
              >
                <X size={24} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              {isSuccess ? (
                <div className="text-center py-8">
                  <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <div className="w-10 h-10 bg-emerald-400 rounded-full flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-gray-900"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4 font-orbitron">
                    Application Submitted!
                  </h3>
                  <p className="text-gray-400 text-lg leading-relaxed">
                    Welcome to the chaos, {formData.firstName}! We&apos;ve
                    received your application and will be in touch soon.
                  </p>
                  <p className="text-sm text-gray-500 mt-4">
                    Precision. Power. Brotherhood.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="text-center mb-6">
                    <p className="text-gray-400 text-lg leading-relaxed">
                      Think you have what it takes? Tell us about yourself and
                      join the elite ranks of ChaosBro.
                    </p>
                  </div>

                  {/* Name Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label
                        htmlFor="firstName"
                        className="block text-sm font-medium text-gray-300"
                      >
                        First Name *
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className={cn(
                          "w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg",
                          "text-white placeholder-gray-400",
                          "focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400",
                          "transition-all duration-200"
                        )}
                        placeholder="Enter your first name"
                      />
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="lastName"
                        className="block text-sm font-medium text-gray-300"
                      >
                        Last Name *
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className={cn(
                          "w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg",
                          "text-white placeholder-gray-400",
                          "focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400",
                          "transition-all duration-200"
                        )}
                        placeholder="Enter your last name"
                      />
                    </div>
                  </div>

                  {/* Contact Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label
                        htmlFor="phoneNumber"
                        className="block text-sm font-medium text-gray-300"
                      >
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        required
                        className={cn(
                          "w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg",
                          "text-white placeholder-gray-400",
                          "focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400",
                          "transition-all duration-200"
                        )}
                        placeholder="(555) 123-4567"
                      />
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-300"
                      >
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className={cn(
                          "w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg",
                          "text-white placeholder-gray-400",
                          "focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400",
                          "transition-all duration-200"
                        )}
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  {/* Description Field */}
                  <div className="space-y-2">
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium text-gray-300"
                    >
                      Tell us about yourself *
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      className={cn(
                        "w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg",
                        "text-white placeholder-gray-400 resize-none",
                        "focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400",
                        "transition-all duration-200"
                      )}
                      placeholder="Tell us about your gaming experience, skills, what games you play, and why you want to join ChaosBro..."
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="flex gap-4 pt-4">
                    <button
                      type="button"
                      onClick={onClose}
                      className="flex-1 px-6 py-3 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-800 transition-all duration-200"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={cn(
                        "flex-1 px-6 py-3 rounded-lg font-semibold transition-all duration-300",
                        "bg-gradient-to-r from-emerald-400 via-emerald-500 to-cyan-400 text-white",
                        "hover:from-emerald-500 hover:via-emerald-600 hover:to-cyan-500",
                        "transform hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/20",
                        "disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
                      )}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center gap-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Submitting...
                        </span>
                      ) : (
                        "Submit Application"
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
