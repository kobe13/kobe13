"use strict";var gallery=function(){var a=document.querySelector(".gallery__wrapper"),b=document.querySelector(".gallery__button--next"),c=document.querySelector(".gallery__button--prev"),d=document.querySelector(".info__counter--current"),e=document.querySelector(".info__counter--total"),f=1e3;!function(b){var c;for(c=1;c<=b;c++){var d=document.createElement("li"),e=document.createElement("img");d.className=1===c?"gallery__element gallery__element--show":"gallery__element",e.className="gallery__element__image",e.setAttribute("data-src","https://unsplash.it/600/350?image="+c),e.setAttribute("src","data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="),e.setAttribute("onload","lzld(this)"),e.setAttribute("alt","Image-"+c),d.appendChild(e),a.appendChild(d)}}(10);var g=document.querySelectorAll(".gallery__element"),h=g.length;e.innerHTML=h;var i=function(){var a=Math.abs(f%h),b=document.querySelector(".gallery__element--show");dom.removeClass(b,"gallery__element--show"),dom.addClass(g[a],"gallery__element--show"),d.innerHTML=a+1},j=function(a){"next"===a?(f++,i()):(f--,i())};b.addEventListener("click",function(){j("next")}),c.addEventListener("click",function(){j("prev")});!function(){function a(a){c=a.touches[0].clientX,d=a.touches[0].clientY}function b(a){if(c&&d){var b=a.touches[0].clientX,e=a.touches[0].clientY,f=c-b,g=d-e;Math.abs(f)>Math.abs(g)&&j(f>0?"next":"prev"),c=null,d=null}}document.addEventListener("touchstart",a,!1),document.addEventListener("touchmove",b,!1);var c=null,d=null}()};gallery();var dom={addClass:function(a,b){var c=b.split(" "),d=a;d.classList&&c.forEach(function(a){d.classList.add(a)})},removeClass:function(a,b){var c=b.split(" "),d=a;d.classList&&c.forEach(function(a){d.classList.remove(a)})}};