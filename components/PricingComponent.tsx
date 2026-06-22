import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check, Info, X } from "lucide-react";
import TrackLink from "@/components/TrackLink";

interface PricingFeature {
  text: string;
  included: boolean;
  hasInfo?: boolean;
}

interface PricingTier {
  name: string;
  subtitle?: string;
  price?: string;
  period?: string;
  description: string;
  badge?: { text: string };
  features: PricingFeature[];
  buttonText: string;
  buttonHref: string;
  highlighted?: boolean;
  footerText?: string;
  footerLink?: string;
  footerHref?: string;
}

interface PricingComponentProps {
  productName: string;
  title?: string;
  subtitle?: string;
  tiers: PricingTier[];
  className?: string;
}

const PricingComponent: React.FC<PricingComponentProps> = ({
  productName,
  title = "Pricing for AI Chat & FAQ Automation",
  subtitle = "Plans built for every Shopify store — automate support, reduce tickets, and reply 24/7.",
  tiers,
  className,
}) => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: productName,
    description: subtitle,
    offers: tiers.map((tier) => ({
      "@type": "Offer",
      name: tier.name,
      price: tier.price ? tier.price.replace(/[^0-9.]/g, "") || "0" : "0",
      priceCurrency: "USD",
      description: tier.description,
      url: tier.buttonHref,
    })),
  };

  return (
    <section
      id="pricing"
      aria-labelledby="pricing-heading"
      className={cn("w-full bg-background", className)}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-20">
        <div className="text-center mb-10 sm:mb-12 lg:mb-16">
          <h2
            id="pricing-heading"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-foreground mb-4 sm:mb-6"
          >
            {title}
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground font-light px-2 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-6">
          {tiers.map((tier, index) => (
            <Card
              key={index}
              itemScope
              itemType="https://schema.org/Offer"
              aria-label={`${tier.name} plan${tier.price ? `, ${tier.price}${tier.period || ""}` : ""}`}
              className={cn(
                "relative flex flex-col h-full transition-all duration-300",
                tier.highlighted ? "border-primary/50 shadow-2xl z-10" : "bg-card/60 hover:bg-card",
              )}
            >
              {tier.badge && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="bg-primary text-primary-foreground text-[10px] sm:text-xs font-bold px-3 sm:px-4 py-1 sm:py-1.5 rounded-full whitespace-nowrap">
                    {tier.badge.text}
                  </div>
                </div>
              )}

              <CardHeader className="text-center pb-5 sm:pb-6 lg:pb-8 pt-9 sm:pt-10 lg:pt-12 px-4 sm:px-5 lg:px-6">
                <div className="text-[10px] sm:text-xs font-medium text-muted-foreground uppercase tracking-[0.15em] sm:tracking-[0.2em] mb-3 sm:mb-4">
                  {tier.subtitle}
                </div>
                <CardTitle itemProp="name" className="mb-4 sm:mb-5 lg:mb-6">
                  {tier.price ? (
                    <span className="flex items-baseline justify-center flex-wrap">
                      <span
                        itemProp="price"
                        className="text-3xl sm:text-4xl font-light text-foreground"
                      >
                        {tier.price}
                      </span>
                      {tier.period && (
                        <span className="text-sm sm:text-base font-light text-muted-foreground ml-1.5 sm:ml-2">
                          {tier.period}
                        </span>
                      )}
                      <meta itemProp="priceCurrency" content="USD" />
                    </span>
                  ) : (
                    <span className="text-3xl sm:text-4xl font-light text-foreground">
                      {tier.name}
                    </span>
                  )}
                </CardTitle>
                <CardDescription
                  itemProp="description"
                  className="text-sm font-light leading-relaxed px-1 sm:px-2"
                >
                  {tier.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="flex-1 px-4 sm:px-5 lg:px-6">
                <div className="mb-6 sm:mb-8">
                  <h4 className="text-[10px] sm:text-xs font-medium text-muted-foreground uppercase tracking-[0.15em] sm:tracking-[0.2em] mb-4 sm:mb-6">
                    Plan highlights
                  </h4>
                  <ul className="space-y-3 sm:space-y-4" aria-label={`${tier.name} plan features`}>
                    {tier.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-2 sm:gap-3">
                        {feature.included ? (
                          <Check
                            className="h-4 w-4 text-primary flex-shrink-0 mt-0.5"
                            aria-hidden="true"
                          />
                        ) : (
                          <X
                            className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5"
                            aria-hidden="true"
                          />
                        )}
                        <span className="text-foreground text-sm font-light flex items-center gap-1.5 sm:gap-2 leading-relaxed">
                          <span className="sr-only">
                            {feature.included ? "Included: " : "Not included: "}
                          </span>
                          {feature.text}
                          {feature.hasInfo && (
                            <Info
                              className="h-3 w-3 text-muted-foreground flex-shrink-0"
                              aria-hidden="true"
                            />
                          )}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>

              <CardFooter className="px-4 sm:px-5 lg:px-6 pb-6 sm:pb-8">
                <div className="w-full">
                  <Button
                    asChild
                    className={cn(
                      "w-full py-3 sm:py-4 text-sm font-medium",
                      tier.highlighted && "bg-primary text-primary-foreground hover:bg-primary/80",
                    )}
                    variant={tier.highlighted ? "primary" : "secondary"}
                  >
                    <TrackLink
                      href={tier.buttonHref}
                      eventName="click_install_button"
                      aria-label={`${tier.buttonText} — ${tier.name} plan`}
                    >
                      {tier.buttonText}
                    </TrackLink>
                  </Button>
                  {tier.footerText && (
                    <div className="text-center mt-4 sm:mt-6">
                      <p className="text-xs text-muted-foreground font-light">
                        {tier.footerText}{" "}
                        {tier.footerLink &&
                          (tier.footerHref ? (
                            <a
                              href={tier.footerHref}
                              className="text-primary hover:text-primary/80 underline transition-colors"
                            >
                              {tier.footerLink}
                            </a>
                          ) : (
                            <button className="text-primary hover:text-primary/80 underline transition-colors">
                              {tier.footerLink}
                            </button>
                          ))}
                      </p>
                    </div>
                  )}
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingComponent;
