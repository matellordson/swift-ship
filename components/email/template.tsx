import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
  Tailwind,
  Img,
} from "@react-email/components";
import * as React from "react";

export default function Email({ user }: { user: string }) {
  return (
    <Html>
      <Head />
      <Preview>Action Required</Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-white px-2 font-sans">
          <Container className="mx-auto my-[40px] max-w-[465px] rounded border border-solid border-[#eaeaea] p-[20px]">
            <Heading className="mx-0 my-[30px] p-0 text-center text-[24px] font-normal text-black">
              Action Required
            </Heading>
            <Text className="text-[14px] leading-[24px] text-black">
              Hello Admin,
            </Text>
            <Text className="text-[14px] leading-[24px] text-black">
              You have received a new message. Kindly click on the link below to
              view the details:
            </Text>
            <Link
              href={`https://swift-ship-three.vercel.app/admin-support/${user}`}
              className=""
            >
              view message
            </Link>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
