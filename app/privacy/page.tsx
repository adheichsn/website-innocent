import React from "react";
import Footer from "../component/Footer";
import Image from "next/image";

export const metadata = {
  title: "Kebijakan Privasi Innocent | Telkom Innocent",
  description: "Ketentuan Layanan ini mengatur penggunaan layanan Innocent yang disediakan oleh Telkom Indonesia."
};

const privacy = {
  title: "Kebijakan Privasi Innocent",
  description: (
    <>
      Selamat datang di Ketentuan Layanan <strong>Innocent</strong>. Ketentuan
      Layanan ini mengatur penggunaan layanan <strong>Innocent</strong> yang
      disediakan oleh Telkom Indonesia. Dengan menggunakan layanan kami, Anda
      menyetujui untuk terikat oleh ketentuan ini. Mohon baca dengan seksama
      sebelum menggunakan layanan kami.
    </>
  ),
  content: [
    {
      title: "Pengumpulan Informasi",
      description: [
        "Informasi Pribadi: Kami dapat mengumpulkan informasi identitas pribadi (seperti nama dan alamat email Anda, nomor ponsel, lembaga asal) ketika Anda secara sukarela memberikannya kepada kami melalui formulir di Situs Web dan aplikasi seluler. Informasi Non-Pribadi: Kami dapat secara otomatis mengumpulkan informasi non-pribadi, seperti alamat IP, jenis browser, dan informasi perangkat Anda, untuk meningkatkan fungsionalitas dan pengalaman pengguna Situs Web.",
      ],
    },
    {
      title: "Berbagi Data",
      description: [
        "Kami tidak menjual, memperdagangkan, atau mentransfer informasi pribadi Anda kepada pihak ketiga tanpa persetujuan eksplisit Anda. Namun, kami dapat membagikan informasi non-pribadi untuk tujuan analitis atau pemasaran.",
      ],
    },
    {
      title: "Penggunaan Layanan",
      description: [
        "Anda diizinkan untuk menggunakan layanan Innocent untuk keperluan pribadi , sesuai dengan ketentuan hukum yang berlaku dan Ketentuan Layanan ini.",
        "Anda tidak diperkenankan untuk menggunakan layanan kami untuk tujuan ilegal, melanggar hak orang lain, atau mengganggu operasi layanan kami.",
      ],
    },
    {
      title: "Hak Cipta dan Kepemilikan",
      description: [
        "Konten dan materi yang disediakan dalam layanan Innocent dilindungi oleh hak cipta dan kekayaan intelektual lainnya. Anda tidak diperkenankan untuk menggunakan, menyalin, atau mendistribusikan konten tersebut tanpa izin tertulis dari Telkom Indonesia.",
      ],
    },
    {
      title: "Kontak Kami",
      description: [
        "Jika Anda memiliki pertanyaan atau komentar tentang Kebijakan Privasi atau Ketentuan Layanan kami, jangan ragu untuk menghubungi tim dukungan kami.",
      ],
    },
  ],
};

const PrivacyPage = () => {
  return (
    <>
      <header className="flex justify-center items-center gap-6 md:py-3">
        <Image
          src={"/img/logo-telkom.png"}
          alt="TelkomIndonesia"
          width={80}
          height={80}
          className="h-max"
        />
        <Image
          src={"/img/logo-telkominnocent.png"}
          alt="TelkomInnocent"
          width={150}
          height={50}
          className="h-max"
        />
      </header>
      <main className="max-w-7xl mx-auto max-md:mx-2 max-xl:mx-4 bg-accent mb-10 lg:mb-20 p-10 lg:px-20 rounded-3xl">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 lg:mb-4">
          {privacy.title}
        </h1>
        <p className="text-sm md:text-base mb-2 lg:mb-3">
          {privacy.description}
        </p>
        <article>
          <ol className="list-decimal list-inside flex flex-col gap-2 lg:gap-3">
            {privacy.content.map((c, index) => (
              <li key={index} className="font-semibold mb-1">
                {c.title}
                <ul className="list-disc list-inside pl-4 font-normal">
                  {c.description.map((d, i) => (
                    <li key={i} className="text-sm md:text-base">
                      {d}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </article>
      </main>
      <Footer />
    </>
  );
};

export default PrivacyPage;
