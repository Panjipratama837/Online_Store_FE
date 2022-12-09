function moneyFormatIDR(ammount, last = ",00") {
    let curr = new Intl.NumberFormat("en-ID", {
        style: "currency",
        currency: "IDR",
    })
        .format(ammount)
        .replace(/[IDR]/gi, "")
        .replace(/(\.+\d{2})/, "")
        .trimLeft();

    // return curr.replace(/,/gi, ".") + last;
    return curr.replace(/,/gi, ".");
}

export default moneyFormatIDR;