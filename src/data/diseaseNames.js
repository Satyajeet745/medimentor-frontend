// Disease names in regional languages
// Format: { en, hi, mr, gu }
// If no regional name exists, use English name

export const DISEASE_NAMES = {
  // Common diseases with regional names
  "pneumonia": { en: "Pneumonia", hi: "निमोनिया", mr: "न्यूमोनिया", gu: "ન્યુમોનિયા" },
  "tuberculosis": { en: "Tuberculosis (TB)", hi: "क्षय रोग (टीबी)", mr: "क्षयरोग (टीबी)", gu: "ક્ષય રોગ (ટીબી)" },
  "malaria": { en: "Malaria", hi: "मलेरिया", mr: "मलेरिया", gu: "મેલેરિયા" },
  "dengue": { en: "Dengue Fever", hi: "डेंगू बुखार", mr: "डेंगू ताप", gu: "ડેન્ગ્યુ તાવ" },
  "typhoid": { en: "Typhoid Fever", hi: "टाइफाइड बुखार", mr: "विषमज्वर (टायफॉइड)", gu: "ટાઇફૉઇડ તાવ" },
  "diabetes": { en: "Type 2 Diabetes", hi: "मधुमेह (शुगर)", mr: "मधुमेह (साखरेचा आजार)", gu: "ડાયાબિટીસ (મધુપ્રમેહ)" },
  "hypertension": { en: "Hypertension", hi: "उच्च रक्तचाप (बीपी)", mr: "उच्च रक्तदाब (बीपी)", gu: "હાઈ બ્લડ પ્રેશર (બીપી)" },
  "asthma": { en: "Asthma", hi: "दमा (अस्थमा)", mr: "दमा (अस्थमा)", gu: "દમ (અસ્થમા)" },
  "hemorrhoids": { en: "Hemorrhoids", hi: "बवासीर (पाइल्स)", mr: "मूळव्याध (पाइल्स)", gu: "હરસ-મસા (પાઇલ્સ)" },
  "jaundice": { en: "Jaundice", hi: "पीलिया (जॉन्डिस)", mr: "काविळ (कावीळ)", gu: "કમળો (જૉન્ડિસ)" },
  "anemia": { en: "Iron Deficiency Anemia", hi: "खून की कमी (एनीमिया)", mr: "रक्तक्षय (अशक्तपणा)", gu: "લોહીની ઊણપ (એનિમિયા)" },
  "cholera": { en: "Cholera", hi: "हैजा (कॉलरा)", mr: "कॉलरा (विसूचिका)", gu: "કૉલેરા (હૈજો)" },
  "chickenpox": { en: "Chickenpox", hi: "चेचक (छोटी माता)", mr: "कांजिण्या (चिकन पॉक्स)", gu: "અછબડા (ચિકનપૉક્સ)" },
  "measles": { en: "Measles", hi: "खसरा (मीजल्स)", mr: "गोवर (मीझल्स)", gu: "ઓરી (ખસરો)" },
  "scabies": { en: "Scabies", hi: "खुजली (स्केबीज)", mr: "खरूज (स्कॅबीज)", gu: "ખૂજલી (સ્કેબીઝ)" },
  "ringworm": { en: "Ringworm (Tinea)", hi: "दाद (रिंगवर्म)", mr: "गजकर्ण (दाद)", gu: "દાદ (રિંગવૉર્મ)" },
  "migraine": { en: "Migraine", hi: "आधासीसी (माइग्रेन)", mr: "मायग्रेन (अर्धशिशी)", gu: "માઇગ્રેન (અર્ધશીશી)" },
  "epilepsy": { en: "Epilepsy", hi: "मिर्गी (एपिलेप्सी)", mr: "अपस्मार (एपिलेप्सी)", gu: "વાઈ (એપિલેપ્સી)" },
  "arthritis": { en: "Rheumatoid Arthritis", hi: "गठिया (आर्थराइटिस)", mr: "संधिवात (आर्थरायटिस)", gu: "સંધિવા (આર્થ્રાઇટિસ)" },
  "gout": { en: "Gout (Uric Acid)", hi: "वातरक्त (गाउट)", mr: "गाउट (युरिक ऍसिड)", gu: "ગઠિયો (ગાઉટ)" },
  "peptic ulcer": { en: "Peptic Ulcer", hi: "पेट का अल्सर", mr: "जठराचे व्रण (अल्सर)", gu: "પેટનો ચાંદો (અલ્સર)" },
  "gastritis": { en: "Gastritis", hi: "पेट की सूजन (गैस्ट्राइटिस)", mr: "जठरशोथ (गॅस्ट्रायटिस)", gu: "ગૅસ્ટ્રાઇટિસ (પેટની બળતરા)" },
  "appendicitis": { en: "Appendicitis", hi: "अपेंडिक्स (अपेंडिसाइटिस)", mr: "आन्त्रपुच्छदाह (अपेंडिसायटिस)", gu: "અેપેન્ડિસાઇટિસ" },
  "kidney stones": { en: "Kidney Stones", hi: "गुर्दे की पथरी", mr: "मूतखडा (किडनी स्टोन)", gu: "પથરી (કિડની સ્ટોન)" },
  "urinary tract infection": { en: "Urinary Tract Infection", hi: "मूत्र नली संक्रमण (यूटीआई)", mr: "मूत्रमार्गाचा संसर्ग (यूटीआई)", gu: "પેશાબ ની નળીનો ચેપ (UTI)" },
  "hypothyroidism": { en: "Hypothyroidism", hi: "थायराइड की कमी", mr: "कमी थायरॉईड", gu: "થાઇરૉઇડની ઊણપ" },
  "depression": { en: "Depression", hi: "अवसाद (डिप्रेशन)", mr: "नैराश्य (डिप्रेशन)", gu: "ડિપ્રેશન (ઉદાસી)" },
  "anxiety": { en: "Anxiety Disorder", hi: "चिंता विकार (एंग्जाइटी)", mr: "चिंताविकार (ॲन्झायटी)", gu: "ચિંતા વિકાર (ઍન્ઝાઇટી)" },
  // Rare diseases - use English names in all languages
  "gaucher": { en: "Gaucher Disease", hi: "गौचर रोग", mr: "गौचर रोग", gu: "ગૉચર રોગ" },
  "fabry": { en: "Fabry Disease", hi: "फेब्री रोग", mr: "फेब्री रोग", gu: "ફેબ્રી રોગ" },
  "hemophilia": { en: "Hemophilia", hi: "हीमोफीलिया (रक्तस्राव रोग)", mr: "हिमोफिलिया (रक्तस्राव विकार)", gu: "હિમોફિલિયા (લોહી ગંઠાવાનો રોગ)" },
  "thalassemia": { en: "Thalassemia", hi: "थैलेसीमिया", mr: "थॅलेसेमिया", gu: "થૅલેસેમિયા" },
  "cystic fibrosis": { en: "Cystic Fibrosis", hi: "सिस्टिक फाइब्रोसिस", mr: "सिस्टिक फायब्रोसिस", gu: "સિસ્ટિક ફાઇબ્રૉસિસ" },
  "alzheimer": { en: "Alzheimer's Disease", hi: "अल्जाइमर रोग (भूलने की बीमारी)", mr: "अल्झायमर रोग (विस्मृती रोग)", gu: "અલ્ઝાઇમર (ભૂલવાનો રોગ)" },
  "parkinson": { en: "Parkinson's Disease", hi: "पार्किंसन रोग (कंपन रोग)", mr: "पार्किन्सन रोग (थरकाप रोग)", gu: "પાર્કિન્સન રોગ (ધ્રૂજારીનો રોગ)" },
};

export function getDiseaseName(englishName, langCode) {
  if (!englishName || langCode === 'en') return englishName;
  const key = englishName.toLowerCase();
  for (const [k, v] of Object.entries(DISEASE_NAMES)) {
    if (key.includes(k) || k.includes(key.split(' ')[0])) {
      return v[langCode] ? `${englishName} (${v[langCode]})` : englishName;
    }
  }
  return englishName;
}
