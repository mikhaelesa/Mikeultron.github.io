// Author: Mikhael Esa S.W.
// Date: 21/08/2020

// NOTE Check if the useragent is mobile.
let isMobile
  if (/Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) isMobile = true;

// NOTE Variables
let lastScroll = 0;
const sections = document.querySelectorAll('section');
const links = document.querySelectorAll('nav a');
const sectionMargin = 350;
let currentActive = -1;
const current = sections.length - [...sections].reverse().findIndex(section => window.scrollY >= section.offsetTop - sectionMargin ) - 1;
const setActive = link => links[link].classList.add('active');
const removeActive = link => links[link].classList.remove('active');
const removeAllActive = () => [...Array(sections.length).keys()].forEach((link) => removeActive(link));


// NOTE This event will be triggered when the useragent is mobile. This will give an animation to the sidebar.
$('.hamburger-btn').click(function(){
  $('header .container').toggleClass('slide-left');
  $('.hamburger-btn .ham').toggleClass('transparent');
})

// NOTE This will add smooth scrolling effect when nav links is clicked.
$('nav a').on('click', function(e){
  e.preventDefault()
  let targetAttr = $(this).attr('href');
  let targetSection = $(targetAttr);
  $('#home').animate({
      scrollTop: targetSection.offset().top
  },500)
  if(isMobile){
    $('header .container').toggleClass('slide-left');
    $('.hamburger-btn .ham').toggleClass('transparent');
  }
})

$('a.filled').on('click', function(e){
  e.preventDefault();
  let targetAttr = $(this).attr('href');
  let targetSection = $(targetAttr).offset().top;
  $('#home').animate({
      scrollTop: targetSection
  }, 500)
})

// NOTE This will toggle the navbar hide and show effect as the user scrolls the page.
$(window).scroll(function (){
  let currentScroll = $(window).scrollTop()
  if(!isMobile){
    if(currentScroll < lastScroll){
      $('header').addClass('slide');
      $('header').removeClass('hide');
    }
    else{
      $('header').addClass('hide');
      $('header').removeClass('slide');
    }
    if(currentScroll === 0)
      $('header').removeClass('slide');
  }
  lastScroll = currentScroll <= 0 ? 0 : currentScroll;

  // NOTE Scrollspy
  const current = sections.length - [...sections].reverse().findIndex((section) => window.scrollY >= section.offsetTop - sectionMargin ) - 1;
  if (current !== currentActive) {
    removeAllActive();
    currentActive = current;
    setActive(current);
  }
})

// NOTE Update the current window width to trigger some apperance changes.
function updateSize(){
  let windowWidth = $(window).outerWidth();
  let content = windowWidth <= 800 ? "These are some tools and <br>softwares that I'm good at." : "";
  $('#skills > div.mobile > h1').html(content);
}

window.onresize = updateSize;
window.onload = updateSize;