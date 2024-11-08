import Image from "next/image";
import swiftShipLogo from "@/app/public/logo1.png";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href={"/"}>
      <div className="flex items-center space-x-2">
        <Image
          src={swiftShipLogo}
          height={100}
          priority
          alt="Swift Ship logo"
          className="m-0 h-36 w-fit object-cover p-0"
        />
      </div>
    </Link>
  );
}
