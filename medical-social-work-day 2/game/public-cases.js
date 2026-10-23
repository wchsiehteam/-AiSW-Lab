// What happens on the day, as data: the small calls and the cases.
//
// A case is a short script of choices. Each option is something a medical social worker could do
// at the bedside; the best one moves the case on, the others make the crisis worse and explain
// why. Every option names how many minutes it takes, so a slow day shows on the clock.
//
// Written for the public and for social work students: plain words, no case is a real person.
// Anything here about law, procedure or resources should be checked by a supervising social
// worker or a teacher before it ships -- see README.md (內容審閱).
//
// Add a case by copying one of them, giving it its own id and bed, and listing it in PUBLIC_CASES
// at the end; `npm test` checks the shape. AGENTS.md has the full list of fields.

// The calls a phone call settles: two ring in the morning, two once the afternoon starts. The
// point is what it is like to be called for each of them anyway. `visit` is the scripted scene if
// the social worker walks over (see CASES in game.js); `night` keeps one to the afternoon.
export const PUBLIC_CALLS = [
  { id: 'carefee', short: '家屬問看護費補助', need: 'phone', bed: '08A', visit: 'v-carefee',
    text: '社工師，{bed} 的家屬問，請看護的費用有沒有補助可以申請？',
    phone: '跟家屬說，我下午把申請資格和要準備的資料放在護理站', phoneReply: '小雯：「好，我跟家屬說。」',
    sleepNote: '沒回電話，家屬又問了兩次，小雯只好說社工在忙，等一下再來。' },
  { id: 'barthel', short: '想申請外籍看護', need: 'phone', bed: '03B', visit: 'v-barthel',
    text: '社工師，{bed} 的家屬想申請外籍看護，問說要先做什麼評估？',
    phone: '請家屬跟主治醫師提，評估流程的單張我放在護理站', phoneReply: '怡君：「好，我拿給他們。」',
    sleepNote: '沒回電話，家屬自己上網查，查到一半又跑來問怡君。' },
  { id: 'cert', short: '重大傷病卡下來了', need: 'none', bed: '11A', visit: 'v-cert',
    text: '社工師，跟你說一聲，{bed} 的重大傷病卡申請下來了，家屬很開心。',
    phone: '好，謝謝你告訴我', phoneReply: '佳穎：「不會～」',
    sleepNote: '其實不回也沒事，佳穎只是跟你分享好消息。' },
  { id: 'aid', short: '家屬問輪椅去哪借', need: 'phone', bed: '07A', visit: 'v-aid', night: true,
    text: '社工師，{bed} 下禮拜要出院，家屬問回家要用的輪椅可以去哪裡借？',
    phone: '請家屬打縣市的輔具資源中心，可以借用，也可以問補助', phoneReply: '小雯：「好，我把電話抄給他。」',
    sleepNote: '沒回電話，家屬差點自己花錢買了一台不合用的輪椅。' },
  { id: 'thanks', short: '出院的阿姨留了卡片', need: 'none', bed: '04B', visit: 'v-thanks', night: true,
    text: '社工師，{bed} 上禮拜你幫忙申請補助的那位阿姨今天出院了，她留了一張卡片給你，放在護理站。',
    phone: '好，謝謝，我晚點去拿', phoneReply: '怡君：「她說真的很謝謝你喔。」',
    sleepNote: '卡片一直放在護理站，等你有空再拿。' },
];
// The lunch break, every day: a family wants to know where to get papers for their insurance.
export const DEEP_CALLS = [
  { id: 'docs', short: '家屬問診斷書去哪辦', need: 'phone', bed: '06A', visit: 'v-docs',
    text: '社工師，不好意思吃飯時間打給你……{bed} 的家屬問，保險要用的診斷書和住院證明要去哪裡辦？',
    phone: '請家屬到一樓櫃台申請，診斷書請主治醫師開', phoneReply: '小雯：「好，我跟他說，你繼續休息～」',
    sleepNote: '沒回電話，小雯自己跟家屬說了，其實她也知道。' },
];
// Two more in the hour before going home, every day: the phone still rings for small things.
export const DAWN_CALLS = [
  { id: 'lowinc', short: '家屬想問低收入戶申請', need: 'phone', bed: '08C', visit: 'v-lowinc',
    text: '社工師，{bed} 的家屬想問低收入戶要怎麼申請。他先回家了，說明天會再來。',
    phone: '請他明天來時找我，我先把要準備的資料列給他', phoneReply: '小雯：「好，我把清單轉給他。」',
    sleepNote: '沒回電話，家屬明天會再來問一次，不過今天沒事。' },
  { id: 'done', short: '家屬自己找到看護了', need: 'none', bed: '11C', visit: 'v-done',
    text: '社工師，跟你報告，{bed} 早上那位家屬已經自己找好看護了，說不用麻煩你了。',
    phone: '好，謝謝你告訴我', phoneReply: '佳穎：「快下班了，辛苦了～」',
    sleepNote: '其實不回也沒事，佳穎只是跟你說一聲。' },
];
// what goes through the social worker's head after hanging up in the lunch break, one at random
export const AFTER_PHONE = [
  '趴回桌上，腦袋還在想剛剛那個個案。',
  '便當旁邊的紀錄還沒打完。',
];

// Each case below has the same shape:
//   id, bed, nurse, name, who        who the case is and where
//   call, again                      the phone call, and the second one if nobody came
//   phone, callWhy                   what a social worker might say on the phone instead of
//                                    coming (the call offers it like any other call), and why
//                                    this one needed someone at the bed; the nurse's second call says it
//   intro, introLate, late           what the nurse says at the bed; `late` is the state the
//                                    case is found in after the call was put off
//   states                           the five gauges in plain words: safe 人身安全, care 照顧與支持,
//                                    money 經濟, mood 情緒, clock 時限, each [word, level] with level
//                                    '' (fine), 'warn', 'bad' or 'na' (not known yet); a gauge left
//                                    out keeps what was last shown
//   steps                            the questions (see below); the first is `first`
//   warn                             what happens at danger 3: the first sign it is going badly
//   fail                             how the case ends when danger reaches 5 (or a choice says
//                                    next: 'fail' or death: '...')
//   results                          a line per outcome, for the end of the case and the summary
//   option draw: true                the choice sends the case's one records check; its answer
//                                    is the labs below
//   labs                             what a records check at this case shows, LAB_WAIT game minutes
//                                    later: rows of [查了什麼, 結果, 說明, '!' if it needs acting on]
//                                    and a plain note
//   card                             what the player should take home
//   family                           the genogram and the services around the case: nodes
//                                    { id, sex 'm'/'f'/'r' (a resource), x, y (in a 300×180 box), age,
//                                    label, ip, dead, key, hide, alt } and links { t 'marry' / 'child'
//                                    (with from: [parents]) / 'violence' / 'conflict' / 'close' /
//                                    'distant' / 'res', a, b, key, hide }. Anything with a `key` is drawn
//                                    once a choice with that key in its `reveal` is made; `hide` takes
//                                    it away again once that key is revealed; `alt` swaps the label
//   step hint                        what the supervisor says when called from the bed (once a case)
//   option reveal                    keys of the family tree this choice brings to light
//   option energy, hurt              what the choice costs the social worker: energy (negative)
//                                    comes off the bar; hurt marks the day as one where they were hurt
//   aggression                       the case is one where the social worker is sworn at or attacked;
//                                    the summary then says something about workplace violence

