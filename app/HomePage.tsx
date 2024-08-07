"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Footer from "./component/Footer";
import Header from "./component/Header";

const services = [
  {
    img: "/img/service01.png",
    title: (
      <>
        Kami <span className="text-primary04">Mengembangkan</span> Pengalaman
        Intuitif
      </>
    ),
    desc: "Innocent akan memberikan berbagai pengalaman penggunaan yang intuitif dan responsif sesuai dengan kebutuhan pengguna",
  },
  {
    img: "/img/service02.png",
    title: (
      <>
        Kami <span className="text-primary04">Memberikan</span> Kualitas Visual
        yang Menawan
      </>
    ),
    desc: "Innocent berkomitmen memberikan pengalaman visual yang sangat realistis dengan resolusi tinggi, memungkinkan pengguna untuk seakan merasakan secara langsung",
  },
  {
    img: "/img/service03.png",
    title: (
      <>
        <span className="text-primary04">Navigasi serta Konten yang </span>{" "}
        Interaktif dan Inovatif
      </>
    ),
    desc: "Kemudahan bagi pengunjung untuk menjelajahi  ruang show case yang menyediakan berbagai konten menarik ",
  },
];

const serviceNavigations = [
  {
    img: "/img/service01.png",
    title: "Showroom Zone",
    index: 0,
  },
  {
    img: "/img/service02.png",
    title: "Hacker Zone",
    index: 1,
  },
  {
    img: "/img/service03.png",
    title: "Photobooth",
    index: 2,
  },
];

const features = [
  {
    img: "/img/feature01.png",
    title: "Pengalaman Imersif",
    desc: "Berbagai produk inovasi ditampilkan dalam lingkungan digital sehingga pengunjung merasa seperti berada pada dunia nyata.",
  },
  {
    img: "/img/feature02.png",
    title: "Efisiensi waktu dan jarak",
    desc: "Berbagai produk inovasi ditampilkan dalam lingkungan digital sehingga pengunjung merasa seperti berada pada dunia nyata.",
  },
  {
    img: "/img/feature03.png",
    title: "Media edukasi",
    desc: "Pengunjung dapat merasakan lansung pembelajaran secara interaktif lansung dengan lingkungan virtual.",
  },
  {
    img: "/img/feature04.png",
    title: "Kemudahan penggunaan",
    desc: "Berbagai produk inovasi ditampilkan dalam lingkungan digital sehingga pengunjung merasa seperti berada pada dunia nyata.",
  },
];

