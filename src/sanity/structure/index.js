export const structure = (S) => {
  return S.list()
    .title("Adiveda Content")
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
        .title("Pages")
        .id("pages")
        .child(
          S.documentList()
            .title("Pages")
            .filter('_type == "page" && !(_id in ["homePage"])')
            .defaultOrdering([{ field: '_updatedAt', direction: 'desc' }])
        ),
      S.listItem()
        .title("Blogs")
        .id("blogs")
        .child(
          S.documentList()
            .title("Blogs")
            .filter('_type == "blogPost"')
            .defaultOrdering([{ field: '_updatedAt', direction: 'desc' }])
        )
    ])
}