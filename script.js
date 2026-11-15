(function () {
  var $ = function (i) {
      return document.getElementById(i);
    },
    root = document.documentElement;
  try {
    var t = localStorage.getItem("theme");
    if (t) root.dataset.theme = t;
    else if (matchMedia("(prefers-color-scheme:dark)").matches)
      root.dataset.theme = "dark";
  } catch (e) {}
  $("theme").onclick = function () {
    var d = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = d;
    try {
      localStorage.setItem("theme", d);
    } catch (e) {}
  };

  var nav = $("nav"),
    menu = $("menu"),
    bur = $("burger"),
    bar = $("bar");
  addEventListener(
    "scroll",
    function () {
      nav.classList.toggle("s", scrollY > 10);
      var h = root.scrollHeight - innerHeight;
      bar.style.width = (h > 0 ? (scrollY / h) * 100 : 0) + "%";
    },
    { passive: true },
  );
  bur.onclick = function () {
    menu.classList.toggle("open");
    bur.classList.toggle("x");
  };
  menu.onclick = function () {
    menu.classList.remove("open");
    bur.classList.remove("x");
  };
  $("yr").textContent = new Date().getFullYear();

  document.querySelectorAll(".card").forEach(function (c) {
    c.addEventListener("pointermove", function (e) {
      var r = c.getBoundingClientRect();
      c.style.setProperty("--x", e.clientX - r.left + "px");
      c.style.setProperty("--y", e.clientY - r.top + "px");
    });
  });

  function count(el) {
    var n = +el.dataset.n,
      s = performance.now();
    (function f(now) {
      var p = Math.min((now - s) / 1200, 1);
      el.textContent = Math.round(n * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(f);
    })(s);
  }
  var els = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (e) {
        e.forEach(function (x) {
          if (!x.isIntersecting) return;
          x.target.classList.add("in");
          io.unobserve(x.target);
          x.target.querySelectorAll("[data-n]").forEach(count);
        });
      },
      { threshold: 0.15 },
    );
    els.forEach(function (el, i) {
      el.style.transitionDelay = (i % 3) * 0.08 + "s";
      io.observe(el);
    });
  } else {
    els.forEach(function (el) {
      el.classList.add("in");
    });
    document.querySelectorAll("[data-n]").forEach(count);
  }

  $("form").addEventListener("submit", function (ev) {
    ev.preventDefault();
    var f = ev.target,
      err = $("err"),
      v = function (n) {
        return f.elements[n].value.trim();
      };
    if (!v("name") || !/^[0-9+\s-]{8,15}$/.test(v("phone")) || !v("msg")) {
      err.textContent = window.T(
        "Please enter your name, a valid phone number and a message.",
      );
      return;
    }
    err.textContent = "";
    var m =
      "Hello Solviyo,\n*Name:* " +
      v("name") +
      "\n*Phone:* " +
      v("phone") +
      "\n*Service:* " +
      v("service") +
      "\n*Message:* " +
      v("msg");
    window.open(
      "https://wa.me/919545689533?text=" + encodeURIComponent(m),
      "_blank",
    );
    f.reset();
  });
})();

