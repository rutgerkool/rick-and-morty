export const getCharacterById = () => {
  cy.intercept('GET', /\/character\/\d$/).as('getCharacterById')
}

export const getCharacters = () => {
  cy.intercept('GET', /\/character\/\?page\=\d$/).as('getCharacters')
}

export const getEpisode = () => {
  cy.intercept('GET', /\/episode\/\d$/).as('getEpisode')
}
