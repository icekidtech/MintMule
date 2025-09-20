import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  MessageCircle, 
  Mail, 
  Send, 
  CheckCircle,
  Twitter,
  Github,
  MessageSquare
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Support: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.email.trim() || !formData.subject.trim() || !formData.message.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    setSubmitting(true);
    
    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('Support ticket submitted successfully! We\'ll get back to you soon.');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
    } catch (error) {
      toast.error('Failed to submit support ticket. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const supportChannels = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email Support",
      description: "Get help via email within 24 hours",
      action: "support@mintmule.com",
      color: "from-green-500 to-emerald-600"
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "Live Chat",
      description: "Chat with our support team in real-time",
      action: "Start Chat",
      color: "from-blue-500 to-cyan-600"
    },
    {
      icon: <Twitter className="w-6 h-6" />,
      title: "Twitter Support",
      description: "Reach out to us on social media",
      action: "@MintMule",
      color: "from-sky-500 to-blue-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <motion.header 
        className="border-b border-slate-700 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-40"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <motion.button
                onClick={() => navigate('/')}
                className="flex items-center space-x-2 text-slate-400 hover:text-white transition-colors"
                whileHover={{ x: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Home</span>
              </motion.button>
              
              <div className="flex items-center space-x-3">
                <motion.div 
                  className="w-8 h-8 bg-gradient-to-r from-[#215184] to-blue-500 rounded-lg flex items-center justify-center"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <MessageCircle className="w-5 h-5 text-white" />
                </motion.div>
                <span className="text-xl font-bold text-white">Support</span>
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="max-w-6xl mx-auto px-6 lg:px-12 py-12">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            How can we help you?
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Our support team is here to assist you with any questions or issues you may have
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Support Channels */}
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold text-white mb-6">Get in Touch</h2>
            <div className="space-y-4 mb-8">
              {supportChannels.map((channel, index) => (
                <motion.div
                  key={index}
                  className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-[#215184] transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-start space-x-4">
                    <motion.div 
                      className={`p-3 bg-gradient-to-r ${channel.color} rounded-lg`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      {channel.icon}
                    </motion.div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white mb-2">
                        {channel.title}
                      </h3>
                      <p className="text-slate-400 mb-3">
                        {channel.description}
                      </p>
                      <motion.button
                        className="text-[#215184] hover:text-blue-400 font-medium transition-colors"
                        whileHover={{ x: 5 }}
                      >
                        {channel.action}
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6"
            >
              <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
              <div className="space-y-2">
                <motion.button
                  onClick={() => navigate('/faq')}
                  className="block w-full text-left text-slate-300 hover:text-white transition-colors py-2"
                  whileHover={{ x: 5 }}
                >
                  → Frequently Asked Questions
                </motion.button>
                <motion.button
                  className="block w-full text-left text-slate-300 hover:text-white transition-colors py-2"
                  whileHover={{ x: 5 }}
                >
                  → Documentation
                </motion.button>
                <motion.button
                  className="block w-full text-left text-slate-300 hover:text-white transition-colors py-2"
                  whileHover={{ x: 5 }}
                >
                  → Community Discord
                </motion.button>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Send us a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your name"
                      className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-[#215184] focus:ring-2 focus:ring-[#215184]/20 transition-all duration-200"
                      disabled={submitting}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-[#215184] focus:ring-2 focus:ring-[#215184]/20 transition-all duration-200"
                      disabled={submitting}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Subject *
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:border-[#215184] focus:ring-2 focus:ring-[#215184]/20 transition-all duration-200"
                    disabled={submitting}
                  >
                    <option value="">Select a subject</option>
                    <option value="technical">Technical Issue</option>
                    <option value="wallet">Wallet Connection</option>
                    <option value="minting">NFT Minting</option>
                    <option value="transfer">Transfer Issues</option>
                    <option value="general">General Inquiry</option>
                    <option value="feedback">Feedback</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Describe your issue or question in detail..."
                    rows={6}
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-[#215184] focus:ring-2 focus:ring-[#215184]/20 transition-all duration-200 resize-none"
                    disabled={submitting}
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={submitting || !formData.name.trim() || !formData.email.trim() || !formData.subject.trim() || !formData.message.trim()}
                  className="w-full flex items-center justify-center space-x-3 bg-gradient-to-r from-[#215184] to-blue-600 text-white font-semibold py-4 px-8 rounded-lg hover:from-[#1a4066] hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                  whileHover={submitting ? {} : { scale: 1.02 }}
                  whileTap={submitting ? {} : { scale: 0.98 }}
                >
                  {submitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <Send className="w-5 h-5" />
                      </motion.div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>

        {/* Response Time Info */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span className="text-white font-semibold">We typically respond within 24 hours</span>
            </div>
            <p className="text-slate-400 text-sm">
              For urgent issues, please use our live chat or reach out on Twitter for faster assistance
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Support;