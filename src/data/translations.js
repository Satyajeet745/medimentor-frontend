export const LANGUAGES = [
  { code: 'en', label: 'English', flag: '🇬🇧', native: 'English' },
  { code: 'hi', label: 'Hindi', flag: '🇮🇳', native: 'हिंदी' },
  { code: 'mr', label: 'Marathi', flag: '🇮🇳', native: 'मराठी' },
  { code: 'gu', label: 'Gujarati', flag: '🇮🇳', native: 'ગુજરાતી' },
];

// Disease names in regional languages
// Format: englishName: { hi: 'Hindi name', mr: 'Marathi name', gu: 'Gujarati name' }
export const DISEASE_NAMES = {
  'pneumonia': { hi: 'निमोनिया (Pneumonia)', mr: 'निमोनिया (Pneumonia)', gu: 'ન્યુમોનિયા (Pneumonia)' },
  'tuberculosis': { hi: 'तपेदिक (क्षय रोग)', mr: 'क्षयरोग (टीबी)', gu: 'ક્ષય રોગ (ટીબી)' },
  'malaria': { hi: 'मलेरिया', mr: 'हिवताप (मलेरिया)', gu: 'મેલેરિયા' },
  'dengue': { hi: 'डेंगू', mr: 'डेंगू', gu: 'ડેન્ગ્યૂ' },
  'typhoid': { hi: 'टाइफाइड (मोतीझरा)', mr: 'विषमज्वर (टायफॉइड)', gu: 'ટાઇફોઇડ (મોળો તાવ)' },
  'hemorrhoids': { hi: 'बवासीर (पाइल्स)', mr: 'मूळव्याध (पाइल्स)', gu: 'હરસ-મસા (પાઇલ્સ)' },
  'diabetes': { hi: 'मधुमेह (शुगर)', mr: 'मधुमेह (साखर)', gu: 'મધુપ્રમેહ (ડાયાબિટીસ)' },
  'hypertension': { hi: 'उच्च रक्तचाप (बीपी)', mr: 'उच्च रक्तदाब (बीपी)', gu: 'ઉચ્ચ રક્તદાબ (બીપી)' },
  'asthma': { hi: 'दमा (अस्थमा)', mr: 'दमा (अस्थमा)', gu: 'દમ (અસ્થમા)' },
  'jaundice': { hi: 'पीलिया (कामला)', mr: 'कावीळ', gu: 'કમળો' },
  'chickenpox': { hi: 'चिकनपॉक्स (छोटी माता)', mr: 'कांजण्या', gu: 'અછબડા' },
  'measles': { hi: 'खसरा', mr: 'गोवर', gu: 'ઓરી' },
  'anemia': { hi: 'खून की कमी (एनीमिया)', mr: 'रक्तक्षय (अनीमिया)', gu: 'લોહીની ઉણપ (એનિમિયા)' },
  'arthritis': { hi: 'गठिया (जोड़ों का दर्द)', mr: 'सांधेवात', gu: 'સાંધાનો દુખાવો' },
  'epilepsy': { hi: 'मिर्गी', mr: 'अपस्मार (मिरगी)', gu: 'વાઈ (એપિલેપ્સી)' },
  'migraine': { hi: 'आधासीसी (माइग्रेन)', mr: 'अर्धशिशी (मायग्रेन)', gu: 'અધકપારી (માઇગ્રેન)' },
  'scabies': { hi: 'खुजली (स्केबीज)', mr: 'खरूज (खाज)', gu: 'ખરજ (સ્કેબિઝ)' },
  'conjunctivitis': { hi: 'आँख आना (कंजंक्टिवाइटिस)', mr: 'डोळे येणे', gu: 'આંખ આવવી' },
  'gastritis': { hi: 'पेट में जलन (गैस्ट्राइटिस)', mr: 'जठरशोथ', gu: 'ગેસ્ટ્રાઇટિસ' },
  'kidney stones': { hi: 'पथरी (किडनी स्टोन)', mr: 'मूतखडा', gu: 'પથરી' },
  'gallstones': { hi: 'पित्ताशय की पथरी', mr: 'पित्ताशयातील खडे', gu: 'પિત્તાશયની પથરી' },
  'appendicitis': { hi: 'अपेंडिक्स', mr: 'आंत्रपुच्छदाह', gu: 'અપેન્ડિક્સ' },
  'urinary tract infection': { hi: 'पेशाब में संक्रमण (यूटीआई)', mr: 'मूत्रमार्ग संसर्ग (यूटीआय)', gu: 'પેશાબ ચેપ (યુટીઆઈ)' },
  'cold': { hi: 'सर्दी-जुकाम', mr: 'सर्दी', gu: 'શરદી' },
  'fever': { hi: 'बुखार', mr: 'ताप', gu: 'તાવ' },
  'cough': { hi: 'खांसी', mr: 'खोकला', gu: 'ઉધરસ' },
  'gaucher disease': { hi: 'गॉशर रोग (Gaucher Disease)', mr: 'गॉशर रोग (Gaucher Disease)', gu: 'ગૌચર રોગ (Gaucher Disease)' },
  'hemophilia': { hi: 'हीमोफीलिया (खून न जमना)', mr: 'रक्तस्रावी विकार (हिमोफिलिया)', gu: 'હિમોફિલિયા (લોહી ન જામવું)' },
  'thalassemia': { hi: 'थैलेसीमिया', mr: 'थॅलेसेमिया', gu: 'થૅલૅસેમિયા' },
  'leukemia': { hi: 'रक्त कैंसर (लिउकेमिया)', mr: 'रक्त कर्करोग (ल्यूकेमिया)', gu: 'લોહીનું કેન્સર (લ્યુકેમિયા)' },
};

