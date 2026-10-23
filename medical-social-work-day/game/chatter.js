// Small talk on the ward: everyone the social worker walks past can be spoken to (E).
// Nothing here is a case; it is the day around the calls -- the lunch runs, the superstitions,
// the people who keep the floor going -- and now and then someone looks after the social worker.
//
// Each person:
//   name, role                 what the dialog's name tag says: `${role}${name}`
//   faces                      portraits in assets/game/char/ to pick from; none for people with no art
//   lines                      { text, when?, gift?, pri? }
//     when(s)                  s is { morning, noon, afternoon, hungry, tired, needLoo }
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
  // the nurse who called the social worker to a bed, once that case is settled; name is filled in
  bed: {
    name: '', role: '護理師', faces: ['nurse_thankful', 'nurse_caring', 'nurse_sleepy'],
    lines: [
      { text: '剛剛那床謝謝你，社工師。有你來，家屬安心很多。' },
      { text: '社工師快下班了吧？今天辛苦了。', when: s => s.afternoon },
    ],
  },
};
