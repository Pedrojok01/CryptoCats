/* MENU TABS DISPLAY:
 *********************/

// Load -Home- tab
function showHomeTab() {
  const tabToDisplay = document.querySelector("#nav-home");
  $("#nav-my-cats, #nav-show, #nav-breed, #nav-sell, #nav-marketplace, #nav-factory").removeClass("active show");
  const tab = new bootstrap.Tab(tabToDisplay);
  tab.show();
}

// Load -My Cats- tab
const showMyCats = async () => {
  $("#nav-breed, #nav-sell, #nav-marketplace, #nav-factory").removeClass("active show");
  $("#nav-show").addClass("active show");
  const tabToDisplay = document.querySelector("#nav-show-tab");
  const tab = new bootstrap.Tab(tabToDisplay);
  tab.show();
  if (!notConnected()) {
    await loadCats($("#cats-collection"));
  }
};

// Load -MarketPlace- tab
async function showNavMarketplaceTab() {
  const tabToDisplay = document.querySelector("#nav-marketplace-tab");
  $("#nav-home, #nav-my-cats, #nav-show, #nav-breed, #nav-sell, #nav-factory").removeClass("active show");
  $("#nav-marketplace").addClass("active show");
  const tab = new bootstrap.Tab(tabToDisplay);
  tab.show();
  if (!notConnected()) {
    await loadMarketplace();
  }
}

// Get back to top of page
function scrollToTop() {
  $(window).scrollTop(0);
}
