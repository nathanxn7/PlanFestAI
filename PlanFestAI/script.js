// ---------- IMPORTS FIREBASE ----------
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

// ---------- CONFIG ----------
const firebaseConfig = {
  apiKey: "AIzaSyCOcXlCvnd4QuNAqnPiE-vgNDwkOSpPExM",
  authDomain: "planfestai.firebaseapp.com",
  projectId: "planfestai",
  storageBucket: "planfestai.firebasestorage.app",
  messagingSenderId: "922160757625",
  appId: "1:922160757625:web:69d252d631fd8015684da8",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// ---------- LOGIN ----------
const btnLogin = document.querySelector(".enter-login");
const inputsLogin = document.querySelectorAll(".input-login");
const tituloLogin = document.querySelector(".titulo-login");

if (tituloLogin && btnLogin) {
  btnLogin.addEventListener("click", async (e) => {
    e.preventDefault();
    const email = inputsLogin[0].value.trim();
    const senha = inputsLogin[1].value.trim();

    try {
      await signInWithEmailAndPassword(auth, email, senha);
      alert("✅ Login realizado com sucesso!");
      window.location.href = "principal.html";
    } catch (e) {
      alert("❌ Erro ao logar: " + traduzErroFirebase(e.code));
    }
  });
}

// ---------- CADASTRO ----------
const tituloCadastro = document.querySelector(".titulo-cad");

if (tituloCadastro && btnLogin) {
  btnLogin.addEventListener("click", async (e) => {
    e.preventDefault();
    const email = inputsLogin[0].value.trim();
    const senha = inputsLogin[1].value.trim();

    try {
      await createUserWithEmailAndPassword(auth, email, senha);
      alert("✅ Usuário cadastrado com sucesso!");
      window.location.href = "login.html";
    } catch (e) {
      alert("❌ Erro ao cadastrar: " + traduzErroFirebase(e.code));
    }
  });
}

// ---------- LOGOUT ----------
const botaoSair = document.querySelector(".botao-sair");
if (botaoSair) {
  botaoSair.addEventListener("click", () => {
    signOut(auth).then(() => {
      alert("Você saiu da conta.");
      window.location.href = "login.html";
    });
  });
}

// ---------- AUTENTICAÇÃO AUTOMÁTICA ----------
onAuthStateChanged(auth, (user) => {
  const menuSec3 = document.querySelector(".menu-sec3");
  if (menuSec3) menuSec3.style.display = user ? "flex" : "none";
});

// -------------------------------------------
//  SISTEMA DE TEMAS COM GRUPOS E SUBTEMAS
// -------------------------------------------

const grupos = {
  casamento: [
    {
      tipo: "Casamento Rústico",
      filtro: [
        "casamento","rustico","rústico","campo","natureza","fazenda","madeira",
        "folhas","flores secas","boho","vintage","terra","ar livre","simplicidade"
      ],
      sugestoes: [
        "🌿 Decoração com madeira, juta e flores secas.",
        "💡 Cordões de luz amarela para ambiente aconchegante.",
        "🎵 Música folk ou violão acústico."
      ]
    },
    {
      tipo: "Casamento Luxo / Clássico",
      filtro: [
        "casamento","luxo","clássico","terno","noiva","glamour","dourado","chique",
        "sofisticado","tapete","igreja","formal","black tie"
      ],
      sugestoes: [
        "💎 Decoração dourada com flores brancas.",
        "🎻 Quarteto de cordas na cerimônia.",
        "🥂 Coquetel premium com finger foods."
      ]
    },
    {
      tipo: "Casamento na Praia",
      filtro: [
        "casamento","praia","mar","areia","beira mar","surf","verão","tropical",
        "oceano","brisa"
      ],
      sugestoes: [
        "🏖️ Cerimônia ao pôr do sol na praia.",
        "🌊 Paleta azul + areia + branco.",
        "🍹 Drinks tropicais refrescantes."
      ]
    }
  ],

  infantil: [
    {
      tipo: "Festa Infantil — Super-Heróis",
      filtro: [
        "infantil","super herói","super-herói","herói","herois","marvel","dc",
        "criança","menino","ação","fantasia"
      ],
      sugestoes: [
        "🎈 Painel temático com heróis.",
        "🎁 Capas e máscaras para os convidados.",
        "🎮 Caça ao tesouro estilo missão."
      ]
    },
    {
      tipo: "Festa Princesas",
      filtro: [
        "princesa","princesas","castelo","realeza","menina","conto de fadas",
        "tiara","vestido","magic"
      ],
      sugestoes: [
        "👑 Paleta rosa pastel com glitter.",
        "🧁 Doces decorados com coroas.",
        "📸 Trono real para fotos."
      ]
    },
    {
      tipo: "Festa Unicórnio",
      filtro: [
        "unicórnio","unicornio","arco-íris","rainbow","nuvem","fofinho","cute",
        "colorido","mágico"
      ],
      sugestoes: [
        "🦄 Decoração pastel com nuvens artificiais.",
        "🍰 Bolo rainbow.",
        "✨ Luz colorida suave e glitter."
      ]
    }
  ],

  balada: [
    {
      tipo: "Balada Neon",
      filtro: [
        "balada","neon","led","luz uv","festa jovem","glow","danceteria",
        "clube","boate","night"
      ],
      sugestoes: [
        "💃 Glow sticks e tintas neon.",
        "🎧 Música eletrônica + pop.",
        "📸 Painel LED fluorescente."
      ]
    },
    {
      tipo: "Cyberpunk Party",
      filtro: [
        "balada","cyberpunk","futurista","futuro","tecnologia","roxo","azul",
        "neon pink","cidade futurista"
      ],
      sugestoes: [
        "🤖 Estética futurista roxo + azul.",
        "🔥 Lasers e fumaça leve.",
        "🎧 DJ com synthwave."
      ]
    },
    {
      tipo: "Black Party",
      filtro: [
        "balada","preto","dark","noturna","sombra","minimalista","black",
        "estilo elegante"
      ],
      sugestoes: [
        "🖤 Dress code preto.",
        "💡 Iluminação branca minimalista.",
        "🥂 Drinks fosforescentes."
      ]
    }
  ]
};

// -------------------------------------------
//  FILTRAGEM + ALTERNÂNCIA ENTRE SUBTEMAS
// -------------------------------------------

const enviarPrompt = document.querySelector(".enviar-prompt");
const inputPrompt = document.querySelector(".input-prompt");
const listaSugestoes = document.querySelector(".lista-sugestoes");

if (enviarPrompt) {
  enviarPrompt.addEventListener("click", () => {

    const texto = inputPrompt.value.toLowerCase();
    listaSugestoes.innerHTML = "";

    let grupoEncontrado = null;

    // Procura o grupo certo pelo filtro interno dos subtemas
    for (let grupo in grupos) {
      for (let tema of grupos[grupo]) {
        if (tema.filtro.some(p => texto.includes(p))) {
          grupoEncontrado = grupo;
          break;
        }
      }
      if (grupoEncontrado) break;
    }

    if (!grupoEncontrado) {
      listaSugestoes.innerHTML =
        "<li>🤖 Não encontrei um tema adequado. Tente escrever: casamento, infantil ou balada.</li>";
      return;
    }

    const temasDoGrupo = grupos[grupoEncontrado];

    let indice = Number(localStorage.getItem("tema_" + grupoEncontrado)) || 0;

    const temaSelecionado = temasDoGrupo[indice];

    // alternância
    const proximo = (indice + 1) % temasDoGrupo.length;
    localStorage.setItem("tema_" + grupoEncontrado, proximo);

    // exibir
    listaSugestoes.innerHTML += `<li><strong>${temaSelecionado.tipo}</strong></li>`;
    temaSelecionado.sugestoes.forEach(s => {
      listaSugestoes.innerHTML += `<li>${s}</li>`;
    });
  });
}

// ---------- TRADUÇÃO DE ERROS ----------
function traduzErroFirebase(code) {
  const erros = {
    "auth/invalid-email": "E-mail inválido.",
    "auth/user-disabled": "Usuário desativado.",
    "auth/user-not-found": "Usuário não encontrado.",
    "auth/wrong-password": "Senha incorreta.",
    "auth/email-already-in-use": "E-mail já cadastrado.",
    "auth/weak-password": "A senha deve ter pelo menos 6 caracteres."
  };
  return erros[code] || "Erro desconhecido.";
}

// ---------- ANIMAÇÃO DE ROLAGEM ----------
document.querySelectorAll('.a-menu').forEach(link => {
  link.addEventListener('click', e => {
    const id = link.getAttribute('href');
    if (id.startsWith('#')) {
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });

        target.classList.remove('section-animada');
        void target.offsetWidth;
        target.classList.add('section-animada');
      }
    }
  });
});
