import React from "react";
import Image from "next/image";

const Card = ({ thumbnail }) => {
  return <Image className="card" src={thumbnail.url} alt={thumbnail} fill />;
};

export default Card;
