import "cypress-file-upload";

const pl_data = {
  baseUrl: "https://www.24mx.pl",
  lang: "pl",
  productTitle: "Kask Cross Raven Airborne Stealth Czarny",

  customerSupport: {
    title: "Biuro obsługi klienta",
    menuOther: "Inne",
    linkToSupportTitle: "Biuro obsługi klienta",
    linkToCustomerFormTitle:
      "Jeśli nie znalazłeś odpowiedzi na swoje pytanie proszę skontaktuj się z nami klikając tutaj!",
    successMessage: "Zlecenie zostało wysłane",
  },
  menuMotocrossClothing: {
    motocrossClothing: " Odzież MX ",
    helmets: " Kaski ",
    trialBoots: " Buty MX i Trial ",
    motocrossGoggles: " Gogle MX ",
    bags: " Torby ",
    motocrossProtection: " Ochraniacze MX ",
    childrenMotocrossGear: " Wyposażenie Dziecięce MX ",
    layersBalaclavas: " Bielizna Termiczna i Kominiarki ",
    hydrationSystems: " Systemy Hydracyjne ",
    supermotoClothing: " Odzież Supermoto ",
  },
};
const ie_data = {
  baseUrl: "https://www.24mx.ie",
  lang: "en-ie",
  productTitle: "Airoh Wraap Color MX Helmet Black",

  customerSupport: {
    title: "Customer Service",
    menuOther: "Other",
    linkToSupportTitle: "Contact customer service",
    linkToCustomerFormTitle: "Otherwise, please contact us by clicking here!",
    successMessage: "Your request was successfully submitted",
  },

  menuMotocrossClothing: {
    motocrossClothing: " Motocross Clothing ",
    helmets: " Helmets ",
    trialBoots: " MX & Trial Boots ",
    motocrossGoggles: " Motocross Goggles ",
    bags: " Bags ",
    motocrossProtection: " Motocross Protection ",
    childrenMotocrossGear: " Children's Motocross Gear ",
    layersBalaclavas: " Base Layers & Balaclavas ",
    hydrationSystems: " Hydration Systems ",
    supermotoClothing: " Supermoto Clothing ",
  },
};
const dataArr = [pl_data, ie_data];

const fixtureFile = "filetest.png";
const testUser = {
  email: "testmail1298@gmail.com",
  name: "Matilda",
  orderNumber: 324234,
  subject: "subject text",
  description: "description text",
};

dataArr.forEach((data) => {
  describe(`${data.baseUrl} test suite`, () => {
    beforeEach(() => {
      cy.viewport(1920, 1080);
      cy.visit(data.baseUrl);
      cy.get(".m-button").click();
      cy.get(".NostoOverlayClose").click();
    });

    it("allows to search by product name", () => {
      cy.get("#search-desktop").type(`${data.productTitle}{enter}`);
      cy.get(".qa-pl-items-grid").contains(data.productTitle);
    });

    it("allows to add product to basket", () => {
      cy.get('input[type="search"]')
        .first()
        .type(`${data.productTitle}{enter}`);
      cy.get(".m-product-card-img__fade-in--show").click();
      cy.get(".m-select__display").click();
      cy.get(".a-select-item:nth-child(1) .a-product-variation__title").click();
      cy.get(".m-button--purchase").click();
      cy.wait(10000);
      cy.get(".qa-proceed-to-checkout").click();
      cy.contains(data.productTitle);
    });

    it("allows to configure product to filter products", () => {
      cy.get(
        ".qa-desktop-header-fmb-toggle > .drawer-indicator-headline"
      ).click();

      cy.get(".gtm_fmb-select-brand .a-select__display-placeholder").click();
      cy.get(".m-select--active .a-select-item:nth-child(1)").click();

      cy.get(".gtm_fmb-select-year .a-select__display-placeholder").click();
      cy.get(".m-select--active .a-select-item:nth-child(1)").click();

      cy.get(".gtm_fmb-select-model .a-select__display-placeholder").click();
      cy.get(".m-select--active .a-select-item:nth-child(1)").click();

      cy.get(".qa-fmb-model-text").contains(" Beta RR 125 2T 2021 ");
    });

    it("allows to submit a request form to the customer support", () => {
      cy.get(".qa-header-customer-service").click();
      cy.get(".blocks-list").contains(data.customerSupport.menuOther).click();
      cy.contains(data.customerSupport.linkToSupportTitle).click();
      cy.contains(data.customerSupport.linkToCustomerFormTitle).click();
      cy.url().should(
        "contains",
        `https://help.24mx.com/hc/${data.lang}/requests/new`
      );
      cy.get("#request_anonymous_requester_email").click().type(testUser.email);
      cy.get("#request_custom_fields_360000037189").type(testUser.name);
      cy.get(".nesty-input").click();
      cy.get("#yes_the_ticket_concerns_an_existing_order").click();
      cy.get("#request_custom_fields_360014307479")
        .click()
        .type(testUser.orderNumber);
      cy.get("#request_subject").click().type(testUser.subject);
      cy.get("#request_description").click().type(testUser.description);
      cy.get("#request-attachments").attachFile(fixtureFile);
      cy.get(".upload-link").contains("filetest.png");
      cy.get('input[type="submit"]').click();
      cy.contains(data.customerSupport.successMessage).click();
    });

    it("Motocross Gear contains ordered menu items", () => {
      cy.get(".m-navigation-item:nth-child(1) a").click();
      cy.get(".m-navigation-sub-item:nth-child(1) > a").contains(
        data.menuMotocrossClothing.motocrossClothing
      );
      cy.get(
        ".m-navigation-sub-item:nth-child(2) .m-navigation-sub-item__cat-name"
      ).contains(data.menuMotocrossClothing.helmets);
      cy.get(
        ".m-navigation-sub-item:nth-child(3) .m-navigation-sub-item__cat-name"
      ).contains(data.menuMotocrossClothing.trialBoots);
      cy.get(
        ".m-navigation-sub-item:nth-child(4) .m-navigation-sub-item__cat-name"
      ).contains(data.menuMotocrossClothing.motocrossGoggles);
      cy.get(
        ".m-navigation-sub-item:nth-child(5) .m-navigation-sub-item__cat-name"
      ).contains(data.menuMotocrossClothing.bags);
      cy.get(
        ".m-navigation-sub-item:nth-child(6) .m-navigation-sub-item__cat-name"
      ).contains(data.menuMotocrossClothing.motocrossProtection);
      cy.get(
        ".m-navigation-sub-item:nth-child(7) .m-navigation-sub-item__cat-name"
      ).contains(data.menuMotocrossClothing.childrenMotocrossGear);
      cy.get(
        ".m-navigation-sub-item:nth-child(8) .m-navigation-sub-item__cat-name"
      ).contains(data.menuMotocrossClothing.layersBalaclavas);
      cy.get(
        ".m-navigation-sub-item:nth-child(9) .m-navigation-sub-item__cat-name"
      ).contains(data.menuMotocrossClothing.hydrationSystems);
      cy.get(
        ".m-navigation-sub-item:nth-child(10) .m-navigation-sub-item__cat-name"
      ).contains(data.menuMotocrossClothing.supermotoClothing);
    });
  });
});
