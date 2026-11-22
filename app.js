(function () {
  const S = window.SHOP;
  const $ = (id) => document.getElementById(id);
  const fmt = (n) => n.toLocaleString("ru-RU") + " " + S.currency;
  const waLink = (text) => "https://wa.me/" + S.whatsapp + (text ? "?text=" + encodeURIComponent(text) : "");
  const phonePretty = S.phone.replace(/^(\d{4})(\d{3})(\d{3})$/, "$1 $2 $3");

  // Контакттар
  $("topPhone").href = "tel:" + S.phone;
  $("topPhone").querySelector("span").textContent = phonePretty;
  $("footPhone").href = "tel:" + S.phone;
  $("footPhone").textContent = phonePretty;
  $("footWa").href = waLink();
  $("fab").href = waLink("Салам! №1_Shop_KGZ, суроом бар.");

  let picked = null;
  let bank = null;

  function card(p, html) {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "item";
    b.dataset.id = p.id;
    b.innerHTML = (p.hit ? '<span class="hit">ХИТ</span>' : "") + html;
    b.onclick = () => pick(p, b);
    return b;
  }

  S.diamonds.forEach((d) => {
    d.title = d.amount + " 💎 алмаз";
    $("diamonds").appendChild(card(d,
      '<div class="ic">💎</div><div class="am">' + d.amount + '</div>' +
      (d.bonus ? '<div class="bn">+' + d.bonus + ' бонус</div>' : "") +
      '<div class="pr">' + fmt(d.price) + "</div>"));
  });

  S.extras.forEach((x) => {
    $("extras").appendChild(card(x,
      '<div class="ic">' + x.icon + '</div><div class="am" style="font-size:1.05rem">' + x.title + '</div>' +
      '<div class="ds">' + x.desc + '</div><div class="pr">' + (x.price ? fmt(x.price) : "Келишим") + "</div>"));
  });

  S.banks.forEach((bk) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "bank";
    b.innerHTML = '<i style="background:' + bk.color + '"></i>' + bk.name;
    b.onclick = () => {
      bank = bk;
      document.querySelectorAll(".bank").forEach((e) => e.classList.toggle("sel", e === b));
      $("err").textContent = "";
    };
    $("banks").appendChild(b);
  });

  function pick(p, el) {
    picked = p;
    document.querySelectorAll(".item").forEach((e) => e.classList.toggle("sel", e === el));
    const box = $("picked");
    box.classList.add("on");
    box.innerHTML = "Тандалды: <b>" + p.title + "</b> — " + (p.price ? fmt(p.price) : "баасы келишим боюнча");
    $("pay").hidden = true;
    $("orderForm").hidden = false;
    $("order").scrollIntoView({ behavior: "smooth" });
  }

  $("orderForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const id = $("ffId").value.trim();
    const err = $("err");
    if (!picked) return (err.textContent = "Алгач пакет тандаңыз.");
    if (!/^\d{5,13}$/.test(id)) return (err.textContent = "Free Fire ID туура эмес (5–13 сан).");
    if (!bank) return (err.textContent = "Банк тандаңыз.");
    err.textContent = "";
    showPay(id, $("ffNick").value.trim());
  });

  function showPay(id, nick) {
    const no = "N" + Date.now().toString().slice(-6);
    $("orderNo").textContent = no;
    $("paySum").textContent = picked.price ? fmt(picked.price) : "Келишим";

    $("bankBox").style.borderLeftColor = bank.color;
    $("bankBox").innerHTML =
      "<div><b>" + bank.name + "</b> — котормо номери:</div>" +
      '<div class="acc">' + bank.account + '<button type="button" class="copy" id="cp">Көчүрүү</button></div>' +
      (bank.holder ? '<div class="muted">Алуучу: ' + bank.holder + "</div>" : "");
    $("cp").onclick = () => {
      navigator.clipboard && navigator.clipboard.writeText(bank.account);
      $("cp").textContent = "Көчүрүлдү ✓";
    };

    const msg =
      "Салам! №1_Shop_KGZ буйрутма " + no + "\n" +
      "Пакет: " + picked.title + "\n" +
      "Сумма: " + (picked.price ? fmt(picked.price) : "келишим") + "\n" +
      "Free Fire ID: " + id + (nick ? "\nНик: " + nick : "") + "\n" +
      "Банк: " + bank.name + "\n" +
      "Чекти тиркеп жатам 👇";
    const link = waLink(msg);
    $("waBtn").href = link;

    // Банк QR сүрөтү болсо — аны, болбосо WhatsApp QR
    const img = $("bankQr");
    const wa = $("waQr");
    wa.innerHTML = "";
    img.hidden = true;
    const fallback = () => {
      img.hidden = true;
      wa.innerHTML = "";
      if (window.qrcode) {
        const q = qrcode(0, "L");
        q.addData(link);
        q.make();
        wa.innerHTML = q.createSvgTag({ cellSize: 3, margin: 2, scalable: true });
      }
      $("qrCap").textContent = "Телефон менен скандап, буйрутманы WhatsApp'ка жөнөтүңүз";
    };
    img.onload = () => {
      img.hidden = false;
      $("qrCap").textContent = bank.name + " тиркемеси менен скандап төлөңүз";
    };
    img.onerror = fallback;
    img.src = bank.qr + "?v=1";

    $("orderForm").hidden = true;
    $("pay").hidden = false;
    $("pay").scrollIntoView({ behavior: "smooth" });
  }

  $("backBtn").onclick = () => {
    $("pay").hidden = true;
    $("orderForm").hidden = false;
  };
})();
