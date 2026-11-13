const body=document.body;
const menuButton=document.querySelector('.menu-toggle');
const nav=document.querySelector('.main-nav');
menuButton?.addEventListener('click',()=>{const open=body.classList.toggle('menu-open');menuButton.setAttribute('aria-expanded',String(open));});
nav?.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{body.classList.remove('menu-open');menuButton?.setAttribute('aria-expanded','false');}));

const reveals=document.querySelectorAll('.reveal');
const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');revealObserver.unobserve(entry.target);}}),{threshold:.08});
reveals.forEach(el=>revealObserver.observe(el));

const sections=[...document.querySelectorAll('main section[id]')];
const navLinks=[...document.querySelectorAll('.main-nav a')];
const navObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){navLinks.forEach(link=>link.classList.toggle('active',link.getAttribute('href')===`#${entry.target.id}`));}}),{rootMargin:'-30% 0px -60%'});
sections.forEach(section=>navObserver.observe(section));

const routeButton=document.getElementById('route-button');
const routeStatus=document.getElementById('route-status');
const routeMap=document.getElementById('route-map');
const destination='55.8257,49.0244';
routeButton?.addEventListener('click',()=>{
  if(!navigator.geolocation){routeStatus.textContent='Геолокация не поддерживается. Откройте маршрут в Яндекс Картах.';return;}
  routeButton.disabled=true;routeStatus.textContent='Определяем ваше местоположение…';
  navigator.geolocation.getCurrentPosition(position=>{const start=`${position.coords.latitude},${position.coords.longitude}`;routeMap.src=`https://yandex.ru/map-widget/v1/?rtext=${encodeURIComponent(start)}~${encodeURIComponent(destination)}&rtt=auto`;routeStatus.textContent='Маршрут построен. Время в пути показано на карте.';routeButton.textContent='Маршрут построен';},()=>{routeStatus.textContent='Не удалось получить геопозицию. Откройте маршрут в Яндекс Картах.';routeButton.disabled=false;},{enableHighAccuracy:false,timeout:10000,maximumAge:300000});
});
