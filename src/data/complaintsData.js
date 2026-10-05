export const complaintCategories = [
  { id: "water", nameHi: "पानी (पेयजल एवं लीकेज)", nameEn: "Drinking Water & Leakage" },
  { id: "road", nameHi: "सड़क (सड़क टूट-फूट एवं मरम्मत)", nameEn: "Road Damage & Repair" },
  { id: "street_light", nameHi: "स्ट्रीट लाइट (सौर बत्ती बंद/खराब)", nameEn: "Street Light Fault" },
  { id: "sanitation", nameHi: "सफाई (कचरा एवं गंदगी)", nameEn: "Cleanliness & Litter" },
  { id: "drain", nameHi: "नाली (नाली अवरोध एवं जलभराव)", nameEn: "Drain Choke & Stagnation" },
  { id: "education", nameHi: "शिक्षा (विद्यालय एवं पुस्तकालय)", nameEn: "Education & Library" },
  { id: "health", nameHi: "स्वास्थ्य (स्वास्थ्य केंद्र एवं दवा)", nameEn: "Health & Clinic Aid" },
  { id: "other", nameHi: "अन्य (सार्वजनिक जनसुविधा)", nameEn: "Other Civic Amenities" }
];

export const initialComplaints = [
  {
    ticketId: "IND-2026-1042",
    citizenName: "रामेश्वर सिंह",
    mobile: "9829XXXXXX",
    category: "स्ट्रीट लाइट",
    categoryEn: "Street Light",
    location: "वार्ड नं. 4, राजकीय विद्यालय मोड़",
    description: "विद्यालय मोड़ पर स्थापित सौर स्ट्रीट लाइट पिछले तीन दिनों से रात्रि में नहीं जल रही है। कृपया बैटरी या सेंसर की जांच कराएं।",
    photoUrl: "https://images.unsplash.com/photo-1509391365360-2e959784a276?w=400&auto=format&fit=crop&q=80",
    status: "प्रक्रियाधीन",
    statusEn: "In Progress",
    submittedAt: "26 मार्च 2026",
    actionNote: "सौर ऊर्जा रखरखाव तकनीशियन को कार्य आदेश अग्रेषित किया गया।"
  },
  {
    ticketId: "IND-2026-1038",
    citizenName: "सुनीता देवी",
    mobile: "9414XXXXXX",
    category: "पानी",
    categoryEn: "Water",
    location: "ढाणी मार्ग, पूर्वी बस्ती",
    description: "पेयजल वितरण पाइपलाइन के जोड़ से लगातार पानी बह रहा है, जिससे कीचड़ हो रहा है और दबाव कम आ रहा है।",
    photoUrl: null,
    status: "निस्तारित",
    statusEn: "Resolved",
    submittedAt: "22 मार्च 2026",
    actionNote: "जल मित्र द्वारा वाल्व एवं पाइपलाइन सॉकेट बदलकर लीकेज ठीक कर दिया गया।"
  },
  {
    ticketId: "IND-2026-1025",
    citizenName: "मुकेश कुमार",
    mobile: "9785XXXXXX",
    category: "सफाई",
    categoryEn: "Sanitation",
    location: "चौपाल के समीप सार्वजनिक नाली",
    description: "चौपाल के पास नाली में प्लास्टिक व गाद जमा होने से पानी सड़क पर आ रहा है। सफाई की आवश्यकता है।",
    photoUrl: null,
    status: "निस्तारित",
    submittedAt: "15 मार्च 2026",
    actionNote: "स्वच्छता टीम द्वारा विशेष अभियान चलाकर नाली की गाद निकासी पूर्ण की गई।"
  }
];
