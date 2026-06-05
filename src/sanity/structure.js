export const structure = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Home Page")
        .id("homePage")
        .child(
          S.document()
            .schemaType("homePage")
            .documentId("homePage")
        ),

      S.listItem()
        .title("Blog Page")
        .id("blogPage")
        .child(
          S.document()
            .schemaType("blogPage")
            .documentId("blogPage")
        ),

      S.listItem()
        .title("About Page")
        .id("aboutPage")
        .child(
          S.document()
            .schemaType("aboutPage")
            .documentId("aboutPage")
        ),
      S.listItem()
        .title("Contact Page")
        .id("contactPage")
        .child(
          S.document()
            .schemaType("contactPage")
            .documentId("contactPage")
        ),

      S.divider(),

      ...S.documentTypeListItems().filter(
        (item) =>
          !["homePage", "blogPage", "aboutPage", "contactPage"].includes(
            item.getId()
          )
      ),
    ]);