export function getDiseaseName(name, langCode) {
  if (!name || langCode === 'en') return name;
  const key = name.toLowerCase().trim();
  for (const [k, v] of Object.entries(DISEASE_NAMES)) {
    if (key.includes(k) || k.includes(key.split(' ')[0])) {
      return v[langCode] ? `${name} (${v[langCode]})` : name;
    }
  }
  return name;
}

// Ayurvedic home remedies per disease per language
export const AYURVEDIC_REMEDIES = {
  fever: {
    en: ['Apply cold/wet cloth on forehead', 'Drink tulsi (holy basil) tea', 'Take ginger + honey + lemon tea', 'Stay hydrated with ORS water', 'Rest in cool room'],
    hi: ['माथे पर ठंडा गीला कपड़ा रखें', 'तुलसी की चाय पिएं', 'अदरक + शहद + नींबू की चाय लें', 'ORS पानी पीते रहें', 'ठंडे कमरे में आराम करें'],
    mr: ['कपाळावर थंड ओले कापड ठेवा', 'तुळशीचा चहा प्या', 'आले + मध + लिंबाचा चहा घ्या', 'ORS पाणी पीत राहा', 'थंड खोलीत विश्रांती घ्या'],
    gu: ['કપાળ પર ઠંડું ભીનું કપડું રાખો', 'તુલસીની ચા પીઓ', 'આદુ + મધ + લીંબુની ચા લો', 'ORS પાણી પીઓ', 'ઠંડા ઓરડામાં આરામ કરો'],
  },
  cold: {
    en: ['Steam inhalation with eucalyptus oil', 'Drink warm turmeric milk (haldi doodh)', 'Gargle with warm salt water', 'Ginger tea with honey', 'Avoid cold foods and drinks'],
    hi: ['नीलगिरी तेल से भाप लें', 'हल्दी दूध (गोल्डन मिल्क) पिएं', 'गर्म नमक पानी से गरारे करें', 'अदरक की चाय शहद के साथ', 'ठंडा खाना-पीना बंद करें'],
    mr: ['निलगिरी तेलाने वाफ घ्या', 'हळद दूध (गोल्डन मिल्क) प्या', 'कोमट मिठाच्या पाण्याने गुळण्या करा', 'आले + मध चहा', 'थंड पदार्थ टाळा'],
    gu: ['નીલગિરી તેલ સાથે ભાપ લો', 'હળદરવાળું દૂધ (ગોલ્ડન મિલ્ક) પીઓ', 'ગરમ મીઠાના પાણીથી ગળા ભોળવો', 'આદુ + મધ ચા', 'ઠંડા ખોરાક-પાણી ટાળો'],
  },
  cough: {
    en: ['Honey + ginger juice mixture', 'Turmeric milk before sleep', 'Steam inhalation twice daily', 'Licorice (mulethi) tea', 'Clove + honey for throat'],
    hi: ['शहद + अदरक का रस मिलाकर लें', 'सोने से पहले हल्दी दूध पिएं', 'दिन में दो बार भाप लें', 'मुलेठी की चाय', 'लौंग + शहद गले के लिए'],
    mr: ['मध + आले रस मिसळून घ्या', 'झोपण्यापूर्वी हळद दूध प्या', 'दिवसातून दोनदा वाफ घ्या', 'ज्येष्ठमध चहा', 'लवंग + मध घसासाठी'],
    gu: ['મધ + આદુ રસ ભેળવીને લો', 'સૂતા પહેલાં હળદરવાળું દૂધ પીઓ', 'દિવસમાં બે વાર ભાપ લો', 'મૂળેઠીની ચા', 'લવિંગ + મધ ગળા માટે'],
  },
  headache: {
    en: ['Apply peppermint oil on temples', 'Ginger tea for pain relief', 'Stay hydrated — drink 8 glasses water', 'Rest in dark quiet room', 'Cold compress on forehead'],
    hi: ['कनपटी पर पुदीना तेल लगाएं', 'दर्द के लिए अदरक की चाय', 'पानी पीते रहें — 8 गिलास', 'अंधेरे शांत कमरे में आराम करें', 'माथे पर ठंडी पट्टी'],
    mr: ['कानशिलावर पुदिना तेल लावा', 'वेदनेसाठी आले चहा', 'पाणी पीत राहा — 8 ग्लास', 'अंधाऱ्या शांत खोलीत विश्रांती', 'कपाळावर थंड पट्टी'],
    gu: ['કનપટી પર ફુદીનાનું તેલ લગાવો', 'દુખાવા માટે આદુ ચા', 'પાણી પીઓ — 8 ગ્લાસ', 'અંધારા શાંત ઓરડામાં આરામ', 'કપાળ પર ઠંડી પટ્ટી'],
  },
  stomach: {
    en: ['Ajwain (carom seeds) with warm water', 'Ginger juice + rock salt', 'Jeera (cumin) water for digestion', 'Avoid spicy oily food', 'Eat small frequent meals'],
    hi: ['अजवाइन गर्म पानी के साथ लें', 'अदरक रस + सेंधा नमक', 'जीरा पानी पाचन के लिए', 'मसालेदार तेलीय खाना न खाएं', 'छोटे-छोटे भोजन करें'],
    mr: ['ओवा कोमट पाण्यासोबत घ्या', 'आले रस + सैंधव मीठ', 'जिरे पाणी पचनासाठी', 'तिखट तेलकट अन्न टाळा', 'थोडे थोडे जेवण करा'],
    gu: ['અજમો ગરમ પાણી સાથે', 'આદુ રસ + સિંધવ મીઠું', 'જીરા પાણી પાચન માટે', 'મસાલેદાર તળેલ ખોરાક ટાળો', 'થોડું થોડું ખાઓ'],
  },
  joint_pain: {
    en: ['Turmeric + ginger anti-inflammatory tea', 'Warm mustard oil massage', 'Methi (fenugreek) seeds soaked overnight', 'Garlic milk for joint pain', 'Light walking and stretching'],
    hi: ['हल्दी + अदरक एंटी-इन्फ्लेमेटरी चाय', 'गर्म सरसों तेल से मालिश', 'रात भर भिगोए मेथी के दाने', 'लहसुन का दूध जोड़ों के दर्द में', 'हल्की सैर और स्ट्रेचिंग'],
    mr: ['हळद + आले दाहशामक चहा', 'कोमट मोहरी तेलाने मालिश', 'रात्री भिजवलेले मेथी दाणे', 'लसूण दूध सांधेदुखीसाठी', 'हलकी चालणे आणि स्ट्रेचिंग'],
    gu: ['હળદર + આદુ એન્ટી-ઇન્ફ્લેમેટરી ચા', 'ગરમ સરસવ તેલ માલિશ', 'રાત્રે પલાળેલ મેથી', 'લસણ દૂધ સાંધા દુખાવા માટે', 'હળવી ચાલ અને સ્ટ્રેચિંગ'],
  },
  diabetes: {
    en: ['Bitter gourd (karela) juice daily', 'Fenugreek (methi) seeds in morning water', 'Amla (Indian gooseberry) juice', 'Cinnamon tea to control sugar', 'Avoid sugar white rice maida'],
    hi: ['रोज करेले का जूस पिएं', 'सुबह मेथी दाना भिगोया पानी', 'आंवला जूस', 'दालचीनी चाय शुगर कंट्रोल के लिए', 'शुगर सफेद चावल मैदा बंद करें'],
    mr: ['दररोज कारल्याचा रस प्या', 'सकाळी मेथी भिजवलेले पाणी', 'आवळा रस', 'दालचिनी चहा साखर नियंत्रणासाठी', 'साखर पांढरा भात मैदा टाळा'],
    gu: ['રોજ કારેલાનો રસ પીઓ', 'સવારે મેથી પલાળેલ પાણી', 'આમળા જ્યૂસ', 'તજ ચા ખાંડ નિયંત્રણ માટે', 'ખાંડ સફેદ ચોખા મેંદો ટાળો'],
  },
  skin: {
    en: ['Neem leaves paste for skin infections', 'Turmeric + coconut oil for rashes', 'Aloe vera gel for irritation', 'Sandalwood paste for cooling', 'Avoid soap on affected area'],
    hi: ['त्वचा संक्रमण के लिए नीम पत्तियों का लेप', 'चकत्तों के लिए हल्दी + नारियल तेल', 'जलन के लिए एलोवेरा जेल', 'ठंडक के लिए चंदन का लेप', 'प्रभावित जगह पर साबुन न लगाएं'],
    mr: ['त्वचा संसर्गासाठी कडुलिंब पानांचा लेप', 'पुरळासाठी हळद + नारळ तेल', 'जळजळीसाठी कोरफड जेल', 'थंडाव्यासाठी चंदन लेप', 'प्रभावित जागी साबण लावू नका'],
    gu: ['ચામડી ચેપ માટે લીમડાનો લેપ', 'ફોલ્લા માટે હળદર + નાળિયેર તેલ', 'ખંજવાળ માટે એલોવેરા જેલ', 'ઠંડક માટે ચંદન લેપ', 'અસરગ્રસ્ત જગ્યા પર સાબુ ન લગાવો'],
  },
};

