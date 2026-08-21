// =====================================================
// CONFIGURAÇÃO
// =====================================================

const dataInicio = new Date(2026, 5, 21, 12, 0);


// =====================================================
// FUNÇÃO AUXILIAR
// =====================================================

const $ = (id) => document.getElementById(id);


// =====================================================
// CONTADOR DO RELACIONAMENTO
// =====================================================

function diffDate(start, end) {

  let years =
    end.getFullYear() -
    start.getFullYear();

  let months =
    end.getMonth() -
    start.getMonth();

  let days =
    end.getDate() -
    start.getDate();

  let hours =
    end.getHours() -
    start.getHours();

  let minutes =
    end.getMinutes() -
    start.getMinutes();

  let seconds =
    end.getSeconds() -
    start.getSeconds();


  if (seconds < 0) {

    seconds += 60;
    minutes--;

  }


  if (minutes < 0) {

    minutes += 60;
    hours--;

  }


  if (hours < 0) {

    hours += 24;
    days--;

  }


  if (days < 0) {

    const previousMonth =
      new Date(
        end.getFullYear(),
        end.getMonth(),
        0
      ).getDate();

    days += previousMonth;
    months--;

  }


  if (months < 0) {

    months += 12;
    years--;

  }


  return {
    years,
    months,
    days,
    hours,
    minutes,
    seconds
  };

}


function updateCounter() {

  const now = new Date();

  const d =
    diffDate(
      dataInicio,
      now
    );


  if ($("years"))
    $("years").textContent = d.years;

  if ($("months"))
    $("months").textContent = d.months;

  if ($("days"))
    $("days").textContent = d.days;

  if ($("hours"))
    $("hours").textContent = d.hours;

  if ($("minutes"))
    $("minutes").textContent = d.minutes;

  if ($("seconds"))
    $("seconds").textContent = d.seconds;

}


updateCounter();

setInterval(
  updateCounter,
  1000
);


// =====================================================
// MENU MOBILE
// =====================================================

const menuBtn =
  document.querySelector(".menu-btn");

const navLinks =
  document.querySelector(".nav-links");


if (menuBtn && navLinks) {

  menuBtn.addEventListener(
    "click",
    () => {

      navLinks.classList.toggle("open");

    }
  );


  document
    .querySelectorAll(".nav-links a")
    .forEach(link => {

      link.addEventListener(
        "click",
        () => {

          navLinks.classList.remove(
            "open"
          );

        }
      );

    });

}


// =====================================================
// ANIMAÇÃO AO DESCER A PÁGINA
// =====================================================

const elementosReveal =
  document.querySelectorAll(".reveal");


const observer =
  new IntersectionObserver(
    (entries) => {

      entries.forEach(
        (entry) => {

          if (entry.isIntersecting) {

            entry.target.classList.add(
              "visible"
            );

            observer.unobserve(
              entry.target
            );

          }

        }
      );

    },
    {
      threshold: 0.12,

      rootMargin:
        "0px 0px -70px 0px"
    }
  );


elementosReveal.forEach(
  (elemento) => {

    observer.observe(
      elemento
    );

  }
);


// =====================================================
// PARALLAX DO HERO
// =====================================================

const hero =
  document.querySelector(".hero");


if (hero) {

  window.addEventListener(
    "scroll",
    () => {

      const scroll =
        window.scrollY;

      if (scroll < window.innerHeight) {

        hero.style.backgroundPosition =
          `center ${scroll * 0.35}px`;

      }

    },
    {
      passive: true
    }
  );

}


// =====================================================
// CORAÇÕES FLUTUANTES
// =====================================================

function createHeart(
  x = Math.random() *
      window.innerWidth
) {

  const heart =
    document.createElement("span");


  heart.className =
    "floating-heart";


  const hearts = [
    "♥",
    "♡",
    "❤",
    "♡"
  ];


  heart.textContent =
    hearts[
      Math.floor(
        Math.random() *
        hearts.length
      )
    ];


  heart.style.left =
    `${x}px`;


  heart.style.fontSize =
    `${12 + Math.random() * 22}px`;


  heart.style.animationDuration =
    `${5 + Math.random() * 5}s`;


  heart.style.opacity =
    `${0.35 + Math.random() * 0.45}`;


  const heartsContainer =
    $("hearts");


  if (!heartsContainer)
    return;


  heartsContainer.appendChild(
    heart
  );


  setTimeout(
    () => {

      heart.remove();

    },
    10000
  );

}


// =====================================================
// CORAÇÕES AUTOMÁTICOS
// =====================================================

setInterval(
  () => {

    if (
      document.visibilityState ===
      "visible"
    ) {

      createHeart();

    }

  },
  2200
);


// =====================================================
// CORAÇÕES AO CLICAR
// =====================================================

document.addEventListener(
  "click",
  (event) => {

    const quantidade = 3;


    for (
      let i = 0;
      i < quantidade;
      i++
    ) {

      setTimeout(
        () => {

          createHeart(
            event.clientX +
            (Math.random() * 60 - 30)
          );

        },
        i * 100
      );

    }

  }
);


// =====================================================
// BOTÃO FINAL / SURPRESA
// =====================================================

const loveButton =
  $("loveButton");

const surprise =
  $("surprise");

const closeSurprise =
  $("closeSurprise");


