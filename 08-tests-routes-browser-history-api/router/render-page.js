export default async function(path, match) {
  const { default: Page } = await import(`./10-webpack-part-1/pages/`);
  const page = new Page(match);

  const contentNode = document.querySelector('#content');
  contentNode.innerHTML = '';
  contentNode.append(page.element);

  return page;
}
