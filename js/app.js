// import {renderArticles, renderFullArticle, renderFullArticles} from './render'
import fetchArticles from './fetch'
import { renderArticle, renderFullArticleMashable, renderFullArticleReddit, renderFullArticleDigg, newsSourceMashable, newsSourceReddit, newsSourceDigg } from './render'

let state = {
  articles: [],
  selectedSource: "Digg"
}

function showLoading(){
  let popUp = document.querySelector('#popUp')
  // Remove the loader class
  popUp.classList.remove('hidden')
  // Remove loader
  popUp.classList.add('loader')
}

function hideLoading(){
  let popUp = document.querySelector('#popUp')
  // Remove the loader class
  popUp.classList.add('hidden')
  // Remove loader
  popUp.classList.remove('loader')
}
//display loader on document load

let digDefault = event => {
  showLoading()

  fetchArticles(state.selectedSource)
  .then(articles => {
    console.log(articles)
    state.articles = articles
  })

  .then(() => {
    let renderedArticles = []
    state.articles.forEach((article, i) => {
      let rendered = renderArticle(state.selectedSource, article, i)
      renderedArticles.push(rendered);
    })

    hideLoading()

    document.querySelector('#main').innerHTML = renderedArticles.join('\n')
  })

  if (state.selectedSource === "Mashable"){
    document.querySelector('nav span').innerHTML = newsSourceMashable()
  } else if (state.selectedSource === "Reddit"){
    document.querySelector('nav span').innerHTML = newsSourceReddit()
  } else if (state.selectedSource === "Digg"){
    document.querySelector('nav span').innerHTML = newsSourceDigg()
  }
}

// make event for Digg being default article
document.addEventListener("DOMContentLoaded", digDefault)

  document.querySelector('body').addEventListener('click', event => {
    if (event.target.matches('.home')){
      event.preventDefault
      digDefault()
    }
    })


// When a user clicks on the correct title
document.querySelector('body').addEventListener('click', event => {

  let popUp = document.querySelector('#popUp')

  if (event.target.matches('h3')){
    // Remove the loader class
    popUp.classList.toggle('hidden')
    // Remove loader
    popUp.classList.remove('loader')
    // Insert correct article

    let index = event.target.dataset.id

    let indexNumber = Number(index)
    let article = state.articles[index]
    console.log(state.articles, index, event.target.dataset)
    console.log(article)

    if (state.selectedSource === "Mashable"){
      console.log("Mashable Full Article")
      document.querySelector('#popUp .container').innerHTML = renderFullArticleMashable(article)
    } else if (state.selectedSource === "Reddit"){
      console.log("Reddit Full Article")
      document.querySelector('#popUp .container').innerHTML = renderFullArticleReddit(article)
    } else if (state.selectedSource === "Digg"){
      console.log("Digg Full Article")
      document.querySelector('#popUp .container').innerHTML = renderFullArticleDigg(article)
    }
  }

  if (event.target.matches('.closePopUp')){
    popUp.classList.toggle('hidden')
  }
// When a user selects something from the dropdown
  if (event.target.matches('.navitem')) {
    // Save what they have selected in the state
    state.selectedSource =  event.target.innerHTML

    showLoading()

    // Fetch articles from the new source
    fetchArticles(state.selectedSource)
    .then(articles => {
      console.log(articles)
      state.articles = articles
    })

    .then(() => {
      let renderedArticles = []
      state.articles.forEach((article, i) => {
        let rendered = renderArticle(state.selectedSource, article, i)
        renderedArticles.push(rendered);
      })

      hideLoading()

      document.querySelector('#main').innerHTML = renderedArticles.join('\n')
    })
  }

    if (state.selectedSource === "Mashable"){
      document.querySelector('nav span').innerHTML = newsSourceMashable()
    } else if (state.selectedSource === "Reddit"){
      document.querySelector('nav span').innerHTML = newsSourceReddit()
    } else if (state.selectedSource === "Digg"){
      document.querySelector('nav span').innerHTML = newsSourceDigg()
    }

})
