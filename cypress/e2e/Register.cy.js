
describe('Register', () => {
  describe('error messages', () => {
    it('ad', () => {
      cy.visit('http://localhost:5173/')
      cy.get('[data-cy="ad"]').type("be")
      cy.contains('adınızı en az 3 karakter giriniz')
    })
    it('soyad', () => {
      cy.visit('http://localhost:5173/')
      cy.get('[data-cy="soyad"]').type("şe")
      cy.contains('soyadınızı en az 3 karakter giriniz')
    })
    it('email', () => {
      cy.visit('http://localhost:5173/')
      cy.get('[data-cy="email"]').type("berksener")
      cy.contains('Geçerli bir email giriniz')
    })
    it('password', () => {
      cy.visit('http://localhost:5173/')
      cy.get('[data-cy="password"]').type("asadsa")
      cy.contains('en az 8 karakter, büyük harf, küçük harf, sembol ve rakam içermelidir')
    })
    it('button', () => {
      cy.visit('http://localhost:5173/')
      cy.get('[data-cy="button"]').should("be.disabled")
    })
  })
  describe('form inputlar validatemi', () => {
    it('button doğru çalışıyor', () => {
      cy.visit('http://localhost:5173/')
      cy.get('[data-cy="ad"]').type("berk")
      cy.get('[data-cy="soyad"]').type("şener")
      cy.get('[data-cy="email"]').type("berksener@gmail.com")
      cy.get('[data-cy="password"]').type("adsadadaB12*")
      cy.get('[data-cy="button"]').should("be.enabled")
      
    })
    
  })
  describe('id ekrana geliyor mu', () => {
    it('button doğru çalışıyor', () => {
      cy.visit('http://localhost:5173/')
      cy.get('[data-cy="ad"]').type("berk")
      cy.get('[data-cy="soyad"]').type("şener")
      cy.get('[data-cy="email"]').type("berksener@gmail.com")
      cy.get('[data-cy="password"]').type("adsadadaB12*")
      cy.get('[data-cy="button"]').click()
      cy.get('[data-cy="result_id"]').should("be.visible")
      
      
    })
    
  })
})