if (
  loveButton &&
  surprise
) {

  loveButton.addEventListener(
    "click",
    () => {

      surprise.classList.add(
        "active"
      );


      // Explosão de corações

      for (
        let i = 0;
        i < 35;
        i++
      ) {

        setTimeout(
          () => {

            createHeart();

          },
          i * 70
        );

      }

      document.body.style.overflow =
        "hidden";

    }
  );

}


if (
  closeSurprise &&
  surprise
) {

  closeSurprise.addEventListener(
    "click",
    () => {

      surprise.classList.remove(
        "active"
      );

      document.body.style.overflow =
        "";

    }
  );

}


// =====================================================
// FECHAR SURPRESA CLICANDO FORA
// =====================================================

if (surprise) {

  surprise.addEventListener(
    "click",
    (event) => {

      if (
        event.target ===
        surprise
      ) {

        surprise.classList.remove(
          "active"
        );

        document.body.style.overflow =
          "";

      }

    }
  );

}


// =====================================================
// FECHAR SURPRESA COM ESC
// =====================================================

document.addEventListener(
  "keydown",
  (event) => {

    if (
      event.key === "Escape" &&
      surprise &&
      surprise.classList.contains(
        "active"
      )
    ) {

      surprise.classList.remove(
        "active"
      );

      document.body.style.overflow =
        "";

    }

  }
);


// =====================================================
// EFEITO SUAVE NO MOUSE
// =====================================================

const heroContent =
  document.querySelector(
    ".hero-content"
  );


if (
  heroContent &&
  window.innerWidth > 800
) {

  document.addEventListener(
    "mousemove",
    (event) => {

      const x =
        (event.clientX /
          window.innerWidth -
          0.5) * 8;

      const y =
        (event.clientY /
          window.innerHeight -
          0.5) * 8;


      heroContent.style.transform =
        `translate(${x}px, ${y}px)`;

    }
  );

}

// =====================================================
// ROLETA DA SURPRESA
// =====================================================

const wheelButton =
  $("wheelButton");

const wheelModal =
  $("wheelModal");

const wheelClose =
  $("wheelClose");

const spinButton =
  $("spinButton");

const wheel =
  $("wheel");

const wheelResult =
  $("wheelResult");


let wheelRotation = 0;

let spinning = false;


// =====================================================
// ABRIR ROLETA
// =====================================================

if (
  wheelButton &&
  wheelModal
) {

  wheelButton.addEventListener(
    "click",
    () => {

      wheelModal.classList.add(
        "active"
      );

    }
  );

}


// =====================================================
// FECHAR ROLETA
// =====================================================

if (
  wheelClose &&
  wheelModal
) {

  wheelClose.addEventListener(
    "click",
    () => {

      wheelModal.classList.remove(
        "active"
      );

    }
  );

}


// =====================================================
// GIRAR ROLETA
// =====================================================

if (
  spinButton &&
  wheel
) {

  spinButton.addEventListener(
    "click",
    () => {

      if (spinning)
        return;


      spinning = true;

      spinButton.disabled = true;


      wheelResult.textContent =
        "Girando... ❤️";


      /*
       ==================================================
       IMPORTANTE

       O "TUDO" é o 8º setor.

       Como temos 8 setores:

       360 / 8 = 45 graus

       O centro do setor TUDO está em:

       315 + 22.5 = 337.5 graus

       O ponteiro está no topo (270 graus
       no sistema matemático do CSS).

       Portanto precisamos fazer a roda terminar
       com o centro de TUDO exatamente no ponteiro.
       ==================================================
      */


      const setorTudo =
        337.5;


      /*
        O ponteiro está em -90 graus.

        Precisamos levar 337.5 para -90.

        Diferença:

        -90 - 337.5
        = -427.5

        Como queremos girar para frente,
        adicionamos 360:

        -427.5 + 360
        = -67.5

        Então o final correto é 67.5 graus
        de rotação visual.
      */

      const alvo =
        67.5;


      /*
        Faz várias voltas completas
        antes de chegar exatamente
        no TUDO.
      */

      const voltas =
        6 * 360;


      wheelRotation +=
        voltas +
        alvo;


      wheel.style.transform =
        `rotate(${wheelRotation}deg)`;


      // =================================================
      // RESULTADO
      // =================================================

      setTimeout(
        () => {

          wheelResult.innerHTML =
            "🎉 <strong>TUDO!</strong> 🎉<br>" +
            "Porque você merece tudo isso e muito mais. ❤️";


          spinning = false;

          spinButton.disabled = false;


          // Explosão de corações

          for (
            let i = 0;
            i < 30;
            i++
          ) {

            setTimeout(
              () => {

                createHeart();

              },
              i * 70
            );

          }

        },
        5200
      );

    }
  );

}


// =====================================================
// FECHAR CLICANDO FORA
// =====================================================

if (wheelModal) {

  wheelModal.addEventListener(
    "click",
    (event) => {

      if (
        event.target === wheelModal
      ) {

        wheelModal.classList.remove(
          "active"
        );

      }

    }
  );

}


// =====================================================
// ESC
// =====================================================

document.addEventListener(
  "keydown",
  (event) => {

    if (
      event.key === "Escape" &&
      wheelModal &&
      wheelModal.classList.contains(
        "active"
      )
    ) {

      wheelModal.classList.remove(
        "active"
      );

    }

  }
);