// One case: a woman in for a broken wrist, bruises old and new, and a husband who answers for her.
// The point: speak with her alone, the report the law asks for within 24 hours (not her consent),
// and a safety plan before she goes home.
export const DV = {
  id: 'pdv', bed: '04A', nurse: '怡君', name: '林小姐', who: '林小姐 · 34 歲 · 左手腕骨折',
  short: '說是跌倒，身上有新舊瘀傷', late: 'angry',
  family: {
    nodes: [
      { id: 'mil', sex: 'f', x: 60, y: 24, age: 62, label: '婆婆', key: 'kid' },
      { id: 'hus', sex: 'm', x: 60, y: 84, age: 36, label: '先生' },
      { id: 'ip', sex: 'f', x: 135, y: 84, age: 34, label: '林小姐', ip: true },
      { id: 'kid', sex: 'f', x: 98, y: 145, age: 5, label: '女兒（在婆婆家）', key: 'kid' },
      { id: 'r1', sex: 'r', x: 250, y: 34, label: '家防中心', key: 'report' },
      { id: 'r2', sex: 'r', x: 250, y: 84, label: '警察', key: 'police' },
      { id: 'r3', sex: 'r', x: 250, y: 134, label: '113 · 安全計畫', key: 'net' },
    ],
    links: [
      { t: 'marry', a: 'hus', b: 'ip' }, { t: 'child', a: 'hus', from: ['mil'], key: 'kid' }, { t: 'child', a: 'kid', from: ['hus', 'ip'], key: 'kid' },
      { t: 'violence', a: 'hus', b: 'ip', key: 'dv' },
      { t: 'res', a: 'ip', b: 'r1', key: 'report' }, { t: 'res', a: 'ip', b: 'r2', key: 'police' }, { t: 'res', a: 'ip', b: 'r3', key: 'net' },
    ],
  },
  results: { stable: '林小姐有了安全計畫，家防中心接手追蹤' },
  labs: {
    rows: [['保護資訊系統', '兩年前被通報過一次', '當時她說是自己跌倒，沒有開案', '!'], ['子女', '女兒 5 歲，目前在婆婆家', '目睹家暴的孩子也要一起評估', '!'],
      ['健保身分', '一般，依附先生投保', '經濟上依賴先生，離開會有困難', '!']],
    note: '兩年前就被通報過，代表暴力可能已經持續很久。家暴常常不是一次，而是一再發生、越來越嚴重。有孩子的家庭，孩子的安全也要一起想。',
  },
  call: '社工師，{bed} 的林小姐說是跌倒骨折，可是身上有好幾處新舊瘀傷，她先生一直在旁邊替她回答，我覺得怪怪的。',
  again: '社工師！{bed} 林小姐的先生在病房大吼，說要幫她辦自動出院帶回家！',
  phone: '你先觀察看看，有需要再叫我',
  callWhy: '疑似家暴，醫事人員和社工知道後 24 小時內就要通報。而且要趁施暴者不在的時候跟她單獨談，時機一過就沒了。',
  intro: '社工師，這是林小姐，34 歲，左手腕骨折。她說是在浴室跌倒，可是手臂和背上有新舊不一的瘀青。她先生一直守在床邊，她講話前都會先看他一眼。',
  introLate: '社工師你終於來了……她先生剛剛在吼，說今天就要帶她回家。',
  states: {
    start: { safe: ['有疑慮', 'warn'], care: ['先生在場、替她回答', 'warn'], money: ['還不知道', 'na'], mood: ['低著頭、不太講話', 'warn'], clock: ['24 小時內要通報', 'warn'] },
    alone: { safe: ['暫時安全', ''], care: ['先生在門外等', 'warn'], mood: ['肩膀放鬆了一點', 'warn'] },
    scared: { safe: ['危險', 'bad'], mood: ['一直說是自己跌倒', 'bad'] },
    risk: { safe: ['高危險：曾被掐脖子', 'bad'], care: ['女兒 5 歲，在婆婆家', 'warn'], money: ['經濟靠先生', 'warn'], mood: ['說出來了，在哭', 'warn'] },
    reported: { safe: ['已通報，在想辦法', 'warn'], mood: ['害怕，但願意談', 'warn'], clock: ['已完成通報', ''] },
    angry: { safe: ['危險', 'bad'], care: ['先生在吼、要帶她走', 'bad'], mood: ['在發抖', 'bad'], clock: ['可能今天就出院', 'bad'] },
  },
  steps: {
    first: {
      ask: '林小姐的先生一直在旁邊替她回答。你先做什麼？',
      hint: '先想想：先生在旁邊，她說得出真話嗎？',
      askWarn: '她先生在吼著要帶她走，林小姐在發抖。你先做什麼？',
      options: [
        { id: 'alone', text: '請護理師用「要換藥、做檢查」的理由，請先生到外面等，單獨跟林小姐談', grade: 'best', min: 3, state: 'alone', next: 'talk',
          say: '怡君：「林先生，我們要幫太太換藥，麻煩你到外面等一下喔。」門關上後，林小姐的肩膀才放鬆下來。' },
        { id: 'ask', text: '當著先生的面問：「這些傷是不是有人打的？」', grade: 'bad', min: 3, state: 'scared',
          say: '林小姐看了先生一眼，馬上說：「沒有啦，我自己跌倒的。」先生的臉色沉了下來。',
          why: '施暴者在場的時候直接問，受害者通常只能否認，回家後還可能因此被打得更嚴重。要先讓她能單獨說話。' },
        { id: 'leave', text: '先不打擾，等她自己開口', grade: 'ok', min: 20, state: 'scared',
          say: '二十分鐘過去，林小姐一句話也沒說，先生一直沒離開床邊。',
          why: '受害者很少主動開口。看到傷勢和互動不對勁，社工要主動評估，而且責任通報有時限。' },
      ],
    },
    talk: {
      ask: '只剩你們兩個人。林小姐小聲說：「他喝了酒就會……」接下來？',
      hint: '她願意開口了。先接住她，再把危險程度問清楚，孩子也要問。',
      options: [
        { id: 'assess', text: '先肯定她說出來不容易，再評估危險：最近一次是什麼時候？有沒有掐脖子、拿刀、說要殺她？家裡有沒有孩子？', reveal: ['dv', 'kid'], grade: 'best', min: 15, state: 'risk', next: 'report',
          say: '林小姐說，上禮拜他掐她脖子，說「你敢走就殺了你」。家裡有一個 5 歲的女兒，現在在婆婆家。你在危險評估表上勾了好幾項。' },
        { id: 'couple', text: '建議請先生一起進來，三個人談談怎麼改善關係', grade: 'bad', min: 10, state: 'scared',
          say: '林小姐臉色發白：「不要……拜託不要叫他進來。」',
          why: '家暴不是夫妻溝通的問題。在危險的時候讓施暴者和受害者一起談，只會增加她的風險。' },
        { id: 'endure', text: '勸她「為了孩子，先忍一忍」', grade: 'ok', min: 5, state: 'scared',
          say: '林小姐點點頭，不再說話了。',
          why: '這會讓她更不敢求助。社工是陪她看見危險、知道有哪些選擇，不是替她決定要不要忍。' },
      ],
    },
    report: {
      ask: '危險評估分數很高，可是她很猶豫：「我不想告他。」接下來？',
      hint: '通報是我們的責任，不是她的選擇。她能選的，是之後要走哪條路。',
      options: [
        { id: 'notify', text: '告訴她社工依法要通報，但通報不等於提告；再說明保護令、緊急庇護和 113 這些選擇，由她決定', reveal: ['report'], grade: 'best', min: 20, state: 'reported', next: 'plan',
          say: '你完成了家暴通報。林小姐聽到「通報不是提告」，沉默了很久，才說：「如果他知道……」你說，我們一起想安全的辦法。' },
        { id: 'consent', text: '尊重她的意願，等她同意了再通報', grade: 'bad', min: 5,
          say: '你把通報單收了起來。林小姐鬆了一口氣，可是她今晚還是要回到同一個家。',
          why: '醫事人員和社工知道疑似家暴，就有責任在 24 小時內通報，不用受害者同意。尊重她的地方，在於之後要不要聲請保護令、要不要提告。' },
        { id: 'police', text: '直接打 110，請警察來把先生帶走', reveal: ['police'], grade: 'ok', min: 15,
          say: '警察來問了幾句，先生說「我們只是吵架」，警察做完紀錄就走了。先生看林小姐的眼神更冷了。',
          why: '有立即危險時當然要報警，但現在先生沒有動手，硬碰硬可能讓他更生氣。先通報、做安全評估，必要時再請警察協助聲請保護令。' },
      ],
    },
    plan: {
      ask: '先生在外面敲門，問好了沒。她出院前，你還要做什麼？',
      hint: '回家那一刻最危險。她需要的是具體、藏得住的安全計畫。',
      options: [
        { id: 'safety', text: '跟她一起擬安全計畫：證件和錢放哪、遇到危險打 113 或 110、可以逃去哪裡，並把高危險個案提報網絡會議', reveal: ['net'], grade: 'best', min: 15, next: 'done', outcome: 'stable',
          say: '林小姐把 113 存成「藥局」。你跟她約好明天換藥時再談。下午，家防中心的社工回電，說會接手追蹤，也會關心她女兒。' },
        { id: 'warnhim', text: '請先生進來，嚴正提醒他「再打人就是犯法」', grade: 'bad', min: 5, state: 'angry',
          say: '先生一聽，轉頭瞪著林小姐：「你跟他們說了什麼？」',
          why: '她還沒準備好之前，讓施暴者知道她說出來了，是最危險的時候。' },
        { id: 'flyer', text: '給她一張宣導單張，有需要再打電話', grade: 'ok', min: 2,
          say: '林小姐把單張塞進枕頭底下，怕被先生看到。',
          why: '單張很容易被施暴者發現，也不夠。高危險的個案需要具體的安全計畫，和有人接著追蹤。' },
      ],
    },
  },
  warn: { state: 'angry', line: '怡君：「社工師！她先生在門口大吼，說要辦自動出院帶她回家！」', log: '林小姐的先生要帶她自動出院' },
  fail: {
    title: '林小姐被先生帶回家了',
    text: '她辦了自動出院。沒有安全計畫，也沒有人知道她今晚會發生什麼事。家暴最危險的時候，常常就是受害者想離開，或施暴者發現她求助的時候。',
  },
  card: {
    title: '家暴：你可以記住的四件事',
    points: [
      '醫護人員、社工、老師等人知道疑似家暴，24 小時內要通報，不用等受害者同意。',
      '要在施暴者不在的時候，跟受害者單獨談。',
      '通報不等於提告。要不要聲請保護令、要不要提告，由受害者決定，社工陪她一起想。',
      '你或身邊的人遇到家暴，可以打 113 保護專線，24 小時都有人接；有立即危險打 110。',
    ],
  },
};

