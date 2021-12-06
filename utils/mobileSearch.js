import blurContent from "./blurContent";

export default function (bool) {
  if (window.innerWidth < 768) {
    if (bool) {
      document.querySelector("#header").style.zIndex = 0;
      document.querySelector(".page").style.display = "none";
      blurContent(false);
      document.querySelector("#footer").style.display = "none";
      document.querySelector("#closeIcon").style.display = "block";
      document.querySelector("#hiddenSearch").style.display = "block";
      document.querySelector("#searchbarOverlay").style.display = "block";
      document.querySelector("#searchbar").classList.add("mobileSearchbar");
      document.querySelector("#restaurantSearchInput").focus();
    } else if (!bool) {
      document.querySelector("#header").style.zIndex = 9;
      document.querySelector(".page").style.display = "flex";
      document.querySelector("#footer").style.display = "flex";
      document.querySelector("#closeIcon").style.display = "none";
      document.querySelector("#hiddenSearch").style.display = "none";
      document.querySelector("#searchbarOverlay").style.display = "none";
      document.querySelector("#searchbar").classList.remove("mobileSearchbar");
    }
  }
}
