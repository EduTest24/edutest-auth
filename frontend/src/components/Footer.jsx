import React from "react";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaPhoneAlt,
  FaEnvelope,
  FaLocationArrow,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="hover:text-blue-400">
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-blue-400">
                  About Us
                </a>
              </li>
              <li>
                <a href="/exams" className="hover:text-blue-400">
                  Exams
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-blue-400">
                  Contact
                </a>
              </li>
              <li>
                <a href="/privacy-policy" className="hover:text-blue-400">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Info</h3>
            <ul>
              <li className="flex items-center mb-2">
                <FaPhoneAlt className="mr-2 text-blue-500" />
                +1 234 567 890
              </li>
              <li className="flex items-center mb-2">
                <FaEnvelope className="mr-2 text-blue-500" />
                support@edutest.com
              </li>
              <li className="flex items-center mb-2">
                <FaLocationArrow className="mr-2 text-blue-500" />
                123 Test Street, City, Country
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-6">
              <a href="https://facebook.com" className="hover:text-blue-500">
                <FaFacebook size={24} />
              </a>
              <a href="https://twitter.com" className="hover:text-blue-400">
                <FaTwitter size={24} />
              </a>
              <a href="https://instagram.com" className="hover:text-pink-500">
                <FaInstagram size={24} />
              </a>
              <a href="https://linkedin.com" className="hover:text-blue-700">
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>

          {/* Copyright */}
          <div className="lg:col-span-4 text-center mt-8 md:mt-0">
            <p>&copy; 2024 EduTest. All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