// An old man after a stroke, going home tomorrow to a wife who cannot lift him. The point:
// discharge planning starts in the ward, long-term care can be linked before he leaves, and the
// one who cares for him needs looking after too.
export const DISCHARGE = {
  id: 'pdc', bed: '07B', nurse: '小雯', name: '張阿公', who: '張阿公 · 81 歲 · 中風',
  short: '明天出院，阿嬤說她顧不來', late: 'fallen',
  family: {
    nodes: [
      { id: 'ip', sex: 'm', x: 80, y: 44, age: 81, label: '張阿公', ip: true },
      { id: 'wife', sex: 'f', x: 160, y: 44, age: 78, label: '阿嬤（主要照顧者）' },
      { id: 'son', sex: 'm', x: 120, y: 132, age: 52, label: '兒子（在高雄）', key: 'son' },
      { id: 'r1', sex: 'r', x: 250, y: 44, label: '長照中心', key: 'ltc' },
      { id: 'r2', sex: 'r', x: 250, y: 94, label: '居服 · 輔具', key: 'ltc' },
    ],
    links: [
      { t: 'marry', a: 'ip', b: 'wife' }, { t: 'child', a: 'son', from: ['ip', 'wife'], key: 'son' },
      { t: 'distant', a: 'son', b: 'wife', key: 'son', hide: 'meet' }, { t: 'close', a: 'son', b: 'wife', key: 'meet' },
      { t: 'res', a: 'ip', b: 'r1', key: 'ltc' }, { t: 'res', a: 'ip', b: 'r2', key: 'ltc' },
    ],
  },
  results: { stable: '張阿公接上了長照服務，延後一天出院' },
  labs: {
    rows: [['長照需要等級', '還沒評估', '出院準備可以在住院時就請長照中心評估', '!'], ['福利身分', '一般戶', '長照服務要部分負擔，政府補助大部分'],
      ['身心障礙證明', '沒有', '中風後狀況穩定，可以評估申請', '!']],
    note: '張阿公還沒有長照評估，也沒有身障證明。這些都可以在住院時就開始辦，不用等回家才申請。',
  },
  call: '社工師，{bed} 的張阿公主治說明天可以出院，可是阿嬤說她一個人顧不來，一直在哭。',
  again: '社工師！{bed} 阿嬤剛剛扶阿公上廁所，兩個人一起跌倒了！',
  phone: '請家屬自己先找看護，明天出院前我再過去',
  callWhy: '出院準備要提早做。明天就要出院，今天不銜接長照，阿公回家就沒人能照顧，很可能又跌倒、再住院。',
  intro: '社工師，這是張阿公，81 歲，中風住院兩個禮拜，右邊還沒什麼力，要人扶才能走。主治說明天可以出院。家裡只有 78 歲的阿嬤，兒子在高雄上班。',
  introLate: '社工師……阿嬤剛剛扶阿公去廁所，兩個人一起跌倒了，阿嬤一直說都是她的錯。',
  states: {
    start: { safe: ['跌倒風險高', 'warn'], care: ['只有 78 歲的阿嬤', 'warn'], money: ['還不知道', 'na'], mood: ['阿嬤在哭', 'warn'], clock: ['明天出院', 'warn'] },
    known: { care: ['洗澡、如廁都要人扶；四樓沒電梯', 'bad'], money: ['兒子每月寄錢回家', ''], mood: ['阿嬤說得出擔心了', 'warn'] },
    upset: { mood: ['阿嬤更慌了', 'bad'] },
    linked: { safe: ['輔具、居家服務安排中', ''], care: ['長照評估排好了', ''], mood: ['阿嬤還是很焦慮', 'warn'] },
    fallen: { safe: ['跌倒了', 'bad'], care: ['阿嬤自己也扭到腰', 'bad'], mood: ['阿嬤一直自責', 'bad'], clock: ['明天出院', 'bad'] },
  },
  steps: {
    first: {
      ask: '阿嬤一直說「我顧不來」。你先做什麼？',
      hint: '先別急著給答案。把這個家能做什麼、不能做什麼看清楚。',
      askWarn: '兩個人剛跌倒，阿嬤一直哭。你先做什麼？',
      options: [
        { id: 'assess', text: '先評估：阿公自己能做什麼、阿嬤的體力、家裡的環境、經濟，還有兒子能幫多少', reveal: ['son'], grade: 'best', min: 15, state: 'known', next: 'plan',
          say: '阿公洗澡、上廁所都要人扶。家住四樓公寓，沒有電梯。阿嬤自己膝蓋不好。兒子每個月寄錢回家，但平常回不來。' },
        { id: 'nursing', text: '直接建議送護理之家，比較安全', grade: 'bad', min: 5, state: 'upset',
          say: '阿嬤哭得更大聲：「我不要把他送走……」',
          why: '還沒評估就替家屬決定安置。很多家庭其實想帶回家照顧，只是需要資源。先評估需要和意願。' },
        { id: 'card', text: '給阿嬤一張看護中心的名片，請她自己打電話問', grade: 'ok', min: 2,
          say: '阿嬤拿著名片，不知道該怎麼開口。',
          why: '自費看護一天要兩千多塊，不是每個家庭負擔得起；長照能補助什麼也還沒評估，就先跳過了。' },
      ],
    },
    plan: {
      ask: '阿公需要很多照顧，阿嬤還是想帶他回家。接下來？',
      hint: '出院前就能銜接的資源，不要等回家才開始申請。',
      options: [
        { id: 'ltc', text: '轉介出院準備銜接長照：請長照中心在出院前評估，安排居家服務、輪椅和便盆椅、浴室扶手', reveal: ['ltc'], grade: 'best', min: 10, state: 'linked', next: 'family',
          say: '長照中心說可以在出院前到醫院評估，輔具和居家無障礙改善也能一起申請補助。' },
        { id: 'justgo', text: '照原定時間出院，回家有問題再打 1966', grade: 'bad', min: 5, state: 'upset',
          say: '阿嬤小聲地問：「那……明天晚上他要上廁所，我要怎麼辦？」',
          why: '1966 是長照專線沒錯，但等出院後才開始申請，中間的空窗常常就是跌倒、再住院的時候。住院時就可以先評估。' },
        { id: 'foreign', text: '建議他們申請外籍看護', grade: 'ok', min: 5,
          say: '阿嬤：「那要多久才會來？」你算了一下，至少好幾個月。',
          why: '外籍看護從申請到人來要好幾個月，明天出院等不到。可以當長期的選項，但眼前要先銜接長照服務。' },
      ],
    },
    family: {
      ask: '長照評估排好了，可是阿嬤還是很不安：「我一個人真的可以嗎？」最後你要？',
      hint: '照顧不能只壓在阿嬤一個人身上，把其他家人和團隊拉進來。',
      options: [
        { id: 'meeting', text: '視訊聯絡高雄的兒子，和醫療團隊開家庭會議：說明照顧計畫、怎麼分工，並和醫師討論延後一天出院，等服務到位', reveal: ['meet'], grade: 'best', min: 20, next: 'done', outcome: 'stable',
          say: '兒子答應週末回來輪班。主治同意延後一天出院。阿嬤擦擦眼淚：「有人跟我說要怎麼做，我就比較不怕了。」' },
        { id: 'reassure', text: '安慰阿嬤：「一定沒問題的啦！」', grade: 'ok', min: 2,
          say: '阿嬤勉強笑了一下，眼神還是很慌。',
          why: '空泛的安慰解決不了誰來照顧的問題。讓兒子和醫療團隊一起討論分工，阿嬤才不會一個人扛。' },
        { id: 'duty', text: '跟阿嬤說：「妳是太太，本來就該照顧他。」', grade: 'bad', min: 2, state: 'upset',
          say: '阿嬤低下頭，不再說話了。',
          why: '把照顧全推給高齡的配偶，常常就是照顧者崩潰、甚至照顧悲劇的開始。照顧者也需要被評估、被支持。' },
      ],
    },
  },
  warn: { state: 'fallen', line: '小雯：「社工師！阿嬤扶阿公上廁所，兩個人一起跌倒了！」', log: '阿嬤和張阿公一起跌倒' },
  fail: {
    title: '張阿公出院三天後，又被送回急診',
    text: '回家第三天，阿嬤半夜扶他上廁所，兩個人一起跌倒，阿公髖骨骨折。出院準備沒有提早做，回家後的空窗，就是最容易出事的時候。',
  },
  card: {
    title: '出院準備：你可以記住的四件事',
    points: [
      '出院準備要從住院時就開始，不要等到出院前一天。',
      '回家需要人照顧，可以請醫院的出院準備小組銜接長照，或打長照專線 1966。',
      '長照可以申請居家服務、日間照顧、輔具和居家無障礙改善，政府會補助大部分的費用。',
      '照顧者也需要被照顧。不要讓一個人扛下所有的照顧工作。',
    ],
  },
};

