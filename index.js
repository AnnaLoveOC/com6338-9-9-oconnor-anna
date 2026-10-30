const getPoemBtn = document.getElementById('get-poem')
const poemEl = document.getElementById('poem')
const poemURL = 'https://poetrydb.org/random,linecount/1;12/author,title,lines.json'

const getJSON = url => fetch(url).then(res => res.json())

const pipe = (...fns) => firstArg => fns.reduce((returnValue, fn) => fn(returnValue), firstArg)

const makeTag = tag => str => `<${tag}>${str}</${tag}>`

// complete this function
const makePoemHTML = (poemData) => {

  // Get the poem title and wrap it in an h2 tag
  const poemTitle = makeTag("h2")(poemData[0].title)

  // Get the author and wrap it in em and h3 tags
  const poemAuthor = makeTag("h3")(makeTag("em")(`by ${poemData[0].author}`))

  // Combine the title and author HTML
  const poemInfo = `${poemTitle}${poemAuthor}`

  // Join poem lines and separate them into stanzas
  const joinLines = lines => lines.join("\n")
  const splitStanzas = poemText => poemText.split("\n\n")
  const poemLines = poemData[0].lines

  // Use pipe to format the poem lines into an array of stanzas
  const formatStanzas = pipe(joinLines, splitStanzas)
  const stanzasArray = formatStanzas(poemLines)

  // Format each stanza with HTML line breaks and paragraph tags
  const stanzasHTML = stanzasArray.map(stanza => makeTag("p")(stanza.split("\n").join("<br>")))

  // Combine all stanza paragraphs into one HTML string
  const poemBody = stanzasHTML.join("")

  // Return the complete poem HTML
  return `${poemInfo}${poemBody}`

}


// attach a click event to #get-poem
getPoemBtn.onclick = async function() {
  // renders the HTML string returned by makePoemHTML to #poem
  poemEl.innerHTML = makePoemHTML(await getJSON(poemURL))
}