// Function to get the formatted date
function getFormattedDate() {
    const currentDate = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return currentDate.toLocaleDateString('en-US', options);
}

function getCurrentTime() {
    const currentTime = new Date();
    return currentTime.toLocaleTimeString('en-US');
}

export const chatResponseObjects = [
    {
        question: /^(hello\??|hi\??|what's up!?|what up!?|hey!?)$/i,
        response: "Hi, how are you?"
    },
    {
        question: /^(what is your name\?|who are you\?)$/i,
        response: "I'm a chatbot, nice to meet you!"
    },
    {
        question: /^(what is the date today\??|what is date today\??|what is date\??|date\??)$/i,
        response: getFormattedDate
    },
    {
        question: /^(I need help|help\??|Can you help me\??|Can you help\??)$/i,
        response: "How can I help you?"
    },
    {
        question: /^(what time is it\??|time\??|what time is it now\??)$/i,
        response: getCurrentTime
    },
    {
        question: /^(I have technical issue|I have technical problem|technical issue|technical problem)$/i,
        response: "Please find the link above, and it will direct you to customer service page."
    },
    {
        question: /^(I want to return my product|I want to return product|How can I return product\??|How to return product\??|return product|return)$/i,
        response: "Please find the link above, and it will direct you to customer service page."
    },
    {
        question: /^(Is there free shipping\??|Do you offer free shipping\??|What are the shipping options\??|Shipping cost\??)$/i,
        response: "Yes, we offer free shipping on orders over $50. For orders below $50, standard shipping costs $5."
    },
    {
        question: /^(Do you ship internationally\??|What countries do you ship to\??|International shipping\??)$/i,
        response: "Yes, we offer international shipping to select countries. You can check available countries during checkout."
    },
    {
        question: /^(Can I track my order\??|How can I track my order\??|Track order\??|Order tracking\??)$/i,
        response: "Yes, you can track your order by visiting the 'Track Order' page on our website and entering your order details."
    },
    {
        question: /^(What is your return policy\??|How do returns work\??|Return process\??)$/i,
        response: "Our return policy allows you to return items within 30 days of purchase for a full refund. Please refer to our 'Returns' page for more details."
    },
    {
        question: /^(Are the products in stock\??|Product availability\??|Out of stock items\??)$/i,
        response: "You can check the availability of products on their respective product pages. If a product is out of stock, it will be indicated on the page."
    },
    {
        question: /^(Can I cancel my order\??|How do I cancel an order\??|Order cancellation\??|Cancel order\??)$/i,
        response: "You can cancel your order within 24 hours of placing it. Please contact our customer service team for assistance with order cancellation."
    },
    {
        question: /^(Do you offer discounts or promotions\??|How can I get a discount\??|Promotional offers\??)$/i,
        response: "Yes, we regularly offer discounts and promotions. You can sign up for our newsletter to receive exclusive offers, or check our website for ongoing promotions."
    },
    {
        question: /^(What payment methods do you accept\??|Accepted payment methods\??|Payment options\??)$/i,
        response: "We accept credit/debit cards, PayPal, and various other payment methods. You can view available payment options during checkout."
    },
    {
        question: /^(Can I change my shipping address\??|How do I update my shipping address\??|Change delivery address\??|Change shipping address\??)$/i,
        response: "Yes, you can change your shipping address before your order has been dispatched. Please contact our customer service team to update your address."
    },
    {
        question: /^(How long does it take to ship\??|How long does it take for shipping\??|How long does it take for delivery\??|Delivery date\??)$/i,
        response: "It usually takes 3-4 business days"
    },
    {
        question: /^(Assistant|Representative|Assistant please|Representative please|I want to talk to representative|I want to talk to assistant|I want to talk to person)$/i,
        response: "Please find the link above, and it will direct you to customer service page."
    },
    {
        question: /^(How do I contact customer service\?|Contact information\??|Customer support\??|Support\??)$/i,
        response: "You can contact our customer service team via email at support@gmail.com or by phone at 1-800-123-4567. Our support hours are Monday to Friday, 9 AM to 5 PM."
    },
    {
        question: /.*/,
        response: "I'm sorry, I did not understand that. How can I assist you?"
    }
];