import { FeaturesSection } from "@/sanity.types";

type Props = {
  section: FeaturesSection;
};

export default function featuresSection({ section }: Props) {
  const { heading, description, featureCards, buttons } = section;
  return (
    <>
      <h5>Hello Features</h5>
      <h2>{heading}</h2>
      <p>{description}</p>

      {featureCards?.length &&
        featureCards.map((featureCard) => (
          <div key={featureCard._key}>
            <h4>{featureCard.title}</h4>
          </div>
        ))}
    </>
  );
}
