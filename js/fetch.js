export default function fetchArticles (selectedSource) {
  let url = ""
  let parse = x => x

  console.log(selectedSource)

  switch(selectedSource) {
    case 'Mashable':
      url = "http://mashable.com/stories.json"
      parse = data => data.hot
      break;

    case 'Reddit':
      url = "https://www.reddit.com/top.json"
      parse = data => data.data.children
      break;

    case 'Digg':
    default:
      url = "http://digg.com/api/news/popular.json"
      parse = data => data.data.feed
  }

  return fetch(`https://accesscontrolalloworiginall.herokuapp.com/${url}`)
    .then(res => res.json())
    .then(parse)
}