export function getAyurvedicRemedies(symptoms, langCode) {
  const lang = langCode || 'en';
  const sym = symptoms.toLowerCase();
  let remedies = [];
  let category = '';

  if (sym.includes('fever') || sym.includes('ताप') || sym.includes('बुखार') || sym.includes('તાવ')) {
    remedies = AYURVEDIC_REMEDIES.fever[lang] || AYURVEDIC_REMEDIES.fever.en;
    category = lang === 'en' ? 'Fever' : lang === 'hi' ? 'बुखार' : lang === 'mr' ? 'ताप' : 'તાવ';
  } else if (sym.includes('cough') || sym.includes('खोकला') || sym.includes('खांसी') || sym.includes('ઉધરસ')) {
    remedies = AYURVEDIC_REMEDIES.cough[lang] || AYURVEDIC_REMEDIES.cough.en;
    category = lang === 'en' ? 'Cough' : lang === 'hi' ? 'खांसी' : lang === 'mr' ? 'खोकला' : 'ઉધરસ';
  } else if (sym.includes('cold') || sym.includes('सर्दी') || sym.includes('शरदी') || sym.includes('શરદી')) {
    remedies = AYURVEDIC_REMEDIES.cold[lang] || AYURVEDIC_REMEDIES.cold.en;
    category = lang === 'en' ? 'Cold' : lang === 'hi' ? 'सर्दी' : lang === 'mr' ? 'सर्दी' : 'શરદી';
  } else if (sym.includes('headache') || sym.includes('डोकेदुखी') || sym.includes('सिरदर्द') || sym.includes('માથ')) {
    remedies = AYURVEDIC_REMEDIES.headache[lang] || AYURVEDIC_REMEDIES.headache.en;
    category = lang === 'en' ? 'Headache' : lang === 'hi' ? 'सिरदर्द' : lang === 'mr' ? 'डोकेदुखी' : 'માથાનો દુખાવો';
  } else if (sym.includes('stomach') || sym.includes('पोट') || sym.includes('पेट') || sym.includes('પેટ')) {
    remedies = AYURVEDIC_REMEDIES.stomach[lang] || AYURVEDIC_REMEDIES.stomach.en;
    category = lang === 'en' ? 'Stomach' : lang === 'hi' ? 'पेट' : lang === 'mr' ? 'पोट' : 'પેટ';
  } else if (sym.includes('joint') || sym.includes('सांधे') || sym.includes('जोड़') || sym.includes('સાંધ')) {
    remedies = AYURVEDIC_REMEDIES.joint_pain[lang] || AYURVEDIC_REMEDIES.joint_pain.en;
    category = lang === 'en' ? 'Joint Pain' : lang === 'hi' ? 'जोड़ों का दर्द' : lang === 'mr' ? 'सांधेदुखी' : 'સાંધાનો દુખાવો';
  } else if (sym.includes('diabetes') || sym.includes('sugar') || sym.includes('मधुमेह') || sym.includes('ડાયાબ')) {
    remedies = AYURVEDIC_REMEDIES.diabetes[lang] || AYURVEDIC_REMEDIES.diabetes.en;
    category = lang === 'en' ? 'Diabetes' : lang === 'hi' ? 'मधुमेह' : lang === 'mr' ? 'मधुमेह' : 'ડાયાબિટીસ';
  } else if (sym.includes('skin') || sym.includes('rash') || sym.includes('त्वचा') || sym.includes('ચામ')) {
    remedies = AYURVEDIC_REMEDIES.skin[lang] || AYURVEDIC_REMEDIES.skin.en;
    category = lang === 'en' ? 'Skin' : lang === 'hi' ? 'त्वचा' : lang === 'mr' ? 'त्वचा' : 'ચામડી';
  } else {
    // Default general remedies
    const general = {
      en: ['Drink plenty of warm water', 'Rest adequately', 'Eat light easy-to-digest food', 'Avoid junk food', 'Consult doctor if symptoms persist'],
      hi: ['खूब गर्म पानी पिएं', 'पर्याप्त आराम करें', 'हल्का सुपाच्य खाना खाएं', 'जंक फूड न खाएं', 'लक्षण बने रहें तो डॉक्टर से मिलें'],
      mr: ['भरपूर कोमट पाणी प्या', 'पुरेशी विश्रांती घ्या', 'हलके सहज पचणारे अन्न खा', 'जंक फूड टाळा', 'लक्षणे राहिल्यास डॉक्टरांना भेटा'],
      gu: ['ખૂબ ગરમ પાણી પીઓ', 'પૂરતો આરામ કરો', 'હળવો સુપાચ્ય ખોરાક ખાઓ', 'જંક ફૂડ ટાળો', 'લક્ષણ ચાલુ રહે તો ડૉક્ટરને મળો'],
    };
    remedies = general[lang] || general.en;
    category = lang === 'en' ? 'General Wellness' : lang === 'hi' ? 'सामान्य स्वास्थ्य' : lang === 'mr' ? 'सामान्य आरोग्य' : 'સામાન્ય સ્વાસ્થ્ય';
  }
  return { remedies, category };
}

