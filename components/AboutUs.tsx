import React from 'react';
import { RiMapPinLine, RiCloudyLine, RiErrorWarningLine, RiInformationLine, RiUserLine } from 'react-icons/ri';
import { FaShieldAlt, FaUsers, FaRocket, FaHeart } from 'react-icons/fa';

const AboutUs = () => {
  return (
    <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12">
      <h1 className="text-3xl font-bold mb-4">Welcome to SkyGuide: Your Trusted Paragliding Companion</h1>
      <p className="text-lg mb-6">At SkyGuide, we're passionate about empowering paragliders to soar safely and confidently. Our team of experienced paragliders, meteorologists, and developers created the SkyGuide app to revolutionize the way you plan and navigate your flights.</p>

      <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
      <p className="text-lg mb-6">SkyGuide is dedicated to providing the most comprehensive and accurate information to help paragliders make informed decisions about their flying experiences. We believe that safety and enjoyment go hand-in-hand, and our app is designed to ensure that every flight is a successful and exhilarating experience.</p>

      <h2 className="text-2xl font-bold mb-4">How We Help</h2>
      <ul className="list-none mb-6">
        <li className="mb-2">
          <RiMapPinLine size={20} className="mr-2" />
          Plan your flights with precision using our interactive maps and 3D terrain views
        </li>
        <li className="mb-2">
          <RiCloudyLine size={20} className="mr-2" />
          Check real-time weather forecasts and alerts to ensure optimal flying conditions
        </li>
        <li className="mb-2">
          <RiErrorWarningLine size={20} className="mr-2" />
          Stay safe with our hazard reporting and community feedback features
        </li>
        <li className="mb-2">
          <RiInformationLine size={20} className="mr-2" />
          Access critical information on takeoff and landing sites, airspace restrictions, and more
        </li>
        <li className="mb-2">
          <RiUserLine size={20} className="mr-2" />
          Connect with the paragliding community and share your experiences
        </li>
      </ul>

      <h2 className="text-2xl font-bold mb-4">Our Team</h2>
      <div className="flex flex-wrap mb-6">
        <div className="w-1/2 md:w-1/3 lg:w-1/4 p-4">
          <img src="https://via.placeholder.com/150" alt="Founder and Lead Developer" className="rounded-full mb-2" />
          <h3 className="text-lg font-bold mb-1">[Name], Founder and Lead Developer</h3>
          <p className="text-sm">Experienced paraglider and software engineer</p>
        </div>
        <div className="w-1/2 md:w-1/3 lg:w-1/4 p-4">
          <img src="https://via.placeholder.com/150" alt="Meteorologist-in-Residence" className="rounded-full mb-2" />
          <h3 className="text-lg font-bold mb-1">[Name], Meteorologist-in-Residence</h3>
          <p className="text-sm">Expert in weather forecasting and modeling</p>
        </div>
        <div className="w-1/2 md:w-1/3 lg:w-1/4 p-4">
          <img src="https://via.placeholder.com/150" alt="Community Manager" className="rounded-full mb-2" />
          <h3 className="text-lg font-bold mb-1">[Name], Community Manager</h3>
          <p className="text-sm">Seasoned paraglider and enthusiast</p>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-4">Our Values</h2>
      <ul className="list-none mb-6">
        <li className="mb-2">
          <FaShieldAlt size={20} className="mr-2" />
          Safety above all: We prioritize accuracy and reliability to ensure your well-being
        </li>
        <li className="mb-2">
          <FaUsers size={20} className="mr-2" />
          Community-driven: We listen to your feedback and incorporate user suggestions
        </li>
        <li className="mb-2">
          <FaRocket size={20} className="mr-2" />
          Innovation: We continuously update and refine our features to stay ahead of the curve
        </li>
        <li className="mb-2">
          <FaHeart size={20} className="mr-2" />
          Passion: We're paragliders ourselves, dedicated to enhancing the sport we love
        </li>
      </ul>
    </div>
  );
};

export default AboutUs;