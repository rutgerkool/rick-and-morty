import { getCharacterById, getCharacters, getEpisode } from '../mocks/apiMocks'

describe('Home Page', () => {
  beforeEach(() => {
    getCharacters()
    getCharacterById()
    getEpisode()
    cy.visit('/')
  })

  it('should receive the correct data when fetching the characters for the initial page load', () => {
    cy.wait('@getCharacters').its('response.body').then(body => {
      expect(body.info.count).to.equal(826)
      expect(body.info.pages).to.equal(42)
      expect(body.results.length).to.equal(20)
    })
  })

  it('should call getCharacterByID and receive the correct data when clicking on a character card', () => {
    cy.wait('@getCharacters')

    cy.get('.character').eq(0).click()

    cy.wait('@getCharacterById').its('response.body').then(body => {
      expect(body.id).to.equal(1)
      expect(body.name).to.equal('Rick Sanchez')
      expect(body.species).to.equal('Human')
    })

    cy.wait('@getEpisode').its('response.body').then(body => {
      expect(body.id).to.equal(1)
      expect(body.episode).to.equal('S01E01')
      expect(body.name).to.equal('Pilot')
    })
  })
})

describe('Character Page', () => {
  it('should call getCharacterByID when the character page is accessed without going through the home page', () => {
    getCharacterById()
    getEpisode()

    cy.visit('/1')

    cy.wait('@getCharacterById').its('response.body').then(body => {
      expect(body.id).to.equal(1)
      expect(body.name).to.equal('Rick Sanchez')
      expect(body.species).to.equal('Human')
    })

    cy.wait('@getEpisode').its('response.body').then(body => {
      expect(body.id).to.equal(1)
      expect(body.episode).to.equal('S01E01')
      expect(body.name).to.equal('Pilot')
    })
  })
})
