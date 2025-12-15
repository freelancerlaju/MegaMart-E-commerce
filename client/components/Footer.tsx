import React from "react";
import { MessageCircle, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Youtube, Linkedin, Send } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-900 via-gray-900 to-black text-white">
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand and contact */}
          <div className="lg:col-span-1">
            <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              MegaMart
            </h3>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              Your one-stop destination for quality products. Shop smarter, live better.
            </p>

            {/* Contact Us */}
            <div className="space-y-4 mb-8">
              {/* WhatsApp */}
              <a 
                href="https://wa.me/+8801302144805" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 group hover:text-green-400 transition-colors"
              >
                <div className="p-2 bg-gray-800 rounded-lg group-hover:bg-green-500/20 transition-colors">
                  <MessageCircle size={18} className="text-green-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium">WhatsApp</p>
                  <p className="text-sm font-semibold">+880 1302144805</p>
                </div>
              </a>

              {/* Call Us */}
              <a 
                href="tel:+8801302144805"
                className="flex items-center gap-3 group hover:text-blue-400 transition-colors"
              >
                <div className="p-2 bg-gray-800 rounded-lg group-hover:bg-blue-500/20 transition-colors">
                  <Phone size={18} className="text-blue-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium">Call Us</p>
                  <p className="text-sm font-semibold">+880 1302144805</p>
                </div>
              </a>

              {/* Email */}
              <a 
                href="mailto:support@megamart.com"
                className="flex items-center gap-3 group hover:text-purple-400 transition-colors"
              >
                <div className="p-2 bg-gray-800 rounded-lg group-hover:bg-purple-500/20 transition-colors">
                  <Mail size={18} className="text-purple-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium">Email</p>
                  <p className="text-sm font-semibold">support@megamart.com</p>
                </div>
              </a>

              {/* Address */}
              <div className="flex items-start gap-3">
                <div className="p-2 bg-gray-800 rounded-lg">
                  <MapPin size={18} className="text-red-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium">Address</p>
                  <p className="text-sm font-semibold">123 Commerce St, Business District</p>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div>
              <p className="text-sm font-semibold mb-3">Follow Us</p>
              <div className="flex gap-3">
                <a 
                  href="https://www.facebook.com/fb.freelancerlaju" 
                  className="p-2.5 bg-gray-800 rounded-lg hover:bg-blue-600 transition-all hover:scale-110"
                  aria-label="Facebook"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Facebook size={18} />
                </a>
                <a 
                  href="https://www.x.com/freelancerlaju" 
                  className="p-2.5 bg-gray-800 rounded-lg hover:bg-sky-500 transition-all hover:scale-110"
                  aria-label="Twitter"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Twitter size={18} />
                </a>
                <a 
                  href="https://www.instagram.com/freelancerlaju" 
                  className="p-2.5 bg-gray-800 rounded-lg hover:bg-pink-600 transition-all hover:scale-110"
                  aria-label="Instagram"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Instagram size={18} />
                </a>
                <a 
                  href="https://www.youtube.com/@freelancerlaju" 
                  className="p-2.5 bg-gray-800 rounded-lg hover:bg-red-600 transition-all hover:scale-110"
                  aria-label="YouTube"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Youtube size={18} />
                </a>
                <a 
                  href="https://www.linkedin.com/in/freelancerlaju" 
                  className="p-2.5 bg-gray-800 rounded-lg hover:bg-blue-700 transition-all hover:scale-110"
                  aria-label="LinkedIn"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin size={18} />
                </a>
              </div>
            </div>
          </div>

          {/* Most Popular Categories */}
          <div>
            <h4 className="text-lg font-bold mb-3 flex items-center gap-2">
              <span className="h-1 w-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded"></span>
              Popular Categories
            </h4>
            <ul className="space-y-2.5">
              {[
                "Staples",
                "Beverages",
                "Personal Care",
                "Home Care",
                "Baby Care",
                "Vegetables & Fruits",
                "Snacks & Foods",
                "Dairy & Bakery"
              ].map((category) => (
                <li key={category}>
                  <a 
                    href="#" 
                    className="text-gray-300 hover:text-white transition-colors text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 bg-gray-600 rounded-full group-hover:bg-blue-500 transition-colors"></span>
                    {category}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Services */}
          <div>
            <h4 className="text-lg font-bold mb-3 flex items-center gap-2">
              <span className="h-1 w-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded"></span>
              Customer Services
            </h4>
            <ul className="space-y-2.5">
              {[
                "About Us",
                "Terms & Conditions",
                "FAQ",
                "Privacy Policy",
                "E-waste Policy",
                "Cancellation & Return Policy"
              ].map((service) => (
                <li key={service}>
                  <a 
                    href="#" 
                    className="text-gray-300 hover:text-white transition-colors text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 bg-gray-600 rounded-full group-hover:bg-blue-500 transition-colors"></span>
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-bold mb-3 flex items-center gap-2">
              <span className="h-1 w-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded"></span>
              Newsletter
            </h4>
            <p className="text-gray-400 text-sm mb-4 leading-relaxed">
              Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
            </p>
            <form className="space-y-3">
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-white placeholder-gray-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all hover:scale-105 flex items-center gap-2 font-medium text-sm"
                >
                  <Send size={16} />
                </button>
              </div>
            </form>

            {/* Download App */}
            <div className="mt-8">
              <h4 className="text-sm font-semibold mb-3">Download Our App</h4>
              <div className="flex flex-col gap-3">
                <a href="#" className="block">
                  <img
                    src="https://api.builder.io/api/v1/image/assets/TEMP/a5404b1a2db497699b4cea16d2974b59e5d0168d?width=334"
                    alt="App Store"
                    className="h-12 w-auto hover:opacity-80 transition-opacity"
                  />
                </a>
                <a href="#" className="block">
                  <img
                    src="https://api.builder.io/api/v1/image/assets/TEMP/ac8931f1536c297c5283ce1bb9757db5177685c1?width=382"
                    alt="Google Play"
                    className="h-12 w-auto hover:opacity-80 transition-opacity"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent mb-8"></div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-gray-400">
            <p>© {new Date().getFullYear()} MegaMart. All rights reserved.</p>
            <p>Developed by <a href="https://www.facebook.com/fb.freelancerlaju" className="text-gray-400 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">Freelancer Laju</a></p>
          </div>
          <div className="flex flex-wrap gap-6 text-sm">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
