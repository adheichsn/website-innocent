import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#3B4559] text-white py-6 md:py-8 lg:py-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-md:px-2 max-2xl:px-4">
        <div className="col-span-2 lg:col-span-1 flex flex-col gap-6">
          <a href="https://smarteye.id" className="flex items-center gap-2">
            <Image
              src={"/img/logo-smarteye.png"}
              alt="smarteye.id"
              width={40}
              height={40}
            />
            <span className="flex items-baseline text-bold text-lg font-bold">
              smarteye<p className="text-sm">.id</p>
            </span>
          </a>
          <div className="text-sm lg:text-base">
            <p className="text-white">Telkom Corpu</p>
            <p className="text-neutral04">
              Jalan Gegerkalong Hilir Gegerkalong, Sukarasa, Kec. Sukasari, Kota
              Bandung, Jawa Barat 40152
            </p>
          </div>
        </div>
        <div className="lg:hidden col-span-2 lg:col-span-1 h-[1px] bg-neutral04"></div>
        <div className="flex gap-4 lg:justify-around">
          <div>
            <p className="text-xs lg:text-sm text-neutral04 mb-2">
              Products and Services
            </p>
            <ul className="text-sm lg:text-base flex flex-col gap-1">
              <li>VR Training</li>
              <li>VR Tour</li>
              <li>VR Expo</li>
              <li>AR Interactive</li>
            </ul>
          </div>
          <div>
            <p className="text-xs lg:text-sm text-neutral04 mb-2">Read More</p>
            <ul className="text-sm lg:text-base flex flex-col gap-1">
              <li>Use Cases</li>
              <li>About</li>
              <li>Blog</li>
            </ul>
          </div>
        </div>
        <div className="md:hidden col-span-2 lg:col-span-1 h-[1px] bg-neutral04"></div>
        <div className="flex flex-col gap-2">
          <a
            href="mailto:contact@smarteye.id"
            className="hover:text-neutral04 text-base lg:text-lg font-semibold"
          >
            contact@smarteye.id
          </a>
          <div className="text-xs lg:text-sm">
            <p>
              <a
                href="https://wa.me/62811898211"
                className="font-bold hover:text-neutral04"
              >
                +62 8118 982 11
              </a>{" "}
              - WhatsApp and call
            </p>
            <p>
              <a
                href="https://wa.me/6281293129571"
                className="font-bold hover:text-neutral04"
              >
                +62 8129 312 9571
              </a>{" "}
              - WhatsApp only
            </p>
          </div>
          <ul className="flex gap-2 mt-2">
            <li className="p-2 border rounded-full hover:bg-neutral04/10">
              <a href="https://www.instagram.com/smarteyeid/" target="_blank">
                <Image
                  src={"/img/Instagram.svg"}
                  alt="Instagram"
                  width={20}
                  height={20}
                />
              </a>
            </li>
            <li className="p-2 border rounded-full hover:bg-neutral04/10">
              <a
                href="https://www.linkedin.com/company/smarteye-id/"
                target="_blank"
              >
                <Image
                  src={"/img/LinkedIn.svg"}
                  alt="Instagram"
                  width={20}
                  height={20}
                />
              </a>
            </li>
            <li className="p-2 border rounded-full hover:bg-neutral04/10">
              <a
                href="https://www.youtube.com/channel/UCdJaE--veL4G1vrSBTU4R0g"
                target="_blank"
              >
                <Image
                  src={"/img/YouTube.svg"}
                  alt="Instagram"
                  width={20}
                  height={20}
                />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
