/*!
 * The two languages of the page. English is written in index.html (London,
 * pounds); Portuguese is here (Lisboa, euros). Elements carry data-i18n="key"
 * (their content) and data-i18n-attr="attr=key,attr=key" (attributes); the
 * English is read from the page the first time we switch, so it is written
 * once. JS strings (booking, "next free", the animation) live under `js`.
 *
 * Every person, number, address and review is invented. UK numbers are in
 * Ofcom's drama range; the Portuguese ones are placeholders (210 000 000,
 * 900 000 000) and the footer says so.
 */
(function () {
  'use strict';

  var PT = {
    skip: 'Saltar para a marcação',
    brandSub: 'Clínica Dentária · Lisboa',
    navLabel: 'Principal', navTreatments: 'Tratamentos', navTeam: 'Equipa', navContact: 'Contactos', navHow: 'Como funciona', navBook: 'Marcar',
    langLabel: 'Idioma',
    heroKicker: 'Clínica dentária em Lisboa · Falamos português e inglês',
    heroTitle: 'Medicina dentária tranquila e honesta. <em>Marcada num minuto.</em>',
    heroLede: 'Consultas de rotina, higienização, branqueamento, implantes e alinhadores invisíveis, com preços claros e por escrito antes de começar. Consultas de urgência todas as manhãs, de segunda a sexta.',
    heroCta: 'Marcar primeira consulta', heroEmergency: 'Urgência dentária?',
    chipsLabel: 'Bom saber', chip1: 'Consultas ao fim do dia e ao sábado', chip2: 'Pagamento em prestações', chip3: 'Lembretes por WhatsApp',
    nextLabel: 'Próxima vaga para primeira consulta', nextChecking: 'A consultar a agenda…', nextGo: 'Marcar esta hora',

    treatTitle: 'Tratamentos e preços',
    treatLede: 'Todos os preços estão nesta página. Os planos de tratamento maiores têm sempre orçamento escrito, e só avança quando quiser.',
    bookBtn: 'Marcar', bookFree: 'Consulta gratuita', bookConsult: 'Marcar consulta',
    t1Name: 'Primeira consulta', t1Desc: 'Avaliação completa, radiografias se forem precisas e um plano escrito com preços. 45 minutos.', t1Price: '45 €',
    t2Name: 'Consulta de rotina', t2Desc: 'Para pacientes da clínica. 30 minutos, e avisamos quando for altura da próxima.', t2Price: '40 €',
    t3Name: 'Higienização oral', t3Desc: 'Destartarização e polimento com a Marta, com conselhos simples para casa. Manhãs cedo, quartas ao fim do dia e sábados.', t3Price: '60 €',
    t4Name: 'Branqueamento dentário', t4Desc: 'Branqueamento em casa com goteiras feitas à sua medida, cerca de duas semanas. A consulta é gratuita.', t4Price: 'desde 290 €',
    t5Name: 'Implantes dentários', t5Desc: 'Uma solução fixa e natural para um dente em falta. Consulta com exame 3D e plano escrito: 80 €, com sinal de 30 € na marcação.', t5Price: 'desde 1350 € por dente',
    t6Name: 'Alinhadores invisíveis', t6Desc: 'Dentes alinhados com aparelho invisível. Consulta gratuita com digitalização e simulação do resultado.', t6Price: 'desde 2500 €',
    t7Name: 'Facetas em resina', t7Desc: 'Corrige pequenas fraturas e espaços entre dentes, normalmente numa só consulta. O preço é dado na consulta.', t7Price: 'desde 150 € por dente',
    t8Name: 'Consulta de urgência', t8Desc: 'Atendido no próprio dia: guardamos vagas todas as manhãs, de segunda a sexta.', t8Price: '70 €',

    urgTitle: 'Dor de dentes ou um dente partido?',
    urgText: 'Guardamos vagas de urgência todas as manhãs, de segunda a sexta. Marque já online ou ligue a partir das 8h30. Se nos escrever fora de horas, recebe logo uma resposta com a primeira vaga.',
    urgOoh: 'Fora de horas e não pode esperar? Ligue para o SNS 24: 808 24 24 24.',
    urgBook: 'Marcar consulta de urgência', urgCall: 'Ligar 210 000 000',

    teamTitle: 'Quem o vai atender', teamLede: 'Três médicos dentistas e uma higienista, todos à vontade em português ou inglês.',
    p1Name: 'Dr.ª Inês Valadares', p1Role: 'Diretora clínica · implantologia', p1Text: 'A Inês abriu a Alvura para ser a clínica que queria para a própria família: pontual e clara nos preços. Acompanha pessoalmente todos os casos de implantes.', p1Days: 'Seg., ter., qui., sex. de manhã',
    p2Name: 'Dr. Tomás Brandão', p2Role: 'Ortodontia · alinhadores invisíveis', p2Text: 'Responsável pela consulta de alinhadores, com digitalização e simulação do resultado logo na primeira consulta.', p2Days: 'Ter. e qua. até às 19h, sáb. de manhã',
    p3Name: 'Dr.ª Hannah Whitcombe', p3Role: 'Dentisteria e estética', p3Text: 'Consultas de rotina, branqueamento e facetas, e as urgências na maioria das manhãs. Aprendeu português no Porto.', p3Days: 'Seg., qua., qui., sex.',
    p4Name: 'Marta Sequeira', p4Role: 'Higienista oral', p4Text: 'Cuidadosa, minuciosa e sem sermões. Peça-lhe a forma mais fácil de limpar entre os dentes.', p4Days: 'Seg. a sáb., qua. até às 19h',

    bookTitle: 'Marcar consulta',
    bookLede: 'Escolha a consulta e a hora. Recebe a confirmação de imediato e um lembrete na véspera, com um link para confirmar ou remarcar.',
    fWhere: 'Onde', fWhereV: 'Rua das Janelas Claras 12, 1200 Lisboa', fPay: 'Pagamento', fPayV: 'Cartão, MB WAY ou Multibanco na clínica',
    fDeposit: 'Sinal', fDepositV: 'Só na consulta de implantes, descontado no valor', fChanges: 'Alterações', fChangesV: 'Sem custos até 24 horas antes',

    payTitle: 'Preços claros, por escrito',
    payText: 'Cada plano de tratamento chega como orçamento escrito antes de começar, e pode aceitá-lo online quando estiver pronto. Planos acima de 1000 € podem ser pagos em prestações mensais, sujeito a aprovação.',
    pay1: 'Orçamento escrito em cada plano de tratamento', pay2: 'Prestações mensais em planos acima de 1000 €', pay3: 'Cartão, MB WAY e Multibanco', pay4: 'Remarcar não tem custos com 24 horas de antecedência',

    revTitle: 'O que dizem os pacientes', revBadge: 'Avaliações de exemplo (demo)', revTag: 'Exemplo (demo)',
    revNote: 'Estas avaliações foram escritas para esta demonstração. No site de uma clínica real, aqui aparecem as avaliações do Google da própria clínica, que o sistema pede depois de cada consulta.',
    r1: 'O lembrete na véspera salvou-me, e marcar online levou um minuto.', r1By: 'Paciente de exemplo, Campo de Ourique',
    r2: 'Plano claro para os alinhadores, com o preço por escrito e sem pressão nenhuma.', r2By: 'Paciente de exemplo, Alvalade',
    r3: 'Liguei com dores às 8h30 e fui atendida na mesma manhã.', r3By: 'Paciente de exemplo, Benfica',

    howEyebrow: 'Para donos de clínicas · o que acontece por trás deste site',
    howTitle: 'Como funciona o sistema por trás deste site',
    howLede: 'Oito coisas que acontecem sem ninguém na receção ter de fazer nada. Cada uma é uma automatização que a clínica pode ler, alterar ou desligar.',
    howCrm: 'No CRM', howPrev: 'Passo anterior', howNext: 'Passo seguinte',
    howNote: 'As horas e as mensagens são exemplos. Cada mensagem é enviada na língua do paciente, e nenhuma leva dados de saúde.',

    askTitle: 'Novo paciente? Pergunte-nos',
    askLede: 'Diga-nos o que procura e quando lhe dá jeito. Respondemos no mesmo dia útil, em português ou inglês.',
    askPrivacy: 'Por favor não inclua dados clínicos. Falamos da sua saúde em privado, na consulta.',
    fName: 'Nome', fMobile: 'Telemóvel', fEmail: 'Email', fInterest: 'Interesse',
    o1: 'Primeira consulta', o2: 'Higienização oral', o3: 'Branqueamento', o4: 'Implantes', o5: 'Alinhadores invisíveis', o6: 'Facetas em resina', o7: 'Ainda não sei',
    fWhen: 'Melhor altura para o contactarmos', w1: 'Manhã', w2: 'Tarde', w3: 'Depois das 18h',
    fMessage: 'A sua mensagem', fMessagePh: 'Por exemplo: gostava de marcar uma consulta de rotina num sábado de manhã.',
    fOptIn: 'Quero receber novidades e campanhas por email (opcional). Os lembretes de consulta são à parte, e pode deixar de receber qualquer um quando quiser.',
    fSend: 'Enviar pedido', fFine: 'Usamos estes dados apenas para lhe responder e gerir as suas consultas.',

    visitTitle: 'Onde estamos',
    visitText: 'A cinco minutos a pé do metro do Rato. Acesso sem degraus e gabinete no rés-do-chão, se precisar.',
    visitAddr: 'Rua das Janelas Claras 12<br>1200 Lisboa',
    visitPhone: '210 000 000', visitEmail: 'ola@alvura-dental.example', visitEmailHref: 'mailto:ola@alvura-dental.example',
    hMonFri: 'Segunda a sexta', hMonFriV: '8h30 às 19h00', hSat: 'Sábado', hSatV: '9h00 às 13h00', hSun: 'Domingo', hSunV: 'Encerrado',
    mapLabel: 'Alvura Dental · Lisboa',
    footAddr: 'Rua das Janelas Claras 12, 1200 Lisboa',
    footDemo: 'Site de demonstração de uma clínica fictícia, criado pela Autisync. Os números de telefone portugueses (210 000 000, 900 000 000) e os emails .example são fictícios (demo).',

    waLabel: 'WhatsApp', waTitle: 'Fale connosco por WhatsApp', waNumber: '+351 900 000 000', close: 'Fechar',
    waText: 'No site real da clínica, este botão abre uma conversa de WhatsApp com a receção. A conversa entra na caixa de entrada do CRM e, fora de horas, o paciente recebe logo uma resposta com um link para marcar.',
    waDemo: 'Isto é uma demonstração: o número é fictício e o WhatsApp não abre.',
    waForm: 'Enviar mensagem por aqui',
    demoNoteLabel: 'Sobre este site',
    demoNote: '<b>Site de demonstração</b> de uma clínica inventada, criado pela <a href="https://autisync.com" target="_blank" rel="noopener">Autisync</a>. As marcações e mensagens feitas aqui entram no CRM da Autisync.',
    demoClean: 'Vista limpa',
    demoShort: '<b>Demo</b> · Autisync',
    demoHide: 'Esconder esta nota',
  };

  // Words used by the scripts.
  var JS = {
    en: {
      title: 'Alvura Dental Clinic | Dentist in Stockwell, London',
      description: 'Private dental clinic in Stockwell, London, in English and Portuguese. Check-ups, hygienist, whitening, implants and clear aligners, with same-day emergency appointments. Book online.',
      tel: 'tel:+442079460321',
      zoneOpen: 'Europe/London',
      openNow: function (until) { return 'Open now, until ' + until; },
      opensAt: function (when, at) { return 'Closed now. Opens ' + when + ' at ' + at; },
      today: 'today', tomorrow: 'tomorrow',
      days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      hhmm: function (hm) { var h = +hm.slice(0, 2), m = hm.slice(3); return (h % 12 || 12) + (m === '00' ? '' : ':' + m) + (h < 12 ? 'am' : 'pm'); },
      withStaff: function (n) { return 'with ' + n; },
      needName: 'Please add your name.', badEmail: 'That email address doesn\'t look right.', sending: 'Sending…',
      thanks: 'Thank you. We\'ll reply today, or first thing tomorrow if it\'s after 6pm.',
      failed: 'That didn\'t send. Please try again, or call us.',
      phoneDemo: 'Demo number: on a real clinic site this calls reception. If nobody can pick up, the caller gets a WhatsApp or text back within seconds.',
      phoneClean: 'This is a demo website: the number is fictional.',
      play: 'Play', pause: 'Pause', replay: 'Play again',
      booking: {
        steps: ['Appointment', 'Day and time', 'Your details', 'Confirm'],
        notesPh: 'Anything practical: access, a preferred dentist, the language you prefer. Please no medical details.',
        powered: 'Booked straight into the clinic diary',
        zone: 'UK time', locale: 'en-GB', hour12: true,
      },
    },
    pt: {
      title: 'Alvura Dental Clinic | Dentista em Lisboa',
      description: 'Clínica dentária em Lisboa, em português e inglês. Consultas, higienização oral, branqueamento, implantes e alinhadores invisíveis, com urgências no próprio dia. Marcação online.',
      tel: 'tel:+351210000000',
      zoneOpen: 'Europe/Lisbon',
      openNow: function (until) { return 'Aberto agora, até às ' + until; },
      opensAt: function (when, at) { return 'Fechado agora. Abre ' + when + ' às ' + at; },
      today: 'hoje', tomorrow: 'amanhã',
      days: ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado'],
      hhmm: function (hm) { var h = +hm.slice(0, 2), m = hm.slice(3); return h + 'h' + (m === '00' ? '' : m); },
      withStaff: function (n) { return 'com ' + n; },
      needName: 'Indique o seu nome, por favor.', badEmail: 'Esse email não parece estar certo.', sending: 'A enviar…',
      thanks: 'Obrigado. Respondemos hoje, ou amanhã logo de manhã se já passar das 18h.',
      failed: 'Não foi possível enviar. Tente de novo ou ligue-nos.',
      phoneDemo: 'Número de demonstração: no site real da clínica, isto liga para a receção. Se ninguém puder atender, quem ligou recebe uma mensagem de WhatsApp ou SMS em segundos.',
      phoneClean: 'Este é um site de demonstração: o número é fictício.',
      play: 'Reproduzir', pause: 'Pausa', replay: 'Ver de novo',
      booking: {
        steps: ['Consulta', 'Dia e hora', 'Os seus dados', 'Confirmar'],
        loading: 'A carregar a agenda…',
        down: 'Não conseguimos abrir a agenda agora. Por favor ligue-nos.',
        free: 'Grátis', whoWith: 'Com quem?', anyone: 'Primeiro disponível', chooseTime: 'Escolher hora',
        earlier: 'Dias anteriores', later: 'Dias seguintes',
        closed: 'Fechado', full: 'Cheio', today: 'Hoje', tomorrow: 'Amanhã',
        freeN: function (n) { return n + (n === 1 ? ' vaga' : ' vagas'); },
        pickDay: 'Escolha um dia para ver as horas livres.',
        noTimes: 'Não há vagas neste dia. Experimente o seguinte.',
        zone: 'hora de Lisboa', locale: 'pt-PT', hour12: false,
        dayShort: function (d) { return ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'][d]; },
        cont: 'Continuar', back: 'Voltar',
        name: 'O seu nome', email: 'Email', phone: 'Telemóvel', optional: 'opcional',
        notes: 'Algo que devamos saber?', notesPh: 'Questões práticas: acessos, médico preferido, língua. Por favor sem dados clínicos.',
        review: 'Rever e confirmar', needName: 'Indique o seu nome, por favor.', needEmail: 'Esse email não parece estar certo.', needPhone: 'Indique um telemóvel para o podermos contactar no dia.',
        summary: 'A sua marcação', what: 'Consulta', when: 'Quando', with: 'Com', who: 'Nome', mail: 'Email', price: 'Preço',
        payOnDay: 'Pago na clínica',
        payOnline: 'Esta consulta tem um sinal a pagar online. Termina a marcação na nossa página segura.',
        payBtn: 'Continuar para pagamento',
        confirm: 'Confirmar marcação', sending: 'A marcar…',
        doneTitle: 'Está marcado.',
        doneText: function (e) { return 'Enviámos a confirmação para ' + e + ', com um link para alterar ou cancelar. Na véspera recebe um lembrete.'; },
        another: 'Marcar outra consulta',
        taken: 'Alguém acabou de marcar essa hora. Escolha outra, por favor.',
        powered: 'Marcado diretamente na agenda da clínica',
        bookedOn: 'Marcado em ',
        withName: function (n) { return 'com ' + n; },
        when2: function (day, time) { return day + ' às ' + time; },
        mins: function (m) { return m % 60 === 0 ? (m / 60) + (m === 60 ? ' hora' : ' horas') : m > 60 ? Math.floor(m / 60) + ' h ' + (m % 60) + ' min' : m + ' min'; },
      },
    },
  };

  // How the page shows each appointment type. The CRM keeps one name per
  // service (English in the London account, Portuguese in the Lisboa one);
  // `names` matches either, so the page works with both accounts.
  var SERVICES = [
    { key: 'newpatient', names: ['New patient consultation', 'Primeira consulta'],
      en: { name: 'New patient consultation', description: 'A full check-up, any X-rays you need and a written plan with prices.', price: '£85' },
      pt: { name: 'Primeira consulta', description: 'Avaliação completa, radiografias se forem precisas e um plano escrito com preços.', price: '45 €' } },
    { key: 'checkup', names: ['Check-up', 'Consulta de rotina'],
      en: { name: 'Check-up', description: 'For patients of the clinic. We remind you when the next one is due.', price: '£65' },
      pt: { name: 'Consulta de rotina', description: 'Para pacientes da clínica. Avisamos quando for altura da próxima.', price: '40 €' } },
    { key: 'hygiene', names: ['Hygienist appointment', 'Higienização oral'],
      en: { name: 'Hygienist appointment', description: 'Scale and polish with Marta, with advice for home.', price: '£85' },
      pt: { name: 'Higienização oral', description: 'Destartarização e polimento com a Marta, com conselhos para casa.', price: '60 €' } },
    { key: 'emergency', names: ['Emergency appointment', 'Consulta de urgência'],
      en: { name: 'Emergency appointment', description: 'Same-day appointments kept free every weekday morning.', price: '£95' },
      pt: { name: 'Consulta de urgência', description: 'Vagas para o próprio dia todas as manhãs, de segunda a sexta.', price: '70 €' } },
    { key: 'whitening', names: ['Whitening consultation', 'Consulta de branqueamento'],
      en: { name: 'Whitening consultation', description: 'Free. We check whitening suits you and show you the options and prices.', price: null },
      pt: { name: 'Consulta de branqueamento', description: 'Gratuita. Vemos se o branqueamento é indicado e mostramos opções e preços.', price: null } },
    { key: 'aligner', names: ['Clear aligner consultation', 'Consulta de alinhadores invisíveis'],
      en: { name: 'Clear aligner consultation', description: 'Free, with a digital scan and a preview of your result.', price: null },
      pt: { name: 'Consulta de alinhadores invisíveis', description: 'Gratuita, com digitalização e simulação do resultado.', price: null } },
    { key: 'implant', names: ['Implant consultation', 'Consulta de implantes'],
      en: { name: 'Implant consultation', description: 'With Dr Valadares: a 3D scan, the options and a written plan. £50 deposit when you book, deducted from the fee.', price: '£150' },
      pt: { name: 'Consulta de implantes', description: 'Com a Dr.ª Valadares: exame 3D, opções e plano escrito. Sinal de 30 € na marcação, descontado no valor.', price: '80 €' } },
  ];

  // The team as each language addresses them.
  var STAFF = {
    'Inês Valadares': { en: 'Dr Inês Valadares', pt: 'Dr.ª Inês Valadares' },
    'Tomás Brandão': { en: 'Dr Tomás Brandão', pt: 'Dr. Tomás Brandão' },
    'Hannah Whitcombe': { en: 'Dr Hannah Whitcombe', pt: 'Dr.ª Hannah Whitcombe' },
    'Marta Sequeira': { en: 'Marta Sequeira', pt: 'Marta Sequeira' },
  };

  var originals = new Map();
  function original(el, key) {
    if (!originals.has(el)) originals.set(el, {});
    var o = originals.get(el);
    return o;
  }

  function applyLang(lang) {
    lang = lang === 'pt' ? 'pt' : 'en';
    var root = document.documentElement;
    root.setAttribute('data-lang', lang);
    root.lang = lang === 'pt' ? 'pt-PT' : 'en-GB';
    Array.prototype.forEach.call(document.querySelectorAll('[data-i18n]'), function (el) {
      var o = original(el);
      if (!('html' in o)) o.html = el.innerHTML;
      var v = lang === 'pt' ? PT[el.getAttribute('data-i18n')] : null;
      el.innerHTML = v != null ? v : o.html;
    });
    Array.prototype.forEach.call(document.querySelectorAll('[data-i18n-attr]'), function (el) {
      var o = original(el);
      el.getAttribute('data-i18n-attr').split(',').forEach(function (pair) {
        var p = pair.split('='), attr = p[0].trim(), key = (p[1] || '').trim();
        if (!(('a:' + attr) in o)) o['a:' + attr] = el.getAttribute(attr);
        var v = lang === 'pt' ? PT[key] : null;
        if (v != null) el.setAttribute(attr, v); else if (o['a:' + attr] != null) el.setAttribute(attr, o['a:' + attr]);
      });
    });
    var js = JS[lang];
    document.title = js.title;
    var md = document.querySelector('meta[name="description"]'); if (md) md.setAttribute('content', js.description);
    Array.prototype.forEach.call(document.querySelectorAll('[data-phone]'), function (a) { a.setAttribute('href', js.tel); });
    Array.prototype.forEach.call(document.querySelectorAll('[data-set-lang]'), function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-set-lang') === lang)); });
    Array.prototype.forEach.call(document.querySelectorAll('input[name="language"]'), function (i) { i.value = lang; });
    root.setAttribute('data-i18n-ready', '');
    try { document.dispatchEvent(new CustomEvent('langchange', { detail: { lang: lang } })); } catch (e) { /* old browsers */ }
  }

  window.I18N = { pt: PT, js: JS, services: SERVICES, staff: STAFF, apply: applyLang, lang: function () { return document.documentElement.getAttribute('data-lang') === 'pt' ? 'pt' : 'en'; } };
})();
