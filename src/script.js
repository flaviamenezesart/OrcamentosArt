let tamanhoSelecionado = null;
let precoBase = 0;

let moldura = null;
let adicionais = null;
let precoFinal = 0;

// Seleção de tamanho (com opção de desmarcar)
document.querySelectorAll(".size-btn").forEach(btn => {
    btn.addEventListener("click", function() {
        if (this.classList.contains("selected")) {
            this.classList.remove("selected");
            tamanhoSelecionado = null;
            precoBase = 0;
        } else {
            document.querySelectorAll(".size-btn").forEach(b => b.classList.remove("selected"));
            this.classList.add("selected");
            tamanhoSelecionado = this.dataset.size;
            precoBase = (tamanhoSelecionado === "A3") ? 200 : 150;
        }
    });
});

// Seleção de moldura e adicionais (com opção de desmarcar)
document.querySelectorAll(".option-btn").forEach(btn => {
    btn.addEventListener("click", function() {
        let group = this.parentElement; 

        if (this.classList.contains("selected")) {
            this.classList.remove("selected");

            if (this.dataset.option.includes("moldura")) {
                moldura = null;
            } else if (this.dataset.option.includes("adicional")) {
                adicionais = null;
            }
        } else {
            group.querySelectorAll(".option-btn").forEach(b => b.classList.remove("selected"));
            this.classList.add("selected");

            if (this.dataset.option.includes("moldura")) {
                moldura = this.dataset.option === "moldura-sim";
            } else if (this.dataset.option.includes("adicional")) {
                adicionais = this.dataset.option === "adicional-sim";
            }
        }
    });
});

// Calcular orçamento
document.getElementById("calcular").addEventListener("click", function() {
    if (!tamanhoSelecionado) {
        alert("Por favor, selecione o tamanho do quadro.");
        return;
    }

    if (moldura === null) {
        alert("Por favor, selecione se deseja moldura.");
        return;
    }

    if (adicionais === null) {
        alert("Por favor, selecione se deseja adicionais.");
        return;
    }

    precoFinal = precoBase;

    // Moldura
    if (moldura) {
        precoFinal += (tamanhoSelecionado === "A3") ? 30 : 25;
    }

    // Adicionais
    if (adicionais) {
        precoFinal += 20;
    }

    document.getElementById("resultado").innerHTML = 
        `Tamanho: <strong>${tamanhoSelecionado}</strong><br>
         Moldura: <strong>${moldura ? "Sim" : "Não"}</strong><br>
         Adicionais: <strong>${adicionais ? "Sim" : "Não"}</strong><br>
         Orçamento: <strong>R$ ${precoFinal.toFixed(2)}</strong> + Taxa de entrega variável`;

    // Mostrar botão WhatsApp
    document.getElementById("enviarWhatsApp").style.display = "block";
});

// Clique no botão de enviar para WhatsApp
document.getElementById("enviarWhatsApp").addEventListener("click", function() {
    let mensagem = `Olá, Flávia. Tudo bem? Tenho interesse em contratar o seu serviço. Gostaria de encomendar uma arte com as seguintes especificações:\n\n` +
                   `📏 Tamanho: ${tamanhoSelecionado}\n` +
                   `🖼️ Moldura: ${moldura ? "Sim" : "Não"}\n` +
                   `➕ Adicionais: ${adicionais ? "Sim" : "Não"}\n` +
                   `💰 Orçamento: R$ ${precoFinal.toFixed(2)} + Taxa de entrega variável`;

    let url = "https://wa.me/5574988028048?text=" + encodeURIComponent(mensagem);
    window.open(url, "_blank");
});
