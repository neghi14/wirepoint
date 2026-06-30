import cashDeposit from "$lib/assets/cash-deposit.png";
import chequeDeposit from "$lib/assets/cheque-deposit.png";
import cryptoToNaira from "$lib/assets/crypto-to-naira.png";
import userFriendly from "$lib/assets/user-friendly.png";

export const featureCards: { image: string; title: string }[] = [
    { image: chequeDeposit, title: "Cheque deposit" },
    { image: cashDeposit, title: "Cash deposit" },
    { image: userFriendly, title: "User friendly" },
    { image: cryptoToNaira, title: "Crypto to naira" },
];

export const faqs: { question: string; answer: string }[] = [
    {
        question: "What Is wirepoint and how does it work?",
        answer: "Wirepoint helps you process USD cash, cheques, and crypto transactions into Naira with secure verification and reliable payouts.",
    },
    {
        question: "What services does Wirepoint offer?",
        answer: "Wirepoint supports USD cash deposits, USD cheque processing, crypto conversion, payout tracking, and Naira settlement.",
    },
    {
        question: "How long does it take to receive my payment?",
        answer: "Timing depends on the transaction type and verification process, but Wirepoint keeps you updated from submission through payout.",
    },
    {
        question: "What types of USD cheques do you accept?",
        answer: "Wirepoint accepts eligible US dollar cheques after review and verification through the app flow.",
    },
    {
        question: "Can I convert my physical USD cash into Naira?",
        answer: "Yes. You can mail physical USD cash securely and receive the Naira equivalent after Wirepoint verifies your deposit.",
    },
    {
        question: "Which cryptocurrencies does Wirepoint support?",
        answer: "Supported cryptocurrencies are shown in the app when starting a crypto conversion transaction.",
    },
    {
        question: "What documents do I need to complete a transaction?",
        answer: "Required documents may vary by transaction type, but the app will guide you through the verification documents needed.",
    },
    {
        question: "Are there any hidden charges",
        answer: "Wirepoint shows applicable rates and fees before you complete a transaction.",
    },
];

export const testimonials: {
    quote: string;
    name: string;
    role: string;
}[] = [
    {
        quote: "Hear from customers who trust Wirepoint for fast, secure, and reliable transactions. Whether cashing USD cheques, converting physical USD cash, Wirepoint helps them access their funds with confidence, transparency, and ease.",
        name: "Thankgod Ogbonna",
        role: "Wirepoint User",
    },
    {
        quote: "Hear from customers who trust Wirepoint for fast, secure, and reliable transactions. Whether cashing USD cheques, converting physical USD cash, Wirepoint helps them access their funds with confidence, transparency, and ease.",
        name: "Thankgod Ogbonna",
        role: "Wirepoint User",
    },
    {
        quote: "Hear from customers who trust Wirepoint for fast, secure, and reliable transactions. Whether cashing USD cheques, converting physical USD cash, Wirepoint helps them access their funds with confidence, transparency, and ease.",
        name: "Thankgod Ogbonna",
        role: "Wirepoint User",
    },
    {
        quote: "Hear from customers who trust Wirepoint for fast, secure, and reliable transactions. Whether cashing USD cheques, converting physical USD cash, Wirepoint helps them access their funds with confidence, transparency, and ease.",
        name: "Thankgod Ogbonna",
        role: "Wirepoint User",
    },
];
