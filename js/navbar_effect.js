window.addEventListener('scroll', function(e) {
  var vscroll = window.scrollY;
  var navbar = document.getElementById('header');
  if(vscroll<700){
    navbar.style.cssText="background-color: RGBA(9,9,17,0.3);"
  }else{
    navbar.style.cssText="background-color: RGB(9,9,17);"
  }
});
