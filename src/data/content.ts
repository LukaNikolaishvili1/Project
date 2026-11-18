import type { CognitiveStateId, Language } from "../utils/neuroMath";

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  focus: string;
  initials: string;
}

export interface PresetPassage {
  id: string;
  subject: string;
  text: string;
}

export interface LocalizedContent {
  nav: {
    problem: string;
    howItWorks: string;
    impact: string;
    team: string;
    cta: string;
    menuOpen: string;
    menuClose: string;
  };
  hero: {
    kicker: string;
    title: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
    imageAlt: string;
    imageCaption: string;
    curveTitle: string;
    curveSubtitle: string;
    peakLabel: string;
    recoveryLabel: string;
    dipLabel: string;
    stats: Array<{ value: string; label: string; context: string }>;
  };
  problem: {
    eyebrow: string;
    title: string;
    lead: string;
    paragraphs: string[];
    metrics: Array<{
      value: string;
      title: string;
      source: string;
      detail: string;
    }>;
  };
  mechanism: {
    eyebrow: string;
    title: string;
    subtitle: string;
    steps: Array<{
      num: string;
      title: string;
      desc: string;
    }>;
    explorerTitle: string;
    explorerDesc: string;
    states: Record<
      CognitiveStateId,
      {
        tabLabel: string;
        statusBadge: string;
        attentionLabel: string;
        comprehensionLabel: string;
        adviceTitle: string;
        adviceBody: string;
        ahaNote: string;
      }
    >;
    sampleBookTitle: string;
    sampleSentences: string[];
    reReadBanner: string;
    bandsLabels: {
      beta: string;
      alpha: string;
      theta: string;
    };
    simplifierTitle: string;
    simplifierDesc: string;
    presetsLabel: string;
    presets: PresetPassage[];
    textareaLabel: string;
    textareaPlaceholder: string;
    explainBtn: string;
    explainingBtn: string;
    resultLabels: {
      simple: string;
      example: string;
      takeaway: string;
    };
  };
  impact: {
    eyebrow: string;
    title: string;
    subtitle: string;
    imageAlt: string;
    audiences: Array<{
      title: string;
      tag: string;
      desc: string;
    }>;
    privacyTitle: string;
    privacyBody: string;
    measurementTitle: string;
    measurementBody: string;
    feasibilityTitle: string;
    feasibilityPillars: Array<{
      num: string;
      title: string;
      desc: string;
    }>;
  };
  team: {
    eyebrow: string;
    title: string;
    subtitle: string;
    members: TeamMember[];
  };
  contact: {
    eyebrow: string;
    title: string;
    subtitle: string;
    fields: {
      name: string;
      namePlaceholder: string;
      role: string;
      roles: {
        parent: string;
        teacher: string;
        student: string;
        partner: string;
      };
      school: string;
      schoolPlaceholder: string;
      email: string;
      emailPlaceholder: string;
      notes: string;
      notesPlaceholder: string;
    };
    submitBtn: string;
    successTitle: string;
    successBody: string;
    resetBtn: string;
  };
  footer: {
    tagline: string;
    competition: string;
  };
}