// A day labourer, two days after a stent, who wants to leave because every day in bed is a day
// without pay. The point: behind "I want to go home" is a family's money; emergency aid exists
// for exactly this and can be fast.
export const MONEY = {
  id: 'pmoney', bed: '11B', nurse: '佳穎', name: '陳先生', who: '陳先生 · 48 歲 · 心肌梗塞',
  short: '剛放支架，說付不起要自動出院', late: 'leaving',
  family: {
    nodes: [
      { id: 'ip', sex: 'm', x: 80, y: 44, age: 48, label: '陳先生', ip: true },
      { id: 'wife', sex: 'f', x: 160, y: 44, age: 46, label: '太太（餐廳洗碗）', key: 'fam' },
      { id: 'son', sex: 'm', x: 100, y: 132, age: 14, label: '兒子', key: 'fam' },
      { id: 'dau', sex: 'f', x: 145, y: 132, age: 13, label: '女兒', key: 'fam' },
      { id: 'r1', sex: 'r', x: 250, y: 30, label: '區公所 急難救助', key: 'aid' },
      { id: 'r2', sex: 'r', x: 250, y: 80, label: '院內醫療補助', key: 'aid' },
      { id: 'r2b', sex: 'r', x: 250, y: 80, label: '院內醫療補助', key: 'aid1', hide: 'aid' },
      { id: 'r3', sex: 'r', x: 250, y: 130, label: '職業工會 勞保', key: 'union' },
    ],
    links: [
      { t: 'marry', a: 'ip', b: 'wife', key: 'fam' }, { t: 'child', a: 'son', from: ['ip', 'wife'], key: 'fam' }, { t: 'child', a: 'dau', from: ['ip', 'wife'], key: 'fam' },
      { t: 'res', a: 'ip', b: 'r1', key: 'aid' }, { t: 'res', a: 'ip', b: 'r2', key: 'aid' }, { t: 'res', a: 'ip', b: 'r2b', key: 'aid1', hide: 'aid' }, { t: 'res', a: 'ip', b: 'r3', key: 'union' },
    ],
  },
  results: { stable: '陳先生拿到急難救助，願意住到醫師說可以出院' },
  labs: {
    rows: [['健保', '沒有欠費', ''], ['勞保', '沒有加保', '打零工沒有雇主幫忙加保，生病就沒有職災或傷病給付', '!'],
      ['福利身分', '一般戶，從來沒申請過', '可以評估中低收入戶', '!'], ['這次住院的自付額', '大約三萬元', '可以申請院內的醫療補助', '!']],
    note: '健保沒有欠費，住院的費用大部分有健保給付。真正壓垮他的，是這個月的房租和生活費。他是臨時工，沒有勞保，這次生病一毛給付都拿不到。',
  },
  call: '社工師，{bed} 的陳先生一直說要辦自動出院，說住一天就少賺一天，醫藥費也付不起。',
  again: '社工師！{bed} 的陳先生已經在換衣服、收東西了，說他現在就要走！',
  phone: '請他先去批價櫃台問醫藥費可不可以分期',
  callWhy: '病人因為錢要自動出院，背後常常是整個家庭的危機。剛放完心臟支架就走，隨時可能再發作；要有人去評估、找資源，把他留下來。',
  intro: '社工師，這是陳先生，48 歲，昨天心肌梗塞放了支架，醫師說至少還要住三天。他在工地打零工，一天沒做就一天沒錢，家裡還有兩個國中的小孩。',
  introLate: '社工師你來了！他點滴拔一半了，說誰都不要攔他。',
  states: {
    start: { safe: ['剛放支架，要觀察', 'warn'], care: ['太太和兩個國中生', 'warn'], money: ['說付不起', 'bad'], mood: ['焦躁，想走', 'bad'], clock: ['想今天就出院', 'bad'] },
    heard: { money: ['房租、生活費最急', 'bad'], mood: ['說出擔心，冷靜一點', 'warn'] },
    eased: { safe: ['願意留院觀察', ''], money: ['急難救助申請中', 'warn'], mood: ['鬆了一口氣', ''], clock: ['住到醫師說可以', ''] },
    angry: { safe: ['可能自己離院', 'bad'], mood: ['大聲說要走', 'bad'] },
    leaving: { safe: ['拔點滴要走', 'bad'], mood: ['誰都不想理', 'bad'], clock: ['現在就要走', 'bad'] },
  },
  steps: {
    first: {
      ask: '陳先生說：「我沒有錢，我要回去上班。」你先做什麼？',
      hint: '他說要走，背後是什麼？先聽懂他在怕什麼。',
      askWarn: '陳先生在拔點滴，嚷著要走。你先做什麼？',
      options: [
        { id: 'listen', text: '先坐下來聽他說：他最擔心的到底是什麼？醫藥費、房租、小孩，還是工作會不見？', reveal: ['fam'], grade: 'best', min: 10, state: 'heard', next: 'check',
          say: '陳先生說，他最怕的是這個月一萬二的房租繳不出來。太太在餐廳洗碗，薪水不夠。他是臨時工，也不知道自己有沒有保險。' },
        { id: 'scare', text: '跟他說：「你現在出院會死掉喔！」', grade: 'bad', min: 2, state: 'angry',
          say: '陳先生更大聲了：「死掉也比餓死好！」',
          why: '恐嚇只會讓他更焦慮、更想逃。他的擔心是真的，要先處理他擔心的事，他才留得下來。' },
        { id: 'sign', text: '請他簽自動出院同意書，尊重病人自主', grade: 'ok', min: 5,
          say: '佳穎拿著同意書，猶豫著要不要遞給他。',
          why: '自主很重要，但他的決定是被錢逼出來的。社工要先看看有沒有資源能解除壓力，再讓他選。' },
      ],
    },
    check: {
      ask: '問題出在錢。你要先做什麼？',
      hint: '先把資料查清楚，才知道哪些資源用得上。',
      options: [
        { id: 'query', text: '查清楚他的福利身分、健保有沒有欠費、有沒有加勞保，再看能申請哪些補助', grade: 'best', min: 20, draw: true, next: 'apply',
          say: '你送出查詢，同時請佳穎幫忙問批價目前的費用。陳先生在旁邊看著你打電話，沒再說要走。' },
        { id: 'charity', text: '直接幫他申請院內的醫療補助，先把醫藥費付掉', grade: 'ok', min: 10,
          say: '補助單填到一半，你發現還不知道他有沒有欠健保、有沒有勞保。',
          why: '院內補助通常要先確認健保、勞保、社會救助這些資源都用過了。而且醫藥費只是他的問題之一。' },
        { id: 'borrow', text: '建議他先跟親戚朋友借錢', grade: 'bad', min: 2, state: 'angry',
          say: '陳先生苦笑：「能借的我都借過了。」',
          why: '把問題推回給他，他就會選最快的方法：自動出院。' },
      ],
    },
    apply: {
      ask: '查詢結果回來了：健保沒欠費、沒有勞保、從沒申請過福利身分。接下來？',
      hint: '他的困難不只醫藥費。想想看，哪個補助是為「急」設計的。',
      options: [
        { id: 'combo', text: '一起組合資源：向區公所申請急難救助和「馬上關懷」應付房租，院內補助付自付額，再協助評估中低收入戶', reveal: ['aid'], grade: 'best', min: 20, state: 'eased', next: 'stay',
          say: '區公所說「馬上關懷」很快就能撥款。院內補助也通過了一部分自付額。陳先生坐回床上：「那……我住到醫生說可以為止。」' },
        { id: 'one', text: '只申請院內補助，醫藥費解決就好', reveal: ['aid1'], grade: 'ok', min: 10,
          say: '醫藥費有著落了，陳先生還是皺著眉頭：「那房租呢？」',
          why: '醫藥費解決了，房租和這個月的生活費還在。他出院後還是會硬撐著去上工。' },
        { id: 'wait', text: '跟他說補助要等一兩個月，請他先回家等消息', grade: 'bad', min: 5, state: 'angry',
          say: '陳先生站起來就開始收東西。',
          why: '急難救助、「馬上關懷」就是為了「急」設計的，可以很快撥款。叫他回家等，等於讓他放棄治療。' },
      ],
    },
    stay: {
      ask: '陳先生願意留下來了。出院前，還可以做什麼？',
      hint: '這次撐過了，下次呢？想想怎麼讓他不再掉進同一個洞。',
      options: [
        { id: 'follow', text: '轉介社會局後續追蹤，提醒心臟復健和回診，並告訴他打零工可以透過職業工會加勞保', reveal: ['union'], grade: 'best', min: 10, next: 'done', outcome: 'stable',
          say: '陳先生把工會的電話抄在藥袋上：「下次生病，至少不會什麼都沒有。」' },
        { id: 'close', text: '補助申請完，就結案了', grade: 'ok', min: 2,
          say: '你把個案歸檔，心裡有點不踏實。',
          why: '一次補助只能撐過這個月。轉介後續追蹤、幫他接上勞保，才能避免下一次危機。' },
      ],
    },
  },
  warn: { state: 'leaving', line: '佳穎：「社工師！陳先生在拔點滴，說他現在就要走！」', log: '陳先生拔點滴要自己出院' },
  fail: {
    title: '陳先生辦了自動出院',
    text: '他隔天就回到工地。兩個禮拜後，他在工地胸痛倒下，被救護車送回急診。因為錢放棄治療的病人，很少只是「不想住院」。',
  },
  card: {
    title: '經濟困難：你可以記住的四件事',
    points: [
      '住院付不出錢，不用硬撐或辦自動出院，可以請醫院的社工評估能申請哪些補助。',
      '家裡突然遇到變故，可以向戶籍地的區公所申請急難救助或「馬上關懷」，撥款比一般補助快。',
      '醫院、宗教團體和社福基金會常有醫療補助，社工會陪你一起找、一起申請。',
      '打零工、沒有固定雇主的人，可以透過職業工會加勞保，生病受傷時才有保障。',
    ],
  },
};