export const SYMPTOM_TRANSLATIONS = {
  hi: { "बुखार":"fever","खांसी":"cough","सर्दी":"cold","जुकाम":"cold runny nose","सिरदर्द":"headache","शरीर में दर्द":"body pain","कमजोरी":"weakness","थकान":"fatigue","सांस लेने में तकलीफ":"shortness of breath","छाती में दर्द":"chest pain","पेट दर्द":"stomach pain","उल्टी":"vomiting","मतली":"nausea","दस्त":"diarrhea","कब्ज":"constipation","भूख न लगना":"loss of appetite","वजन कम होना":"weight loss","पीलिया":"jaundice","त्वचा पर चकत्ते":"skin rash","खुजली":"itching","जोड़ों में दर्द":"joint pain","पीठ दर्द":"back pain","गले में दर्द":"sore throat","चक्कर आना":"dizziness","बेहोशी":"unconscious","पेशाब में जलन":"burning urination","बार बार पेशाब":"frequent urination","अत्यधिक प्यास":"excessive thirst","धड़कन तेज":"palpitations","हाथ पैर सुन्न":"numbness hands feet","बालों का झड़ना":"hair loss","रात को पसीना":"night sweats","ठंड लगना":"chills","कंपकंपी":"tremors","मांसपेशियों में दर्द":"muscle pain","सूजन":"swelling","लाल आँखें":"red eyes","नाक बंद":"nasal congestion","कान में दर्द":"ear pain" },
  mr: { "ताप":"fever","खोकला":"cough","सर्दी":"cold","नाक गळणे":"runny nose","डोकेदुखी":"headache","अंगदुखी":"body pain","अशक्तपणा":"weakness","थकवा":"fatigue","श्वास घेण्यास त्रास":"shortness of breath","छातीत दुखणे":"chest pain","पोटदुखी":"stomach pain","उलटी":"vomiting","मळमळ":"nausea","जुलाब":"diarrhea","बद्धकोष्ठता":"constipation","भूक न लागणे":"loss of appetite","वजन कमी होणे":"weight loss","कावीळ":"jaundice","त्वचेवर पुरळ":"skin rash","खाज सुटणे":"itching","सांधेदुखी":"joint pain","पाठदुखी":"back pain","घसादुखी":"sore throat","चक्कर येणे":"dizziness","शुद्ध हरपणे":"unconscious","लघवीत जळजळ":"burning urination","वारंवार लघवी":"frequent urination","जास्त तहान":"excessive thirst","धडधड":"palpitations","हातपाय सुन्न":"numbness hands feet","केस गळणे":"hair loss","रात्री घाम येणे":"night sweats","थंडी वाजणे":"chills","थरकाप":"tremors","स्नायूदुखी":"muscle pain","सूज":"swelling","डोळे लाल":"red eyes","नाक बंद":"nasal congestion","कानदुखी":"ear pain" },
  gu: { "તાવ":"fever","ઉધરસ":"cough","શરદી":"cold","નાક વહેવું":"runny nose","માથાનો દુખાવો":"headache","શરીરનો દુખાવો":"body pain","નબળાઈ":"weakness","થાક":"fatigue","શ્વાસ ચઢવો":"shortness of breath","છાતીમાં દુખાવો":"chest pain","પેટ દુખાવો":"stomach pain","ઉલ્ટી":"vomiting","ઉબકા":"nausea","ઝાડા":"diarrhea","કબજિયાત":"constipation","ભૂખ ન લાગવી":"loss of appetite","વજન ઘટવું":"weight loss","કમળો":"jaundice","ચામડી પર ફોલ્લા":"skin rash","ખંજવાળ":"itching","સાંધાનો દુખાવો":"joint pain","પીઠ દુખાવો":"back pain","ગળામાં દુખાવો":"sore throat","ચક્કર":"dizziness","બેભાન":"unconscious","પેશાબ બળવો":"burning urination","વારંવાર પેશાબ":"frequent urination","ખૂબ તરસ":"excessive thirst","ધડકન":"palpitations","હાથ-પગ સુન્ન":"numbness hands feet","વાળ ખરવા":"hair loss","રાત્રે પસીનો":"night sweats","ધ્રૂજારી":"chills","કંપ":"tremors","સ્નાયુ દુખાવો":"muscle pain","સોજો":"swelling","આંખ લાલ":"red eyes","નાક બંધ":"nasal congestion","કાન દુખાવો":"ear pain" },
};

