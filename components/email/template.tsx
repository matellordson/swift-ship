import {
  Body,
  Button,
  Container,
  Column,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
  Tailwind,
} from "@react-email/components";
import * as React from "react";

export default function Email() {
  return (
    <Html>
      <Head />
      <Preview>New message</Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-white px-2 font-sans">
          <Container className="mx-auto my-[40px] max-w-[465px] rounded border border-solid border-[#eaeaea] p-[20px]">
            <Section className="mt-[32px]">
              {/* <Img
                src={`${baseUrl}/static/vercel-logo.png`}
                width="40"
                height="37"
                alt="Vercel"
                className="mx-auto my-0"
              /> */}
            </Section>
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
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