// A grandmother at the end of lung cancer, and her children who disagree about resuscitation.
// The point: listen to each before the meeting, bring the family back to what she would want,
// and do not let a form be signed over a family that has not agreed. The doctors set it for the
// afternoon, so it rings only then (night: true).
export const HOSPICE = {
  id: 'phospice', bed: '06C', nurse: '小雯', name: '李阿嬤', who: '李阿嬤 · 86 歲 · 肺癌末期', night: true,
  short: '家屬為了要不要急救吵起來', late: 'crisis',
  family: {
    nodes: [
      { id: 'hus', sex: 'm', x: 100, y: 22, label: '阿公', dead: true },
      { id: 'ip', sex: 'f', x: 170, y: 22, age: 86, label: '李阿嬤', ip: true },
      { id: 'son', sex: 'm', x: 70, y: 92, age: 60, label: '大兒子' },
      { id: 'dau', sex: 'f', x: 135, y: 92, age: 56, label: '女兒' },
      { id: 'dau2', sex: 'f', x: 200, y: 92, age: 52, label: '小女兒' },
      { id: 'gs', sex: 'm', x: 70, y: 148, age: 30, label: '孫子（在美國）', key: 'hospice' },
      { id: 'r1', sex: 'r', x: 262, y: 30, label: '安寧共照', key: 'hospice' },
    ],
    links: [
      { t: 'marry', a: 'hus', b: 'ip' },
      { t: 'child', a: 'son', from: ['hus', 'ip'] }, { t: 'child', a: 'dau', from: ['hus', 'ip'] }, { t: 'child', a: 'dau2', from: ['hus', 'ip'] },
      { t: 'child', a: 'gs', from: ['son'], key: 'hospice' },
      { t: 'conflict', a: 'son', b: 'dau', hide: 'agree' }, { t: 'close', a: 'son', b: 'dau', key: 'agree' }, { t: 'close', a: 'dau', b: 'ip', key: 'heard' },
      { t: 'res', a: 'ip', b: 'r1', key: 'hospice' },
    ],
  },
  results: { stable: '家屬有了共識，李阿嬤轉給安寧團隊照顧' },
  labs: {
    rows: [['預立醫療決定', '沒有做過', '病人意識清楚時才能做', ''], ['健保卡安寧意願註記', '沒有', '可以在意識清楚時先簽好、註記在健保卡上', '!'],
      ['安寧共照', '還沒照會', '一般病房也可以請安寧團隊來一起照顧', '!']],
    note: '李阿嬤沒有留下書面的意願，現在也沒辦法清楚表達，只能由家屬代為決定。如果她早一點把意願說清楚、寫下來，子女就不用在這個時候替她做最難的決定。',
  },
  call: '社工師，{bed} 李阿嬤的家屬在走廊吵起來了。主治說今天要決定如果心跳停了要不要急救，大兒子說要拚到底，女兒說媽媽講過不要插管。',
  again: '社工師！{bed} 李阿嬤越來越喘，大兒子跟妹妹在病房裡吵到快打起來了！',
  phone: '請他們先回去商量好，再跟醫師說',
  callWhy: '病人隨時可能走，家屬意見不同又沒有人陪著談，到最後常常是在慌亂中插管、壓胸，每個人都留下遺憾。家庭會議需要社工在場。',
  intro: '社工師，這是李阿嬤，86 歲，肺癌末期，這兩天大多在睡，叫不太醒。主治說可能就是這一兩個禮拜。大兒子說「什麼都要做」，女兒說媽媽以前講過不要插管。',
  introLate: '社工師你來了……阿嬤喘得很厲害，大兒子剛剛一直喊「快救她」。',
  states: {
    start: { safe: ['病況隨時會變', 'warn'], care: ['三個子女意見不同', 'bad'], money: ['還不知道', 'na'], mood: ['兄妹在吵架', 'bad'], clock: ['可能剩一兩週', 'warn'] },
    heard: { care: ['各自說出心裡的話', 'warn'], money: ['不是問題', ''], mood: ['大兒子紅了眼眶', 'warn'] },
    agree: { care: ['家人有了共識', ''], mood: ['難過，但比較平靜', ''], clock: ['已簽不急救同意書', ''] },
    angry: { care: ['大兒子覺得被指責', 'bad'], mood: ['大兒子拍桌子', 'bad'] },
    crisis: { safe: ['越來越喘', 'bad'], mood: ['兄妹快打起來', 'bad'], clock: ['可能就在今天', 'bad'] },
  },
  steps: {
    first: {
      ask: '兄妹在走廊吵得很兇。你先做什麼？',
      hint: '每個人的堅持背後都有故事，先一個一個聽。',
      askWarn: '阿嬤喘得很厲害，兄妹在病房裡大吼。你先做什麼？',
      options: [
        { id: 'each', text: '先分開聽每個人說：大兒子在怕什麼？女兒記得媽媽說過什麼？', reveal: ['heard'], grade: 'best', min: 15, state: 'heard', next: 'meet',
          say: '大兒子紅著眼說：「爸爸走的時候我在國外，沒見到最後一面。這次我不能讓媽媽就這樣走。」女兒說，媽媽去年看到隔壁床插管，跟她說「我以後不要這樣」。' },
        { id: 'side', text: '跟大兒子說：「插管只會讓媽媽更痛苦，你要放手。」', grade: 'bad', min: 3, state: 'angry',
          say: '大兒子拍桌子：「你又不是我們家的人！」',
          why: '還沒聽他說就要他放手，他只會覺得被指責。家屬的堅持背後，常常是愧疚和遺憾，要先聽懂。' },
        { id: 'vote', text: '請三個子女投票，少數服從多數', grade: 'ok', min: 5,
          say: '二比一。輸的那一個，轉身就走出了病房。',
          why: '這不是投票的事。要回到「媽媽自己會想要什麼」，而不是誰的聲音比較大。' },
      ],
    },
    meet: {
      ask: '你約了主治醫師、護理師和三個子女一起開家庭會議。會議上你要？',
      hint: '會議的主角是阿嬤。帶大家回到她自己會怎麼選。',
      options: [
        { id: 'center', text: '請醫師說明插管、壓胸能做到什麼、做不到什麼，再帶大家回到：「如果媽媽能說話，她會怎麼選？」', reveal: ['agree'], grade: 'best', min: 30, state: 'agree', next: 'after',
          say: '醫師說，插管不會讓癌症變好，只會延長最後的過程。大家沉默了很久。小女兒說：「媽媽最怕痛了。」大兒子低著頭，最後說：「……好，不要插管。可是我要每天來陪她。」' },
        { id: 'sign', text: '先把不急救同意書準備好，請女兒趕快簽一簽', grade: 'bad', min: 5, state: 'angry',
          say: '大兒子一把搶過同意書：「誰准你們簽的？」',
          why: '依法一位成年子女簽就可以，但在其他家屬還沒接受前硬簽，常常變成醫療糾紛，家人之間也會留下很深的裂痕。' },
        { id: 'doctor', text: '讓醫師直接告訴他們「建議不要急救」，社工在旁邊聽就好', grade: 'ok', min: 10,
          say: '醫師講完，大兒子沉著臉，一句話也沒說。',
          why: '醫師的說明很重要，但家屬需要時間消化，也需要有人照顧他們的情緒。社工在會議裡的角色，是讓每個人都被聽見。' },
      ],
    },
    after: {
      ask: '家屬決定讓阿嬤舒服地走。接下來？',
      hint: '決定好了不代表結束，臨終和悲傷還需要人陪。',
      options: [
        { id: 'hospice', text: '照會安寧共照團隊，安排家屬輪流陪伴，也問問阿嬤有沒有想見的人', reveal: ['hospice'], grade: 'best', min: 15, next: 'done', outcome: 'stable',
          say: '安寧共照護理師來調整讓她舒服一點的藥。大兒子打電話給在美國的孫子，請他回來看阿嬤。小雯說，阿嬤今天睡得比較平穩了。' },
        { id: 'close', text: '寫好紀錄，這個個案就結案了', grade: 'ok', min: 2,
          say: '你闔上紀錄，走廊上大兒子一個人坐著發呆。',
          why: '決定不急救只是開始。臨終的陪伴、家屬的悲傷，都還需要有人接著照顧。' },
      ],
    },
  },
  warn: { state: 'crisis', line: '小雯：「社工師！阿嬤越來越喘，大兒子一直喊快救她！」', log: '李阿嬤越來越喘，家屬還沒有共識' },
  fail: {
    title: '李阿嬤在慌亂中被插了管',
    text: '家屬一直沒有共識。阿嬤喘到不行的時候，大兒子大喊「救她！」，醫療團隊只能插管、壓胸。她在加護病房多撐了五天，身上接滿管子，最後還是走了。女兒到現在都覺得對不起媽媽。',
  },
  card: {
    title: '臨終決定：你可以記住的四件事',
    points: [
      '趁身體還好的時候，跟家人聊聊：如果有一天病危，我想要怎麼被照顧。',
      '可以簽安寧緩和醫療意願書，或做「預立醫療照護諮商」，把意願註記在健保卡上。',
      '不急救不等於放棄。安寧緩和醫療是讓病人少一點痛苦，讓家人有時間好好道別。',
      '家人意見不同時，可以請醫院的社工、安寧團隊一起開家庭會議。',
    ],
  },
};

