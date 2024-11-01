import Image from "next/image";
import swiftShipLogo from "@/app/public/logo.svg";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href={"/"}>
      <div className="flex items-center space-x-2">
        <Image
          src={swiftShipLogo}
          height={50}
          width={50}
          priority
          alt="Swift Ship logo"
          className="m-0 h-24 p-0"
        />
        <p className="text-lg font-semibold tracking-tight text-primary lg:text-base">
          Swift Ship
        </p>
      </div>
    </Link>
  );
}