(function () {
  var D = {
    About: ["बारे में", "आमच्याबद्दल"],
    Services: ["सेवाएँ", "सेवा"],
    Products: ["प्रॉडक्ट्स", "उत्पादने"],
    Process: ["प्रक्रिया", "प्रक्रिया"],
    Clients: ["क्लाइंट्स", "क्लायंट्स"],
    Contact: ["संपर्क", "संपर्क"],
    "Let's talk": ["बात करें", "चला बोलूया"],
    "Available for new projects": [
      "नए प्रोजेक्ट्स के लिए उपलब्ध",
      "नवीन प्रोजेक्ट्ससाठी उपलब्ध",
    ],
    "Android, iOS and web apps for Indian businesses — fast, simple and built to scale.":
      [
        "Android, iOS और वेब ऐप्स — भारतीय व्यवसायों के लिए, तेज़, सरल और आपके साथ बढ़ने वाले।",
        "भारतीय व्यवसायांसाठी Android, iOS आणि वेब ॲप्स — जलद, सोपे आणि व्यवसायासोबत वाढणारे.",
      ],
    "Start a project →": ["प्रोजेक्ट शुरू करें →", "प्रोजेक्ट सुरू करा →"],
    "See our work": ["हमारा काम देखें", "आमचे काम पहा"],
    "Android Apps": ["Android ऐप्स", "Android ॲप्स"],
    "iOS Apps": ["iOS ऐप्स", "iOS ॲप्स"],
    "Web Apps": ["वेब ऐप्स", "वेब ॲप्स"],
    "Business Software": ["बिज़नेस सॉफ़्टवेयर", "बिझनेस सॉफ्टवेअर"],
    "Billing App": ["बिलिंग ऐप", "बिलिंग ॲप"],
    Support: ["सपोर्ट", "सपोर्ट"],
    "A young team that builds what your business actually needs.": [
      "एक युवा टीम, जो वही बनाती है जिसकी आपके बिज़नेस को सच में ज़रूरत है।",
      "एक तरुण टीम, जी तुमच्या व्यवसायाला खरोखर जे हवे तेच बनवते.",
    ],
    "Solviyo is a technology startup from Parbhani and Pune. We understand how Indian businesses work, so we build apps and websites that fit your daily operations — billing, bookings, customers — and help you reach more people.":
      [
        "Solviyo परभणी और पुणे की एक टेक्नोलॉजी स्टार्टअप है। हम समझते हैं कि भारतीय व्यवसाय कैसे चलते हैं, इसलिए हम ऐसे ऐप्स और वेबसाइट बनाते हैं जो आपके रोज़ के कामकाज — बिलिंग, बुकिंग, ग्राहक — में फिट बैठें और आपको ज़्यादा लोगों तक पहुँचाने में मदद करें।",
        "Solviyo ही परभणी आणि पुणे येथील तंत्रज्ञान स्टार्टअप आहे. भारतीय व्यवसाय कसे चालतात हे आम्हाला समजते, म्हणून तुमच्या रोजच्या कामकाजाला — बिलिंग, बुकिंग, ग्राहक — साजेसे ॲप्स आणि वेबसाइट्स आम्ही बनवतो आणि तुम्हाला अधिक लोकांपर्यंत पोहोचण्यास मदत करतो.",
      ],
    Platforms: ["प्लेटफ़ॉर्म", "प्लॅटफॉर्म्स"],
    Cities: ["शहर", "शहरे"],
    "Custom built": ["खास आपके लिए", "तुमच्यासाठी खास"],
    "Everything you need to go digital.": [
      "डिजिटल होने के लिए आपको जो कुछ चाहिए, सब कुछ।",
      "डिजिटल होण्यासाठी तुम्हाला लागणारे सर्वकाही.",
    ],
    "Fast, reliable apps for India's biggest mobile audience.": [
      "भारत के सबसे बड़े मोबाइल यूज़र वर्ग के लिए तेज़ और भरोसेमंद ऐप्स।",
      "भारतातील सर्वात मोठ्या मोबाइल वापरकर्त्यांसाठी जलद आणि विश्वासार्ह ॲप्स.",
    ],
    "Polished iPhone and iPad apps that feel native.": [
      "iPhone और iPad के लिए निखरे हुए ऐप्स, जो पूरी तरह नेटिव लगते हैं।",
      "iPhone आणि iPad साठी सफाईदार ॲप्स, जे अगदी नेटिव्ह वाटतात.",
    ],
    "Website Development": ["वेबसाइट डेवलपमेंट", "वेबसाइट डेव्हलपमेंट"],
    "Responsive, lightweight websites and platforms.": [
      "हर स्क्रीन पर चलने वाली हल्की और तेज़ वेबसाइट्स व प्लेटफ़ॉर्म।",
      "सर्व स्क्रीनवर चालणाऱ्या हलक्या आणि जलद वेबसाइट्स व प्लॅटफॉर्म्स.",
    ],
    "Billing, inventory and management tools for your trade.": [
      "आपके व्यापार के लिए बिलिंग, इन्वेंटरी और मैनेजमेंट टूल्स।",
      "तुमच्या व्यवसायासाठी बिलिंग, इन्व्हेंटरी आणि व्यवस्थापन साधने.",
    ],
    "UI / UX Design": ["UI / UX डिज़ाइन", "UI / UX डिझाइन"],
    "Clean interfaces your customers enjoy using.": [
      "साफ़-सुथरे इंटरफ़ेस, जिन्हें आपके ग्राहक इस्तेमाल करना पसंद करें।",
      "स्वच्छ इंटरफेस, जे तुमच्या ग्राहकांना वापरायला आवडतील.",
    ],
    "Technical Support & Business Development": [
      "टेक्निकल सपोर्ट और बिज़नेस डेवलपमेंट",
      "टेक्निकल सपोर्ट आणि बिझनेस डेव्हलपमेंट",
    ],
    "Hosting, updates and help as you scale.": [
      "होस्टिंग, अपडेट्स और आपके बढ़ने के साथ हर तरह की मदद।",
      "होस्टिंग, अपडेट्स आणि तुमचा व्यवसाय वाढताना लागणारी मदत.",
    ],
    "Ready-to-use tools for every business.": [
      "हर बिज़नेस के लिए तैयार टूल्स।",
      "प्रत्येक व्यवसायासाठी तयार साधने.",
    ],
    Product: ["प्रॉडक्ट", "उत्पादन"],
    "A simple billing and invoicing app for businesses of every size.": [
      "हर आकार के बिज़नेस के लिए सरल बिलिंग और इनवॉइसिंग ऐप।",
      "प्रत्येक आकाराच्या व्यवसायासाठी सोपे बिलिंग आणि इनव्हॉइसिंग ॲप.",
    ],
    "Get a demo →": ["डेमो पाएँ →", "डेमो मिळवा →"],
    "Quick invoices and bills": ["तेज़ इनवॉइस और बिल", "जलद इनव्हॉइस आणि बिले"],
    "Inventory and stock tracking": [
      "इन्वेंटरी और स्टॉक ट्रैकिंग",
      "इन्व्हेंटरी आणि स्टॉक ट्रॅकिंग",
    ],
    "Customer and payment records": [
      "ग्राहक और भुगतान का रिकॉर्ड",
      "ग्राहक आणि पेमेंटच्या नोंदी",
    ],
    "Simple sales reports": ["आसान सेल्स रिपोर्ट", "सोपे सेल्स रिपोर्ट्स"],
    "Solve. Build. Grow.": ["सुलझाएँ। बनाएँ। बढ़ाएँ।", "सोडवा. बनवा. वाढवा."],
    Solve: ["सुलझाएँ", "सोडवा"],
    Build: ["बनाएँ", "बनवा"],
    Grow: ["बढ़ाएँ", "वाढवा"],
    "We listen, understand your problem and plan the right solution.": [
      "हम आपकी बात सुनते हैं, समस्या समझते हैं और सही समाधान की योजना बनाते हैं।",
      "आम्ही तुमचे ऐकतो, समस्या समजून घेतो आणि योग्य उपायाचे नियोजन करतो.",
    ],
    "We design and develop your app or website with regular updates.": [
      "हम नियमित अपडेट्स देते हुए आपका ऐप या वेबसाइट डिज़ाइन और डेवलप करते हैं।",
      "आम्ही नियमित अपडेट्स देत तुमचे ॲप किंवा वेबसाइट डिझाइन आणि डेव्हलप करतो.",
    ],
    "We launch, support and improve it as your business grows.": [
      "हम इसे लॉन्च करते हैं, सपोर्ट देते हैं और आपके बिज़नेस के बढ़ने के साथ बेहतर बनाते रहते हैं।",
      "आम्ही ते लाँच करतो, सपोर्ट देतो आणि तुमचा व्यवसाय वाढतो तसे ते सुधारत राहतो.",
    ],
    "Businesses that trust us.": [
      "जो बिज़नेस हम पर भरोसा करते हैं।",
      "आमच्यावर विश्वास ठेवणारे व्यवसाय.",
    ],
    Website: ["वेबसाइट", "वेबसाइट"],
    "Mobile App": ["मोबाइल ऐप", "मोबाइल ॲप"],
    "Online rent agreement platform that saves customers time and paperwork.": [
      "ऑनलाइन रेंट एग्रीमेंट प्लेटफ़ॉर्म, जो ग्राहकों का समय और कागज़ी कार्रवाई बचाता है।",
      "ऑनलाइन भाडेकरार प्लॅटफॉर्म, जो ग्राहकांचा वेळ आणि कागदपत्रांचे काम वाचवतो.",
    ],
    "An app to manage day-to-day business operations in one place.": [
      "रोज़ के बिज़नेस कामकाज को एक ही जगह संभालने वाला ऐप।",
      "रोजचे व्यवसायाचे कामकाज एकाच ठिकाणी सांभाळणारे ॲप.",
    ],
    "Let's build something great.": [
      "आइए, कुछ शानदार बनाएँ।",
      "चला, काहीतरी भन्नाट घडवूया.",
    ],
    "Tell us your idea — we reply fast on WhatsApp.": [
      "हमें अपना आइडिया बताइए — हम WhatsApp पर जल्दी जवाब देते हैं।",
      "तुमची कल्पना सांगा — आम्ही WhatsApp वर लवकर उत्तर देतो.",
    ],
    "📍 Parbhani & Pune, India": [
      "📍 परभणी और पुणे, भारत",
      "📍 परभणी आणि पुणे, भारत",
    ],
    Name: ["नाम", "नाव"],
    Phone: ["फ़ोन", "फोन"],
    Service: ["सेवा", "सेवा"],
    Message: ["संदेश", "संदेश"],
    "Android App": ["Android ऐप", "Android ॲप"],
    "iOS App": ["iOS ऐप", "iOS ॲप"],
    "Website / Web App": ["वेबसाइट / वेब ऐप", "वेबसाइट / वेब ॲप"],
    Other: ["अन्य", "इतर"],
    "Send on WhatsApp": ["WhatsApp पर भेजें", "WhatsApp वर पाठवा"],
    "Please enter your name, a valid phone number and a message.": [
      "कृपया अपना नाम, सही फ़ोन नंबर और संदेश दर्ज करें।",
      "कृपया तुमचे नाव, योग्य फोन नंबर आणि संदेश भरा.",
    ],

    /* ---- Who we serve ---- */
    "Who we serve": ["हम किनकी सेवा करते हैं", "आम्ही कोणाला सेवा देतो"],
    "Website & app development for local institutions and businesses.": [
      "स्थानीय संस्थानों और व्यवसायों के लिए वेबसाइट और ऐप डेवलपमेंट।",
      "स्थानिक संस्था आणि व्यवसायांसाठी वेबसाइट आणि ॲप डेव्हलपमेंट.",
    ],
    "Schools & Educational Institutes": [
      "स्कूल और शैक्षणिक संस्थान",
      "शाळा आणि शैक्षणिक संस्था",
    ],
    "School websites, admission and fee management, student and attendance apps.":
      [
        "स्कूल वेबसाइट, एडमिशन और फ़ीस मैनेजमेंट, स्टूडेंट और अटेंडेंस ऐप्स।",
        "शाळेच्या वेबसाइट्स, प्रवेश आणि फी व्यवस्थापन, विद्यार्थी आणि उपस्थिती ॲप्स.",
      ],
    "Hospitals & Clinics": ["अस्पताल और क्लिनिक", "रुग्णालये आणि क्लिनिक"],
    "Appointment booking, patient records and billing software.": [
      "अपॉइंटमेंट बुकिंग, मरीज़ रिकॉर्ड और बिलिंग सॉफ़्टवेयर।",
      "अपॉइंटमेंट बुकिंग, रुग्णांच्या नोंदी आणि बिलिंग सॉफ्टवेअर.",
    ],
    "NGOs & Organizations": ["एनजीओ और संगठन", "एनजीओ आणि संस्था"],
    "Donation websites, member management and event pages.": [
      "डोनेशन वेबसाइट, सदस्य प्रबंधन और इवेंट पेज।",
      "देणगी वेबसाइट्स, सदस्य व्यवस्थापन आणि इव्हेंट पेजेस.",
    ],
    "Shops & Retailers": ["दुकानें और रिटेलर", "दुकाने आणि किरकोळ विक्रेते"],
    "Billing apps, inventory tracking and online catalogs.": [
      "बिलिंग ऐप्स, इन्वेंटरी ट्रैकिंग और ऑनलाइन कैटलॉग।",
      "बिलिंग ॲप्स, इन्व्हेंटरी ट्रॅकिंग आणि ऑनलाइन कॅटलॉग.",
    ],
    "Salons & Parlors": ["सैलून और पार्लर", "सलून आणि पार्लर"],
    "Online booking, customer records and offers via WhatsApp.": [
      "ऑनलाइन बुकिंग, ग्राहक रिकॉर्ड और WhatsApp पर ऑफ़र।",
      "ऑनलाइन बुकिंग, ग्राहकांच्या नोंदी आणि WhatsApp वर ऑफर्स.",
    ],
    "Startups & Business Development": [
      "स्टार्टअप और बिज़नेस डेवलपमेंट",
      "स्टार्टअप आणि बिझनेस डेव्हलपमेंट",
    ],
    "Digital strategy, branding, Google presence and growth support.": [
      "डिजिटल स्ट्रैटेजी, ब्रांडिंग, Google पर उपस्थिति और ग्रोथ सपोर्ट।",
      "डिजिटल स्ट्रॅटेजी, ब्रँडिंग, Google वरील उपस्थिती आणि ग्रोथ सपोर्ट.",
    ],

    /* ---- Service areas + FAQ ---- */
    "Service areas": ["सेवा क्षेत्र", "सेवा क्षेत्रे"],
    "Software company serving Parbhani, Pune and across Maharashtra.": [
      "परभणी, पुणे और पूरे महाराष्ट्र में सेवाएँ देने वाली सॉफ़्टवेयर कंपनी।",
      "परभणी, पुणे आणि संपूर्ण महाराष्ट्रात सेवा देणारी सॉफ्टवेअर कंपनी.",
    ],
    "Solviyo provides website development, app development, technical support and business development in:":
      [
        "Solviyo इन शहरों में वेबसाइट डेवलपमेंट, ऐप डेवलपमेंट, टेक्निकल सपोर्ट और बिज़नेस डेवलपमेंट की सेवाएँ देती है:",
        "Solviyo खालील शहरांमध्ये वेबसाइट डेव्हलपमेंट, ॲप डेव्हलपमेंट, टेक्निकल सपोर्ट आणि बिझनेस डेव्हलपमेंट सेवा देते:",
      ],
    Parbhani: ["परभणी", "परभणी"],
    Jintur: ["जिंतूर", "जिंतूर"],
    Hingoli: ["हिंगोली", "हिंगोली"],
    Nanded: ["नांदेड", "नांदेड"],
    Jalna: ["जालना", "जालना"],
    "Aurangabad (Chhatrapati Sambhajinagar)": [
      "औरंगाबाद (छत्रपति संभाजीनगर)",
      "औरंगाबाद (छत्रपती संभाजीनगर)",
    ],
    Pune: ["पुणे", "पुणे"],
    "Pimpri-Chinchwad": ["पिंपरी-चिंचवड", "पिंपरी-चिंचवड"],

    "Which company does website development in Parbhani?": [
      "परभणी में वेबसाइट डेवलपमेंट कौन सी कंपनी करती है?",
      "परभणीमध्ये वेबसाइट डेव्हलपमेंट कोणती कंपनी करते?",
    ],
    "Solviyo is a software company based in Parbhani and Pune that builds websites, Android and iOS apps, and business software for local clients.":
      [
        "Solviyo परभणी और पुणे की सॉफ़्टवेयर कंपनी है, जो स्थानीय क्लाइंट्स के लिए वेबसाइट, Android और iOS ऐप्स तथा बिज़नेस सॉफ़्टवेयर बनाती है।",
        "Solviyo ही परभणी आणि पुणे येथील सॉफ्टवेअर कंपनी आहे, जी स्थानिक क्लायंट्ससाठी वेबसाइट्स, Android आणि iOS ॲप्स तसेच बिझनेस सॉफ्टवेअर बनवते.",
      ],
    "Do you build websites and apps for schools, hospitals and NGOs?": [
      "क्या आप स्कूल, अस्पताल और एनजीओ के लिए वेबसाइट और ऐप बनाते हैं?",
      "तुम्ही शाळा, रुग्णालये आणि एनजीओसाठी वेबसाइट्स आणि ॲप्स बनवता का?",
    ],
    "Yes. We build admission and fee management systems for schools, appointment and patient record tools for hospitals, donation and volunteer websites for NGOs, and booking and billing apps for shops, salons and parlors.":
      [
        "जी हाँ। हम स्कूलों के लिए एडमिशन और फ़ीस मैनेजमेंट सिस्टम, अस्पतालों के लिए अपॉइंटमेंट और मरीज़ रिकॉर्ड टूल्स, एनजीओ के लिए डोनेशन और वॉलंटियर वेबसाइट, तथा दुकानों, सैलून और पार्लर के लिए बुकिंग और बिलिंग ऐप्स बनाते हैं।",
        "होय. आम्ही शाळांसाठी प्रवेश आणि फी व्यवस्थापन प्रणाली, रुग्णालयांसाठी अपॉइंटमेंट आणि रुग्ण नोंदींची साधने, एनजीओसाठी देणगी आणि स्वयंसेवक वेबसाइट्स, तसेच दुकाने, सलून आणि पार्लरसाठी बुकिंग आणि बिलिंग ॲप्स बनवतो.",
      ],
    "Which areas do you serve?": [
      "आप किन क्षेत्रों में सेवा देते हैं?",
      "तुम्ही कोणत्या भागात सेवा देता?",
    ],
    "We serve Parbhani, Jintur, Hingoli, Nanded, Jalna, Aurangabad (Chhatrapati Sambhajinagar), Pune and Pimpri-Chinchwad, and also work with clients across Maharashtra remotely.":
      [
        "हम परभणी, जिंतूर, हिंगोली, नांदेड, जालना, औरंगाबाद (छत्रपति संभाजीनगर), पुणे और पिंपरी-चिंचवड में सेवाएँ देते हैं, और पूरे महाराष्ट्र के क्लाइंट्स के साथ रिमोटली भी काम करते हैं।",
        "आम्ही परभणी, जिंतूर, हिंगोली, नांदेड, जालना, औरंगाबाद (छत्रपती संभाजीनगर), पुणे आणि पिंपरी-चिंचवड येथे सेवा देतो, तसेच संपूर्ण महाराष्ट्रातील क्लायंट्ससोबत रिमोटली काम करतो.",
      ],
    "How can I contact Solviyo?": [
      "मैं Solviyo से कैसे संपर्क करूँ?",
      "मी Solviyo शी संपर्क कसा साधू?",
    ],
    "Message us on WhatsApp at +91 95456 89533 or email shaikhj2001@gmail.com. We reply quickly.":
      [
        "हमें WhatsApp पर +91 95456 89533 पर मैसेज करें या shaikhj2001@gmail.com पर ईमेल करें। हम जल्दी जवाब देते हैं।",
        "आम्हाला WhatsApp वर +91 95456 89533 वर संदेश पाठवा किंवा shaikhj2001@gmail.com वर ईमेल करा. आम्ही लवकर उत्तर देतो.",
      ],

    /* ---- Footer ---- */
    "Solviyo · Website & App Development in Parbhani, Pune & Maharashtra": [
      "Solviyo · परभणी, पुणे और महाराष्ट्र में वेबसाइट और ऐप डेवलपमेंट",
      "Solviyo · परभणी, पुणे आणि महाराष्ट्रातील वेबसाइट आणि ॲप डेव्हलपमेंट",
    ],
  };
  var H1 = {
    en: 'We <span class="swap"><em>solve</em><em>build</em><em>grow</em></span><br>your business<br>with great apps.',
    hi: 'हम शानदार ऐप्स से<br>आपके बिज़नेस को<br><span class="swap"><em>सँवारते</em><em>बनाते</em><em>बढ़ाते</em></span> हैं।',
    mr: 'आम्ही उत्कृष्ट ॲप्सद्वारे<br>तुमचा व्यवसाय<br><span class="swap"><em>सावरतो</em><em>घडवतो</em><em>वाढवतो</em></span>.',
  };
  var L = ["en", "hi", "mr"],
    cur = "en",
    nodes = [],
    h1 = document.getElementById("h1"),
    btns = document.querySelectorAll("#lang button");
  var w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode: function (n) {
      return n.nodeValue.trim() && !n.parentNode.closest("script,h1,svg")
        ? 1
        : 3;
    },
  });
  while (w.nextNode()) {
    var n = w.currentNode;
    n._o = n.nodeValue;
    if (D[n._o.trim()]) nodes.push(n);
  }
  window.T = function (s) {
    var i = L.indexOf(cur);
    return i && D[s] ? D[s][i - 1] : s;
  };
  function set(l) {
    cur = l;
    var i = L.indexOf(l);
    nodes.forEach(function (n) {
      var k = n._o.trim();
      n.nodeValue = n._o.replace(k, i ? D[k][i - 1] : k);
    });
    h1.innerHTML = H1[l];
    document.documentElement.lang = l;
    btns.forEach(function (b) {
      b.classList.toggle("on", b.dataset.l === l);
    });
    try {
      localStorage.setItem("lang", l);
    } catch (e) {}
  }
  btns.forEach(function (b) {
    b.onclick = function () {
      set(b.dataset.l);
    };
  });
  var s = "";
  try {
    s = localStorage.getItem("lang") || "";
  } catch (e) {}
  if (!s) {
    var nl = (navigator.language || "").slice(0, 2);
    s = nl === "hi" || nl === "mr" ? nl : "en";
  }
  set(s);

  if (window.gsap && matchMedia("(hover:hover) and (pointer:fine)").matches) {
    var ring = document.querySelector(".cur"),
      dot = document.querySelector(".cur-dot");
    document.documentElement.classList.add("has-cur");
    gsap.set([ring, dot], { opacity: 0 });
    var rx = gsap.quickTo(ring, "x", { duration: 0.45, ease: "power3" }),
      ry = gsap.quickTo(ring, "y", { duration: 0.45, ease: "power3" }),
      dx = gsap.quickTo(dot, "x", { duration: 0.1 }),
      dy = gsap.quickTo(dot, "y", { duration: 0.1 });
    addEventListener("pointermove", function (e) {
      gsap.to([ring, dot], { opacity: 1, duration: 0.3, overwrite: "auto" });
      rx(e.clientX);
      ry(e.clientY);
      dx(e.clientX);
      dy(e.clientY);
    });
    document.addEventListener("pointerover", function (e) {
      var on = !!e.target.closest("a,button,input,select,textarea,.card,.step");
      gsap.to(ring, {
        scale: on ? 1.8 : 1,
        backgroundColor: on ? "rgba(255,255,255,.25)" : "rgba(255,255,255,0)",
        duration: 0.3,
      });
    });
    addEventListener("pointerdown", function () {
      gsap.to(ring, { scale: 0.8, duration: 0.15 });
    });
    addEventListener("pointerup", function () {
      gsap.to(ring, { scale: 1, duration: 0.25 });
    });
    document.addEventListener("mouseleave", function () {
      gsap.to([ring, dot], { opacity: 0, duration: 0.2 });
    });
  }
})();
