export default function (bool) {
  if (bool) {
    document.body.style.overflow = "hidden";
    document.querySelector(".page").classList.add("blur");
    document.querySelector("#footer").classList.add("blur");
    document.querySelector("#navbarLogo").style.filter = "blur(3px)";
    document.querySelector("#mobileSearchBtn").style.filter = "blur(3px)";
    document.querySelector("#mobileSearchBtn").style.pointerEvents = "none";
  } else {
    document.body.style.overflow = "visible";
    document.querySelector(".page").classList.remove("blur");
    document.querySelector("#footer").classList.remove("blur");
    document.querySelector("#navbarLogo").style.filter = "none";
    document.querySelector("#mobileSearchBtn").style.filter = "none";
    document.querySelector("#mobileSearchBtn").style.pointerEvents = "inherit";
  }
}
