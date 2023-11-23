import Image from "next/image";
import Link from "next/link";
import React from "react";
import logo from "@/public/disney.png";

const NavBar = ({ account }) => {
  return (
    <div className="navbar">
      <Link href="/">
        <Image src={logo} alt="Disney Logo" width={100} height={50} />
      </Link>
      <div className="account-info">
        <p>Welcome {account.username}</p>
        <div className="avatar__wrapper">
          <img
            className="avatar"
            src={account.avatar.url}
            alt={`${account.username}'s avatar`}
          />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