export function translateSymptomsToEnglish(text, langCode) {
  if (langCode === 'en') return text;
  const dict = SYMPTOM_TRANSLATIONS[langCode];
  if (!dict) return text;
  let translated = text;
  const entries = Object.entries(dict).sort((a, b) => b[0].length - a[0].length);
  for (const [local, english] of entries) {
    translated = translated.replace(new RegExp(local, 'g'), english);
  }
  return translated;
}

export const SYMPTOM_EXAMPLES = {
  en: [
    { label: 'Fever & Cold', text: 'fever, cold, cough, headache, body aches' },
    { label: 'Stomach Issues', text: 'stomach pain, nausea, vomiting, diarrhea' },
    { label: 'Breathing', text: 'shortness of breath, chest tightness, cough' },
    { label: 'Joint Pain', text: 'joint pain, swelling, morning stiffness, fatigue' },
    { label: 'Skin Problems', text: 'skin rash, itching, redness, dry skin' },
    { label: 'Diabetes Signs', text: 'excessive thirst, frequent urination, fatigue' },
    { label: 'Heart Issues', text: 'chest pain, palpitations, shortness of breath' },
    { label: 'Headache', text: 'severe headache, nausea, light sensitivity' },
  ],
  hi: [
    { label: 'बुखार और सर्दी', text: 'बुखार, सर्दी, खांसी, सिरदर्द, शरीर में दर्द' },
    { label: 'पेट की समस्या', text: 'पेट दर्द, मतली, उल्टी, दस्त' },
    { label: 'सांस की तकलीफ', text: 'सांस लेने में तकलीफ, छाती में दर्द, खांसी' },
    { label: 'जोड़ों का दर्द', text: 'जोड़ों में दर्द, सूजन, कमजोरी, थकान' },
    { label: 'त्वचा की समस्या', text: 'त्वचा पर चकत्ते, खुजली, जलन' },
    { label: 'मधुमेह के लक्षण', text: 'अत्यधिक प्यास, बार बार पेशाब, थकान' },
    { label: 'दिल की समस्या', text: 'छाती में दर्द, धड़कन तेज, सांस लेने में तकलीफ' },
    { label: 'सिरदर्द', text: 'तेज सिरदर्द, मतली, उल्टी' },
  ],
  mr: [
    { label: 'ताप आणि सर्दी', text: 'ताप, सर्दी, खोकला, डोकेदुखी, अंगदुखी' },
    { label: 'पोटाचा त्रास', text: 'पोटदुखी, मळमळ, उलटी, जुलाब' },
    { label: 'श्वासाचा त्रास', text: 'श्वास घेण्यास त्रास, छातीत दुखणे, खोकला' },
    { label: 'सांधेदुखी', text: 'सांधेदुखी, सूज, अशक्तपणा, थकवा' },
    { label: 'त्वचेची समस्या', text: 'त्वचेवर पुरळ, खाज सुटणे, जळजळ' },
    { label: 'मधुमेहाची लक्षणे', text: 'जास्त तहान, वारंवार लघवी, थकवा' },
    { label: 'हृदयाची समस्या', text: 'छातीत दुखणे, धडधड, श्वास घेण्यास त्रास' },
    { label: 'डोकेदुखी', text: 'तीव्र डोकेदुखी, मळमळ, उलटी' },
  ],
  gu: [
    { label: 'તાવ અને શરદી', text: 'તાવ, શરદી, ઉધરસ, માથાનો દુખાવો, શરીરનો દુખાવો' },
    { label: 'પેટની તકલીફ', text: 'પેટ દુખાવો, ઉબકા, ઉલ્ટી, ઝાડા' },
    { label: 'શ્વાસ ચઢવો', text: 'શ્વાસ ચઢવો, છાતીમાં દુખાવો, ઉધરસ' },
    { label: 'સાંધાનો દુખાવો', text: 'સાંધાનો દુખાવો, સોજો, નબળાઈ, થાક' },
    { label: 'ચામડીની સમસ્યા', text: 'ચામડી પર ફોલ્લા, ખંજવાળ, બળતરા' },
    { label: 'ડાયાબિટીસ', text: 'ખૂબ તરસ, વારંવાર પેશાબ, થાક' },
    { label: 'હૃદયની સમસ્યા', text: 'છાતીમાં દુખાવો, ધડકન, શ્વાસ ચઢવો' },
    { label: 'માથાનો દુખાવો', text: 'તીવ્ર માથાનો દુખાવો, ઉબકા, ઉલ્ટી' },
  ],
};

