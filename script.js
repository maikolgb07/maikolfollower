// CONFIGURACIÓN DE PRECIOS MAIKOLFOLLOWERS
const catalog = {
    "Instagram": {
        "icon": "📸",
        "Seguidores Reales": [
            {q: 100, p: 167}, {q: 200, p: 234}, {q: 500, p: 436}, {q: 1000, p: 770}, {q: 10000, p: 6806}
        ],
        "Likes Premium": [
            {q: 100, p: 80}, {q: 500, p: 350}, {q: 1000, p: 600}, {q: 10000, p: 4500}, {q: 50000, p: 20000}
        ]
    },
    "TikTok": {
        "icon": "📱",
        "Seguidores": [
            {q: 100, p: 200}, {q: 1000, p: 1700}, {q: 5000, p: 7000}, {q: 10000, p: 13000}, {q: 100000, p: 110000}
        ],
        "Views Virales": [
            {q: 1000, p: 50}, {q: 10000, p: 380}, {q: 50000, p: 1700}, {q: 1000000, p: 25000}
        ]
    },
    "YouTube": {
        "icon": "🎥",
        "Suscriptores": [
            {q: 100, p: 500}, {q: 500, p: 2200}, {q: 1000, p: 4000}, {q: 5000, p: 18000}, {q: 10000, p: 35000}
        ]
    }
};

// LÓGICA DE AFILIADOS MAIKOLFOLLOWERS
let affiliate = localStorage.getItem('maikol_ref') || "Directo";
const params = new URLSearchParams(window.location.search);
if(params.get('ref')) {
    affiliate = params.get('ref');
    localStorage.setItem('maikol_ref', affiliate);
}

const badge = document.getElementById('badge-ref');
badge.innerText = `Agente: ${affiliate}`;
if(affiliate !== "Directo") badge.classList.add('border-yellow-500', 'text-yellow-500');

const multiplier = affiliate !== "Directo" ? 1.05 : 1.00;

function initStore() {
    const grid = document.getElementById('store-grid');
    for (const [platform, data] of Object.entries(catalog)) {
        for (const [serviceName, scales] of Object.entries(data)) {
            if(serviceName === "icon") continue;
            const card = document.createElement('div');
            card.className = 'service-card p-8 rounded-3xl flex flex-col justify-between';
            card.innerHTML = `
                <div>
                    <div class="flex justify-between items-center mb-6">
                        <span class="text-4xl">${data.icon}</span>
                        <span class="text-[10px] font-bold text-gray-500 tracking-widest uppercase">${platform}</span>
                    </div>
                    <h3 class="text-2xl font-bold mb-2">${serviceName}</h3>
                    <p class="text-gray-400 text-xs mb-6">Entrega garantizada por MaikolFollowers.</p>
                    <label class="text-[10px] text-yellow-600 font-bold uppercase mb-2 block">Cantidad</label>
                    <select id="select-${platform}-${serviceName}" class="w-full p-4 rounded-xl mb-8 appearance-none cursor-pointer">
                        ${scales.map(s => `<option value="${s.q}" data-base="${s.p}">${s.q.toLocaleString()} — $${Math.ceil(s.p * multiplier)} CUP</option>`).join('')}
                    </select>
                </div>
                <button onclick="order('${platform}', '${serviceName}')" class="gold-gradient w-full py-4 rounded-xl text-black font-black text-sm hover:scale-105 active:scale-95 transition-all">
                    COMPRAR AHORA
                </button>
            `;
            grid.appendChild(card);
        }
    }
}

function order(plat, serv) {
    const select = document.getElementById(`select-${plat}-${serv}`);
    const qty = select.value;
    const finalPrice = Math.ceil(select.options[select.selectedIndex].dataset.base * multiplier);
    const method = confirm("¿Pago por Transfermóvil?\n(Aceptar = Transfermóvil / Cancelar = Saldo Móvil)") ? "Transfermóvil" : "Saldo Móvil";
    
    // Mensaje personalizado con la nueva marca
    const msg = `Hola, vengo de MaikolFollowers.%0A%0A` +
                `✨ *Servicio:* ${serv} (${plat})%0A` +
                `📈 *Cantidad:* ${qty} unidades%0A` +
                `💰 *Precio:* ${finalPrice} CUP%0A` +
                `💳 *Pago:* ${method}%0A` +
                `🤝 *Referido:* ${affiliate}`;

    document.getElementById('notification').classList.remove('hidden');
    setTimeout(() => {
        window.open(`https://wa.me/5353215857?text=${msg}`, '_blank');
        document.getElementById('notification').classList.add('hidden');
    }, 1000);
}

window.onload = initStore;

