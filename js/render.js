//render loading

export function renderArticle (selectedSource,article,i) {
  let render = x => ``
  switch(selectedSource) {
    case 'Mashable':
      render = (article, i) =>  `

  <article class="article">
    <section class="featuredImage">
      <img src="${article.feature_image}" alt="" />
    </section>
    <section class="articleContent">
        <a href="#"><h3 data-id="${i}">${article.display_title}</h3></a>
        <h6>${article.channel_label}</h6>
    </section>
    <section class="impressions">
      ${article.shares.total}
    </section>
    <div class="clearfix"></div>
  </article>
      `
      break;

    case 'Reddit':
    render = (article, i) =>  `
  <article class="article">
  <section class="featuredImage">
  <img src="${article.data.thumbnail}" alt="" />
  </section>
  <section class="articleContent">
    <a href="#"><h3 data-id="${i}">${article.data.title}</h3></a>
    <h6>${article.data.subreddit}</h6>
  </section>
  <section class="impressions">
  ${article.data.ups}
  </section>
  <div class="clearfix"></div>
  </article>
  `
      break;

    case 'Digg':
    default:
    render = (article, i) =>  `
  <article class="article">
  <section class="featuredImage">
  <img src="${article.content.media.images[0].image_url || article.content.media.images[0].url}" alt="" />
  </section>
  <section class="articleContent">
    <a href="#"><h3 data-id="${i}">${article.content.title}</h3></a>
    <h6>${article.content_type}</h6>
  </section>
  <section class="impressions">
  ${article.diggs.count}
  </section>
  <div class="clearfix"></div>
  </article>
  `
  }

  return render(article, i)

}

export function renderFullArticleMashable (article) {
  return`
<h1>${article.display_title}</h1>
<p>
  ${article.content.plain}
</p>
<a href="${article.link}" class="popUpAction" target="_blank">Read more from source</a>
  `
}

export function renderFullArticleReddit (article) {
  console.log(article)
  return`
<h1>${article.data.title}</h1>

<img src="${article.data.url}" alt="" />

<a href="${article.data.permalink}" class="popUpAction" target="_blank">Read more from source</a>
  `
}

export function renderFullArticleDigg (article) {
  return`
<h1>${article.content.title}</h1>
<p>
  ${article.content.description}
</p>
<a href="${article.content.url}" class="popUpAction" target="_blank">Read more from source</a>
  `
}

export function newsSourceMashable (article) {
  return`
  <span>${"Mashable"}</span>
  `
}

export function newsSourceReddit (article) {
  return`
  <span>${"Reddit"}</span>
  `
}

export function newsSourceDigg (article) {
  return`
  <span>${"Digg"}</span>
  `
}