export const CONTENT: Record<Language, LocalizedContent> = {
  ka: {
    nav: {
      problem: "პრობლემა",
      howItWorks: "მექანიზმი",
      impact: "გავლენა",
      team: "გუნდი",
      cta: "სკოლის პილოტი",
      menuOpen: "მენიუს გახსნა",
      menuClose: "მენიუს დახურვა",
    },
    hero: {
      kicker: "Tech sPark · სასკოლო ინოვაციური სტარტაპი · „აჰაა!“ მომენტი",
      title: "გაიგე, როდის მუშაობს შენი ტვინი საუკეთესოდ და გაიაზრე წაკითხული პირველივე ჯერზე",
      subtitle:
        "Aham All არის თავზე დასამაგრებელი EEG ხელსაწყო და აპლიკაცია, რომელიც მთელი დღის განმავლობაში ზომავს ტვინის ტალღებს, ადგენს კონცენტრაციის პიკურ საათებს, აფიქსირებს კითხვისას ყურადღების გაფანტვას და გაუგებარ მონაკვეთებს მარტივი ენით ხსნის.",
      primaryCta: "პილოტში ჩართვა",
      secondaryCta: "როგორ მუშაობს",
      imageAlt: "Aham All თავზე დასაკეთებელი EEG მოწყობილობა სასწავლო წიგნის გვერდით",
      imageCaption: "მსუბუქი, უსადენო EEG სამაგრი ყოველდღიური სწავლისთვის — სახლსა და სკოლაში",
      curveTitle: "დღის კოგნიტური პიკის მრუდი",
      curveSubtitle: "ტვინის ტალღების დღიური რუკა · პიკი და დაღლილობა",
      peakLabel: "დილის პიკი · 09:00–11:30",
      recoveryLabel: "საღამოს პიკი · 16:00–17:30",
      dipLabel: "დაღლილობის ფანჯარა · 13:00–14:30",
      stats: [
        {
          value: "61%",
          label: "PISA 2025 ხარვეზი",
          context: "საქართველოში 15 წლის მოსწავლეები საბაზისო დონეს ვერ აღწევენ",
        },
        {
          value: "20–40%",
          label: "გაფანტული დრო",
          context: "კითხვისას ყურადღება შეუმჩნევლად იკარგება",
        },
        {
          value: "80–83%",
          label: "EEG სიზუსტე",
          context: "ყურადღების დაკარგვის ამოცნობა ტვინის ტალღებით",
        },
        {
          value: "1–12",
          label: "სასკოლო კლასები",
          context: "მოსწავლეებისა და მშობლებისთვის ხელმისაწვდომი",
        },
      ],
    },
    problem: {
      eyebrow: "01. პრობლემის იდენტიფიცირება",
      title: "თვალები ტექსტს მიჰყვება, მაგრამ აზრი არ რჩება",
      lead: "თანამედროვე სამყაროში მოსწავლე ყოველდღიურად უზარმაზარ ინფორმაციას იღებს, თუმცა წაკითხულისა და მოსმენილის გააზრების პრობლემა სკოლიდანვე იწყება.",
      paragraphs: [
        "საკლასო და საშინაო მეცადინეობაზე დაკვირვებამ აჩვენა, რომ მოსწავლეთა დიდ ნაწილს შეუძლია ტექსტის გამართულად წაკითხვა, მაგრამ უჭირს მისი შინაარსის გააზრება, მთავარი სათქმელის გამოყოფა და საკუთარი სიტყვებით გადმოცემა.",
        "კითხვის დროის 20–40%-ში ადამიანს ყურადღება შეუმჩნევლად ეფანტება. შედეგად, რთულ ტექსტებსა და მათემატიკური ამოცანების პირობებს მოსწავლე გადაღლილ საათებში უზის, უსარგებლოდ კარგავს დროს და კარგავს თავდაჯერებულობას.",
      ],
      metrics: [
        {
          value: "61%",
          title: "ვერ აღწევს საბაზისო დონეს",
          source: "OECD PISA 2025 · საქართველო",
          detail: "15 წლის მოსწავლეების 61% კითხვაში საბაზისო დონესაც ვერ აკმაყოფილებს.",
        },
        {
          value: "67% / 33%",
          title: "მინიმალური კომპეტენციის ზღვარი",
          source: "OECD PISA 2022 · საქართველო",
          detail: "მოსწავლეების მხოლოდ 33% აღწევს კითხვის მინიმალურ კომპეტენციას, ხოლო 67% — ვერა.",
        },
        {
          value: "80–83%",
          title: "ყურადღების დაკარგვის ამოცნობა",
          source: "სამეცნიერო EEG კვლევები",
          detail: "EEG ტალღების ანალიზით ყურადღების გაფანტვის ამოცნობა და დროული ჩარევა მკვეთრად ზრდის დამახსოვრებას.",
        },
      ],
    },
    mechanism: {
      eyebrow: "02. გადაწყვეტა და ტექნოლოგია",
      title: "სამეცნიერო EEG ტექნოლოგია სასკოლო და საშინაო სწავლისთვის",
      subtitle:
        "მსგავსი მოწყობილობები აქამდე მხოლოდ ლაბორატორიებსა და სამედიცინო ცენტრებში გამოიყენებოდა. Aham All მას ყოველდღიურ, მარტივ სასწავლო ასისტენტად აქცევს.",
      steps: [
        {
          num: "01.",
          title: "თავზე დასამაგრებელი EEG სამაგრი",
          desc: "მოწყობილობა კომფორტულად მაგრდება თავზე და არაინვაზიურად აკვირდება ტვინის ელექტრულ აქტივობას (Beta, Alpha, Theta ტალღებს).",
        },
        {
          num: "02.",
          title: "დღის პიკური საათების რუკა",
          desc: "აპლიკაცია აჩვენებს, დღის რომელ საათებში მუშაობს მოსწავლის ტვინი ყველაზე ეფექტურად, რათა რთული საგნები ზუსტად ამ დროს დაიგეგმოს.",
        },
        {
          num: "03.",
          title: "გაფანტული მონაკვეთის პოვნა",
          desc: "როცა კითხვისას გააზრება წყდება, სისტემა ინიშნავს ტექსტის ზუსტ აბზაცს და მიუთითებს, საიდან სჯობს ხელახლა წაკითხვა.",
        },
        {
          num: "04.",
          title: "„აჰაა!“ მარტივი ახსნა და მაგალითი",
          desc: "კითხვის დასრულების შემდეგ აპლიკაცია გაუგებარ ნაწილს უფრო მარტივი ენითა და დამატებითი მაგალითებით განმარტავს.",
        },
      ],
      explorerTitle: "ინტერაქტიული EEG და გააზრების სიმულატორი",
      explorerDesc:
        "გამოსცადეთ სამი კოგნიტური მდგომარეობა და ნახეთ, როგორ ცნობს Aham All ყურადღების გაფანტვას კონკრეტული ტექსტის კითხვისას.",
      states: {
        focus: {
          tabLabel: "ღრმა კონცენტრაცია",
          statusBadge: "სტატუსი: ოპტიმალური ფოკუსი",
          attentionLabel: "ყურადღების ინდექსი",
          comprehensionLabel: "გააზრების სიღრმე",
          adviceTitle: "საუკეთესო დრო რთული მასალისთვის",
          adviceBody:
            "Beta აქტივობა მაღალია — ტვინი აქტიურად ამუშავებს ინფორმაციას. ახლა იდეალური მომენტია ისტორიის ახალი თავის ან მათემატიკური ამოცანების დასამუშავებლად.",
          ahaNote: "ყველა აბზაცი გააზრებულია დამატებითი განმეორების გარეშე.",
        },
        drift: {
          tabLabel: "ყურადღების გაფანტვა",
          statusBadge: "სტატუსი: გააზრება შეწყდა (მონაკვეთი #2)",
          attentionLabel: "ყურადღების ინდექსი",
          comprehensionLabel: "გააზრების სიღრმე",
          adviceTitle: "დაფიქსირდა გაფანტვა მე-2 წინადადებაზე",
          adviceBody:
            "თვალები ტექსტს მიჰყვებოდა, თუმცა Alpha/Theta ბალანსმა აჩვენა ყურადღების მოწყვეტა. გადაიკითხე მონიშნული მონაკვეთი და ნახე „აჰაა!“ მოკლე განმარტება.",
          ahaNote:
            "მარტივი ახსნა: დავით აღმაშენებელმა დაშლილი სამეფოს ჯარის ნაცვლად შექმნა მუდმივი, კარგად გაწვრთნილი არმია, რათა ქვეყანა ნებისმიერ დროს დაეცვა.",
        },
        fatigue: {
          tabLabel: "გონებრივი დაღლილობა",
          statusBadge: "სტატუსი: საჭიროა 10-წუთიანი შესვენება",
          attentionLabel: "ყურადღების ინდექსი",
          comprehensionLabel: "გააზრების სიღრმე",
          adviceTitle: "გადაღლის სიგნალი — სწავლა ჯობს პიკურ საათში",
          adviceBody:
            "Theta ტალღების მკვეთრი ზრდა მიანიშნებს გადაღლაზე. Aham All გირჩევს 10-წუთიან შესვენებას და რთული მასალის გადატანას ხვალინდელ 10:00–11:30 პიკურ ფანჯარაში.",
          ahaNote:
            "დასვენების შემდეგ სისტემა ავტომატურად გაგიხსნის მონიშნულ მონაკვეთს გამარტივებული შეჯამებით.",
        },
      },
      sampleBookTitle: "საქართველოს ისტორია · ნიმუში ტექსტიდან",
      sampleSentences: [
        "XI საუკუნის ბოლოს საქართველო პოლიტიკური დაქსაქსულობისა და გამუდმებული შემოსევების წინაშე იდგა.",
        "დავით IV აღმაშენებელმა გაატარა სამხედრო რეფორმა, შექმნა მუდმივი ლაშქარი და ცენტრალიზებული მმართველობა განამტკიცა.",
        "ამ ცვლილებებმა შექმნა საფუძველი ქვეყნის ეკონომიკური გაძლიერებისა და კულტურული აღმავლობისთვის.",
      ],
      reReadBanner: "აქ გაიფანტა ყურადღება — რეკომენდებულია გადაკითხვა",
      bandsLabels: {
        beta: "Beta · აქტიური აზროვნება",
        alpha: "Alpha · მშვიდი აღქმა",
        theta: "Theta · დაღლა / გაფანტვა",
      },
      simplifierTitle: "გამოსცადე „აჰაა!“ AI გამმარტივებელი",
      simplifierDesc:
        "ჩასვი ნებისმიერი რთული სასკოლო ტექსტი ან აირჩიე მაგალითი — ნახე, როგორ განუმარტავს Aham All გაუგებარ აბზაცს მოსწავლეს მარტივი ენით.",
      presetsLabel: "სწრაფი სასწავლო მაგალითები:",
      presets: [
        {
          id: "history",
          subject: "საქართველოს ისტორია",
          text: "დავით IV აღმაშენებელმა გაატარა სამხედრო და ადმინისტრაციული რეფორმები, დააწესა მსტოვართა ინსტიტუტი და ცენტრალიზებული სამეფო ხელისუფლება განამტკიცა.",
        },
        {
          id: "math",
          subject: "მათემატიკური ამოცანა",
          text: "მატარებელმა 240 კილომეტრიანი მანძილი 3 საათში დაფარა, ხოლო უკანა გზაზე სიჩქარე 20 კმ/სთ-ით შეამცირა. რამდენი ხანი მოანდომა უკან დაბრუნებას?",
        },
      ],
      textareaLabel: "სასწავლო ტექსტი გასამარტივებლად",
      textareaPlaceholder: "ჩასვით სასწავლო აბზაცი ქართულად ან ინგლისურად...",
      explainBtn: "გამარტივება „აჰაა!“ ფორმატში",
      explainingBtn: "მუშავდება...",
      resultLabels: {
        simple: "მარტივი ახსნა",
        example: "ცხოვრებისეული მაგალითი",
        takeaway: "მთავარი დასკვნა",
      },
    },
    impact: {
      eyebrow: "03. აუდიტორია, გავლენა და განხორციელება",
      title: "ნაკლები სტრესი სახლში, უკეთესი შედეგები ყველა საგანში",
      subtitle:
        "მთავარი სამიზნე აუდიტორია 1–12 კლასის მოსწავლეები და მათი მშობლები არიან (უმცროსკლასელები მას მშობელთან ერთად იყენებენ), თუმცა ხელსაწყო სტუდენტებსა და ზრდასრულებსაც ეხმარება.",
      imageAlt: "მოსწავლე კითხულობს წიგნს Aham All სამაგრით მშვიდ სასწავლო გარემოში",
      audiences: [
        {
          title: "მოსწავლეებისთვის",
          tag: "1–12 კლასი · ყველა საგანი",
          desc: "როცა მოსწავლე იცის თავისი საუკეთესო კონცენტრაციის საათები, პირველივე ჯერზე იგებს ტექსტსა და მათემატიკური ამოცანის პირობას, იუმჯობესებს ნიშნებს და იმაღლებს თავდაჯერებულობას.",
        },
        {
          title: "მშობლებისთვის",
          tag: "სიმშვიდე და სწორი გეგმა",
          desc: "მშობელი აპლიკაციაში ხედავს, როდის სწავლობს შვილი ყველაზე ეფექტურად. მეცადინეობა იგეგმება სწორ დროს, რაც ამცირებს კამათსა და სტრესს გაკვეთილების გამო.",
        },
        {
          title: "მასწავლებლებისა და სკოლებისთვის",
          tag: "უკეთ მომზადებული კლასი",
          desc: "მოსწავლეები გაკვეთილზე უკეთ მომზადებულნი მიდიან, პედაგოგი ნაკლებ დროს ხარჯავს ერთი და იმავეს გამეორებაზე, შედეგად კი მთელი სკოლის აკადემიური მაჩვენებელი იზრდება.",
        },
      ],
      privacyTitle: "კონფიდენციალურობა უპირველეს ყოვლისა",
      privacyBody:
        "მონაცემებს მხოლოდ მოსწავლე და მშობელი ხედავენ. სურვილის შემთხვევაში, მშობელს შეუძლია ანგარიში მასწავლებელს ან სკოლის ფსიქოლოგს გაუზიაროს, რათა ბავშვს მიზნობრივად დაეხმარონ.",
      measurementTitle: "შედეგის მარტივი გაზომვა",
      measurementBody:
        "ეფექტიანობა მოწმდება მოსწავლეების ტესტების შედეგების შედარებით Aham All-ის გამოყენებამდე და რამდენიმე თვის შემდეგ.",
      feasibilityTitle: "განხორციელების გზა და მასშტაბირება საქართველოში",
      feasibilityPillars: [
        {
          num: "01.",
          title: "პილოტირება ერთ სკოლაში",
          desc: "პროექტს ეტაპობრივად ვნერგავთ: პირველ ეტაპზე ვცდით ერთ სკოლაში, ვაგროვებთ უკუკავშირს და ვაზუსტებთ სასწავლო პროცესთან თავსებადობას.",
        },
        {
          num: "02.",
          title: "ტექნოლოგიური და ინჟინრული ბაზა",
          desc: "ვებპლატფორმა და ღრუბლოვანი მონაცემთა ბაზები, პროგრამირების, რობოტიკისა და სენსორული ტექნიკის გუნდი, პლუს სკოლის კომპიუტერული და ინტერნეტ-ინფრასტრუქტურა.",
        },
        {
          num: "03.",
          title: "ნებისმიერ რეგიონში გავრცელება",
          desc: "მოსწავლეს მხოლოდ მოწყობილობა და ტელეფონი სჭირდება — ამიტომ Aham All დამატებითი ბარიერის გარეშე მუშაობს როგორც თბილისში, ისე საქართველოს ნებისმიერ მუნიციპალიტეტში.",
        },
      ],
    },
    team: {
      eyebrow: "04. გუნდის წარდგენა",
      title: "გუნდი Aham All",
      subtitle:
        "Tech sPark კონკურსის ფარგლებში შექმნილი სასკოლო სტარტაპ გუნდი — კვლევიდან ფუნქციურ ტექნოლოგიურ გადაწყვეტამდე.",
      members: [
        {
          id: "luka",
          name: "ლუკა",
          role: "პრობლემის ანალიზი და EEG კვლევა",
          focus: "ყურადღების გაფანტვის მექანიზმის, PISA მონაცემებისა და EEG სიზუსტის სამეცნიერო დასაბუთება.",
          initials: "ლ",
        },
        {
          id: "masho",
          name: "მაშო",
          role: "საგანმანათლებლო კვლევა და ვალიდაცია",
          focus: "მოსწავლეებზე დაკვირვება, წაკითხულის გააზრების სირთულეების დაფიქსირება და PISA 2022 ანალიზი.",
          initials: "მ",
        },
        {
          id: "elene",
          name: "ელენე",
          role: "პროდუქტის კონცეფცია და AI გადაწყვეტა",
          focus: "Aham All კონცეფციის დიზაინი, გაუგებარი ტექსტების მარტივი ახსნისა და „აჰაა!“ მოდელის შექმნა.",
          initials: "ე",
        },
        {
          id: "andria",
          name: "ანდრია",
          role: "სამიზნე აუდიტორია, კონფიდენციალურობა და გავლენა",
          focus: "მოსწავლე-მშობელი-მასწავლებლის ეკოსისტემა, მონაცემთა დაცულობა და სასკოლო შედეგების შეფასება.",
          initials: "ა",
        },
        {
          id: "anri",
          name: "ანრი",
          role: "ტექნიკური არქიტექტურა და მასშტაბირება",
          focus: "პრაქტიკული განხორციელების გეგმა, ვებ/ღრუბლოვანი სისტემა, რობოტიკა და სკოლებში დანერგვის სტრატეგია.",
          initials: "ან",
        },
      ],
    },
    contact: {
      eyebrow: "05. პილოტური პროგრამა და კავშირი",
      title: "ჩართეთ თქვენი სკოლა ან შვილი Aham All-ის საპილოტე ეტაპზე",
      subtitle:
        "დაგვიტოვეთ საკონტაქტო ინფორმაცია სასკოლო ტესტირებისთვის, პარტნიორობისთვის ან მენტორული უკუკავშირისთვის.",
      fields: {
        name: "სახელი და გვარი",
        namePlaceholder: "მაგ. ნინო ბერიძე",
        role: "თქვენი როლი",
        roles: {
          parent: "მშობელი",
          teacher: "მასწავლებელი / სკოლის ადმინისტრაცია",
          student: "მოსწავლე / სტუდენტი",
          partner: "მენტორი / პარტნიორი",
        },
        school: "სკოლა ან მუნიციპალიტეტი",
        schoolPlaceholder: "მაგ. თბილისის #55 საჯარო სკოლა",
        email: "ელ-ფოსტა",
        emailPlaceholder: "name@school.ge",
        notes: "დამატებითი შეტყობინება (არასავალდებულო)",
        notesPlaceholder: "რომელ კლასში ან საგანში გსურთ პილოტის გამოცდა?",
      },
      submitBtn: "განაცხადის გაგზავნა",
      successTitle: "განაცხადი მიღებულია",
      successBody: "გმადლობთ დაინტერესებისთვის. Aham All-ის გუნდი დაგიკავშირდებათ პილოტური ეტაპის დეტალების შესათანხმებლად.",
      resetBtn: "ახალი განაცხადის შევსება",
    },
    footer: {
      tagline: "Aham All — წაკითხულის გააზრება ტვინის ტალღებზე დაფუძნებული რიტმით.",
      competition: "Tech sPark · GITA · Rethink Innovation Center",
    },
  },
  en: {
    nav: {
      problem: "Problem",
      howItWorks: "How It Works",
      impact: "Impact",
      team: "Team",
      cta: "Join Pilot",
      menuOpen: "Open menu",
      menuClose: "Close menu",
    },
    hero: {
      kicker: "Tech sPark · School Startup Competition · The “Aha!” Moment",
      title: "Discover when your brain works best and grasp what you read the first time",
      subtitle:
        "Aham All pairs a lightweight EEG headband with a companion app that maps daily brainwave focus peaks, detects unnoticed attention drops during reading, and explains missed passages in plain language.",
      primaryCta: "Request School Pilot",
      secondaryCta: "Explore Mechanism",
      imageAlt: "Aham All wearable matte-white EEG headband resting beside an open textbook on a study desk",
      imageCaption: "Comfortable dry-sensor EEG headband built for everyday study at home and school",
      curveTitle: "Daily Cognitive Peak Curve",
      curveSubtitle: "24-hour brainwave focus rhythm · peak & fatigue mapping",
      peakLabel: "Morning Peak · 09:00–11:30",
      recoveryLabel: "Afternoon Peak · 16:00–17:30",
      dipLabel: "Fatigue Dip · 13:00–14:30",
      stats: [
        {
          value: "61%",
          label: "PISA 2025 Reading Gap",
          context: "15-year-old students in Georgia below basic reading level",
        },
        {
          value: "20–40%",
          label: "Unnoticed Drift",
          context: "Average share of reading time lost to mind-wandering",
        },
        {
          value: "80–83%",
          label: "EEG Detection Rate",
          context: "Accuracy of brainwave models spotting attention drops",
        },
        {
          value: "1–12",
          label: "Target Grades",
          context: "Designed for school students, parents, and educators",
        },
      ],
    },
    problem: {
      eyebrow: "01. Problem Identification",
      title: "Eyes follow every line, yet comprehension silently breaks",
      lead: "Today's students process information constantly from books, screens, and classrooms—yet reading comprehension struggles start early in school and compound across every subject.",
      paragraphs: [
        "Classroom observation shows that most students can read text fluently aloud, yet struggle to extract the main idea, synthesize meaning, and explain what they just read in their own words.",
        "During 20–40% of reading time, attention drifts without the reader noticing. When students tackle dense texts or math word problems during low-focus hours, they lose time, confidence, and grades.",
      ],
      metrics: [
        {
          value: "61%",
          title: "Below basic reading proficiency",
          source: "OECD PISA 2025 · Georgia",
          detail: "61% of 15-year-old students in Georgia do not reach the baseline proficiency level in reading.",
        },
        {
          value: "67% / 33%",
          title: "Minimum competency gap",
          source: "OECD PISA 2022 · Georgia",
          detail: "Only 33% of students reach minimum reading competency while 67% fall below the threshold.",
        },
        {
          value: "80–83%",
          title: "EEG attention-loss detection",
          source: "Neuroscience Literature",
          detail: "Research shows EEG detects attention drift with 80–83% accuracy, and timely cues improve retention.",
        },
      ],
    },
    mechanism: {
      eyebrow: "02. Solution & Technology",
      title: "Bringing lab-grade EEG comprehension insight into everyday study",
      subtitle:
        "Brainwave sensing has traditionally stayed inside medical clinics and research labs. Aham All makes it practical, affordable, and intuitive for ordinary school students.",
      steps: [
        {
          num: "01.",
          title: "Wearable EEG Headband",
          desc: "Rests comfortably on the head and non-invasively reads brainwave rhythms (Beta, Alpha, and Theta bands) during study.",
        },
        {
          num: "02.",
          title: "Daily Peak Focus Mapping",
          desc: "Reveals the exact hours when a student's brain operates at peak clarity so difficult subjects happen at the right time.",
        },
        {
          num: "03.",
          title: "Pinpointing Missed Passages",
          desc: "When comprehension drops mid-chapter, Aham All marks the exact paragraph where attention drifted and prompts a targeted re-read.",
        },
        {
          num: "04.",
          title: "The “Aha!” Plain-Language Guide",
          desc: "After reading, the companion app re-explains confusing concepts in simpler words with concrete, relatable examples.",
        },
      ],
      explorerTitle: "Interactive EEG & Comprehension Explorer",
      explorerDesc:
        "Switch between three cognitive states to inspect how brainwave frequencies shift and how Aham All catches missed reading passages.",
      states: {
        focus: {
          tabLabel: "Deep Focus",
          statusBadge: "State: Optimal Study Focus",
          attentionLabel: "Attention Index",
          comprehensionLabel: "Comprehension Rate",
          adviceTitle: "Ideal window for complex reading",
          adviceBody:
            "Beta activity is strong and steady. This is the optimal hour to tackle new history chapters or multi-step math word problems.",
          ahaNote: "All paragraphs processed cleanly with zero comprehension drop detected.",
        },
        drift: {
          tabLabel: "Attention Drift",
          statusBadge: "State: Drift Detected at Paragraph #2",
          attentionLabel: "Attention Index",
          comprehensionLabel: "Comprehension Rate",
          adviceTitle: "Mind-wandering caught on Sentence 2",
          adviceBody:
            "Eyes kept scanning the page, but elevated Alpha/Theta shift signaled lost comprehension. Re-read the highlighted sentence and check the simplified Aha! note.",
          ahaNote:
            "Plain summary: David the Builder replaced fragmented feudal militias with a permanent trained army so the kingdom could defend itself reliably.",
        },
        fatigue: {
          tabLabel: "Cognitive Fatigue",
          statusBadge: "State: 10-Min Break Recommended",
          attentionLabel: "Attention Index",
          comprehensionLabel: "Comprehension Rate",
          adviceTitle: "Fatigue detected — reschedule heavy work",
          adviceBody:
            "Elevated Theta waves indicate cognitive exhaustion. Aham All suggests a 10-minute reset and scheduling dense reading for tomorrow's 10:00–11:30 peak.",
          ahaNote:
            "Your bookmark and simplified summary are saved for your next fresh study block.",
        },
      },
      sampleBookTitle: "Georgian History · Sample Reading Excerpt",
      sampleSentences: [
        "At the end of the 11th century, Georgia faced deep political fragmentation and constant external invasions.",
        "King David IV the Builder enacted sweeping military reforms, establishing a standing royal army and centralized governance.",
        "These structural reforms laid the groundwork for long-term economic strength and cultural renewal.",
      ],
      reReadBanner: "Attention drifted here — start re-reading from this line",
      bandsLabels: {
        beta: "Beta · Active Reasoning",
        alpha: "Alpha · Relaxed Intake",
        theta: "Theta · Drift / Fatigue",
      },
      simplifierTitle: "Try the Live “Aha!” Passage Simplifier",
      simplifierDesc:
        "Paste any difficult textbook excerpt or pick a sample below to see how Aham All turns confusing lines into clear understanding.",
      presetsLabel: "Sample study passages:",
      presets: [
        {
          id: "history",
          subject: "Georgian History",
          text: "King David IV the Builder enacted sweeping military and administrative reforms, established an intelligence network, and consolidated centralized royal authority.",
        },
        {
          id: "math",
          subject: "Math Word Problem",
          text: "A train covered a 240 km route in 3 hours, and on the return trip reduced its average speed by 20 km/h. How long did the return journey take?",
        },
      ],
      textareaLabel: "Study passage to simplify",
      textareaPlaceholder: "Paste a textbook paragraph in Georgian or English...",
      explainBtn: "Simplify into an “Aha!” Note",
      explainingBtn: "Simplifying...",
      resultLabels: {
        simple: "Plain Explanation",
        example: "Everyday Example",
        takeaway: "Key Takeaway",
      },
    },
    impact: {
      eyebrow: "03. Audience, Impact & Feasibility",
      title: "Calmer study routines at home, stronger outcomes across every subject",
      subtitle:
        "Built primarily for Grade 1–12 students and their parents (with younger learners guided by parents), while also supporting university students and lifelong learners.",
      imageAlt: "Student wearing the slim matte-white Aham All headband while studying calmly at a sunlit desk",
      audiences: [
        {
          title: "For Students",
          tag: "Grades 1–12 · All Subjects",
          desc: "By matching hard texts and math word problems to peak focus hours, students grasp lessons faster, spend less time stuck, boost grades, and build lasting study habits.",
        },
        {
          title: "For Parents",
          tag: "Less Homework Conflict",
          desc: "Parents see when their child learns best in the app and schedule homework around peak energy windows—cutting evening stress and arguments.",
        },
        {
          title: "For Teachers & Schools",
          tag: "Classroom Readiness",
          desc: "Better-prepared students reduce repetitive re-teaching in class, lifting overall school performance across urban and regional communities alike.",
        },
      ],
      privacyTitle: "Privacy by Design",
      privacyBody:
        "Brainwave and study reports remain strictly private to the student and parent. Parents may optionally share summaries with a teacher or school psychologist to coordinate support.",
      measurementTitle: "Measurable Academic Proof",
      measurementBody:
        "Impact is verified directly by comparing student test scores before adopting Aham All and several months after consistent use.",
      feasibilityTitle: "Feasibility & Nationwide Scaling Plan",
      feasibilityPillars: [
        {
          num: "01.",
          title: "Single-School Pilot First",
          desc: "We roll out step by step—starting with a focused pilot in one partner school to validate usability and measure comprehension gains.",
        },
        {
          num: "02.",
          title: "Practical Tech & Engineering Stack",
          desc: "Powered by modern web and cloud infrastructure, software/robotics engineering expertise, and standard school computers and internet access.",
        },
        {
          num: "03.",
          title: "Zero-Barrier Regional Reach",
          desc: "Because Aham All requires only the headband and a smartphone, any school or municipality across Georgia can adopt it without heavy infrastructure.",
        },
      ],
    },
    team: {
      eyebrow: "04. The Team",
      title: "Team Aham All",
      subtitle:
        "Student innovators participating in Tech sPark—combining educational research, EEG insight, AI comprehension, and scalable engineering.",
      members: [
        {
          id: "luka",
          name: "Luka",
          role: "Problem Analysis & EEG Research",
          focus: "Synthesized reading attention-drift research, PISA 2025 statistics, and EEG detection accuracy evidence.",
          initials: "LU",
        },
        {
          id: "masho",
          name: "Masho",
          role: "Educational Research & Validation",
          focus: "Led school observation insights, comprehension gap framing, and OECD PISA 2022 benchmarking.",
          initials: "MA",
        },
        {
          id: "elene",
          name: "Elene",
          role: "Product Concept & AI Solution",
          focus: "Defined the Aham All headband-plus-app workflow and the plain-language “Aha!” explanation concept.",
          initials: "EL",
        },
        {
          id: "andria",
          name: "Andria",
          role: "Target Audience, Privacy & Impact",
          focus: "Designed the student-parent-teacher benefit model, strict data privacy rules, and outcome metrics.",
          initials: "AN",
        },
        {
          id: "anri",
          name: "Anri",
          role: "Feasibility, Architecture & Scaling",
          focus: "Structured the phased pilot rollout, web/cloud stack, hardware/robotics needs, and national scaling.",
          initials: "AR",
        },
      ],
    },
    contact: {
      eyebrow: "05. Pilot & Partnership",
      title: "Bring Aham All to your school or family pilot",
      subtitle:
        "Leave your contact details to join our first school pilot cohort, share mentor feedback, or partner with our Tech sPark team.",
      fields: {
        name: "Full Name",
        namePlaceholder: "e.g. Nino Beridze",
        role: "Your Role",
        roles: {
          parent: "Parent",
          teacher: "Teacher / School Principal",
          student: "Student",
          partner: "Mentor / Partner",
        },
        school: "School or Municipality",
        schoolPlaceholder: "e.g. Tbilisi Public School #55",
        email: "Email Address",
        emailPlaceholder: "name@school.ge",
        notes: "Notes (Optional)",
        notesPlaceholder: "Which grade levels or subjects would you like to pilot?",
      },
      submitBtn: "Submit Pilot Request",
      successTitle: "Pilot Request Recorded",
      successBody: "Thank you for reaching out. The Aham All team will follow up with pilot onboarding details.",
      resetBtn: "Submit Another Request",
    },
    footer: {
      tagline: "Aham All — Reading comprehension aligned with your brain's natural focus rhythm.",
      competition: "Tech sPark · GITA · Rethink Innovation Center",
    },
  },
};