export default function HomePage() {
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % services.length); // Increment index and loop back to start
    }, 10000); // Change index every 10 seconds

    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);

  const [activeIndex, setActiveIndex] = useState(0); // Default to first item active
  const handleNavClick = (index: number) => {
    setActiveIndex(index); // Update the active index on click
  };
  const activeService = services[activeIndex];

  return (
    <>
      <Header />
      <main>
        {/* first */}
        <article className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row gap-8 items-center justify-between max-md:mx-2 max-2xl:mx-4 bg-accent mb-10 lg:mb-20 py-8 md:py-8 px-3 md:px-4 md:p-10 lg:px-20 rounded-3xl">
          <div className="mx-auto md:w-[55%] flex flex-col gap-6 md:gap-8">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
                INNOVATION
              </h1>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-[#0192AE] to-[#253A76] inline-block text-transparent bg-clip-text">
                CENTER
              </h1>
            </div>
            <p className="text-base md:text-lg lg:text-xl text-[#585981]">
              Wujudkan imajinasi anda menjadi kenyataan bersama kami, dengan
              teknologi virtual dan augmented reality.
            </p>
            <div className="w-[90%] mx-auto md:hidden">
              <Image
                src={"/img/illustration.png"}
                alt="Illustration"
                width={600}
                height={600}
              />
            </div>
            <div>
              <div className="text-primary03 bg-white w-max py-1 px-3 rounded-t-lg">
                <p>Metaverse</p>
              </div>
              <div className="shadow-[0px_30px_60px_-15px_#8F90BC15] w-max flex gap-10 lg:gap-20 bg-white p-3 lg:p-4 rounded-b-2xl rounded-tr-2xl">
                <div>
                  <strong>VR Tour</strong>
                  <p className="text-sm text-neutral03">Virtual Showcase</p>
                </div>
                <Link
                  href={"/vrtour"}
                  className="flex items-center gap-2 text-white fill-white font-semibold bg-primary03 px-3 md:px-4 rounded-lg hover:bg-primary03/80 transition-all ease-in-out duration-150"
                >
                  <p className="text-sm md:text-base">Explore Room</p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24"
                    viewBox="0 -960 960 960"
                    width="24"
                    className="w-[20px] h-[20px] md:w-[24px] md:h-[24px]"
                  >
                    <path d="M380-320q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l224 224q11 11 11 28t-11 28q-11 11-28 11t-28-11L532-372q-30 24-69 38t-83 14Zm0-80q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <Image
              src={"/img/illustration.png"}
              alt="Illustration"
              width={600}
              height={600}
            />
          </div>
        </article>

        {/* services */}
        <article className="max-w-7xl mx-auto max-md:px-2 max-2xl:px-4 my-8 lg:my-10 grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-10 items-center mb-10 lg:mb-20">
          <div className="relative h-[350px] md:h-[400px] lg:h-[480px]">
            <div className="absolute bottom-0 w-[100%] h-[290px] md:h-[340px] lg:h-[380px] shadow-[-1px_-1px_20px_-2px_#7487B425] bg-gradient-to-br from-[#ECF1F8] to-[#B3BDD0] rounded-br-[65%]" />
            {/* Service Main Image */}
            <div className="absolute right-0 w-[95%] h-[330px] md:h-[380px] lg:h-[450px] rounded-tl-[50%] rounded-br-[50%] overflow-hidden">
              <Image
                src={activeService.img}
                alt="Feature"
                width={800}
                height={800}
                className="object-cover object-center h-full"
              />
            </div>
            {/* Service Navigation */}
            <div className="absolute bottom-0 bg-neutral01 p-1 md:p-2 rounded-sm flex gap-1 md:gap-2">
              <div className="w-[75px] md:w-[80px] h-[50px] border border-dashed border-[#1B8CC3] rounded-sm flex flex-col items-center justify-center fill-[#1B8CC3] cursor-default">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  viewBox="0 -960 960 960"
                  width="24"
                >
                  <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0 0v-560 560Zm80-80h400q12 0 18-11t-2-21L586-459q-6-8-16-8t-16 8L450-320l-74-99q-6-8-16-8t-16 8l-80 107q-8 10-2 21t18 11Z" />
                </svg>
                <p className="bg-[#1B8CC3] text-white text-[8px] px-1 rounded-sm">
                  See our galery
                </p>
              </div>
              {serviceNavigations.map((sn, index) => (
                <div
                  key={index}
                  className={`w-[75px] md:w-[80px] h-[50px] overflow-hidden relative rounded-sm cursor-pointer ${
                    activeIndex == sn.index ? "border-2 border-[#1B8CC3]" : ""
                  }`}
                  onClick={() => handleNavClick(sn.index)}
                >
                  <Image src={sn.img} alt={sn.title} width={80} height={50} />
                  <p className="absolute left-1 bottom-0 text-[8px] font-semibold text-white">
                    {sn.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex gap-8">
            <div>
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 lg:mb-4">
                {activeService.title}
              </h3>
              <p className="text-neutral03">{activeService.desc}</p>
            </div>
          </div>
        </article>

        {/* features */}
        <article className="max-w-7xl mx-auto max-md:px-2 max-2xl:px-4 my-8 lg:my-10 mb-10 lg:mb-20">
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 lg:mb-4">
            Apa yang Kami Tawarkan
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3 xl:gap-4">
            {features.map((f, index) => (
              <div
                key={index}
                className="border border-neutral04 rounded-xl p-4 lg:p-6 flex items-center gap-4 lg:gap-6"
              >
                <div className="max-w-24 min-h-32 rounded-lg overflow-hidden">
                  <Image
                    src={f.img}
                    alt={f.title}
                    width={800}
                    height={400}
                    className="object-cover object-center h-32"
                  />
                </div>
                <div>
                  <strong>{f.title}</strong>
                  <p className="text-neutral03">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </article>

        {/* ... */}
        <article className="max-w-7xl mx-auto max-md:mx-2 max-2xl:mx-4 bg-accent my-8 mb-10 lg:mb-20 p-10 lg:p-20 rounded-3xl">
          <p className="text-sm lg:text-base font-semibold mb-6 lg:mb-0">
            Dipersembahkan oleh
          </p>
          <div className="flex flex-col lg:flex-row-reverse justify-between items-center gap-6 lg:gap-10">
            <div className="w-[150px] lg:w-[245px]">
              <a href="https://smarteye.id">
                <Image
                  src={"/img/logo-smarteye.png"}
                  alt="Smarteye.id"
                  width={500}
                  height={500}
                  className="scale-125"
                />
              </a>
            </div>
            <div className="flex flex-col gap-6 max-w-[550px]">
              <strong className="text-2xl lg:text-4xl">Smarteye.id</strong>
              <p className="text-base lg:text-lg text-[#585981]">
                Wujudkan imajinasi anda menjadi kenyataan bersama kami, dengan
                teknologi virtual dan augmented reality
              </p>
              <a
                href="https://wa.me/62811898211"
                target="_blank"
                className="bg-[#1DAEFF] text-white px-8 lg:px-10 py-2 rounded-md font-semibold w-max hover:bg-[#1DAEFF]/80 transition-all ease-in-out duration-150"
              >
                Hubungi kami
              </a>
            </div>
          </div>
        </article>
      </main>
      {/* footer */}
      <Footer />
    </>
  );
}
