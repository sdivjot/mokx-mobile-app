const sampleprompts = [
    [{
        eng: "What is the meaning of karma?",
        hindi: "कर्म का मतलब क्या है?"
    },
    {
        eng: "Can you explain the significance of the Gayatri Mantra?",
        hindi: "गायत्री मंत्र का महत्व क्या है?"
    },
    {
        eng: "What recommendations do the Vedas offer for good health?",
        hindi: "अच्छे स्वास्थ्य के लिए वेदों में क्या सुझाव दिए गए हैं?"
    }],
    [{
        eng: "Are there any insights about psychology and mental peace in the Vedas?",
        hindi: "क्या वेदों में मनोविज्ञान और मानसिक शांति के लिए सूत्र हैं?"
    },
    {
        eng: "Discuss the importance of family relationships as per the Vedas.",
        hindi: "वेदों में परिवारिक संबंधों की महत्वपूर्णता पर विचार दीजिए।"
    },
    {
        eng: "What is the importance of meditation? Please provide details based on the Vedas.",
        hindi: "ध्यान का महत्व क्या है?"
    }],
    [{
        eng: "How are yoga and its various forms mentioned in the Vedas?",
        hindi: "वेदों में योग का उल्लेख कैसे है? योग के क्या-क्या प्रकार होते हैं?"
    },
    {
        eng: "Reflect on the importance of virtues in society as per the Vedas.",
        hindi: "वेदों में समाज में सद्गुणों की महत्वपूर्णता पर चर्चा करें।"
    },
    {
        eng: "How do the Vedas describe the nature of the soul (Atma)?",
        hindi: "वेदों में आत्मा का स्वरूप कैसे वर्णित है?"
    }],
    [{
        eng: "What place do truth (Satya) and non-violence (Ahimsa) hold in the Vedas?",
        hindi: "सत्य और अहिंसा की महत्वपूर्णता के विचार में वेदों का स्थान क्या है?"
    },
    {
        eng: "Explain the concept of self-identity and self-knowledge as per the Vedas.",
        hindi: "वेदों में आत्म-स्वरूप और आत्म-ज्ञान के बारे में बताएं।"
    },
    {
        eng: "How is the significance of time described in the Vedas?",
        hindi: "कैसे वेदों में समय का महत्व वर्णित है?"
    }],
    [{
        eng: "Describe the concept of an ideal family according to the Vedas.",
        hindi: "वेदों के आधार पर आदर्श परिवार का वर्णन करें।"
    },
    {
        eng: "Reflect on the importance of spirituality in Indian society.",
        hindi: "धार्मिकता की भारतीय समाज में महत्वपूर्णता पर विचार करें।"
    },
    {
        eng: "Share insights from the Vedas about joy and happiness.",
        hindi: "वेदों में आनंद और सुख की बातें बताएं।"
    }]
]

const k = Math.random() * 5;
const p = Math.floor(k);
const x = sampleprompts[p];

export default x;