"use client";
import { getUserFromSession } from "@/lib/auth";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import SignOut from "./dashboard/SignOut";

type AuthenticatedUser = {
  id: string;
  email: string;
  name: string;
};

const Header = () => {
  // get user session
  const [user, setUser] = useState<AuthenticatedUser | undefined>(undefined);
  useEffect(() => {
    async function fetchUser() {
      const userData = await getUserFromSession();
      setUser(userData);
    }

    fetchUser();
  }, []);

  return (
    <header className="md:py-3">
      <div className="max-w-6xl mx-auto flex justify-between items-center max-md:px-2 max-[1152px]:px-4">
        <a href="https://www.telkom.co.id/">
          <Image
            src={"/img/logo-telkom.png"}
            alt="TelkomIndonesia"
            width={80}
            height={80}
          />
        </a>
        <Link href={"/"}>
          <Image
            src={"/img/logo-telkominnocent.png"}
            alt="TelkomInnocent"
            width={150}
            height={50}
          />
        </Link>
        {user ? (
          <div className="flex items-center gap-1 md:gap-2">
            <p className="font-semibold text-xs md:text-md lg:text-base">Hallo, {user.name.split(" ")[0]}</p>
            <SignOut />
          </div>
        ) : (
          <Link
            href={"/auth/signin"}
            className="bg-primary03 text-white h-max py-2 px-4 rounded-md font-semibold border-2 border-primary01 shadow-[0px_1px_0px_0px_#00000015] hover:bg-primary03/80 transition-all ease-in-out duration-150"
          >
            Masuk
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