// An old man found collapsed in a park with no papers, who keeps trying to walk home. The point:
// he may be someone's missing father with dementia; calm him first, then find who he is through
// the police and the ID bracelet, never by posting his face online.
export const UNKNOWN = {
  id: 'punknown', bed: '03A', nurse: '怡君', name: '無名氏阿伯', who: '無名氏阿伯 · 約 75 歲 · 路倒送醫',
  short: '身分不明，一直說要回家', late: 'gone',
  family: {
    nodes: [
      { id: 'ip', sex: 'm', x: 100, y: 54, age: '?', label: '無名氏', ip: true, alt: { key: 'found', label: '林阿興', age: 78 } },
      { id: 'wife', sex: 'f', x: 170, y: 54, label: '太太', dead: true, key: 'found' },
      { id: 'dau', sex: 'f', x: 135, y: 132, age: 50, label: '女兒（報了失蹤）', key: 'found' },
      { id: 'r1', sex: 'r', x: 255, y: 34, label: '警察 · 愛心手鍊', key: 'police' },
      { id: 'r2', sex: 'r', x: 255, y: 84, label: '失智共照中心', key: 'dem' },
      { id: 'r3', sex: 'r', x: 255, y: 134, label: '遊民收容中心', key: 'shelter', hide: 'found' },
    ],
    links: [
      { t: 'marry', a: 'ip', b: 'wife', key: 'found' }, { t: 'child', a: 'dau', from: ['ip', 'wife'], key: 'found' },
      { t: 'res', a: 'ip', b: 'r1', key: 'police' }, { t: 'res', a: 'ip', b: 'r2', key: 'dem' }, { t: 'res', a: 'ip', b: 'r3', key: 'shelter', hide: 'found' },
    ],
  },
  results: { stable: '阿伯找到了家人，女兒把他接回去' },
  labs: {
    rows: [['指紋比對', '林阿興，78 歲', '警察局協助比對'], ['失蹤人口', '女兒三天前報案協尋', '家人一直在找他', '!'],
      ['愛心手鍊', '有登記，緊急聯絡人是女兒', ''], ['健保', '有，一般身分', '']],
    note: '阿伯不是遊民，是走失的長者。女兒三天前就報了失蹤。他記不得自己住哪、不知道現在幾年，很可能有失智症，回家後的照顧和防走失要一起討論。',
  },
  call: '社工師，{bed} 昨晚路倒送來的阿伯醒了，可是說不出家住哪裡，身上也沒有證件，一直想下床往外走。',
  again: '社工師！{bed} 那位阿伯自己拔了點滴，走出病房了，警衛在找！',
  phone: '先等他清醒一點自己想起來，明天再說',
  callWhy: '沒有身分、沒有家屬的長者，常常是走失的失智症患者，家人可能正在找他。越早查證身分越好；拖著，他可能自己走出醫院，再走失一次。',
  intro: '社工師，他是昨晚在公園昏倒、被救護車送來的阿伯，大概七十幾歲，身上沒有證件、沒有手機。醒了以後一直說要回家，問他住哪，他只說「市場旁邊」。',
  introLate: '社工師，警衛在樓梯間找到他了……他好害怕，一直說「我要回家」。',
  states: {
    start: { safe: ['一直想往外走', 'warn'], care: ['沒有家屬', 'bad'], money: ['沒有健保卡', 'na'], mood: ['焦躁，要回家', 'warn'], clock: ['身分不明', 'warn'] },
    clue: { safe: ['護理師看著他', ''], mood: ['聊天時比較安心', ''], clock: ['線索：阿興、市場、手鍊', 'warn'] },
    agitated: { safe: ['想拔點滴離開', 'bad'], mood: ['很生氣', 'bad'] },
    gone: { safe: ['走出過病房', 'bad'], mood: ['迷路、很害怕', 'bad'], clock: ['身分還是不明', 'bad'] },
  },
  steps: {
    first: {
      ask: '阿伯一直說要回家。你先做什麼？',
      hint: '他現在很慌。先讓他安心，線索常常藏在聊天裡。',
      askWarn: '阿伯剛被找回來，很害怕。你先做什麼？',
      options: [
        { id: 'calm', text: '坐下來陪他聊：他叫什麼、以前做什麼工作、市場賣什麼，邊聊邊觀察他的記憶，並請護理師多注意他', grade: 'best', min: 15, state: 'clue', next: 'find',
          say: '阿伯說大家都叫他「阿興」，以前在市場賣菜。問他今年是哪一年、這裡是哪裡，他都答不出來。你發現他手腕上有一條「愛心手鍊」，上面的編號磨掉了一半。' },
        { id: 'grill', text: '一直追問：「你身分證字號幾號？家人電話幾號？」', grade: 'bad', min: 5, state: 'agitated',
          say: '阿伯越來越煩躁，伸手要拔點滴：「我要回家！」',
          why: '對可能有失智的長者連續追問，只會讓他更焦慮、更想走。先讓他安心，再從聊天裡找線索。' },
        { id: 'tomorrow', text: '等他明天比較清醒再問', grade: 'ok', min: 30, state: 'agitated',
          say: '半小時後，怡君打來：「社工師，阿伯又下床了，我一直把他勸回來……」',
          why: '身分不明的病人越早查證越好。家人可能已經報了失蹤，他現在也一直想走出去。' },
      ],
    },
    find: {
      ask: '你有了線索：名字叫阿興、在市場賣過菜、手上有愛心手鍊。接下來？',
      hint: '找身分要走正式管道，也要顧到他的隱私。',
      options: [
        { id: 'police', text: '請轄區警察協助比對指紋和失蹤人口，同時打愛心手鍊的服務專線查編號', reveal: ['police', 'found'], grade: 'best', min: 20, draw: true, next: 'family',
          say: '你把線索交給警察和愛心手鍊專線，等查詢結果回來。阿伯在床上睡著了。' },
        { id: 'post', text: '把阿伯的照片 PO 到網路上，請大家幫忙分享', grade: 'bad', min: 5,
          say: '照片一下子被轉了好幾百次，底下有人留言亂猜他的身分。',
          why: '公開病人的照片會侵犯他的隱私，也可能被有心人利用。尋找身分要透過警察和社政系統。' },
        { id: 'shelter', text: '先聯絡遊民收容中心，出院後送過去', reveal: ['shelter'], grade: 'ok', min: 10,
          say: '收容中心說可以收，可是阿伯一聽到要去「別的地方」就哭了。',
          why: '還沒查證身分就當成遊民安置，可能讓在找他的家人永遠找不到他。' },
      ],
    },
    family: {
      ask: '查詢結果回來了：阿伯叫林阿興，78 歲，女兒三天前報了失蹤。接下來？',
      hint: '找到家人只是開始，回家後的照顧要一起談。',
      options: [
        { id: 'call', text: '打給女兒說明阿伯的狀況，等她來時一起談：失智症評估、回家後的照顧和防走失', reveal: ['dem'], grade: 'best', min: 20, next: 'done', outcome: 'stable',
          say: '女兒趕到病房，抱著阿伯哭。她說爸爸最近常常忘東忘西，還以為只是老了。你幫她轉介了失智症共同照護中心，也教她怎麼更新愛心手鍊的資料。' },
        { id: 'handoff', text: '請警察通知家屬來接，社工的部分就做完了', grade: 'ok', min: 5,
          say: '女兒來了又匆匆把阿伯帶走，你連一句話都沒跟她說到。',
          why: '找到家人只是第一步。家人可能還不知道爸爸有失智，回家後的照顧和防走失，都要一起討論。' },
      ],
    },
  },
  warn: { state: 'gone', line: '怡君：「社工師！阿伯不見了，警衛在樓梯間找到他！」', log: '無名氏阿伯走出病房' },
  fail: {
    title: '阿伯自己走出醫院，又不見了',
    text: '他趁沒人注意時離開了醫院。兩天後，他在另一個縣市被找到，身體狀況變得更差。身分不明的長者很可能是走失的失智症患者，越早查證，越早讓他回家。',
  },
  card: {
    title: '走失長者：你可以記住的四件事',
    points: [
      '看到長者迷路、講不清楚住哪，先陪著他、讓他安心，再打 110 請警察協助。',
      '家人走失，馬上報警協尋，不用等 24 小時。',
      '家裡有失智長者，可以申請「愛心手鍊」，或到警察局捺印指紋建檔，走失時比較快找到。',
      '最近常常忘東忘西、迷路，不一定只是老了，可以到醫院做失智症評估。',
    ],
  },
};

