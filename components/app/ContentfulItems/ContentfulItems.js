export default (props) => {
  const { items, classes } = props;
  return (
    <>
      {
        items && Array.isArray(items) &&
        items.map(
          contentFulEntry => {
            const item = contentFulEntry.fields
            console.log('item', item)
            return (
              <section className={classes.contentSection} key={item.key}>
                <h3 className={classes.contentSectionTitle}>{item.title}</h3>
                <p className={classes.contentSectionBody}>{item.body}</p>
              </section>
            )
          }
        )
      }
    </>
  )
}
