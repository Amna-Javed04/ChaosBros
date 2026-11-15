"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import {
  currentSponsors,
  sponsorTiers,
  sponsorTestimonials,
  sponsorFormFields,
  sponsorPackageDownloads,
  type SponsorTier,
} from "../../lib/sponsorsData";

interface SponsorFormData {
  company: string;
  contactName: string;
  email: string;
  phone: string;
  website: string;
  sponsorshipTier: string;
  budget: string;
  goals: string;
  timeline: string;
  message: string;
}

export function Sponsors() {
  const [activeTab,] = useState<
    "overview" | "tiers" | "testimonials" | "contact"
  >("overview");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState<SponsorFormData>({
    company: "",
    contactName: "",
    email: "",
    phone: "",
    website: "",
    sponsorshipTier: "",
    budget: "",
    goals: "",
    timeline: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [currentSponsorIndex, setCurrentSponsorIndex] = useState(0);

  // Auto-rotate sponsor carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSponsorIndex((prev) => (prev + 1) % currentSponsors.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Reset form and show success message
    setFormData({
      company: "",
      contactName: "",
      email: "",
      phone: "",
      website: "",
      sponsorshipTier: "",
      budget: "",
      goals: "",
      timeline: "",
      message: "",
    });
    setSubmitMessage(
      "Thank you for your interest! We'll contact you within 24 hours to discuss partnership opportunities."
    );
    setIsSubmitting(false);

    // Close form after 4 seconds
    setTimeout(() => {
      setIsFormOpen(false);
      setSubmitMessage("");
    }, 4000);
  };

  const handleInputChange = (field: keyof SponsorFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const downloadFile = (fileUrl: string, fileName: string) => {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  const LogoCarousel = () => (
    <div className="relative">
      <div className="flex justify-center items-center space-x-4 sm:space-x-8 mb-8">
        {currentSponsors.map((sponsor, index) => (
          <motion.div
            key={sponsor.id}
            className={`relative transition-all duration-500 ${
              index === currentSponsorIndex
                ? "scale-110 opacity-100"
                : "scale-90 opacity-60"
            }`}
            whileHover={{ scale: index === currentSponsorIndex ? 1.15 : 0.95 }}
          >
            <div className="w-20 h-20 sm:w-32 sm:h-32 bg-gray-800/50 rounded-xl p-2 sm:p-4 flex items-center justify-center border border-gray-700">
              <Image
                src={sponsor.logo || "/assets/logo-chaosbro.svg"}
                alt={sponsor.name}
                width={60}
                height={60}
                className="sm:w-20 sm:h-20 object-contain filter brightness-100 hover:brightness-110 transition-all"
              />
            </div>
            {index === currentSponsorIndex && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute -bottom-8 sm:-bottom-8 left-1/2 transform -translate-x-1/2 text-center"
              >
                <p className="text-emerald-500 font-semibold text-xs sm:text-sm">
                  {sponsor.name}
                </p>
                <p className="text-gray-400 text-xs">
                  Since {sponsor.sponsorSince}
                </p>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Carousel indicators */}
      <div className="flex justify-center space-x-2 mt-12">
        {currentSponsors.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSponsorIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentSponsorIndex
                ? "bg-emerald-500 w-4 sm:w-6"
                : "bg-gray-600"
            }`}
          />
        ))}
      </div>
    </div>
  );

  const TierCard = ({ tier }: { tier: SponsorTier }) => (
    <Card
      variant={tier.popular ? "neon" : "elevated"}
      className="relative h-full"
    >
      {tier.popular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <span className="bg-gradient-to-r from-emerald-400 to-teal-500 text-gray-900 px-4 py-1 rounded-full text-sm font-bold">
            Most Popular
          </span>
        </div>
      )}

      <div className="p-6 h-full flex flex-col">
        <div
          className={`w-12 h-12 bg-gradient-to-r ${tier.color} rounded-lg mb-4`}
        ></div>

        <h3 className="text-xl font-bold text-emerald-500 mb-2">{tier.name}</h3>
        <p className="text-2xl font-bold text-white mb-6">{tier.price}</p>

        <ul className="space-y-3 flex-grow">
          {tier.benefits.map((benefit, index) => (
            <li key={index} className="flex items-start space-x-3">
              <svg
                className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-gray-300 text-sm">{benefit}</span>
            </li>
          ))}
        </ul>

        <Button
          variant={tier.popular ? "neon" : "primary"}
          className="w-full mt-6"
          // onClick={() => {
          //   setFormData(prev => ({ ...prev, sponsorshipTier: tier.id }));
          //   setIsFormOpen(true);
          // }}
        >
          Get Started
        </Button>
      </div>
    </Card>
  );

  const TestimonialCard = ({
    testimonial,
  }: {
    testimonial: (typeof sponsorTestimonials)[0];
  }) => (
    <Card variant="glass" className="p-6">
      <div className="flex items-start space-x-4">
        <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-white font-bold text-lg">
            {testimonial.author
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </span>
        </div>

        <div className="flex-grow">
          <p className="text-gray-300 mb-4 italic">
            &quot;{testimonial.quote}&quot;
          </p>
          <div>
            <p className="text-emerald-500 font-semibold">
              {testimonial.author}
            </p>
            <p className="text-gray-400 text-sm">{testimonial.position}</p>
            <p className="text-gray-500 text-sm">{testimonial.company}</p>
          </div>
        </div>
      </div>
    </Card>
  );

  return (
    <section
      id="sponsors"
      className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-16"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold font-orbitron text-emerald-500 mb-4">
              Our Partners
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Powering ChaosBro with cutting-edge technology and unmatched
              support. Join our growing network of sponsors.
            </p>
          </motion.div>

          {/* Tab Navigation */}
          {/* <motion.div
            variants={itemVariants}
            className="flex justify-center overflow-x-auto"
          >
            <div className="flex space-x-1 bg-gray-800/50 rounded-lg p-1 min-w-max">
              {[
                {
                  id: "overview",
                  label: "Current Sponsors",
                  short: "Sponsors",
                },
                { id: "tiers", label: "Partnership Tiers", short: "Tiers" },
                { id: "testimonials", label: "Testimonials", short: "Reviews" },
                { id: "contact", label: "Partner With Us", short: "Contact" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as never)}
                  className={`px-3 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-all text-sm sm:text-base whitespace-nowrap ${
                    activeTab === tab.id
                      ? "bg-emerald-500 text-gray-900"
                      : "text-gray-400 hover:text-emerald-500"
                  }`}
                >
                  <span className="sm:hidden">{tab.short}</span>
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              ))}
            </div>
          </motion.div> */}

          {/* Tab Content */}
          <motion.div variants={itemVariants}>
            {activeTab === "overview" && (
              <div className="space-y-12">
                {/* Current Sponsors Carousel */}
                <div>
                  <h3 className="text-2xl font-bold text-emerald-500 text-center mb-8">
                    Current Sponsors
                  </h3>
                  <LogoCarousel />
                </div>

                {/* Sponsor Details */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                  {currentSponsors.map((sponsor) => (
                    <Card
                      key={sponsor.id}
                      variant="elevated"
                      className="p-4 sm:p-6"
                    >
                      <div className="flex items-center space-x-3 sm:space-x-4 mb-4">
                        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-800/50 rounded-lg p-2 flex items-center justify-center flex-shrink-0">
                          <Image
                            src={sponsor.logo || "/assets/logo-chaosbro.svg"}
                            alt={sponsor.name}
                            width={36}
                            height={36}
                            className="sm:w-12 sm:h-12 object-contain"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h4 className="text-lg sm:text-xl font-bold text-emerald-500 truncate">
                            {sponsor.name}
                          </h4>
                          <span
                            className={`inline-block px-2 sm:px-3 py-1 rounded-full text-xs font-semibold ${
                              sponsor.tier === "title"
                                ? "bg-yellow-500/20 text-yellow-500"
                                : sponsor.tier === "presenting"
                                ? "bg-emerald-500/20 text-emerald-500"
                                : sponsor.tier === "official"
                                ? "bg-blue-500/20 text-blue-500"
                                : "bg-purple-500/20 text-purple-500"
                            }`}
                          >
                            {sponsor.tier.charAt(0).toUpperCase() +
                              sponsor.tier.slice(1)}{" "}
                            Sponsor
                          </span>
                        </div>
                      </div>

                      <p className="text-gray-300 mb-4 text-sm sm:text-base">
                        {sponsor.description}
                      </p>

                      {sponsor.testimonial && (
                        <div className="bg-gray-800/30 rounded-lg p-3 sm:p-4 border-l-4 border-emerald-500">
                          <p className="text-gray-300 italic mb-2 text-sm sm:text-base">
                            &quot;{sponsor.testimonial.quote}&quot;
                          </p>
                          <p className="text-emerald-500 text-xs sm:text-sm">
                            — {sponsor.testimonial.author},{" "}
                            {sponsor.testimonial.position}
                          </p>
                        </div>
                      )}
                    </Card>
                  ))}
                </div>

                {/* CTA for potential sponsors */}
                {/* <div className="text-center">
                  <Card variant="neon" className="p-4 sm:p-8 max-w-2xl mx-auto">
                    <h3 className="text-xl sm:text-2xl font-bold text-emerald-500 mb-4">
                      Want to Join Our Sponsor Family?
                    </h3>
                    <p className="text-gray-300 mb-6 text-sm sm:text-base">
                      Partner with ChaosBro and reach thousands of engaged
                      gaming enthusiasts while supporting competitive esports.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                      <Button
                        variant="neon"
                        // onClick={() => setIsFormOpen(true)}
                        className="w-full sm:w-auto"
                      >
                        Let`s Talk Partnership
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() =>
                          downloadFile(
                            sponsorPackageDownloads.sponsorDeck.fileUrl,
                            "ChaosBro-Sponsor-Pack.pdf"
                          )
                        }
                        className="w-full sm:w-auto"
                      >
                        Download Sponsor Deck
                      </Button>
                    </div>
                  </Card>
                </div> */}
              </div>
            )}

            {activeTab === "tiers" && (
              <div className="space-y-8">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-emerald-500 mb-4">
                    Partnership Tiers
                  </h3>
                  <p className="text-gray-400 max-w-2xl mx-auto">
                    Choose the partnership level that best fits your marketing
                    goals and budget. All tiers include comprehensive support
                    and ROI tracking.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                  {sponsorTiers.map((tier) => (
                    <TierCard key={tier.id} tier={tier} />
                  ))}
                </div>

                <div className="text-center">
                  <p className="text-gray-400 mb-4">
                    Need a custom package? We&apos;re flexible!
                  </p>
                  <Button variant="primary" onClick={() => setIsFormOpen(true)}>
                    Discuss Custom Partnership
                  </Button>
                </div>
              </div>
            )}

            {activeTab === "testimonials" && (
              <div className="space-y-8">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-emerald-500 mb-4">
                    What Our Partners Say
                  </h3>
                  <p className="text-gray-400 max-w-2xl mx-auto">
                    Hear from our sponsors about their experience partnering
                    with ChaosBro and the results they&apos;ve achieved.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {sponsorTestimonials.map((testimonial) => (
                    <TestimonialCard
                      key={testimonial.id}
                      testimonial={testimonial}
                    />
                  ))}
                </div>
              </div>
            )}

            {activeTab === "contact" && (
              <div className="space-y-8">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-emerald-500 mb-4">
                    Partner With ChaosBro
                  </h3>
                  <p className="text-gray-400 max-w-2xl mx-auto">
                    Ready to join our sponsor family? Fill out the form below
                    and we&apos;ll get back to you within 24 hours.
                  </p>
                </div>

                {/* Download Resources */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
                  {Object.entries(sponsorPackageDownloads).map(
                    ([key, download]) => (
                      <Card key={key} variant="elevated" className="p-4 sm:p-6">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                            <svg
                              className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                              />
                            </svg>
                          </div>
                          <div className="min-w-0 flex-1">
                            <h4 className="font-semibold text-emerald-500 text-sm sm:text-base truncate">
                              {download.title}
                            </h4>
                            <p className="text-xs text-gray-400">
                              {download.fileSize} • Updated{" "}
                              {download.lastUpdated}
                            </p>
                          </div>
                        </div>
                        <p className="text-gray-300 text-xs sm:text-sm mb-4">
                          {download.description}
                        </p>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full text-xs sm:text-sm"
                          onClick={() =>
                            downloadFile(
                              download.fileUrl,
                              download.title + download.fileUrl.slice(-4)
                            )
                          }
                        >
                          Download
                        </Button>
                      </Card>
                    )
                  )}
                </div>

                {/* Contact Form */}
                {/* <Card variant="elevated" className="p-8 max-w-3xl mx-auto">
                  <Button variant="neon" size="lg" className="w-full" onClick={() => setIsFormOpen(true)}>
                    Start Partnership Discussion
                  </Button>
                </Card> */}
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>

      {/* Partnership Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-gray-900 rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gray-700"
          >
            <div className="p-6 border-b border-gray-700 flex justify-between items-center">
              <h3 className="text-2xl font-bold text-emerald-500">
                Partnership Inquiry
              </h3>
              <button
                onClick={() => setIsFormOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Company Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    {sponsorFormFields.company.label} *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={sponsorFormFields.company.placeholder}
                    value={formData.company}
                    onChange={(e) =>
                      handleInputChange("company", e.target.value)
                    }
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
                  />
                </div>

                {/* Contact Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    {sponsorFormFields.contactName.label} *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={sponsorFormFields.contactName.placeholder}
                    value={formData.contactName}
                    onChange={(e) =>
                      handleInputChange("contactName", e.target.value)
                    }
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    {sponsorFormFields.email.label} *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder={sponsorFormFields.email.placeholder}
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    {sponsorFormFields.phone.label}
                  </label>
                  <input
                    type="tel"
                    placeholder={sponsorFormFields.phone.placeholder}
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
                  />
                </div>

                {/* Website */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    {sponsorFormFields.website.label}
                  </label>
                  <input
                    type="url"
                    placeholder={sponsorFormFields.website.placeholder}
                    value={formData.website}
                    onChange={(e) =>
                      handleInputChange("website", e.target.value)
                    }
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
                  />
                </div>

                {/* Sponsorship Tier */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    {sponsorFormFields.sponsorshipTier.label} *
                  </label>
                  <select
                    required
                    value={formData.sponsorshipTier}
                    onChange={(e) =>
                      handleInputChange("sponsorshipTier", e.target.value)
                    }
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
                  >
                    {sponsorFormFields.sponsorshipTier.options?.map(
                      (option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      )
                    )}
                  </select>
                </div>

                {/* Budget */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    {sponsorFormFields.budget.label}
                  </label>
                  <select
                    value={formData.budget}
                    onChange={(e) =>
                      handleInputChange("budget", e.target.value)
                    }
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
                  >
                    {sponsorFormFields.budget.options?.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Timeline */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    {sponsorFormFields.timeline.label}
                  </label>
                  <select
                    value={formData.timeline}
                    onChange={(e) =>
                      handleInputChange("timeline", e.target.value)
                    }
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
                  >
                    {sponsorFormFields.timeline.options?.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Partnership Goals */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  {sponsorFormFields.goals.label} *
                </label>
                <textarea
                  required
                  rows={sponsorFormFields.goals.rows}
                  placeholder={sponsorFormFields.goals.placeholder}
                  value={formData.goals}
                  onChange={(e) => handleInputChange("goals", e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors resize-none"
                />
              </div>

              {/* Additional Message */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  {sponsorFormFields.message.label}
                </label>
                <textarea
                  rows={sponsorFormFields.message.rows}
                  placeholder={sponsorFormFields.message.placeholder}
                  value={formData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors resize-none"
                />
              </div>

              {/* Submit Message */}
              {submitMessage && (
                <div className="bg-emerald-500/20 border border-emerald-500 rounded-lg p-4">
                  <p className="text-emerald-500">{submitMessage}</p>
                </div>
              )}

              {/* Form Actions */}
              <div className="flex space-x-4">
                <Button
                  type="submit"
                  variant="neon"
                  disabled={isSubmitting}
                  className="flex-1"
                >
                  {isSubmitting ? "Sending..." : "Send Partnership Inquiry"}
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setIsFormOpen(false)}
                  className="px-8"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </section>
  );
}
