// ================================================================
// AiSW Lab 網站內容
// ----------------------------------------------------------------
// 改網站文字只要改這個檔案，不用動 index.html。
//
// 規則只有三條：
//   1. 只改雙引號 " " 裡面的文字。
//   2. 每一筆資料後面要有逗號（最後一筆可以不加）。
//   3. 要新增一筆，就複製上面一整筆，再改裡面的字。
//
// 改完按右上角「Commit changes」，大約 1 分鐘後網站就會更新。
// ================================================================

window.SITE = {

  // ---------- 基本資料 ----------
  affiliation: "東吳大學社會工作學系",
  email: "[團隊 Gmail]",

  // ---------- 01 關於我們 ----------
  about: "AiSW Lab 由東吳大學社會工作學系謝文中老師主持，目前執行國科會計畫「口袋裡的醫務社工師」。我們開發社工用得上的 AI 工具，並和醫院社工室一起在實務現場檢驗成效。",

  principles: [
    "AI 只寫草稿，判斷留給社工。",
    "省下文書時間，還給個案。",
    "先研究與倫理審查，再推廣。"
  ],

  // ---------- 02 成員介紹 ----------
  // photo：照片上傳到最外層後，填 "檔名.jpg"；沒有照片就留 ""
  // link：個人網頁網址（https:// 開頭），填了名字就能點；沒有就留 ""
  // bio：簡介，留 "" 就不會顯示
  members: [
    {
      role: "PI / 計畫主持人",
      name: "謝文中",
      title: "東吳大學社會工作學系副教授",
      bio: "醫務社會工作、科技、AI 與社會工作、災難社會工作、量表建構與發展",
      photo: "",
      link: ""
    },
    {
      role: "RA / 研究助理",
      name: "黃昱幃",
      title: "國立陽明交通大學衛生福利研究所",
      bio: "",
      photo: "",
      link: ""
    },
    {
      role: "RA / 研究助理",
      name: "王芝昀",
      title: "東吳大學社會工作學系",
      bio: "",
      photo: "",
      link: ""
    }
  ],

  // ---------- 03 研究發表 ----------
  // 每一類底下的 items，一行一筆，新的放最上面。
  // 每類只先顯示前 5 筆，其餘會收在「顯示其餘」裡。
  // 「謝文中」和「Hsieh, W. C.」會自動變粗體。
  research: [
    {
      group: "研究計畫",
      en: "PROJECTS",
      items: [
        "謝文中（主持人）（2025年8月-2027年7月）。口袋裡的醫務社工師：醫療福利小幫手AI聊天機器人發展、易用性與推廣應用。國科會專題研究計畫（NSTC114-2410-H-031-010-MY2）。",
        "謝文中（主持人）（2023年5月-2025年4月）。醫療弱勢族群「智慧醫務社工(iMSW)」系統發展與介入研究：社會福利特徵分析、系統設計與成效評估。國科會專題研究計畫（NSTC113-2425-H-037-001）。",
        "張麗珠（主持人）、謝文中（共同主持人）（2023年5月-2024年4月）。因應氣候變遷下複合災害威脅心理準備及防災韌性提升之研究--氣候變遷下以「災害威脅心理準備」落實災防「知、情、意、行」的意識及整備(總計畫及子計畫三)(I)。國科會專題研究計畫（NSTC 112-2625-M-020-002）。",
        "謝文中（主持人）（2021年8月-2023年3月）。以災難管理觀點探討新冠肺炎下醫務社會工作的實踐經驗。科技部專題研究計畫（MOST110-2410-H-037-017）。",
        "陳武宗（主持人）、謝文中（協同主持人）（2020年5月-2023年4月）。防救災社會服務人力的培訓與公私部門協同合作機制的建構－災變社會工作應變模擬情境與教育訓練模式建構。科技部專題研究計畫（MOST 109-2124-M-020-001）。"
      ]
    },
    {
      group: "期刊論文",
      en: "JOURNAL ARTICLES",
      items: [
        "劉秋伶、謝文中（通訊作者）（2024）。疫情時，誰來值班？我國新冠肺炎期間醫院志工持續服務影響因素研究。台灣公共衛生雜誌，43（5），488-500。（TSSCI期刊）",
        "謝文中、陳武宗、莊東憲、洪宏德、林汶靜（2023）。一場心理健康風暴？：新冠肺炎三級警戒下醫務社工心理情緒困擾之相關影響因素研究。臺大社會工作學刊，特刊，83-140。（TSSCI期刊）",
        "Hsieh, W. C., Chuang, T. H., & Wen, H. H. (2023). Taiwan's Medical Social Work Development and the Impact of Social Work Regulation. Research on Social Work Practice, 33(1), 41-51. (SSCI journal, IF: 1.984, 22/43, Ranking: 51.16%)",
        "張凱淳、謝文中（通訊作者）（2023）。新冠肺炎期間無家者的生活困境與社會工作回應－系統性文獻回顧分析。社區發展季刊，181，175-189。",
        "陳武宗、謝文中（通訊作者）、張凱淳、黃嘉均（2023）。社會工作救災經驗傳承與創新教育訓練模式－模擬情境腳本發展與響應式網頁建置。社區發展季刊，181，217-232。",
        "劉秋伶、謝文中（通訊作者）（2021）。「志工」在瘟疫蔓延時：新冠肺炎下醫院志願服務管理與志工投入抉擇因素之探索性研究。社會政策與社會工作學刊，25（2），139-186。（TSSCI期刊）",
        "Hsieh, W. C., & Ku, Y. W. (2018). Trust Inspires Trust: Medical Social Workers' Perspectives of Trust in the Context of Taiwan. International Social Work, 61(6), 1015-1026. (SSCI journal, IF: 0.91, 25/42, Ranking: 59.52%)",
        "謝文中、鄭夙芬、陳毓文（2017）。災難復原力保護因子量表之建構與發展研究。社會政策與社會工作學刊，21（1），49-95。（TSSCI期刊）",
        "Cheng, S. F., Cheng, C. W., Hsieh, W. C., Chi, M. C., Lin, S. J., & Liao, Y. T. (2012). Effects of Individual Resilience Intervention among Indigenous People Experienced Typhoon Morkot in Taiwan. The Kaohsiung Journal of Medical Sciences, 28(2), 105-110. (SCIE journal)",
        "謝文中、鄭夙芬、鄭期緯（2011）。這是「房子」，不是「家屋」：從解釋性互動論探討莫拉克風災後原住民的遷徙與衝擊。臺大社會工作學刊，24，135-166。（TSSCI期刊）",
        "謝文中、鄭夙芬、梁綺薇、潘友為（2009）。香港地區病人自助組織專職人員對人力資源管理需求之探討－以接受香港復康會社區復康網絡計畫培力之病人自助組織為例。社區發展季刊，126，432-455。",
        "鄭夙芬、林雅琪、洪曉婷、葉雅玲、謝文中、鄭期緯（2009）。高雄市社區照顧關懷據點永續發展可能性之探討。社區發展季刊，126，254-274。"
      ]
    },
    {
      group: "研討會論文",
      en: "CONFERENCE PAPERS",
      items: [
        "謝侑書、卓依蒨、黃昱惠、謝文中（通訊作者）、侯冠羽、游緣涵（2024年12月）。當醫務社工與科技相遇：花蓮慈濟醫院智慧醫務社工系統（iMSW）服務成果評估初探。2024年醫務社會工作永續發展國際研討會。臺北市：臺北市立聯合醫院仁愛院區（國科會專題研究計畫：NSTC113-2425-H-037-001）。",
        "Hsieh, W. C., Chuang, T. H., Liu, P. C., Wang, W. L., & Hou, K. Y. (2024). Working with Technology: Development and Usability Testing of the Intelligent Medical Social Work System. The 10th International Conference on Social Work in Health and Mental Health (10th ICSWHMH), Melbourne, Australia.",
        "謝文中、張素玉、柯虹伶、黃乃琪、李芸樺、陳天愛、王妏莉、張凱淳（2023年11月）。醫務社會工作個案服務滿意度量表之建構與發展研究。第六屆華人地區醫務社會工作國際研討會。新北市：台北慈濟醫院。",
        "陳武宗、劉姵均、謝文中（通訊作者）、陳玉珊、張凱淳（2021年11月）。八仙塵爆與高雄氣爆事件醫院社會工作部門的災難應變與跨組織協作經驗探討：Triple ABCD model觀點的分析。第五屆華人地區醫務社會工作國際研討會。臺北市：實踐大學台北校區（國科會專題研究計畫：109-2124-M-020-001）。",
        "劉秋伶、謝文中（通訊作者）、吳蕙君、林以瑄、白怡萱、李庚恕（2021年03月）。「疫」同面對：新冠疫情下醫院志願服務應變與志工值班因素之研究。2021年臺灣社會工作專業人員協會年會暨「疫情時代的社會工作實踐」研討會。臺北市：集思交通部會議中心。",
        "Hsieh, W. C., Liechty, J. M., & Brooks, A. (2018). Multiple Models, One Vision: A Comparative Analysis of Integrated Care in the USA and Taiwan Using the RE-AIM Framework. The Joint World Conference on Social Work, Education and Social Development 2018 (SWSD 2018), Dublin, Ireland.",
        "謝文中、廖苡妏、陳浚瑞、蔡文玲、張志豊（2017年11月）。讓「心」轉為愛：某醫學中心器官（捐贈）移植實務現況之探索性研究。第三屆華人地區醫務社會工作國際研討會。臺北市：萬芳醫院。",
        "謝文中、蔡文玲、張志豊、蘇俞安、廖苡妏、劉軒宇、胡善喻、陳浚瑞（2015年11月）。The “Strengths Perspective” & “Four Rs”：醫務社工個案評估與優勢觀點介入指標建構之研究。第二屆華人地區醫務社會工作國際研討會。臺北市：聯合醫院仁愛院區。",
        "謝文中、王增勇、蔡貞慧（2015年9月）。數字如何成為真實：臺灣發展遲緩兒童6%-8%盛行率之建制民族誌研究。國際社會福利協會中華民國總會2015社會工作、教育與社會發展研討會：促進人性尊嚴與價值。臺北市：臺灣大學。",
        "謝文中、蔡貞慧、曾頌惠（2014年5月）。6%-8%的弔詭：臺灣發展遲緩兒童盛行率之再思考。2014年臺灣社會福利學會年會暨國際學術研討會：衛生福利部與社會福利新紀元組織再造、制度改革、福利精進。嘉義縣：國立中正大學。",
        "謝文中、古允文（2014年4月）。醫務社會工作者個案工作服務歷程分析：信任觀點的詮釋。Global Social Sciences Conference 2014-Social Development confronting Global Challenges: Action, Policy, Planning and Social Work Interventions。香港：浸會大學。",
        "謝文中、蔡文玲、邱韻寧、陳浚瑞、劉雅萍、楊榕炘、翁于雯（2013年10月）。從財神爺到土地公：醫務社會工作者經濟補助的困境與突圍。第一屆華人地區醫務社會工作國際研討會。新北市：輔仁大學。",
        "Cheng, S. F., Hsieh, W. C., Cheng, C. W., Chi, M. C., Lin, S. J., Liao, Y. T. & Chang, S. C. (2010). The Intervention Effect on Individual Resilience of Indigenous People after the Flood Disaster 'Morakot' in Taiwan. In International Symposium for Disaster Medicine, Kaohsiung, Taiwan.",
        "Cheng, S. F., Hsieh, W. C., Chi, M. C., Cheng, C. W. & Lin, S. J. (2010). Measurement of People Resilience after the Floor Disaster, Morakot, in Taiwan: A Pilot Study. In IASW, CSW, IFSW, 2010 Joint World Conference on Social Work and Social Development, H.K, China.",
        "Cheng, S. F., Hsieh, W. C., Cheng, C. W. & Lin, Y. C. (2010). Integration Health and Social Services for Elder People in a Local Community: A Case Study in Taiwan. In IASW, CSW, IFSW, 2010 Joint World Conference on Social Work and Social Development, H.K, China."
      ]
    },
    {
      group: "專書論文",
      en: "BOOK CHAPTERS",
      items: [
        "謝文中、陳武宗、黃嘉均（2022）。把「設計」找進來─問題導向學習在「方案設計與評估」課程之應用與成效評估。載於藍美華、熊瑞梅、陳幼慧（主編），學習潛望鏡－跨域教學、社群與成效（頁293-299）。國立政治大學出版。"
      ]
    }
  ],
  publicationsLink: "",   // 老師系網個人頁的網址，例如 "https://..."

  // ---------- 04 我們的產品 ----------
  // status 寫「開放使用」會顯示紅底和開啟按鈕；其他文字（例如「研究試用中」）顯示白底
  products: [
    {
      name: "社工AI提示詞行政小幫手",
      desc: "醫務社工常用的提示詞，選一個、填好欄位，複製到 ChatGPT、Claude 或 Gemini。",
      status: "開放使用",
      url: "https://script.google.com/macros/s/AKfycbwQar88hJTCqlCEE1PsfTGU4mP3_cDuRvC3_VS_YvoDF0TUIlbd5ZXavFG7gxtv3i0HOg/exec/exec?theme=balanced"
    },
    {
      name: "醫務社工個案紀錄助手",
      desc: "將訪談筆記或口述內容整理為結構化個案紀錄，並依 4Rs 等架構協助評估與處遇計畫。",
      status: "研究試用中",
      url: ""
    },
    {
      name: "福利諮詢 LINE 機器人",
      desc: "民眾在 LINE 上描述遇到的困難，即可查到相關補助、申請方式與聯絡窗口。",
      status: "研究試用中",
      url: ""
    }
  ],

  // ---------- 05 聯絡我們 ----------
  // hospitals 留空 [] 的話，「合作醫院」這一欄就不會顯示
  contactTitle: "歡迎醫院社工室\n一起試用與研究。",
  contactText: "我們可以到院說明、協助導入，並與社工一起檢視成效。",
  hospitals: []

};
