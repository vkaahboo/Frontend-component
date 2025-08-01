export const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}


//esta funcion es para usarlo como seprarador de miles
export const addThousandsSeparator = (num) => {
    if(num == null || isNaN(num)) return "";

    const [integerPart, fractionalPart] = num.toString().split(".");
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return fractionalPart
    ? `${formattedInteger}.${fractionalPart}`
    : formattedInteger;
}