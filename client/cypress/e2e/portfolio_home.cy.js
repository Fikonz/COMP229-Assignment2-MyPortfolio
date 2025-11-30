describe("Portfolio Home Page", () => {
  it("loads the hero section and displays key content", () => {
    // visits http://localhost:5173/ (set in baseUrl)
    cy.visit("/");

    // Main heading
    cy.contains("h1", "Welcome to My Portfolio").should("be.visible");

    // Subtitle
    cy.contains(
      "Software Engineering Student · Owner of"
    ).should("be.visible");

    // "View my story"
    cy.contains("a", "View my story")
      .should("be.visible")
      .and("have.attr", "href", "#about");

    // "Download Resume"
    cy.contains("a", "Download Resume")
      .should("be.visible")
      .and("have.attr", "href")
      .and("include", "Feyisayo_Habeeb_Resume");

    // Hero image
    cy.get('img[alt="Feyisayo Habeeb"]').should("be.visible");
  });
});