// A son shouting at the nurses' station because his mother is being "thrown out" to a nursing
// home. The point: keep yourself safe first (distance, a way out, not alone), hear the fear under
// the swearing, set a limit calmly, and report the abuse -- being sworn at is workplace violence.
export const VERBAL = {
  id: 'pverbal', bed: '08B', nurse: '小雯', name: '胡先生', who: '胡阿嬤 · 79 歲 · 髖骨骨折 ／ 兒子胡先生', aggression: true,
  short: '家屬在護理站大吼，指名找社工', late: 'rage',
  family: {
    nodes: [
      { id: 'dad', sex: 'm', x: 90, y: 30, label: '胡阿公（在安養院過世）', dead: true, key: 'fam' },
      { id: 'ip', sex: 'f', x: 165, y: 30, age: 79, label: '胡阿嬤', ip: true },
      { id: 'son', sex: 'm', x: 128, y: 120, age: 52, label: '胡先生（獨子）' },
      { id: 'r1', sex: 'r', x: 255, y: 50, label: '護理之家參觀', key: 'res' },
      { id: 'r2', sex: 'r', x: 255, y: 100, label: '住宿式機構補助', key: 'res' },
    ],
    links: [
      { t: 'marry', a: 'dad', b: 'ip', key: 'fam' }, { t: 'child', a: 'son', from: ['dad', 'ip'], key: 'fam' },
      { t: 'close', a: 'son', b: 'ip' },
      { t: 'res', a: 'ip', b: 'r1', key: 'res' }, { t: 'res', a: 'ip', b: 'r2', key: 'res' },
    ],
  },
  results: { stable: '胡先生願意去看護理之家，你也通報了這次的職場暴力' },
  labs: {
    rows: [['護理之家評鑑', '附近有兩家評鑑優等', '可以安排家屬先去參觀'], ['機構住宿補助', '胡阿嬤可以評估申請', '費用是家屬最怕的事之一', '!'],
      ['過去申訴紀錄', '沒有', '胡先生第一次在醫院發脾氣']],
    note: '胡先生不是常鬧事的家屬。他在害怕：怕媽媽去了護理之家沒人照顧，也怕付不起。弄清楚他怕什麼，比跟他爭誰有理有用。',
  },
  call: '社工師，{bed} 胡阿嬤的兒子在護理站大吼，說醫院要趕他媽媽出院，指名要找社工，罵得很難聽……',
  again: '社工師！{bed} 胡阿嬤的兒子在護理站拍桌子，罵小雯「幹你娘」，其他家屬都在看了！',
  phone: '請他先冷靜一下，等一下我再過去',
  callWhy: '家屬的情緒已經爆了，在護理站失控會影響整個病房，也可能傷到人。社工要去處理，但要帶著安全意識去：不單獨、留退路。',
  intro: '社工師，就是他……胡阿嬤 79 歲，髖骨骨折開完刀，主治說可以出院轉護理之家。她兒子覺得醫院在趕人，從剛剛就一直罵。',
  introLate: '社工師你終於來了，他剛剛把病歷夾摔在地上……',
  states: {
    start: { safe: ['你：他在吼，還沒動手', 'warn'], care: ['兒子一個人扛', 'warn'], money: ['還不知道', 'na'], mood: ['暴怒、罵髒話', 'bad'], clock: ['明天出院', 'warn'] },
    calmer: { safe: ['你：在會談室，坐靠門的位子', 'warn'], mood: ['還在罵，但小聲一點', 'warn'] },
    heard: { care: ['爸爸在安養院出過事', 'warn'], money: ['怕護理之家太貴', 'warn'], mood: ['說出害怕', 'warn'] },
    settled: { safe: ['你：安全', ''], mood: ['平靜下來，說了歹勢', ''] },
    rage: { safe: ['你：他越來越激動', 'bad'], mood: ['暴怒、踢椅子', 'bad'] },
  },
  steps: {
    first: {
      ask: '胡先生指著你大罵：「幹！你們社工是吃屎長大的喔？我媽還不能走路就要趕出去！」你先怎麼做？',
      hint: '先顧好你自己：距離、退路、旁邊有沒有人。他的火不是衝著你這個人來的。',
      askWarn: '胡先生在踢椅子，大吼要叫主管出來。你先怎麼做？',
      options: [
        { id: 'space', text: '站在他側前方、隔一隻手臂以上的距離，背後留著門，請小雯在附近；用平穩低聲說：「胡先生，我是社工，我聽到你很擔心媽媽，我們到會談室坐下來談。」', grade: 'best', min: 5, state: 'calmer', next: 'listen',
          say: '胡先生又罵了兩句「靠北」，但音量小了一點，跟著你走進會談室。你坐在靠門的位子。' },
        { id: 'argue', text: '回他：「先生，請你講話尊重一點，你這樣是在妨礙醫療！」', grade: 'bad', min: 2, state: 'rage',
          say: '胡先生整個人往前逼：「妨礙你老木啦！你算什麼東西？」',
          why: '在對方最激動的時候指責他，只會讓情緒更炸。先降溫、先確保安全，界線之後再設。' },
        { id: 'sorry', text: '一直道歉：「對不起對不起，都是我們不好。」', grade: 'ok', min: 3,
          say: '胡先生罵得更順了：「知道不好還這樣搞？白癡喔！」',
          why: '過度道歉會讓對方覺得罵有用，也沒有處理他真正擔心的事。可以同理他的情緒，不用替不存在的錯道歉。' },
        { id: 'touch', text: '走到他面前，拍拍他的肩膀安撫他', grade: 'bad', min: 1, state: 'rage',
          say: '胡先生一把甩開你的手：「不要碰我！」',
          why: '對情緒激動的人突然靠近、碰觸，很容易被當成挑釁，你自己也站進了危險的距離。' },
      ],
    },
    listen: {
      ask: '在會談室裡，他還是罵：「你們就是想把老人丟掉啦，白癡才信你們。」接下來？',
      hint: '髒話底下是什麼？試著回應他的害怕，不是他的用字。',
      options: [
        { id: 'reflect', text: '不跟髒話計較，回應底下的擔心：「你很怕媽媽去了護理之家沒人照顧好，對嗎？」再請他說說最擔心什麼', grade: 'best', min: 15, state: 'heard', next: 'boundary', reveal: ['fam'],
          say: '胡先生沉默了一下，聲音啞了：「我爸就是在安養院走的……跌倒了一整晚都沒人發現。那種地方要多少錢我也不知道。」' },
        { id: 'rules', text: '拿出出院標準，一條一條解釋為什麼可以出院', grade: 'ok', min: 10,
          say: '你才講到第二條，胡先生就打斷你：「我不要聽這些屁話！」',
          why: '他現在聽不進道理。先讓他覺得被聽見，資訊之後再給。' },
        { id: 'walkout', text: '「你再罵我就不談了。」說完轉身離開', grade: 'bad', min: 2, state: 'rage',
          say: '你一走出會談室，就聽到他在後面摔椅子。',
          why: '設界線是對的，但還沒試著降溫就丟下一句話走人，等於把他推回護理站繼續爆。' },
      ],
    },
    boundary: {
      ask: '他平靜一點了，但每講兩句還是夾一句「幹」。你要？',
      hint: '你可以同理他，也可以要求被尊重。這兩件事不衝突。',
      options: [
        { id: 'limit', text: '溫和但清楚地說：「我願意幫你，但請你不要罵人。如果繼續罵，我們今天先談到這裡。」', grade: 'best', min: 3, state: 'settled', next: 'plan',
          say: '胡先生愣了一下，抓抓頭：「……好啦，歹勢。」' },
        { id: 'swallow', text: '當作沒聽到，忍著繼續談', grade: 'ok', min: 10,
          say: '你一邊聽一邊忍，談完覺得整個人被掏空了。',
          why: '一直忍下去，你會被耗盡，他也學不到界線。尊重是雙向的，可以溫和地說清楚。' },
        { id: 'curse', text: '受不了，回他一句：「你才白癡啦！」', grade: 'bad', min: 1, state: 'rage',
          say: '胡先生跳起來：「你一個社工敢罵我？我要投訴你！」',
          why: '回罵會讓衝突升高，也可能變成你的專業問題。被罵很不舒服，這份不舒服要帶去找督導談，不是罵回去。' },
      ],
    },
    plan: {
      ask: '胡先生願意好好談了。最後你要？',
      hint: '把他怕的事情一件一件處理掉。還有，今天被罵的事，不要自己吞下去。',
      options: [
        { id: 'plan', text: '跟他一起看護理之家的評鑑和費用、安排參觀、評估機構住宿補助；回社工室後通報這次的職場暴力，並跟督導報告', grade: 'best', min: 20, next: 'done', outcome: 'stable', reveal: ['res'],
          say: '胡先生答應明天先去看兩家。你回到社工室寫了職場暴力事件通報。美玲督導說：「被罵成這樣，你還接得住，辛苦了。等一下來找我聊聊。」' },
        { id: 'list', text: '給他一張護理之家名單，請他自己挑', grade: 'ok', min: 3,
          say: '胡先生看著名單皺眉：「我哪知道哪家好？」',
          why: '他怕的是「沒人看著」。陪他看評鑑、去參觀、算清楚費用，信任才建得起來。' },
      ],
    },
  },
  warn: { state: 'rage', line: '小雯：「社工師！他在踢椅子，大罵『幹你娘，叫你們主管出來！』」', log: '胡先生情緒失控、踢椅子' },
  fail: {
    title: '胡先生被保全請出醫院',
    text: '他越罵越大聲，最後摔東西，保全和警察把他帶離醫院。胡阿嬤在病房裡哭，出院和安置的事一點進展都沒有。家屬的憤怒背後常常是害怕；先確保安全，再接住情緒，事情才談得下去。',
  },
  card: {
    title: '被家屬罵的時候：你可以記住的四件事',
    points: [
      '先顧安全：隔一隻手臂以上的距離、站在側面、背後留退路，不要單獨面對失控的人。',
      '髒話底下常常是害怕。先回應情緒，再談事情。',
      '可以溫和地設界線：「我願意幫你，但請不要罵人。」',
      '被辱罵、被威脅也是職場暴力，要通報、跟督導談。覺得受傷是正常的，不用自己吞下去。',
    ],
  },
};

