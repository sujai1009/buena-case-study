import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faFacebookF,
  faLinkedinIn,
  faPinterestP,
  faInstagram,
  faDribbble,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faPhone, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  return (
    <footer className="bg-indigo-950 text-white py-1 px-1">
        {/* Copyright */}
        <div className="max-w-7xl mx-auto border-indigo-800 text-center text-indigo-300">
          <p>
            © {new Date().getFullYear()} Sujai1009 Inc. All Rights Reserved.
          </p>
          <p className="mt-2">
            Designed and Developed for Buena GmbH{" "} by { " "}
            <a href="#" className="text-white hover:text-indigo-200 transition duration-300">
              Sujai Muthu Kumar Karunakaran
            </a>
          </p>
        </div>
    </footer>
  );
};

export default Footer;