"use client";

import { useState } from "react";
import { motion } from "framer-motion";
// import Image from 'next/image';
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";

// Community data
const communityData = {
  discord: {
    title: "Join Our Discord Community",
    description:
      "Connect with fellow gamers, get real-time updates, and be part of the ChaosBro family.",
    features: [
      "Live match discussions",
      "Strategy sharing",
      "Team announcements",
      "Community events",
    ],
    inviteUrl: "https://discord.gg/chaosbro",
  },
  volunteer: {
    title: "Become a Volunteer",
    description:
      "Help us grow the ChaosBro community and gain valuable experience in esports management.",
    roles: [
      {
        title: "Social Media Manager",
        description: "Manage our social presence and content creation",
      },
      {
        title: "Video Editor",
        description: "Edit highlight reels and tournament footage",
      },
      {
        title: "Community Moderator",
        description: "Help maintain a positive community environment",
      },
      {
        title: "Event Coordinator",
        description: "Organize watch parties and community events",
      },
    ],
  },
  watchParties: {
    title: "Watch Parties & Events",
    description:
      "Join us for live viewing parties of major tournaments and finals.",
    upcomingEvent: {
      title: "VALORANT Masters Finals",
      date: "July 15, 2025",
      time: "3:00 PM PST",
      location: "ChaosBro Gaming Lounge",
      image: "/assets/events/watchparty.jpg",
    },
    pastEvents: [
      { name: "VCT Champions 2024", attendees: 85 },
      { name: "CoD World Championship", attendees: 92 },
      { name: "Apex Legends ALGS", attendees: 67 },
    ],
  },
  guidelines: {
    title: "Community Guidelines",
    rules: [
      {
        title: "Respect Everyone",
        description:
          "Treat all community members with respect, regardless of skill level or background.",
      },
      {
        title: "No Toxicity",
        description:
          "Toxic behavior, harassment, or hate speech will result in immediate removal.",
      },
      {
        title: "Stay On Topic",
        description:
          "Keep discussions relevant to gaming, esports, and ChaosBro activities.",
      },
      {
        title: "No Spam",
        description:
          "Avoid excessive self-promotion, spam, or repeated messages.",
      },
      {
        title: "Support Each Other",
        description:
          "Help newcomers and foster a positive, inclusive gaming environment.",
      },
    ],
  },
};