export const UI_TEXT = {
  en: { welcome:"Hello", describe:"Describe Your Symptoms", howLong:"How long?", severity:"Severity", mild:"Mild", moderate:"Moderate", severe:"Severe", allergies:"Known allergies or medications?", analyze:"🔬 Analyze My Symptoms", results:"Analysis Results", basedOn:"Based on your symptoms", disclaimer:"⚠️ For informational purposes only. Consult your doctor.", whatNext:"📞 What to do next:", steps:["Book appointment with your doctor","Show this report to your doctor","Do not self-medicate","If symptoms worsen, visit hospital immediately"], match:"match", rare:"Rare", checkOther:"← Check Other Symptoms", saveReport:"🖨 Save Report", examples:"Quick Examples", speakBtn:"🎤 Speak", stopBtn:"⏹ Stop", listening:"Listening... speak your symptoms", selectLang:"Select Your Language", ayurvedic:"🌿 Ayurvedic Home Remedies", none:"None", appointment:"Book Appointment", myHistory:"My Health History", chatWithAI:"💬 Chat with AI", home:"Home" },
  hi: { welcome:"नमस्ते", describe:"अपने लक्षण बताएं", howLong:"कब से?", severity:"गंभीरता", mild:"हल्का", moderate:"मध्यम", severe:"गंभीर", allergies:"एलर्जी या दवाएं?", analyze:"🔬 लक्षणों का विश्लेषण करें", results:"विश्लेषण परिणाम", basedOn:"आपके लक्षणों के आधार पर", disclaimer:"⚠️ केवल जानकारी के लिए। डॉक्टर से मिलें।", whatNext:"📞 आगे क्या करें:", steps:["डॉक्टर से अपॉइंटमेंट लें","यह रिपोर्ट डॉक्टर को दिखाएं","खुद दवाई न लें","लक्षण बढ़ने पर अस्पताल जाएं"], match:"मिलान", rare:"दुर्लभ", checkOther:"← वापस", saveReport:"🖨 रिपोर्ट सहेजें", examples:"उदाहरण", speakBtn:"🎤 बोलें", stopBtn:"⏹ रोकें", listening:"सुन रहा हूं...", selectLang:"अपनी भाषा चुनें", ayurvedic:"🌿 आयुर्वेदिक घरेलू उपाय", none:"कोई नहीं", appointment:"अपॉइंटमेंट बुक करें", myHistory:"मेरा स्वास्थ्य इतिहास", chatWithAI:"💬 AI से बात करें", home:"होम" },
  mr: { welcome:"नमस्कार", describe:"तुमची लक्षणे सांगा", howLong:"किती दिवसांपासून?", severity:"तीव्रता", mild:"सौम्य", moderate:"मध्यम", severe:"तीव्र", allergies:"ॲलर्जी किंवा औषधे?", analyze:"🔬 लक्षणे तपासा", results:"तपासणी निकाल", basedOn:"तुमच्या लक्षणांच्या आधारे", disclaimer:"⚠️ केवळ माहितीसाठी। डॉक्टरांना भेटा.", whatNext:"📞 पुढे काय करावे:", steps:["डॉक्टरांची अपॉइंटमेंट घ्या","हा अहवाल डॉक्टरांना दाखवा","स्वतः औषधे घेऊ नका","लक्षणे वाढल्यास रुग्णालयात जा"], match:"जुळणी", rare:"दुर्मिळ", checkOther:"← परत", saveReport:"🖨 अहवाल जतन करा", examples:"उदाहरणे", speakBtn:"🎤 बोला", stopBtn:"⏹ थांबा", listening:"ऐकतोय...", selectLang:"भाषा निवडा", ayurvedic:"🌿 आयुर्वेदिक घरगुती उपाय", none:"काही नाही", appointment:"अपॉइंटमेंट बुक करा", myHistory:"माझा आरोग्य इतिहास", chatWithAI:"💬 AI शी बोला", home:"मुखपृष्ठ" },
  gu: { welcome:"નમસ્તે", describe:"તમારા લક્ષણો જણાવો", howLong:"કેટલા સમયથી?", severity:"તીવ્રતા", mild:"હળવી", moderate:"મધ્યમ", severe:"ગંભીર", allergies:"ઍલર્જી અથવા દવા?", analyze:"🔬 લક્ષણો તપાસો", results:"તપાસ પરિણામ", basedOn:"તમારા લક્ષણોના આધારે", disclaimer:"⚠️ માત્ર માહિતી માટે. ડૉક્ટરને મળો.", whatNext:"📞 આગળ શું:", steps:["ડૉક્ટરની અપૉઇન્ટમેન્ટ લો","આ રિપોર્ટ ડૉક્ટરને બતાવો","જાતે દવા ન લો","લક્ષણ વધે તો હૉસ્પિટલ જાઓ"], match:"મેળ", rare:"દુર્લભ", checkOther:"← પાછળ", saveReport:"🖨 રિપોર્ટ સાચવો", examples:"ઉદાહરણો", speakBtn:"🎤 બોલો", stopBtn:"⏹ રોકો", listening:"સાંભળી રહ્યો છું...", selectLang:"ભાષા પસંદ કરો", ayurvedic:"🌿 આયુર્વેદિક ઘરગથ્થુ ઉપાય", none:"કોઈ નહીં", appointment:"અપૉઇન્ટમેન્ટ બુક", myHistory:"મારો આરોગ્ય ઇતિહાસ", chatWithAI:"💬 AI સાથે વાત", home:"હોમ" },
};

