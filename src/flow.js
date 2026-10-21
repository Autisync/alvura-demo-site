/*!
 * "How the system works behind this site": the chain a patient goes through,
 * played as a phone conversation with what the CRM does at each step.
 * Plays when it scrolls into view, pauses when it leaves; play/pause,
 * previous/next and every step can be pressed, so it can be narrated on a
 * sales call. With prefers-reduced-motion it never plays by itself.
 * The follow-ups shown are the ones the CRM's dental playbook installs.
 */
(function () {
  'use strict';
  var root = document.querySelector('[data-flow]');
  if (!root || document.documentElement.hasAttribute('data-clean')) return;

  var I = window.I18N;
  var lang = function () { return I.lang(); };
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var ICON = {
    call: 'M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2',
    reply: 'M4 5h16v11H9l-5 4zM12 7.5l-2 3.5h4l-2 3.5',
    book: 'M4 6h16v14H4zM4 10h16M9 3v4M15 3v4M9 15l2 2 4-4',
    remind: 'M6 16v-5a6 6 0 1 1 12 0v5l2 2H4zM10 20a2 2 0 0 0 4 0',
    noshow: 'M4 6h16v14H4zM4 10h16M10 13l4 4m0-4-4 4',
    review: 'M12 3l2.8 5.7 6.2.9-4.5 4.4 1 6.2-5.5-2.9-5.5 2.9 1-6.2L3 9.6l6.2-.9z',
    recall: 'M20 11a8 8 0 1 0-2.3 5.7M20 4v7h-7',
    plan: 'M7 3h7l5 5v13H7zM14 3v5h5M10 13h6M10 17h6',
  };

  // k: in (the patient), out (the clinic, sent automatically), sys (an event).
  var STEPS = [
    { icon: 'call', channel: 'WhatsApp',
      title: { en: 'A missed call, or a WhatsApp after hours', pt: 'Uma chamada perdida, ou WhatsApp fora de horas' },
      sub: { en: '9:14pm. Reception has gone home.', pt: '21h14. A receção já saiu.' },
      chat: [
        { k: 'sys', en: 'Missed call · 9:14pm', pt: 'Chamada não atendida · 21h14' },
        { k: 'in', en: 'Hi! Do you do clear aligners? How much is the consultation?', pt: 'Olá! Fazem alinhadores invisíveis? Quanto custa a consulta?', t: { en: '9:15pm', pt: '21:15' } },
      ],
      crm: { en: 'New conversation in the inbox, marked WhatsApp. The person is saved as a new enquiry, with where they came from.', pt: 'Nova conversa na caixa de entrada, marcada como WhatsApp. A pessoa fica registada como novo pedido, com a origem.' } },
    { icon: 'reply', channel: 'WhatsApp',
      title: { en: 'An instant reply', pt: 'Resposta imediata' },
      sub: { en: 'Within seconds, in their language', pt: 'Em segundos, na língua do paciente' },
      chat: [
        { k: 'in', en: 'Hi! Do you do clear aligners? How much is the consultation?', pt: 'Olá! Fazem alinhadores invisíveis? Quanto custa a consulta?', t: { en: '9:15pm', pt: '21:15' } },
        { k: 'out', en: 'Hi Sara! Thanks for messaging Alvura Dental. Yes, and the aligner consultation is free. We\'re closed now, but you can book straight away: alvura.example/book', pt: 'Olá Sara! Obrigado pela mensagem à Alvura Dental. Sim, e a consulta de alinhadores é gratuita. Agora estamos fechados, mas pode marcar já: alvura.example/marcar', t: { en: '9:15pm', pt: '21:15' }, auto: true },
      ],
      crm: { en: 'Reply sent by itself. Reception also gets a task to follow up personally in the morning.', pt: 'Resposta enviada automaticamente. A receção recebe também uma tarefa para dar seguimento pessoalmente de manhã.' } },
    { icon: 'book', channel: 'WhatsApp',
      title: { en: 'Appointment booked', pt: 'Consulta marcada' },
      sub: { en: 'From the link, at 9:17pm', pt: 'Pelo link, às 21h17' },
      chat: [
        { k: 'sys', en: 'Booked online · 9:17pm', pt: 'Marcado online · 21h17' },
        { k: 'out', en: 'You\'re booked in ✓ Clear aligner consultation, Thursday at 6pm with Dr Brandão. Change or cancel: alvura.example/b/7Q2', pt: 'Está marcado ✓ Consulta de alinhadores, quinta-feira às 18h00 com o Dr. Tomás Brandão. Alterar ou cancelar: alvura.example/b/7Q2', t: { en: '9:17pm', pt: '21:17' }, auto: true },
      ],
      crm: { en: 'In the diary as confirmed, with Dr Brandão. Her deal moves to "Consultation booked".', pt: 'Na agenda como confirmada, com o Dr. Tomás. O negócio passa para "Consulta marcada".' } },
    { icon: 'remind', channel: 'WhatsApp',
      title: { en: 'Reminder the day before', pt: 'Lembrete na véspera' },
      sub: { en: 'Confirm or move it in one tap', pt: 'Confirmar ou remarcar num toque' },
      chat: [
        { k: 'out', en: 'Reminder: your appointment is tomorrow at 6pm with Dr Brandão. Confirm or move it here: alvura.example/b/7Q2', pt: 'Lembrete: a sua consulta é amanhã às 18h00 com o Dr. Tomás Brandão. Confirme ou remarque aqui: alvura.example/b/7Q2', t: { en: 'Wed 6pm', pt: 'qua. 18:00' }, auto: true },
        { k: 'sys', en: 'Sara confirmed', pt: 'A Sara confirmou' },
      ],
      crm: { en: 'Confirmed by the patient. A moved appointment frees the time for someone else, so the chair isn\'t empty.', pt: 'Confirmada pela paciente. Uma consulta remarcada liberta a hora para outra pessoa, e a cadeira não fica vazia.' } },
    { icon: 'noshow', channel: 'WhatsApp',
      title: { en: 'If they don\'t turn up', pt: 'Se o paciente faltar' },
      sub: { en: 'A friendly rebooking message', pt: 'Uma mensagem simpática para remarcar' },
      chat: [
        { k: 'sys', en: 'Marked as no-show · 6:20pm', pt: 'Marcado como falta · 18h20' },
        { k: 'out', en: 'We missed you today, Sara. These things happen! Would you like a new time? alvura.example/book', pt: 'Sentimos a sua falta hoje, Sara. Acontece! Quer marcar outra hora? alvura.example/marcar', t: { en: '7:20pm', pt: '19:20' }, auto: true },
        { k: 'in', en: 'So sorry, work ran late. Booked for Saturday!', pt: 'Peço desculpa, saí tarde do trabalho. Já marquei para sábado!', t: { en: '7:31pm', pt: '19:31' } },
      ],
      crm: { en: 'Sent an hour after the no-show, and only if she hasn\'t booked again by then.', pt: 'Enviada uma hora depois da falta, e só se a paciente ainda não tiver remarcado.' } },
    { icon: 'review', channel: 'WhatsApp',
      title: { en: 'Review request after the visit', pt: 'Pedido de avaliação depois da consulta' },
      sub: { en: 'Three hours later', pt: 'Três horas depois' },
      chat: [
        { k: 'sys', en: 'Appointment completed · Saturday', pt: 'Consulta concluída · sábado' },
        { k: 'out', en: 'Thanks for coming in today, Sara! If you have a minute, a Google review helps other patients find us: g.page/alvura', pt: 'Obrigado pela visita de hoje, Sara! Se tiver um minuto, uma avaliação no Google ajuda outros pacientes a encontrar-nos: g.page/alvura', t: { en: '1:05pm', pt: '13:05' }, auto: true },
        { k: 'in', en: 'Done ⭐⭐⭐⭐⭐', pt: 'Feito ⭐⭐⭐⭐⭐', t: { en: '1:40pm', pt: '13:40' } },
      ],
      crm: { en: 'Every patient is asked the same way. New reviews arrive in Reputation, where the clinic replies.', pt: 'Todos os pacientes recebem o mesmo pedido. As avaliações novas aparecem em Reputação, onde a clínica responde.' } },
    { icon: 'recall', channel: 'WhatsApp',
      title: { en: '6-month recall', pt: 'Recall aos 6 meses' },
      sub: { en: 'When the next check-up is due', pt: 'Quando chega a altura da próxima consulta' },
      chat: [
        { k: 'sys', en: 'Six months after her check-up', pt: 'Seis meses depois da consulta' },
        { k: 'out', en: 'Hi Sara, it\'s been six months since your last visit, so your check-up and hygienist appointment are due. Choose a time: alvura.example/book', pt: 'Olá Sara, já passaram seis meses desde a última visita: está na altura da consulta de rotina e da higienização. Escolha a hora: alvura.example/marcar', t: { en: '10:00am', pt: '10:00' }, auto: true },
        { k: 'sys', en: 'Booked: hygienist, Tuesday 8:30am', pt: 'Marcado: higienização, terça às 8h30' },
      ],
      crm: { en: 'Sent only to patients who haven\'t booked one already, so nobody is chased twice.', pt: 'Enviado só a quem ainda não marcou, para ninguém ser contactado duas vezes.' } },
    { icon: 'plan', channel: 'Email',
      title: { en: 'Treatment plan follow-up', pt: 'Seguimento do plano de tratamento' },
      sub: { en: 'Two days after the plan, if it\'s still open', pt: 'Dois dias depois do plano, se continuar em aberto' },
      chat: [
        { k: 'sys', en: 'Plan sent: clear aligners, £3,200', pt: 'Plano enviado: alinhadores, 2680 €' },
        { k: 'out', en: 'Hi Sara, did you get a chance to look at your aligner plan? Happy to answer any questions, or to talk about monthly payments.', pt: 'Olá Sara, já teve oportunidade de ver o plano dos alinhadores? Estamos à disposição para dúvidas, ou para falar de pagamento em prestações.', t: { en: 'Mon 10am', pt: 'seg. 10:00' }, auto: true },
        { k: 'in', en: 'Yes! Monthly would be great. Can I accept online?', pt: 'Sim! Em prestações dava jeito. Posso aceitar online?', t: { en: 'Mon 12pm', pt: 'seg. 12:00' } },
      ],
      crm: { en: 'Not accepted after four more days? A task for the dentist to call. Accepted online? The deal is won and the invoice is ready.', pt: 'Não aceite passados mais quatro dias? Uma tarefa para o médico ligar. Aceite online? O negócio fica ganho e a fatura pronta.' } },
  ];

  var WORDS = {
    en: { auto: 'Sent automatically', step: 'Step', of: 'of' },
    pt: { auto: 'Enviada automaticamente', step: 'Passo', of: 'de' },
  };

  var list = root.querySelector('[data-flow-steps]');
  var chat = root.querySelector('[data-flow-chat]');
  var crm = root.querySelector('[data-flow-crm]');
  var channel = root.querySelector('[data-flow-channel]');
  var caption = root.querySelector('[data-flow-caption]');
  var playBtn = root.querySelector('[data-flow-play]');
  var playLabel = root.querySelector('[data-flow-play-label]');

  var at = 0, playing = false, userPaused = false, timer = null, startedAt = 0, remaining = 0, finished = false;
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function lengthOf(i) { return 2600 + STEPS[i].chat.length * 1200; }

  function renderList() {
    var L = lang();
    list.innerHTML = STEPS.map(function (s, i) {
      return '<li class="fs" data-i="' + i + '"><button type="button" data-go="' + i + '"' + (i === at ? ' aria-current="step"' : '') + '>' +
        '<span class="fs-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="' + ICON[s.icon] + '"/></svg></span>' +
        '<span class="fs-text"><b><span class="fs-n">' + (i + 1) + '.</span> ' + esc(s.title[L]) + '</b><small>' + esc(s.sub[L]) + '</small></span>' +
        '<i class="fs-bar" aria-hidden="true"></i></button></li>';
    }).join('');
    mark();
  }
  function mark() {
    Array.prototype.forEach.call(list.children, function (li, i) {
      li.setAttribute('data-state', i < at ? 'done' : i === at ? 'now' : 'next');
      var b = li.querySelector('button');
      if (i === at) b.setAttribute('aria-current', 'step'); else b.removeAttribute('aria-current');
      var bar = li.querySelector('.fs-bar');
      bar.style.animation = 'none';
      if (i === at && playing && !reduce) {
        void bar.offsetWidth; // restart the fill
        bar.style.animation = 'fs-fill ' + remaining + 'ms linear forwards';
      }
    });
    root.style.setProperty('--flow-p', String((at + 1) / STEPS.length));
  }
  function renderStage(animate) {
    var L = lang(), s = STEPS[at];
    channel.textContent = s.channel;
    if (caption) caption.innerHTML = '<b>' + (at + 1) + '/' + STEPS.length + '</b> ' + esc(s.title[L]);
    chat.innerHTML = s.chat.map(function (m, i) {
      var d = animate && !reduce ? ' style="--d:' + (0.25 + i * 0.9) + 's"' : '';
      if (m.k === 'sys') return '<p class="b b-sys"' + d + '>' + esc(m[L]) + '</p>';
      return '<div class="b b-' + m.k + '"' + d + '><p>' + esc(m[L]) + '</p><small>' +
        (m.auto ? '<span class="b-auto">' + esc(WORDS[L].auto) + '</span> · ' : '') + esc(m.t ? m.t[L] : '') + (m.k === 'out' ? ' ✓✓' : '') + '</small></div>';
    }).join('');
    crm.innerHTML = '<span class="crm-step">' + esc(WORDS[L].step + ' ' + (at + 1) + ' ' + WORDS[L].of + ' ' + STEPS.length) + '</span>' + esc(s.crm[L]);
    crm.classList.remove('crm-flash'); void crm.offsetWidth; if (animate && !reduce) crm.classList.add('crm-flash');
  }
  function setLabel() {
    var w = I.js[lang()];
    playLabel.textContent = playing ? w.pause : finished ? w.replay : w.play;
    playBtn.setAttribute('aria-pressed', String(playing));
    root.setAttribute('data-playing', playing ? 'true' : 'false');
  }

  function go(i, animate) {
    at = (i + STEPS.length) % STEPS.length;
    finished = false;
    remaining = lengthOf(at);
    renderStage(animate !== false);
    mark();
    if (playing) schedule();
    setLabel();
  }
  function schedule() {
    clearTimeout(timer);
    startedAt = Date.now();
    timer = setTimeout(function () {
      if (at === STEPS.length - 1) { stop(); finished = true; setLabel(); return; }
      go(at + 1);
    }, remaining);
  }
  function play() {
    if (finished) { at = -1; finished = false; playing = true; go(0); return; }
    playing = true;
    if (!remaining) remaining = lengthOf(at);
    schedule(); mark(); setLabel();
  }
  function stop() {
    if (playing) remaining = Math.max(400, remaining - (Date.now() - startedAt));
    playing = false; clearTimeout(timer);
    Array.prototype.forEach.call(list.querySelectorAll('.fs-bar'), function (b) { b.style.animationPlayState = 'paused'; });
    setLabel();
  }

  playBtn.addEventListener('click', function () { if (playing) { userPaused = true; stop(); } else { userPaused = false; play(); } });
  root.querySelector('[data-flow-prev]').addEventListener('click', function () { go(at - 1); });
  root.querySelector('[data-flow-next]').addEventListener('click', function () { go(at + 1); });
  list.addEventListener('click', function (e) {
    var b = e.target.closest('[data-go]');
    if (b) go(Number(b.getAttribute('data-go')));
  });

  renderList();
  go(0, false);

  // Play when it is on screen; never by itself with reduced motion.
  if ('IntersectionObserver' in window && !reduce) {
    new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting && !playing && !userPaused && !finished) { if (at === 0) go(0); play(); }
        else if (!e.isIntersecting && playing) stop();
      });
    }, { threshold: 0.2 }).observe(root);
  }

  document.addEventListener('langchange', function () { renderList(); renderStage(false); setLabel(); });
  window.AlvuraFlow = { go: function (i) { go(i); }, play: play, stop: stop };
})();