export function Community() {
  const [volunteerForm, setVolunteerForm] = useState({
    name: "",
    email: "",
    role: "",
    experience: "",
    message: "",
  });
  const [isVolunteerFormOpen, setIsVolunteerFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleVolunteerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Reset form and show success message
    setVolunteerForm({
      name: "",
      email: "",
      role: "",
      experience: "",
      message: "",
    });
    setSubmitMessage("Thank you for your interest! We'll contact you soon.");
    setIsSubmitting(false);

    // Close form after 3 seconds
    setTimeout(() => {
      setIsVolunteerFormOpen(false);
      setSubmitMessage("");
    }, 3000);
  };

  // const addToGoogleCalendar = () => {
  //   const event = communityData.watchParties.upcomingEvent;
  //   const startDate = new Date('2025-07-15T23:00:00Z').toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  //   const endDate = new Date('2025-07-16T02:00:00Z').toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

  //   const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${startDate}/${endDate}&details=${encodeURIComponent(`Join ChaosBro for ${event.title} watch party!`)}&location=${encodeURIComponent(event.location)}`;

  //   window.open(googleCalendarUrl, '_blank');
  // };

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
  return (
    <section className="py-16 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-12"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold font-orbitron text-emerald-500 mb-4">
              Join Our Community
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Be part of the ChaosBro family. Connect, compete, and grow
              together in our vibrant gaming community.
            </p>
          </motion.div>

          {/* Discord Section - Redesigned */}
          <motion.div variants={itemVariants}>
            <Card
              variant="neon"
              className="p-8 bg-gradient-to-r from-[#5865F2]/10 to-emerald-500/10 border-emerald-500/30"
            >
              <div className="flex flex-col lg:flex-row items-center gap-8">
                {/* Discord Icon and Title */}
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 bg-gradient-to-br from-[#5865F2] to-[#4752C4] rounded-2xl flex items-center justify-center shadow-lg">
                    <svg
                      className="w-12 h-12 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.317 4.369a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.211.375-.445.865-.608 1.249a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.249.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37.07.07 0 0 0 3.638 4.4c-3.109 4.648-3.956 9.178-3.538 13.634a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.029.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.010c3.928 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.029.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
                    </svg>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 text-center lg:text-left">
                  <h3 className="text-3xl font-bold text-white font-orbitron mb-3">
                    {communityData.discord.title}
                  </h3>
                  <p className="text-gray-300 mb-6 text-lg leading-relaxed">
                    {communityData.discord.description}
                  </p>

                  {/* Features in single horizontal line */}
                  <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-6">
                    {communityData.discord.features.map((feature, index) => (
                      <motion.div
                        key={feature}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1, duration: 0.3 }}
                        className="flex items-center gap-2 bg-gray-800/40 rounded-full px-4 py-2 border border-gray-700/50"
                      >
                        <div className="w-2 h-2 bg-emerald-500 rounded-full flex-shrink-0"></div>
                        <span className="text-gray-300 text-sm font-medium whitespace-nowrap">
                          {feature}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <div className="flex-shrink-0">
                  <Button
                    variant="neon"
                    size="lg"
                    className="px-8 py-4 text-lg font-semibold text-emerald-500 hover:text-emerald-500 bg-transparent hover:bg-emerald-500/20 border-emerald-500 hover:border-emerald-500 shadow-lg hover:shadow-emerald-500/20 transition-all duration-300"
                    onClick={() =>
                      window.open(communityData.discord.inviteUrl, "_blank")
                    }
                  >
                    Join Discord Server
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Volunteer Section */}
          {/* <motion.div variants={itemVariants}>
            <Card variant="elevated" className="p-8">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-emerald-500 font-orbitron mb-4">
                  {communityData.volunteer.title}
                </h3>
                <p className="text-gray-300 max-w-2xl mx-auto">
                  {communityData.volunteer.description}
                </p>
              </div>
              
              <div className="text-center">
                <Button 
                  variant="primary" 
                  size="lg"
                  // onClick={() => setIsVolunteerFormOpen(true)}
                >
                  Apply to Volunteer
                </Button>
              </div>
            </Card>
          </motion.div> */}

          {/* Watch Parties Section */}
          {/* <motion.div variants={itemVariants}>
            <Card variant="glass" className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-3xl font-bold text-emerald-500 font-orbitron mb-4">
                    {communityData.watchParties.title}
                  </h3>
                  <p className="text-gray-300 mb-6">{communityData.watchParties.description}</p>
                  
                 
                  <div className="bg-gray-800/50 rounded-lg p-6 mb-6">
                    <h4 className="text-xl font-semibold text-emerald-500 mb-3">Next Event</h4>
                    <div className="space-y-2 mb-4">
                      <div className="text-lg font-medium text-white">{communityData.watchParties.upcomingEvent.title}</div>
                      <div className="text-gray-400">{communityData.watchParties.upcomingEvent.date} at {communityData.watchParties.upcomingEvent.time}</div>
                      <div className="text-gray-400">{communityData.watchParties.upcomingEvent.location}</div>
                    </div>
                    <Button 
                      variant="outline" 
                      onClick={addToGoogleCalendar}
                      className="w-full sm:w-auto"
                    >
                      Add to Google Calendar
                    </Button>
                  </div>
                  
           
                  <div>
                    <h4 className="text-lg font-semibold text-emerald-500 mb-3">Recent Events</h4>
                    <div className="space-y-2">
                                          {communityData.watchParties.pastEvents.map((event) => (
                      <div key={event.name} className="flex justify-between items-center text-sm">
                        <span className="text-gray-300">{event.name}</span>
                        <span className="text-emerald-500">{event.attendees} attendees</span>
                      </div>
                    ))}
                    </div>
                  </div>
                </div>
                
                <div className="relative h-64 lg:h-80">
                  <Image
                    src={communityData.watchParties.upcomingEvent.image}
                    alt="Watch Party"
                    width={600}
                    height={400}
                    className="rounded-lg object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent rounded-lg"></div>
                </div>
              </div>
            </Card>
          </motion.div> */}

          {/* Community Guidelines */}
          <motion.div variants={itemVariants}>
            <Card variant="default" className="p-8">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-emerald-500 font-orbitron mb-3">
                  {communityData.guidelines.title}
                </h3>
                <p className="text-gray-400">
                  Help us maintain a positive and inclusive gaming environment
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                {communityData.guidelines.rules.map((rule, index) => (
                  <motion.div
                    key={rule.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="text-center p-6 bg-gradient-to-br from-gray-800/50 to-gray-700/30 rounded-xl border border-gray-700/50 hover:border-emerald-500/30 transition-all duration-300"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <span className="text-white text-lg font-bold">
                        {index + 1}
                      </span>
                    </div>
                    <h4 className="text-lg font-semibold text-emerald-500 mb-3">
                      {rule.title}
                    </h4>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {rule.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
        </motion.div>
      </div>

      {/* Volunteer Form Modal */}
      {isVolunteerFormOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-gray-900 rounded-lg p-8 max-w-md w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-emerald-500">
                Volunteer Application
              </h3>
              <button
                onClick={() => setIsVolunteerFormOpen(false)}
                className="text-gray-400 hover:text-white"
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

            {submitMessage ? (
              <div className="text-center py-8">
                <div className="text-emerald-500 text-lg mb-2">✓</div>
                <p className="text-emerald-500">{submitMessage}</p>
              </div>
            ) : (
              <form onSubmit={handleVolunteerSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={volunteerForm.name}
                    onChange={(e) =>
                      setVolunteerForm((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={volunteerForm.email}
                    onChange={(e) =>
                      setVolunteerForm((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                    className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Preferred Role *
                  </label>
                  <select
                    required
                    value={volunteerForm.role}
                    onChange={(e) =>
                      setVolunteerForm((prev) => ({
                        ...prev,
                        role: e.target.value,
                      }))
                    }
                    className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-emerald-500 focus:outline-none"
                  >
                    <option value="">Select a role</option>
                    {communityData.volunteer.roles.map((role) => (
                      <option key={role.title} value={role.title}>
                        {role.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Experience
                  </label>
                  <input
                    type="text"
                    value={volunteerForm.experience}
                    onChange={(e) =>
                      setVolunteerForm((prev) => ({
                        ...prev,
                        experience: e.target.value,
                      }))
                    }
                    placeholder="Brief description of relevant experience"
                    className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Message
                  </label>
                  <textarea
                    value={volunteerForm.message}
                    onChange={(e) =>
                      setVolunteerForm((prev) => ({
                        ...prev,
                        message: e.target.value,
                      }))
                    }
                    placeholder="Tell us why you want to volunteer with ChaosBro"
                    rows={4}
                    className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-emerald-500 focus:outline-none resize-none"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setIsVolunteerFormOpen(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={isSubmitting}
                    className="flex-1"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Application"}
                  </Button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </section>
  );
}
