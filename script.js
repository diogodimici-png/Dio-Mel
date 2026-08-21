const $ = id => document.getElementById(id);

const dataInicio = new Date(2026, 5, 21, 12, 0);


/* =========================
   CONTADOR
========================= */

function diffDate(start, end){

  let y = end.getFullYear() - start.getFullYear();
  let m = end.getMonth() - start.getMonth();
  let d = end.getDate() - start.getDate();
  let h = end.getHours() - start.getHours();
  let min = end.getMinutes() - start.getMinutes();
  let s = end.getSeconds() - start.getSeconds();


  if(s < 0){
    s += 60;
    min--;
  }

  if(min < 0){
    min += 60;
    h--;
  }

  if(h < 0){
    h += 24;
    d--;
  }

  if(d < 0){
    d += new Date(
      end.getFullYear(),
      end.getMonth(),
      0
    ).getDate();

    m--;
  }

  if(m < 0){
    m += 12;
    y--;
  }

  return {
    y,
    m,
    d,
    h,
    min,
    s
  };
}


function updateCounter(){

  const d = diffDate(
    dataInicio,
    new Date()
  );

  [
    ["years", d.y],
    ["months", d.m],
    ["days", d.d],
    ["hours", d.h],
    ["minutes", d.min],
    ["seconds", d.s]
  ]

  .forEach(([id, value]) => {

    const element = $(id);

    if(element){
      element.textContent = value;
    }

  });

}


updateCounter();

setInterval(
  updateCounter,
  1000
);


/* =========================
   MENU
========================= */

const menuBtn =
  document.querySelector(".menu-btn");

const navLinks =
  document.querySelector(".nav-links");


if(menuBtn && navLinks){

  menuBtn.onclick = () => {

    navLinks.classList.toggle("open");

  };


  document
    .querySelectorAll(".nav-links a")
    .forEach(a => {

      a.onclick = () => {

        navLinks.classList.remove("open");

      };

    });

}


/* =========================
   ANIMAÇÕES
========================= */

const observer =
  new IntersectionObserver(
    entries => {

      entries.forEach(entry => {

        if(entry.isIntersecting){

          entry.target.classList.add("visible");

          observer.unobserve(
            entry.target
          );

        }

      });

    },
    {
      threshold:.12,
      rootMargin:"0px 0px -70px 0px"
    }
  );


document
  .querySelectorAll(".reveal")
  .forEach(el => {

    observer.observe(el);

  });


/* =========================
   PARALLAX
========================= */

const hero =
  document.querySelector(".hero");


if(hero){

  window.addEventListener(
    "scroll",
    () => {

      if(scrollY < innerHeight){

        hero.style.backgroundPosition =
          `center ${scrollY * .35}px`;

      }

    },
    {
      passive:true
    }
  );

}


/* =========================
   CORAÇÕES
========================= */

function createHeart(
  x = Math.random() * innerWidth
){

  const container = $("hearts");

  if(!container){
    return;
  }


  const heart =
    document.createElement("span");

  heart.className =
    "floating-heart";

  heart.textContent =
    ["♥","♡","❤"][
      Math.floor(
        Math.random() * 3
      )
    ];


  heart.style.left =
    `${x}px`;

  heart.style.fontSize =
    `${12 + Math.random() * 22}px`;

  heart.style.animationDuration =
    `${5 + Math.random() * 5}s`;


  container.appendChild(heart);


  setTimeout(
    () => heart.remove(),
    10000
  );

}


setInterval(() => {

  if(
    document.visibilityState ===
    "visible"
  ){

    createHeart();

  }

}, 2200);


document.addEventListener(
  "click",
  e => {

    for(let i = 0; i < 3; i++){

      setTimeout(
        () => {

          createHeart(
            e.clientX +
            (Math.random() * 60 - 30)
          );

        },
        i * 100
      );

    }

  }
);


/* =========================
   SURPRESA
========================= */

const loveButton =
  $("loveButton");

const surprise =
  $("surprise");

const closeSurprise =
  $("closeSurprise");


function closeModal(){

  surprise.classList.remove(
    "active"
  );

  document.body.style.overflow = "";

}


if(loveButton){

  loveButton.onclick = () => {

    surprise.classList.add(
      "active"
    );

    document.body.style.overflow =
      "hidden";


    for(let i = 0; i < 35; i++){

      setTimeout(
        createHeart,
        i * 70
      );

    }

  };

}


if(closeSurprise){

  closeSurprise.onclick =
    closeModal;

}


if(surprise){

  surprise.onclick = e => {

    if(e.target === surprise){

      closeModal();

    }

  };

}


document.addEventListener(
  "keydown",
  e => {

    if(
      e.key === "Escape" &&
      surprise.classList.contains("active")
    ){

      closeModal();

    }

  }
);


/* =========================
   EFEITO DO MOUSE
========================= */

const heroContent =
  document.querySelector(
    ".hero-content"
  );


if(
  heroContent &&
  innerWidth > 800
){

  document.addEventListener(
    "mousemove",
    e => {

      const x =
        (e.clientX / innerWidth - .5) * 8;

      const y =
        (e.clientY / innerHeight - .5) * 8;


      heroContent.style.transform =
        `translate(${x}px,${y}px)`;

    }
  );

}


/* ==================================================
   ROLETA
================================================== */

const wheel =
  $("wheel");

const spinButton =
  $("spinButton");

const prizeResult =
  $("prizeResult");


let spinning = false;


/*
  IMPORTANTE:

  A roleta possui 7 prêmios visuais,
  mas o resultado final é SEMPRE TUDO.
*/


if(
  spinButton &&
  wheel
){

  spinButton.onclick = () => {

    if(spinning){
      return;
    }


    spinning = true;

    spinButton.disabled = true;

    prizeResult.classList.remove(
      "show"
    );


    /*
      Faz várias voltas para
      deixar a animação bonita.
    */

    const voltas =
      5 * 360;


    /*
      Pequena variação para
      não ficar exatamente igual.
    */

    const variacao =
      Math.floor(
        Math.random() * 20
      ) - 10;


    const giro =
      voltas + variacao;


    wheel.style.transform =
      `rotate(${giro}deg)`;


    setTimeout(() => {

      /*
        Resultado sempre TUDO.
      */

      prizeResult.classList.add(
        "show"
      );


      spinButton.textContent =
        "❤️ PRÊMIO CONQUISTADO ❤️";


      for(let i = 0; i < 25; i++){

        setTimeout(
          createHeart,
          i * 60
        );

      }


      spinning = false;

    }, 5400);

  };

}