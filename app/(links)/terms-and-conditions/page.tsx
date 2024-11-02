import Logo from "@/components/logo";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function Component() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <nav className="mb-14 border-b bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Logo />
              </div>
            </div>
          </div>
        </div>
      </nav>
      <header className="">
        <div className="mx-auto max-w-7xl px-4 pt-4 text-center sm:px-6 lg:px-8">
          <Badge className="mb-2">Terms and Conditions</Badge>
        </div>
      </header>

      <main className="flex-grow">
        <div className="mx-auto max-w-7xl lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="mb-5 border-b pb-5">
              <h2 className="text-lg font-medium text-foreground">
                1. Acceptance of Terms
              </h2>
              <p className="mt-2 text-sm leading-7 text-muted-foreground [&:not(:first-child)]:mt-6">
                By engaging in the use of Swift Ship's services, you acknowledge
                that you have read, understood, and agreed to abide by these
                Terms. Swift Ship reserves the right to modify, update, or
                revise these Terms at any time. All changes will be posted on
                our website, and the revised Terms will be effective immediately
                upon posting. It is your responsibility to review the Terms
                regularly to stay informed of any changes.
              </p>
            </div>

            <div className="mb-5 border-b pb-5">
              <h2 className="text-lg font-medium text-foreground">
                2. Services Provided
              </h2>
              <p className="mt-2 text-sm leading-7 text-muted-foreground [&:not(:first-child)]:mt-6">
                Swift Ship offers package shipping services that include the
                transportation, handling, and delivery of parcels to
                destinations within [specified regions/countries]. The specific
                details, pricing, and shipping methods are outlined on our
                website or as agreed upon between Swift Ship and the Customer at
                the time of the service booking.
              </p>
            </div>

            <div className="mb-5 border-b pb-5">
              <h2 className="text-lg font-medium text-foreground">
                3. Customer Responsibilities
              </h2>
              <p className="mt-2 text-sm leading-7 text-muted-foreground [&:not(:first-child)]:mt-6">
                <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
                  <li>
                    Provide accurate, complete, and up-to-date information for
                    all shipments, including recipient details, shipping
                    addresses, and package contents.
                  </li>
                  <li>
                    Ensure that your packages comply with all applicable laws,
                    regulations, and restrictions. Swift Ship is not responsible
                    for packages that contain prohibited, illegal, or hazardous
                    items.
                  </li>
                  <li>
                    Pay all fees associated with the shipment, including
                    shipping costs, customs duties, taxes, and any other
                    applicable charges.
                  </li>
                </ul>
              </p>
            </div>

            <div className="mb-5 border-b pb-5">
              <h2 className="text-lg font-medium text-foreground">
                4. Prohibited Items
              </h2>
              <p className="mt-2 text-sm leading-7 text-muted-foreground [&:not(:first-child)]:mt-6">
                Swift Ship does not accept for shipment any prohibited,
                restricted, or hazardous items, including but not limited to:
              </p>
              <ul className="my-6 ml-6 list-disc text-sm text-muted-foreground [&>li]:mt-2">
                <li>Illegal or controlled substances</li>
                <li>Weapons, explosives, or ammunition</li>
                <li>Perishable goods (unless agreed upon in writing)</li>
                <li>
                  Dangerous chemicals or items deemed hazardous to health and
                  safety
                </li>
              </ul>
            </div>

            <div className="mb-5 border-b pb-5">
              <h2 className="text-lg font-medium text-foreground">
                5. Shipping and Delivery
              </h2>
              <p className="mt-2 text-sm leading-7 text-muted-foreground [&:not(:first-child)]:mt-6">
                While Swift Ship strives to provide accurate delivery times and
                services, delivery estimates are not guaranteed, and delays may
                occur due to factors outside of Swift Ship's control, including
                weather, customs clearance, or other unforeseen circumstances.
                Swift Ship is not liable for any delay, damage, or loss that
                occurs during transit unless specified under applicable law or
                insurance coverage.
              </p>
            </div>
            <div className="mb-5 border-b pb-5">
              <h2 className="text-lg font-medium text-foreground">
                6. Payment Terms
              </h2>
              <p className="mt-2 text-sm leading-7 text-muted-foreground [&:not(:first-child)]:mt-6">
                You agree to pay for all shipping services in accordance with
                the pricing structure provided by Swift Ship. Payments may be
                made as specified by Swift Ship. Late payments or disputes may
                result in a delay or suspension of services until the
                outstanding balance is cleared.
              </p>
            </div>
            <div className="mb-5 border-b pb-5">
              <h2 className="text-lg font-medium text-foreground">
                7. Limitation of Liability
              </h2>
              <p className="mt-2 text-sm leading-7 text-muted-foreground [&:not(:first-child)]:mt-6">
                Swift Ship will not be held liable for any indirect, incidental,
                or consequential damages arising from the use of its services.
                In the event of loss or damage to a shipment, Swift Ship's
                liability will be limited to the lesser of the actual value of
                the goods, the cost of shipping, or the maximum liability
                allowed by law. Customers are encouraged to obtain insurance for
                valuable or fragile items.
              </p>
            </div>
            <div className="mb-5 border-b pb-5">
              <h2 className="text-lg font-medium text-foreground">
                8. Your Responsibility for Damages
              </h2>
              <p className="mt-2 text-sm leading-7 text-muted-foreground [&:not(:first-child)]:mt-6">
                You agree to protect and cover Swift Ship, its employees, and
                partners from any problems or costs that comes up. This includes
                if you break any of these Terms, if something goes wrong with
                your shipment, or if there are any legal issues related to your
                package.
              </p>
            </div>
            <div className="mb-5 border-b pb-5">
              <h2 className="text-lg font-medium text-foreground">
                9. Privacy and Data Protection
              </h2>
              <p className="mt-2 text-sm leading-7 text-muted-foreground [&:not(:first-child)]:mt-6">
                We reserve the right to terminate or suspend access to our Swift
                Ship collects and processes your personal data in accordance
                with its [Privacy Policy]. By using our services, you consent to
                the collection, storage, and processing of your personal data as
                described in the Privacy Policy.
              </p>
            </div>
            <div className="mb-5 border-b pb-5">
              <h2 className="text-lg font-medium text-foreground">
                10. Force Majeure
              </h2>
              <p className="mt-2 text-sm leading-7 text-muted-foreground [&:not(:first-child)]:mt-6">
                Swift Ship shall not be held liable for any failure or delay in
                the performance of its obligations under these Terms if such
                failure or delay is caused by events beyond its reasonable
                control, including but not limited to acts of God, strikes,
                lockouts, natural disasters, or governmental actions.
              </p>
            </div>
            <div className="pb-5">
              <h2 className="text-lg font-medium text-foreground">
                11. Contact Information
              </h2>
              <p className="mt-2 text-sm leading-7 text-muted-foreground [&:not(:first-child)]:mt-6">
                <span className="font-bold">Swift Ship Services</span> <br />{" "}
                swiftshipservices@outlook.com <br />
                +44 070 7540 0992 <br />7 Scarcroft Road, Porthcurno, United
                Kingdom, TR19 1YA
              </p>
            </div>
          </div>
        </div>
      </main>
      <footer className="border-t">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} SwiftShip. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
