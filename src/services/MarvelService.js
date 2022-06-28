

class MarvelService {
  #apiBase = 'https://gateway.marvel.com:443/v1/public/'
  #apiKey = 'apikey=9251037cc14b33c76907ff1bbdc77d51'

  getResource = async (url) => {
    let response = await fetch(url)

    if (!response) throw new Error(`Could not fetch ${url}, status: ${response.status}`)

    return await response.json()
  }

  getAllCharacters = async () => {
    const res = await this.getResource(`${this.#apiBase}characters?limit=9&offset=210&${this.#apiKey}`)
    return res.data.results.map(this.#transformCharacter)
  }

  getOneCharacter = async (id) => {
    const res = await this.getResource(`${this.#apiBase}characters/${id}?${this.#apiKey}`)
    return this.#transformCharacter(res)
  }

  #transformCharacter = res => {
    const char = res.data.results[0]
    return {
      name: char.name,
      description: char.description,
      thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url
    }
  }

}

export default MarvelService