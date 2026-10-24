// Small talk on the ward: everyone the social worker walks past can be spoken to (E).
// Nothing here is a case; it is the day around the calls -- the lunch runs, the superstitions,
// the people who keep the floor going -- and now and then someone looks after the social worker.
//
// Each person:
//   name, role                 what the dialog's name tag says: `${role}${name}`
//   faces                      portraits in assets/game/char/ to pick from; none for people with no art
//   lines                      { text, when?, gift?, pri? }
//     when(s)                  s is { morning, noon, afternoon, hungry, tired, needLoo, hurt, abused }
//     gift                     { full?, energy?, bladder?, toast } -- given once a day per person
//     pri                      said first when it fits (a hungry social worker hears about food)
// Lines are not repeated until every fitting line has been said. The first line of each person
// should have no `when` and no gift: it is what they say when nothing else fits.

export const CHATTER = {
  pinyu: {
    name: '品妤', role: '護理師', faces: ['nurse_worried', 'nurse_neutral'],
    lines: [
      { text: '學姊說，看到家屬怪怪的、病人講話會先看家人臉色，就要記得照會社工。' },
      { text: '社工師你還沒吃飯對不對？我多買了一個飯糰，給你！', when: s => s.hungry, pri: true,
        gift: { full: 20, toast: '你吃掉了品妤給的飯糰，肚子飽了一點。' } },
    ],
  },
  shuhan: {
    name: '書涵', role: '護理師', faces: ['nurse_caring', 'nurse_holding_laugh'],
    lines: [
      { text: '噓——千萬不要說「今天好像很閒」，說了一定會忙起來。' },
      { text: '社工師你臉色好差。趁現在沒人找你，去社工室休息一下，有事我叫你。', when: s => s.tired, pri: true },
    ],
  },
  akai: {
    name: '阿凱', role: '傳送員', faces: ['akai_coffee'],
    lines: [
      { text: '推病人去檢查的路上，很多阿公阿嬤會跟我講心事。我都叫他們去找社工。' },
      { text: '社工師，我要下樓去便利商店，順便幫你帶一杯咖啡？……來，熱的。',
        gift: { energy: 6, bladder: 12, toast: '你喝了阿凱帶的咖啡，比較有精神了，不過等一下可能要跑廁所。' } },
    ],
  },
  azhu: {
    name: '阿珠姨', role: '清潔人員', faces: ['azhu_smile'],
    lines: [
      { text: '地板剛拖過，走路小心不要滑倒喔！' },
      { text: '你吃飯了沒？沒吃不行啦，便當冷了也要吃。', when: s => s.hungry, pri: true },
    ],
  },
  shufen: {
    name: '淑芬學姊', role: '護理長', faces: ['nurse_stern', 'nurse_caring', 'nurse_neutral'],
    lines: [
      { text: '我們打電話給你，不是要丟事情給你。有些事真的要社工來，多包涵。' },
      { text: '上個月有家屬在護理站打了學妹一巴掌。被罵、被打都要通報，不要忍，醫院有保全。' },
      { text: '下午家庭會議多，先把早上的紀錄打完比較好。', when: s => s.morning },
    ],
  },
  yaqi: {
    name: '雅琪', role: '護理師', faces: ['nurse_holding_laugh', 'nurse_neutral'],
    lines: [
      { text: '我在打護理紀錄，打到眼睛都花了。你們社工的紀錄應該也很多吧？' },
      { text: '社工師，廁所就在社工室旁邊，你不要憋喔，憋久了會發炎的。', when: s => s.needLoo, pri: true },
    ],
  },
  azhe: {
    name: '阿哲', role: '總醫師', faces: ['chief_approve', 'chief_tired'],
    lines: [
      { text: '有社工在，家屬會議真的差很多。我們講病情，你們接住家屬的心情。' },
      { text: '下午那幾個家庭會議，可能要麻煩你一起來。', when: s => s.noon },
    ],
  },
  jingyi: {
    name: '靜怡', role: '護理師', faces: ['nurse_neutral', 'nurse_caring'],
    lines: [
      { text: '有些病人只是說「我想回家」，可是背後原因每個都不一樣。' },
    ],
  },
  // the supervisor at her desk in the office (SUP in game.js says 美玲督導 everywhere else)
  sup: {
    name: '美玲', role: '督導', faces: ['nurse_caring', 'nurse_neutral'],
    lines: [
      { text: '卡住的時候就打給我。社工不是一個人在做事，有督導、有團隊。' },
      { text: '早上先把今天的照會排一下輕重緩急：保護性的、要出院的，先處理。', when: s => s.morning, pri: true },
      { text: '紀錄趁記得的時候打。拖到下班，細節就忘光了。', when: s => s.afternoon },
      { text: '你看起來很累。來，這顆巧克力給你，吃完再去下一床。', when: s => s.tired, pri: true,
        gift: { energy: 8, full: 5, toast: '你吃了督導給的巧克力，比較有力氣了。' } },
      { text: '我們看到的常常不是全部。家系圖畫一畫，很多事情就清楚了。' },
      { text: '剛剛的事我聽說了。你先坐下來，不用急著去下一床。被攻擊之後會發抖、會生氣、會想哭，都很正常。', when: s => s.hurt, pri: true,
        gift: { energy: 10, toast: '督導陪你坐了一下，你的呼吸慢慢穩下來。' } },
      { text: '被罵成那樣還要繼續談，很不容易。今天下班前，我們一起把那段寫進通報。', when: s => s.abused && !s.hurt, pri: true },
    ],
  },
  // a family member waiting in the interview room; no portrait
  family: {
    name: '王太太', role: '家屬', faces: [],
    lines: [
      { text: '社工師，我在這裡坐一下就好。病房裡太吵了，在這裡才哭得出來。' },
      { text: '上禮拜你幫我們申請的補助下來了，真的很謝謝你。我先生說要當面跟你道謝。' },
    ],
  },
  // the nurse who called the social worker to a bed, once that case is settled; name is filled in
  bed: {
    name: '', role: '護理師', faces: ['nurse_thankful', 'nurse_caring', 'nurse_sleepy'],
    lines: [
      { text: '剛剛那床謝謝你，社工師。有你來，家屬安心很多。' },
      { text: '社工師快下班了吧？今天辛苦了。', when: s => s.afternoon },
    ],
  },
};
