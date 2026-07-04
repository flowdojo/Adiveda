# Process to create a component - 

### Consider a section component like called Features - 

``` /src/sanity/schemaTypes/pageSections/features.ts```

``` export default defineType({
  name: "featuresSection",
  title: "Features",
  type: "object",
  icon: StackCompactIcon,

  fields: [
    defineField({
      name: "heading",
      title: "heading",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "description",
      type: "string",
    }),
    defineField({
      name: "buttons",
      title: "Buttons",
      type: "array",
      of: [{ type: "button" }],
    }),

    defineField({
      name : 'featureCards',
      type : 'array',
      of : [{ type : 'featureCard' }]
    })
    
  ],
});
```

#####  The "name" of each of the fields in the above schema are of utmost important in writing its corresponding sanity groq query.

##### Since, it is a section type component, import the above component into the index.js file i.e. ``` /src/sanity/schemaTypes/pageSections/index.js``` and add it to ``` pageSectionsObjects``` array so it becomes available in the dynamic page builder.

##### Also, import it in ``` /src/sanity/schemaTypes/index.js``` file so, sanity knows about existence of this file.


##### For the field featureCards, we created file called ```featureCard.ts``` inside ```src/sanity/schemaTypes/objects``` directory. Then imported it in the ``` /src/sanity/schemaTypes/index.js``` so, sanity knows about existence of this file. But we did not import in the ```pageSections/index.js``` because it is not a standalone section.


### Writing the groq query for features section:

#### 1. Create a variable called ```featuresCardFragment``` in the ```src/sanity/queries/fragments/fragments.ts``` file

```
export const featuresSectionFragment = /* groq */ `
  _type,
  heading,
  description,
  ${buttonFragment},
  featureCards[] {
    _key,
    title,
    description,
    "image" : image -> image {
      ${imageFragment}
    },
  }
`;
```

In the groq query, we list out all the fields that we want for the featureSection. These fields should be exactly same as the ```name``` properties that we wrote while defining the schema in ```/src/sanity/schemaTypes/pageSections/features.ts```

Since, featureCards is an array (repeatable type), we wrote it in that way like featureCards[] and mentioned the fields that we want for each featureCard. 

For the image field, since it is a reference to some other collection, the way to write the query is. First, we write the field name inside double quotes "" that we want to have in output result while making the fetch query.
Here we called it "images". but we could have called it "cardImage"
 as well. Next, after : we write the name of the actual field to which it is referencing in the schema. In the  ```featureCard.ts```, the image field has the name as 'image'. So, we wrote 'image' after the semicolon. like ```"image" : image```.

Next, we use -> arrow to choose a the target field of the reference. In the ```imageAsset.js```, the target field is being called as 'image', hence, we wrote it is 'image' again. and finally, write all the fields that we want for that image. But Since,We have a predefined variable for the fields we usually need for an image, we use that ```imageFragment``` variable. 

Finally, use this ```featuresSectionFragment``` variable inside the ```pageBuilderFragment``` variable in the same file to generate the typescript types for this featuresSectionFragment. we write the ```_type == "featuresSection"```, since, in the features.ts schema file, we wrote "featuresSection" in the name field. Then, we mention the actual groq query fragment for that type as ```featuresSectionFragment```. Therefore, we have : 

```
export const pageBuilderFragment = /* groq */ `
  pageSections[]{
    ...,
    _key,
    _type,
    _type == 'hero' => {${heroSectionFragment}},
    _type == 'cta' => {${ctaSectionFragment}},
    _type == 'featuresSection' => {${featuresSectionFrament}}
  },
`;
```

##### At this point run this command in the terminal - ```yarn sanity:schema``` or ```npm run sanity:schema```

This generates the typescript types for our newly created schema which will become available in our frontend component we create next -

## The Frontend Component

Create ```featuresSection.tsx``` file in ```/src/components/sections``` directory.


Inside this file, create the component and import the typescript type we generated using the previous npm command. The type is present in the ```types.ts``` file in the ```src/components/sections``` folder. 
It tells us all the fields that our sanity component will return:

```
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

```


Finally, import this featuresSection component in the ```page-section.tsx``` file present in ```/src/components/section``` folder and add it to the SECTION_COMPONENTS array variable.

```
const SECTION_COMPONENTS: Record<PageSectionstype, ElementType> = {
  hero: Hero,
  cta: CTA,
  featuresSection : featuresSection
} as const;
```