export const PRESCRIPTION_TRANSLATIONS = {
  en: { title:"MediMentor Clinical Prescription", subtitle:"AI-Powered Rare Drug Suggestion & Smart Prescription System", prescribingDoctor:"Prescribing Doctor", patientDetails:"Patient Details", age:"Age", years:"years", allergies:"Allergies", diagnosis:"Diagnosis", rareDiseaseLabel:"RARE DISEASE", severity:"SEVERITY", medications:"Prescribed Medications", orphanDrug:"ORPHAN DRUG", clinicalNotes:"Clinical Notes", followUp:"Follow-up Instructions", doctorSignature:"Doctor's Signature & Stamp", disclaimer:"Generated by MediMentor AI v2.0 — Final prescribing authority rests solely with the treating physician.", ref:"Ref", phone:"Phone", dosage:"Dosage", category:"Category" },
  hi: { title:"मेडीमेंटर क्लिनिकल प्रिस्क्रिप्शन", subtitle:"AI-संचालित दुर्लभ दवा सुझाव और स्मार्ट प्रिस्क्रिप्शन सिस्टम", prescribingDoctor:"निर्धारित करने वाले डॉक्टर", patientDetails:"रोगी विवरण", age:"आयु", years:"वर्ष", allergies:"एलर्जी", diagnosis:"निदान", rareDiseaseLabel:"दुर्लभ रोग", severity:"गंभीरता", medications:"निर्धारित दवाएं", orphanDrug:"ऑर्फन दवा", clinicalNotes:"क्लिनिकल नोट्स", followUp:"फॉलो-अप निर्देश", doctorSignature:"डॉक्टर के हस्ताक्षर और मुहर", disclaimer:"MediMentor AI v2.0 द्वारा उत्पन्न — अंतिम प्रिस्क्रिप्शन अधिकार चिकित्सक के पास है।", ref:"संदर्भ", phone:"फोन", dosage:"खुराक", category:"वर्ग" },
  mr: { title:"मेडीमेंटर क्लिनिकल प्रिस्क्रिप्शन", subtitle:"AI-आधारित दुर्मिळ औषध सुचवणी आणि स्मार्ट प्रिस्क्रिप्शन प्रणाली", prescribingDoctor:"प्रिस्क्रिप्शन देणारे डॉक्टर", patientDetails:"रुग्णाची माहिती", age:"वय", years:"वर्षे", allergies:"ॲलर्जी", diagnosis:"निदान", rareDiseaseLabel:"दुर्मिळ आजार", severity:"तीव्रता", medications:"लिहून दिलेली औषधे", orphanDrug:"ऑर्फन औषध", clinicalNotes:"क्लिनिकल नोट्स", followUp:"पाठपुरावा सूचना", doctorSignature:"डॉक्टरांची स्वाक्षरी आणि शिक्का", disclaimer:"MediMentor AI v2.0 द्वारे तयार केले — अंतिम अधिकार डॉक्टरांकडे आहे।", ref:"संदर्भ", phone:"फोन", dosage:"मात्रा", category:"वर्ग" },
  gu: { title:"મેડીમેન્ટર ક્લિનિકલ પ્રિસ્ક્રિપ્શન", subtitle:"AI-આધારિત દુર્લભ દવા સૂચન અને સ્માર્ટ પ્રિસ્ક્રિપ્શન સિસ્ટમ", prescribingDoctor:"પ્રિસ્ક્રિપ્શન આપનાર ડૉક્ટર", patientDetails:"દર્દીની માહિતી", age:"ઉંમર", years:"વર્ષ", allergies:"ઍલર્જી", diagnosis:"નિદાન", rareDiseaseLabel:"દુર્લભ રોગ", severity:"તીવ્રતા", medications:"આપેલી દવાઓ", orphanDrug:"ઓર્ફન દવા", clinicalNotes:"ક્લિનિકલ નોંધ", followUp:"ફૉલો-અપ સૂચના", doctorSignature:"ડૉક્ટરની સહી અને મહોર", disclaimer:"MediMentor AI v2.0 દ્વારા — અંતિમ અધિકાર ડૉક્ટર પાસે છે।", ref:"સંદર્ભ", phone:"ફોન", dosage:"માત્રા", category:"વર્ગ" },
};