// A drunk husband who blames the social worker for a refused subsidy and grabs her. The point:
// do not go alone, bring security, keep to the door; when held, break free and shout for help
// rather than fight; afterwards have the injury recorded, report it, talk to the supervisor --
// and hear what the wife says about home.
export const VIOLENCE = {
  id: 'pviolence', bed: '03C', nurse: '怡君', name: '鄭先生', who: '鄭阿姨 · 58 歲 · 肝硬化 ／ 先生鄭先生', aggression: true,
  short: '家屬喝醉來醫院，說要找社工算帳', late: 'violent',
  family: {
    nodes: [
      { id: 'hus', sex: 'm', x: 80, y: 60, age: 60, label: '鄭先生（喝了酒）' },
      { id: 'ip', sex: 'f', x: 160, y: 60, age: 58, label: '鄭阿姨', ip: true },
      { id: 'r1', sex: 'r', x: 255, y: 34, label: '保全', key: 'sec' },
      { id: 'r2', sex: 'r', x: 255, y: 84, label: '補助複審', key: 'sec' },
      { id: 'r3', sex: 'r', x: 255, y: 134, label: '保護評估', key: 'dv' },
    ],
    links: [
      { t: 'marry', a: 'hus', b: 'ip' }, { t: 'conflict', a: 'hus', b: 'ip', hide: 'dv' }, { t: 'violence', a: 'hus', b: 'ip', key: 'dv' },
      { t: 'res', a: 'hus', b: 'r1', key: 'sec' }, { t: 'res', a: 'ip', b: 'r2', key: 'sec' }, { t: 'res', a: 'ip', b: 'r3', key: 'dv' },
    ],
  },
  results: { stable: '你驗了傷、通報了職場暴力，也開始評估鄭阿姨在家的安全' },
  labs: {
    rows: [['補助審查', '沒有通過', '家戶收入只超過標準一點點，可以申請複審', '!'], ['醫院安全紀錄', '鄭先生曾經酒後鬧事一次', '高風險家屬，會談要有保全或同事陪同', '!'],
      ['保護資訊系統', '鄭阿姨沒有被通報過', '但她說「在家裡也會這樣」，要單獨評估', '!']],
    note: '補助其實還有複審的機會，這件事可以之後再跟清醒的他談。更要注意的是：他在醫院就會動手，在家裡呢？',
  },
  call: '社工師，{bed} 鄭阿姨的先生喝了酒來醫院，說補助沒過一定是社工在搞鬼，一直說要找你算帳……他身上酒味很重。',
  again: '社工師！{bed} 鄭先生把點滴架推倒了，還一直吼著要找你！',
  phone: '跟他說我等一下過去，請他在病房等',
  callWhy: '喝了酒、指名要「找你算帳」，這是暴力的警訊。這通一定要處理，但不能一個人去：先叫保全、找同事陪，在有退路的地方談。',
  intro: '社工師……就是他，鄭先生，滿身酒味。鄭阿姨肝硬化住院，上禮拜申請的醫療補助沒有通過，他說一定是社工故意刁難。',
  introLate: '社工師，他剛剛把點滴架推倒了，我已經叫保全了……',
  states: {
    start: { safe: ['你：他喝醉、指名找你', 'bad'], care: ['太太在床上發抖', 'warn'], money: ['補助沒過', 'bad'], mood: ['醉、暴躁', 'bad'], clock: ['隨時會動手', 'bad'] },
    guarded: { safe: ['你：保全在門外，你在門邊', 'warn'], mood: ['還在罵', 'bad'] },
    grabbed: { safe: ['你：被揪住掛繩', 'bad'], mood: ['失控', 'bad'] },
    out: { safe: ['你：安全，但脖子有勒痕', 'warn'], care: ['太太說「在家也會這樣」', 'bad'], mood: ['被保全陪出去', 'warn'], clock: ['補助可以複審', ''] },
    violent: { safe: ['你：被攻擊', 'bad'], care: ['太太在尖叫', 'bad'], mood: ['動手了', 'bad'], clock: ['馬上要有人來', 'bad'] },
  },
  steps: {
    first: {
      ask: '鄭先生一看到你就站起來：「幹你娘，就是你喔？」他滿身酒味。你先怎麼做？',
      hint: '喝醉、有敵意、指名找你。先想想：你身邊有誰？你的退路在哪？',
      askWarn: '點滴架倒在地上，鄭先生朝門口吼著你的名字。你先怎麼做？',
      options: [
        { id: 'safe', text: '先停在門口，不走進床和牆中間；請怡君叫保全到病房外待命，自己保持兩隻手臂以上的距離', grade: 'best', min: 3, state: 'guarded', next: 'talk', reveal: ['sec'],
          say: '保全大哥兩分鐘後就到了，站在走廊上。鄭先生罵：「叫保全是怎樣？怕喔？」但沒有再往前。' },
        { id: 'goin', text: '走到床邊，跟他面對面解釋補助的規定', grade: 'bad', min: 2, state: 'grabbed', next: 'grab',
          say: '你才走到床邊，鄭先生就一把揪住你的識別證掛繩！',
          why: '對方喝醉、敵意這麼高，你卻走進床和牆中間的死角，沒有退路，旁邊也沒有人。' },
        { id: 'later', text: '跟怡君說「等他酒醒再說」，自己先回社工室', grade: 'ok', min: 5,
          say: '十分鐘後，怡君打來：「他還在病房裡罵，鄭阿姨嚇到一直哭……」',
          why: '避開是一種選擇，但他還在病房，鄭阿姨、其他病人和護理師都還在危險裡。要叫保全，不是只有你離開。' },
      ],
    },
    grab: {
      ask: '鄭先生揪住你的識別證掛繩往後扯：「今天不給我說清楚，你就別想走！」你要？',
      hint: '被抓住的時候只有一件事：脫身、呼救。',
      options: [
        { id: 'break', text: '大喊「放手！保全！」讓大家聽到，順著他拇指的方向把掛繩抽開，退到門外', grade: 'best', min: 2, state: 'guarded', next: 'talk', energy: -12, hurt: true, reveal: ['sec'],
          say: '掛繩斷了，你退到走廊。保全大哥衝過來擋在門口。你的脖子被勒出一道紅痕，手一直在發抖。' },
        { id: 'fight', text: '反手用力推他一把，要他放手', grade: 'bad', min: 1, state: 'violent', energy: -20, hurt: true,
          say: '鄭先生踉蹌了一下，接著一巴掌甩在你臉上。',
          why: '跟喝醉的人比力氣，很容易兩個人都受傷，你也可能反過來被告。先脫身、呼救、退到安全的地方。' },
        { id: 'reason', text: '被抓著繼續講道理：「先生你聽我說，補助是有標準的……」', grade: 'bad', min: 2, state: 'violent', energy: -10, hurt: true,
          say: '他把你往牆上推：「標準你老母啦！」',
          why: '被抓住的時候，第一件事是脫身和呼救，不是講道理。' },
      ],
    },
    talk: {
      ask: '保全在場，鄭先生還在罵，但沒有再往前。接下來？',
      hint: '現在不是談補助的時候。讓場面安全下來，正事等他清醒再說。',
      options: [
        { id: 'deesc', text: '在保全陪同下、隔著距離簡短說：「補助沒過讓你很急，我可以幫你看還有什麼辦法，但要等你酒醒、不罵人的時候談。」再請保全陪他到外面', grade: 'best', min: 5, state: 'out', next: 'after',
          say: '鄭先生又罵了幾句，被保全陪著走出病房。鄭阿姨小聲說：「社工小姐，對不起……他喝了酒就是這樣，在家裡也會。」' },
        { id: 'explain', text: '跟他一條一條解釋補助為什麼沒過', grade: 'ok', min: 10,
          say: '鄭先生越聽越大聲：「你們就是看不起我們窮人！」',
          why: '喝醉的人聽不進規定。先讓場面安全，正事等他清醒再談。' },
        { id: 'promise', text: '為了讓他冷靜，答應他「我一定想辦法讓補助過」', grade: 'bad', min: 2,
          say: '鄭先生冷笑：「你說的喔，沒過我再來找你。」',
          why: '在威脅下答應做不到的事，下一次他會用更大的暴力來要。可以同理他的急，但不能用承諾換平安。' },
      ],
    },
    after: {
      ask: '鄭先生被請出去了。鄭阿姨說他在家也會這樣。最後你要？',
      hint: '先照顧你自己。然後別忘了，剛剛那句話是誰說的、代表什麼。',
      options: [
        { id: 'report', text: '先去驗傷、通報職場暴力、跟督導報告；也找時間在先生不在時，單獨評估鄭阿姨在家的安全', grade: 'best', min: 25, next: 'done', outcome: 'stable', reveal: ['dv'],
          say: '急診幫你驗了傷，留下紀錄。你寫了職場暴力事件通報。美玲督導聽完，把門關上：「先坐著喝杯水，下午的個案我幫你分一些出去。要不要提告你慢慢想，我陪你。」你點點頭，才發現自己一直在發抖。' },
        { id: 'tough', text: '跟大家說「我沒事」，直接去下一床', grade: 'ok', min: 2,
          say: '你走到下一床門口，手還在抖，一時想不起來要問什麼。',
          why: '被攻擊後硬撐，情緒會在之後找上你。驗傷、通報、跟督導談，是保護自己，也是保護下一個同事。' },
        { id: 'onlyme', text: '通報完職場暴力，這個個案就結案', grade: 'ok', min: 10,
          say: '你闔上通報單，鄭阿姨那句「在家裡也會」一直在你腦中轉。',
          why: '鄭阿姨說「在家裡也會這樣」，這是家暴的警訊。被攻擊的是你，但需要保護的可能還有她。' },
      ],
    },
  },
  warn: { state: 'violent', line: '怡君：「保全！保全！他動手了！」', log: '鄭先生動手攻擊社工' },
  fail: {
    title: '你被打傷，送進了急診',
    text: '鄭先生一拳打在你臉上。同事把你扶到急診縫了三針，今天剩下的個案都只能交給別人。面對喝醉、有敵意的人，先叫保全、留退路、不單獨面對；被攻擊時先脫身、呼救。社工的安全，和個案的安全一樣重要。',
  },
  card: {
    title: '社工被攻擊時：你可以記住的四件事',
    points: [
      '對方喝了酒、指名要找你、有敵意：先叫保全，不要一個人去。',
      '站在門邊，保持兩隻手臂以上的距離，不要走進床和牆中間的死角。',
      '被抓住或被打的時候，先脫身、大聲呼救、退到安全的地方，不要跟對方比力氣。',
      '事後要驗傷、通報職場暴力、跟督導談。要不要提告由你決定，醫院和督導應該陪著你。',
    ],
  },
};

// the cases a day draws from (普通班 four to six a day, 大爛班 six to eight, never more than are
// listed here); `night: true` marks a case that only rings after the lunch break (13:30)
export const PUBLIC_CASES = [DV, DISCHARGE, MONEY, HOSPICE, UNKNOWN, VERBAL, VIOLENCE];
