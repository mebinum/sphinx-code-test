import React from "react";
import FacebookIcon from "../../../public/facebook.svg";
import TwitterIcon from "../../../public/twitter.svg";
import InstagramIcon from "../../../public/instagram.svg";
import GithubIcon from "../../../public/github.svg";
import YoutubeIcon from "../../../public/youtube.svg";
const navigation = [
  {
    name: "X",
    href: "https://twitter.com/mikeebinum",
    icon: TwitterIcon,
  },
  {
    name: "GitHub",
    href: "https://github.com/mebinum",
    icon: GithubIcon,
  },
  {
    name: "YouTube",
    href: "https://youtube.com/mikeebinum",
    icon: YoutubeIcon,
  },
];

export default function Footer() {
  return (
    <footer className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex justify-center space-x-6 md:order-2">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              target="_blank"
              className="text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">{item.name}</span>
              <item.icon className="h-6 w-6" aria-hidden="true" />
            </a>
          ))}
        </div>
        <div className="mt-8 md:order-1 md:mt-0">
          <p className="text-center text-xs leading-5 text-gray-500">
            &copy; {new Date().getFullYear()} Oyem Ebinum . All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
