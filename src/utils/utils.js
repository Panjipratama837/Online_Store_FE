// For only number input
export const numberChange = (evt) => {
    // console.log(evt)

    var charCode = evt?.which ? evt?.which : evt?.keyCode;
    const isShiftPressed = evt?.nativeEvent?.shiftKey;
    const isCtrlPressed = evt?.ctrlKey;
    if (isShiftPressed) {
        return evt.preventDefault();
    } else {
        if (
            isCtrlPressed &&
            (charCode === 86 || charCode === 67 || charCode === 65)
        ) {
            return true;
        } else if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            return evt.preventDefault();
        }
    }
    return true;
};

/* eslint-disable no-unused-vars */

import {
    KEY_PUBLIC,
    MONTHS_NAME,
    PRIMARY_COLOR,
    SECONDARY_COLOR,
    USER,
    USER_ADMIN,
    ZERO_SUMM_FEEDER,
  } from "./constants";
  import { bluecolor, lightbluecolor, yellowcolor } from "./colors";
  
  import Cookies from "js-cookie";
  import I18n from "./i18";
  import NodeRSA from "node-rsa";
  import { encryptStorage } from "./services";
  import i18n from "./i18";
  import { useTimer } from "react-timer-hook";
  
  export function decodeUTF16LE(binaryStr) {
    var cp = [];
    for (var i = 0; i < binaryStr.length; i += 2) {
      cp.push(binaryStr.charCodeAt(i) | (binaryStr.charCodeAt(i + 1) << 8));
    }
    return String.fromCharCode.apply(String, cp);
  }
  
  export function convertPemKey(dataString) {
    let keyConverted = "-----BEGIN RSA PUBLIC KEY-----";
  
    let dataOperated = dataString.length;
    const baris = Math.ceil(dataOperated / 64);
    let tempCounter = 0;
    let tempEndCounter = 64;
    for (let ab = 0; ab < baris; ab += 1) {
      const addition = dataString.substring(tempCounter, tempEndCounter);
      keyConverted = `${keyConverted}\n${addition.trim()}`;
      tempCounter = tempCounter + 64;
      tempEndCounter = tempEndCounter + 64;
    }
    keyConverted = keyConverted + "\n-----END RSA PUBLIC KEY-----";
    return keyConverted;
  }
  
  export function encryptPassword(message, publicKey) {
    const keys = new NodeRSA(publicKey, "pkcs8-public");
    keys.setOptions({
      encryptionScheme: "pkcs1",
    });
    return keys.encrypt(message, "base64");
  }
  
  export function prepareAuthentication(username, password, pkey) {
    if (username && password && pkey) {
      const encryptedPass = encryptPassword(password, pkey);
      const authNaked = `${username}:${encryptedPass}`;
      const authEncrypted = btoa(authNaked);
      return "Basic " + authEncrypted;
    }
    return null;
  }
  
  export function encryptZip(base64, publicKey) {
    const keys = new NodeRSA(publicKey, "pkcs8-public");
    keys.setOptions({
      encryptionScheme: "pkcs1",
    });
    return keys.encrypt(base64, "base64");
  }
  
  export function moneyFormat(amount, curr, mfd) {
    const formatter = new Intl.NumberFormat("en-US", {
      currency: curr || "IDR",
      minimumFractionDigits: mfd || 0,
    });
    if (curr) {
      return curr + " " + formatter.format(Number(amount));
    }
  
    if (mfd) {
      return formatter.format(Number(amount));
    }
  
    return Number(amount).toLocaleString("en-US", {
      ...formatter,
      style: "decimal",
    });
  }
  
  export function moneyFormatID(amount, curr, mfd) {
    const formatter = new Intl.NumberFormat("id-ID", {
      currency: curr || "IDR",
      minimumFractionDigits: mfd || 0,
    });
    if (curr) {
      return curr+' '+formatter.format(Number(amount));
    }
  
    if (mfd) {
      return formatter.format(Number(amount));
    }
  
    return Number(amount).toLocaleString("id-ID", {
      ...formatter,
      style: "decimal",
    });
  }
  
  export function formateDateFromUTC(dateData) {
    const utcDate = new Date(`${dateData}`);
    return formatDateDisplay(utcDate);
  }
  
  export function formatDateDisplay(dateData) {
    if (dateData && dateData instanceof Date) {
      const dDate = dateData.getDate();
      const mName = MONTHS_NAME[dateData.getMonth()];
      const fYear = dateData.getFullYear();
      return `${dDate} ${mName} ${fYear}`;
    }
    return dateData;
  }
  
  export const formatDateString = dateData => {
    const utcDate = new Date(`${dateData}`);
    const day = utcDate.getDate()
    const month = utcDate.getMonth() + 1
    const year = utcDate.getFullYear()
    return `${day < 10 ? '0'+day : day}/${month < 10 ? '0'+month : month}/${year}`
  }
  
  export function formatDateEN(date) {
    if (date && date instanceof Date) {
      let dDate = date.getDate();
      if (dDate < 10) {
        dDate = "0" + dDate;
      }
      let mMonth = date.getMonth() + 1;
      if (mMonth < 10) {
        mMonth = "0" + mMonth;
      }
      const yYear = date.getFullYear();
      return `${yYear}-${mMonth}-${dDate}`;
    }
    return date;
  }
  
  export function formatDateMY(date) {
    if (date && date instanceof Date) {
      let mMonth = date.getMonth() + 1;
      if (mMonth < 10) {
        mMonth = "0" + mMonth;
      }
      const yYear = date.getFullYear();
      return `${mMonth}/${yYear}`;
    }
    return date;
  }
  
  export function getDateMY() {
    let date = new Date();
    if (date && date instanceof Date) {
      let mMonth = date.getMonth() + 1;
      if (mMonth < 10) {
        mMonth = "0" + mMonth;
      }
      const yYear = date.getFullYear();
      return `${mMonth}/${yYear}`;
    }
    return date;
  }
  
  export function getDateLang(lang, withoutComa) {
    var date = new Date();
    let months
    if (lang == "en-US") {
      months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
    } else if (lang == "id-ID") {
      months = [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember",
      ];
    }
    let formatted_date =
      date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear();
    if (!withoutComa) {
      formatted_date = formatted_date + ", ";
    }
    return formatted_date;
  }
  
  export function getDateLangCustom(lang, withoutComa, dateString) {
    var date = new Date(dateString);
    let months
    if (lang == "en-US") {
      months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
    } else if (lang == "id-ID") {
      months = [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember",
      ];
    }
    let formatted_date =
      date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear();
    if (!withoutComa) {
      formatted_date = formatted_date + ", ";
    }
    return formatted_date;
  }
  
  export function getDateLangNew(lang) {
    var date = new Date();
    let months
    if (lang == "en-US") {
      months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
    } else if (lang == "id-ID") {
      months = [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember",
      ];
    }
    let formatted_date =
      months[date.getMonth()] +
      " " +
      date.getDate() +
      ", " +
      date.getFullYear() +
      " ";
    return formatted_date;
  }
  
  export function parseJwt(token) {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
  
    return JSON.parse(jsonPayload);
  }
  
  export function reverseArray(arraySource) {
    if (arraySource && arraySource instanceof Array) {
      return arraySource.reverse();
    }
    return arraySource;
  }
  
  // TRX HISTORY
  
  
  export function convertDataApi(dataApi) {
    const labels = [];
    const dataSetIn = [];
    const dataSetOut = [];
    for (let x = 0; x < dataApi.length; x += 1) {
      labels.push(dataApi[x].footer);
      dataSetIn.push(dataApi[x].cashIn || dataApi[x].cashPickUp || 0);
      dataSetOut.push(dataApi[x].cashOut || dataApi[x].cashDelivery || 0);
    }
    return {
      labels: labels,
      datasets: [
        {
          label: "Cash Pick Up",
          backgroundColor:  "#1f8bde",
          data: dataSetIn,
          categoryPercentage: 0.6,
          barPercentage: 0.6,
          borderRadius: {
            topLeft: 10,
            topRight: 10,
          },
          borderSkipped: false,
        },
        {
          label: "Cash Delivery",
          backgroundColor:  "#f8ca47",
          data: dataSetOut,
          categoryPercentage: 0.6,
          barPercentage: 0.6,
          borderRadius: {
            topLeft: 10,
            topRight: 10,
            
          },
          borderSkipped: false,
        },
      ],
    };
  }
  
  export function convertDataApiCashAllOtherBank(dataApi) {
    // console.log("data apii nihh :: ", dataApi);
    const newDataSet = [];
    const labels = [];
    const color = [];
    // const legendData = [];
  
    // const data = mandiri?.data;
    const mapData = dataApi?.map((item, index) => {
      const cashIn = [];
      const cashOut = [];
  
      const COLOR_LABEL = [
        {
          color: "#003976",
        },
        {
          color: "#9AC1F1",
        },
        {
          color: "#357FDE",
        },
        {
          color: "#1D9DBF",
        },
        {
          color: "#FE9D52",
        },
      ];
  
      const mapColor = COLOR_LABEL.map((item, index) => {
        color.push(item.color);
      });
  
      item.data.map((trx) => {
        cashIn.push(trx.cashIn || trx.cashInTrx || 0);
        cashOut.push(trx.cashOut || trx.cashOutTrx || 0);
        labels.push(trx.footer);
      });
      newDataSet.push(
        {
          label: item.bankName,
          datLabel: ["In"],
          backgroundColor: color[index],
          data: cashIn.reverse(),
          categoryPercentage: 0.6,
          barPercentage: 0.6,
          borderRadius: 20,
          stack: "Cash In",
        },
        {
          label: item.bankName,
          datLabel: ["Out"],
          backgroundColor: color[index],
          data: cashOut.reverse(),
          categoryPercentage: 0.6,
          barPercentage: 0.6,
          borderRadius: 20,
          stack: "Cash Out",
        }
      );
    });
    // console.log("data apii Mount :: ", mapData);
  
    return {
      labels: [...new Set(labels.reverse())],
      datasets: newDataSet,
    };
  }
  
  export function convertDataApiCashInOtherBank(dataApi) {
    // console.log("data apii nihh :: ", dataApi);
    const newDataSet = [];
    const labels = [];
    const color = [];
  
    const mapData = dataApi?.map((item, index) => {
      const cashIn = [];
      const COLOR_LABEL = [
        {
          color: "#003976",
        },
        {
          color: "#9AC1F1",
        },
        {
          color: "#357FDE",
        },
        {
          color: "#1D9DBF",
        },
        {
          color: "#FE9D52",
        },
      ];
  
      const mapColor = COLOR_LABEL.map((item, index) => {
        color.push(item.color);
      });
  
      item.data.map((trx) => {
        cashIn.push(trx.cashIn || trx.cashInTrx || 0);
        labels.push(trx.footer);
      });
      newDataSet.push({
        label: item.bankName,
        backgroundColor: color[index],
        data: cashIn.reverse(),
        borderRadius: 20,
        categoryPercentage: 0.6,
        barPercentage: 0.4,
      });
    });
    // console.log(mapData);
  
    return {
      labels: [...new Set(labels.reverse())],
      datasets: newDataSet,
    };
  }
  
  export function convertDataApiCashOutOtherBank(dataApi) {
    // console.log("data apii nihh :: ", dataApi);
    const newDataSet = [];
    const labels = [];
    const color = [];
  
    // const data = mandiri?.data;
    const mapData = dataApi?.map((item, index) => {
      const cashOut = [];
      const COLOR_LABEL = [
        {
          color: "#003976",
        },
        {
          color: "#9AC1F1",
        },
        {
          color: "#357FDE",
        },
        {
          color: "#1D9DBF",
        },
        {
          color: "#FE9D52",
        },
      ];
  
      const mapColor = COLOR_LABEL.map((item, index) => {
        color.push(item.color);
      });
  
      item.data.map((trx) => {
        cashOut.push(trx.cashOut || trx.cashOutTrx || 0);
        labels.push(trx.footer);
      });
      newDataSet.push({
        label: item.bankName,
        backgroundColor: color[index],
        data: cashOut.reverse(),
        categoryPercentage: 0.6,
        barPercentage: 0.4,
        borderRadius: 20,
      });
    });
    // console.log("data apii Mount :: ", mapData);
  
    return {
      labels: [...new Set(labels.reverse())],
      datasets: newDataSet,
    };
  }
  
  export function convertDataApiCashIn(dataApi) {
    const mandiri = dataApi?.filter((item) => {
      return item.bankName === "MANDIRI";
    })?.[0];
  
    const data = mandiri?.data;
  
    const labels = [];
    const dataSetIn = [];
  
    for (let x = 0; x < data.length; x += 1) {
      labels.push(data[x].footer);
      dataSetIn.push(data[x].cashIn || data[x].cashInTrx || 0);
    }
  
    return {
      labels: labels.reverse(),
      datasets: [
        {
          backgroundColor: PRIMARY_COLOR,
          data: dataSetIn.reverse(),
          categoryPercentage: 0.6,
          barPercentage: 0.4,
          borderRadius: {
            topLeft: 10,
            topRight: 10,
          },
          borderSkipped: false,
        },
      ],
    };
  }
  
  export function convertDataApiMBC(dataApi) {
    const data = dataApi;
    // console.log("apii mbc nihh :: ", data);
  
    const labels = [];
    const dataSetIn = [];
  
    for (let x = 0; x < data.length; x += 1) {
      labels.push(data[x].footer);
      dataSetIn.push(data[x].cashIn || data[x].cashInTrx || 0);
    }
  
    return {
      labels: labels.reverse(),
      datasets: [
        {
          label: "Cash In",
          backgroundColor: PRIMARY_COLOR,
          data: dataSetIn.reverse(),
          categoryPercentage: 0.6,
          barPercentage: 0.4,
          borderRadius: {
            topLeft: 10,
            topRight: 10,
          },
          borderSkipped: false,
        },
      ],
    };
  }
  
  
  export function convertDataApiCashOut(dataApi) {
    const mandiri = dataApi?.filter((item) => {
      return item.bankName === "MANDIRI";
    })?.[0];
  
    const data = mandiri?.data;
  
    const labels = [];
    const dataSetIn = [];
    const dataSetOut = [];
  
    for (let x = 0; x < data.length; x += 1) {
      labels.push(data[x].footer);
      dataSetIn.push(data[x].cashIn || data[x].cashInTrx || 0);
      dataSetOut.push(data[x].cashOut || data[x].cashOutTrx || 0);
    }
  
    return {
      labels: labels.reverse(),
      datasets: [
        {
          backgroundColor: SECONDARY_COLOR,
          data: dataSetOut.reverse(),
          categoryPercentage: 0.6,
          barPercentage: 0.4,
          borderRadius: {
            topLeft: 10,
            topRight: 10,
          },
          borderSkipped: false,
        },
      ],
    };
  }
  
  export function convertDataApiCashInOut(dataApi) {
  
    const mandiri = dataApi?.filter((item) => {
      return item.bankName === "MANDIRI";
    })?.[0];
    const data = mandiri?.data;
  
    const labels = [];
    const dataSetIn = [];
    const dataSetOut = [];
  
    for (let x = 0; x < data.length; x += 1) {
      labels.push(data[x].footer);
      dataSetIn.push(data[x].cashIn || data[x].cashInTrx || 0);
      dataSetOut.push(data[x].cashOut || data[x].cashOutTrx || 0);
    }
  
    return {
      labels: labels.reverse(),
      datasets: [
        {
          label: "Cash In",
          backgroundColor: PRIMARY_COLOR,
          data: dataSetIn.reverse(),
          categoryPercentage: 0.6,
          barPercentage: 0.6,
          borderRadius: {
            topLeft: 10,
            topRight: 10,
          },
          borderSkipped: false,
        },
        {
          label: "Cash Out",
          backgroundColor: SECONDARY_COLOR,
          data: dataSetOut.reverse(),
          categoryPercentage: 0.6,
          barPercentage: 0.6,
          borderRadius: {
            topLeft: 10,
            topRight: 10,
          },
          borderSkipped: false,
        },
      ],
    };
  }
  
  export function convertDataApiBalanceMandiri(dataApi) {
    const mandiri = dataApi?.filter((item) => {
      return item.bankName === "MANDIRI";
    })?.[0];
  
    const data = mandiri?.data;
  
    const labels = [];
    const dataSetBalance = [];
  
    for (let x = 0; x < data.length; x += 1) {
      labels.push(data[x].footer);
      dataSetBalance.push(data[x].balance || 0);
    }
  
    return {
      labels: labels,
      datasets: [
        {
          backgroundColor: PRIMARY_COLOR,
          data: dataSetBalance,
          categoryPercentage: 0.6,
          barPercentage: 0.4,
          borderRadius: {
            topLeft: 10,
            topRight: 10,
          },
          borderSkipped: false,
        },
      ],
    };
  }
  
  export function convertDataApiBalanceOtherBank(dataApi) {
    // console.log("data apii nihh :: ", dataApi);
    const newDataSet = [];
    const labels = [];
    const color = [];
  
    // const data = mandiri?.data;
    const mapData = dataApi?.map((item, index) => {
      const dataSetBalance = [];
      const COLOR_LABEL = [
        {
          color: "#003976",
        },
        {
          color: "#9AC1F1",
        },
        {
          color: "#357FDE",
        },
        {
          color: "#1D9DBF",
        },
        {
          color: "#FE9D52",
        },
      ];
  
      const mapColor = COLOR_LABEL.map((item, index) => {
        color.push(item.color);
      });
  
      item.data.map((trx) => {
        dataSetBalance.push(trx.balance || 0);
        labels.push(trx.footer);
      });
      newDataSet.push({
        label: item.bankName,
        backgroundColor: color[index],
        data: dataSetBalance,
        categoryPercentage: 0.6,
        barPercentage: 0.5,
        borderRadius: 20,
      });
    });
    // console.log("data apii Mount :: ", mapData);
  
    return {
      labels: [...new Set(labels)],
      datasets: newDataSet,
    };
  }
  
  export function convertApiDoughnut(dataApi) {
    // console.log("data apii donatt  :: ", dataApi);
    if (dataApi && dataApi.length > 0) {
      const doughnutData = [];
      const legendData = [];
      const colors = [yellowcolor, bluecolor, lightbluecolor];
  
      for (let a = 0; a < dataApi.length; a += 1) {
        const labels = [];
        const dataSets = [];
        const legendItem = [];
        const customColors = [];
        var total = 0;
        var color_fix;
  
        if (dataApi[a].balanceDetails && dataApi[a].balanceDetails.length) {
          for (let b = 0; b < dataApi[a].balanceDetails.length && b < 3; b += 1) {
            color_fix = colors[b];
            labels.push(
              I18n.t("lang." + dataApi[a]?.balanceDetails[b]?.accountType)
            );
            dataSets.push(dataApi[a]?.balanceDetails[b]?.balance);
            if (dataApi[a]?.balanceDetails[b]?.accountType == "D") {
              customColors.push(colors[0]);
              color_fix = colors[0];
            } else if (dataApi[a]?.balanceDetails[b]?.accountType == "S") {
              customColors.push(colors[1]);
              color_fix = colors[1];
            } else if (dataApi[a]?.balanceDetails[b]?.accountType == "T") {
              customColors.push(colors[2]);
              color_fix = colors[2];
            } else {
              customColors.push(colors[b]);
            }
            legendItem.push({
              color: color_fix,
              title: I18n.t("lang." + dataApi[a]?.balanceDetails[b]?.accountType),
              itemValue: dataApi[a]?.balanceDetails[b]?.totalAccount,
              subtitle: moneyFormat(
                dataApi[a]?.balanceDetails[b]?.balance,
                dataApi[a]?.currency
              ),
            });
  
            total = total + dataApi[a]?.balanceDetails[b]?.totalAccount;
          }
  
          // console.log("legendItem :: ", legendItem);
  
          const current = legendItem.find((item) => {
            return item.title === "Current Account" || item.title === "Giro";
          })
  
          const saving = legendItem.find((item) => {
            return item.title === "Saving Account" || item.title === "Tabungan";
          })
  
          const time = legendItem.find((item) => {
            return item.title === "Time Deposit" || item.title === "Deposito";
          })
  
          // console.log("saving :: ", saving);
          // console.log("current :: ", current);
          // console.log("time :: ", time);
  
          const newLegendItem = [current, saving, time];
  
          // console.log("newLegendItem :: ", newLegendItem);
  
          // filter array undefined
          const newLegendItemFilter = newLegendItem.filter((item) => {
            return item !== undefined;
          });
  
          // console.log("newLegendItemFilter :: ", newLegendItemFilter);
  
          legendData.push(newLegendItemFilter);
        } else {
          for (
            let b = 0;
            b < ZERO_SUMM_FEEDER.balanceDetails.length && b < 3;
            b += 1
          ) {
            color_fix = colors[b];
            labels.push(
              I18n.t("lang." + ZERO_SUMM_FEEDER?.balanceDetails[b]?.accountType)
            );
            dataSets.push(ZERO_SUMM_FEEDER?.balanceDetails[b]?.balance);
            if (ZERO_SUMM_FEEDER?.balanceDetails[b]?.accountType === "D") {
              customColors.push(colors[0]);
              color_fix = colors[0];
            } else if (ZERO_SUMM_FEEDER?.balanceDetails[b]?.accountType === "S") {
              customColors.push(colors[1]);
              color_fix = colors[1];
            } else if (ZERO_SUMM_FEEDER?.balanceDetails[b]?.accountType === "T") {
              customColors.push(colors[2]);
              color_fix = colors[2];
            } else {
              customColors.push(colors[b]);
            }
            legendItem.push({
              color: color_fix,
              title: I18n.t(
                "lang." + ZERO_SUMM_FEEDER?.balanceDetails[b]?.accountType
              ),
              itemValue: ZERO_SUMM_FEEDER?.balanceDetails[b]?.totalAccount,
              subtitle: moneyFormat(
                ZERO_SUMM_FEEDER?.balanceDetails[b]?.balance,
                dataApi[a]?.currency
              ),
            });
  
            total = total + ZERO_SUMM_FEEDER?.balanceDetails[b]?.totalAccount;
          }
          legendData.push(legendItem);
        }
        doughnutData.push({
          series: dataSets,
          options: {
            title: {
              text: total,
              align: "center",
              margin: 10,
              offsetX: 0,
              offsetY: 110,
              floating: true,
              style: {
                fontSize: "20px",
                fontWeight: "bold",
                color: "#263238",
              },
            },
            subtitle: {
              text: I18n.t("lang.account"),
              align: "center",
              margin: 10,
              offsetX: 0,
              offsetY: 140,
              floating: true,
              style: {
                fontSize: "13px",
                fontWeight: "normal",
                color: "#9699a2",
              },
            },
            colors: customColors,
            labels: labels,
            legend: {
              show: false,
            },
            chart: {
              type: "donut",
            },
            dataLabels: {
              enabled: true,
              style: {
                colors: ["#fff"],
              },
              formatter: function (value, { seriesIndex, w }) {
                var val = w.config.series[seriesIndex];
                // console.log("val format :: ", val);
  
                return val >= 1.0e9
                  ? (val / 1.0e9).toFixed(1) + ` ${I18n.t("lang.dashboard.M")}`
                  : val >= 1.0e6
                    ? (val / 1.0e6).toFixed(1) + ` ${I18n.t("lang.dashboard.Jt")}`
                    : val >= 1.0e3
                      ? (val / 1.0e3).toFixed(1) + ` ${I18n.t("lang.dashboard.Rb")}`
                      : val;
              },
            },
            responsive: [
              {
                breakpoint: 480,
                options: {
                  chart: {
                    width: 200,
                  },
                  legend: {
                    position: "bottom",
                  },
                },
              },
            ],
            stroke: {
              width: 0,
            },
          },
        });
      }
  
  
      const dataReturned = { data: doughnutData, legend: legendData };
      // console.log('dataReturned : ', dataReturned);
      return dataReturned;
    }
    return null;
  }
  
  export function convertApiDoughnutCustody(dataApi) {
    // console.log("dataApi :: ", dataApi);
  
    const custodyData = dataApi;
    // console.log("called2")
    if (custodyData && custodyData.length > 0) {
      const doughnutData = [];
      const legendData = [];
      const labelPercent = [];
      const colors = [yellowcolor, bluecolor];
      const sumDataDebt = [];
      const sumDataEnquity = [];
  
      for (let a = 0; a < custodyData.length; a += 1) {
        sumDataDebt.push(custodyData[a]?.debtInstrument);
        sumDataEnquity.push(custodyData[a]?.equityInstrument);
      }
      const totalDebt = parseFloat(sumDataDebt.reduce((a, b) => parseFloat(a) + parseFloat(b), 0).toFixed(2));
      const totalEnquity = parseFloat(sumDataEnquity.reduce((a, b) => parseFloat(a) + parseFloat(b), 0).toFixed(2));
  
      // sum 
  
      for (let a = 0; a < custodyData.length; a += 1) {
        // const labels = [];
        const dataSets = [];
        const legendItem = [];
        // const customColors = [];
        // var total = 0;
  
        // percentage
        const debt = totalDebt;
        const equity = totalEnquity;
        const total = debt + equity;
  
        const percentDebt = (debt / total) * 100;
        const percentEquity = (equity / total) * 100;
  
        // const percentDebt = (Math.round(custodyData[a]?.equityInstrument) / totalData) * 100;
  
        dataSets.push(totalEnquity)
        dataSets.push(totalDebt)
  
  
        doughnutData.push({
          labelPercent: labelPercent,
          series: dataSets,
          options: {
            title: {
              text: custodyData.length,
              align: "center",
              margin: 10,
              offsetX: 0,
              offsetY: 110,
              floating: true,
              style: {
                fontSize: "20px",
                fontWeight: "bold",
                color: "#263238",
              },
            },
        
            subtitle: {
              text: I18n.t("lang.dashboard.custody.custodyAccount"),
              align: "center",
              margin: 10,
              offsetX: 0,
              offsetY: 140,
              floating: true,
              style: {
                fontSize: "13px",
                fontWeight: "normal",
                color: "#9699a2",
              },
            },
            colors: [bluecolor, yellowcolor],
            labels: [ I18n.t("lang.dashboard.custody.equityInstrument"), I18n.t("lang.dashboard.custody.debtInstrument") ],
            legend: {
              show: false,
            },
            chart: {
              type: "donut",
            },
            dataLabels: {
              enabled: true,
              style: {
                colors: ["#fff"],
                fontSize: "12px",
              },
              formatter: function (value, { seriesIndex,  w }) {
                var val = w.config.series[seriesIndex];
                // console.log("val format :: ", val);
                labelPercent.push(Math.round(value).toFixed(0));
                return `${Math.round(value).toFixed(0)}%`;
              }
            },
            responsive: [
              {
                breakpoint: 480,
                options: {
                  chart: {
                    width: 200,
                  },
                  legend: {
                    position: "bottom",
                  },
                },
              },
            ],
          },
        });
  
        legendItem.push({
          color: colors[0],
          title: I18n.t("lang.dashboard.custody.debtInstrument"),
          itemValue: debt === 0 ? 0 : Math.round(percentDebt),
          // subtitle: numberWithComma(parseFloat(totalDebt).toFixed(2)),
          subtitle: `${custodyData[0]?.ccyInstrument} ${numberWithComma(parseFloat(totalDebt).toFixed(2))}`,
        });
  
        legendItem.push({
          color: colors[1],
          title: I18n.t("lang.dashboard.custody.equityInstrument"),
          itemValue: equity === 0 ? 0 : Math.round(percentEquity),
          // subtitle: numberWithComma(parseFloat(totalEnquity).toFixed(2)),
          subtitle: `${custodyData[0]?.ccyInstrument} ${numberWithComma(parseFloat(totalEnquity).toFixed(2))}`,
        });
        
        legendData.push(legendItem);
  
        // console.log("datasets : ", dataSets);
      }
  
      // console.log("labelPercent Hahaha: ", labelPercent);
      const dataReturned = { data: doughnutData, legend: legendData, percentLabel: labelPercent};
      // console.log('dataReturned Custody : ', dataReturned);
      // console.log('dataReturned label : ', dataReturned?.percentLabel[0]);
      // console.log('doughnutData Original : ', doughnutData);
      // console.log('doughnutData Length : ', doughnutData[0].labelPercent.length);
      
      
      return dataReturned;
    }
    return null;
  }
  
  export function convertApiDoughnutCustodyAcc(dataApi) {
    const custodyData = dataApi;
  
    if (custodyData && custodyData.length > 0) {
      const doughnutData = [];
      const legendData = [];
      const labelPercent = [];
      const colors = [yellowcolor, bluecolor];
  
  
  
      for (let a = 0; a < custodyData.length; a += 1) {
        // const labels = [];
        const dataSets = [];
        const legendItem = [];
        // const customColors = [];
        // var total = 0;
  
        // percentage
        const debt = parseFloat(custodyData[a]?.debtInstrument);
        const equity = parseFloat(custodyData[a]?.equityInstrument);
        const total = debt + equity;
  
  
        const percentDebt = (debt / total) * 100;
        const percentEquity = (equity / total) * 100;
  
        // const percentDebt = (Math.round(custodyData[a]?.equityInstrument) / totalData) * 100;
  
        dataSets.push(custodyData[a]?.equityInstrument)
        dataSets.push(custodyData[a]?.debtInstrument)
  
        legendItem.push({
          color: colors[0],
          title: I18n.t("lang.dashboard.custody.debtInstrument"),
          itemValue: debt === 0 ? 0 : Math.round(percentDebt),
          subtitle: custodyData[a]?.debtInstrument.includes(".") ? `${custodyData[0]?.ccyInstrument} ${numberWithComma(parseFloat(custodyData[a]?.debtInstrument.split(".")[0]))}.${custodyData[a]?.debtInstrument.split(".")[1]}` : `${custodyData[0]?.ccyInstrument} ${numberWithComma(parseFloat(custodyData[a]?.debtInstrument).toFixed(2))}`,
        });
  
  
        legendItem.push({
          color: colors[1],
          title: I18n.t("lang.dashboard.custody.equityInstrument"),
          itemValue: equity === 0 ? 0 : Math.round(percentEquity),
          subtitle: custodyData[a]?.equityInstrument.includes(".") ? `${custodyData[0]?.ccyInstrument} ${numberWithComma(parseFloat(custodyData[a]?.equityInstrument.split(".")[0]))}.${custodyData[a]?.equityInstrument.split(".")[1]}` : `${custodyData[0]?.ccyInstrument} ${numberWithComma(parseFloat(custodyData[a]?.equityInstrument).toFixed(2))}`,
        });
  
  
        legendData.push(legendItem);
        
  
        doughnutData.push({
          labelPercent: labelPercent,
          series: dataSets,
          options: {
            title: {
              text: "1",
              align: "center",
              margin: 10,
              offsetX: 0,
              offsetY: 110,
              floating: true,
              style: {
                fontSize: "20px",
                fontWeight: "bold",
                color: "#263238",
              },
            },
        
            subtitle: {
              text: I18n.t("lang.dashboard.custody.custodyAccount"),
              align: "center",
              margin: 10,
              offsetX: 0,
              offsetY: 140,
              floating: true,
              style: {
                fontSize: "13px",
                fontWeight: "normal",
                color: "#9699a2",
              },
            },
            colors: [bluecolor, yellowcolor],
            labels: [ I18n.t("lang.dashboard.custody.equityInstrument"), I18n.t("lang.dashboard.custody.debtInstrument") ],
            legend: {
              show: false,
            },
            chart: {
              type: "donut",
            },
            dataLabels: {
              enabled: true,
              style: {
                colors: ["#fff"],
                fontSize: "12px",
              },
              formatter: function (value, { seriesIndex,  w }) {
                var val = w.config.series[seriesIndex];
                // console.log("val format :: ", val);
                // console.log("val real  :: ", value);
                // console.log("val labelPercent  :: ", labelPercent);
                labelPercent.push(Math.round(value).toFixed(0));
                return `${Math.round(value).toFixed(0)}%`;
              }
            },
            responsive: [
              {
                breakpoint: 480,
                options: {
                  chart: {
                    width: 200,
                  },
                  legend: {
                    position: "bottom",
                  },
                },
              },
            ],
          },
        });
      }
      const dataReturned = { data: doughnutData, legend: legendData };
      // console.log('dataReturned Custody : ', dataReturned);
      return dataReturned;
    }
    return null;
  }
  
  export function convertTradeLimit(dataApi) {
    const data = [];
    dataApi.forEach((r) => {
      data.push({
        productType: r.lmCslDesc,
        companyCode: r.lmCslId,
        limitAvailable: r.availableLimit,
        limitCurrency: r.lmSubCcy,
        limitAmount: r.lmCreditLimit,
        limitUsedAmount: r.lmOverOut,
        limitPendingAmount: 0,
        limitPastdueAmount: 0,
      });
    });
    return data;
  }
  
  export function convertValueChain(dataApi) {
    const data = [];
    dataApi.forEach((r) => {
      data.push({
        productType: r.productType + " - " + r.companyCode,
        companyCode: r.companyCode,
        limitAvailable: r.limitAvailable,
        limitCurrency: r.limitCurrency,
        limitAmount: r.limitAmount,
        limitUsedAmount: r.limitUsedAmount,
        limitPendingAmount: r.limitPendingAmount,
        limitPastdueAmount: r.limitPastdueAmount,
      });
    });
    return data;
  }
  
  export const getBase64 = async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
  
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };
  
  export const customRequest = ({ onSuccess, file }) => {
    const checkInfo = () => {
      setTimeout(() => {
        onSuccess(null, file);
      }, 100);
    };
  
    checkInfo();
  };
  
  export const numberChange = (evt) => {
    // console.log(evt)
  
    var charCode = evt.which ? evt.which : evt.keyCode;
    const isShiftPressed = evt.nativeEvent.shiftKey;
    const isCtrlPressed = evt.ctrlKey;
    if (isShiftPressed) {
      return evt.preventDefault();
    } else {
      if (
        isCtrlPressed &&
        (charCode === 86 || charCode === 67 || charCode === 65)
      ) {
        return true;
      } else if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return evt.preventDefault();
      }
    }
    return true;
  };
  
  export const alphabetChange = (evt) => {
    var charCode = evt.which ? evt.which : evt.keyCode;
    if (charCode > 47 && charCode < 58) return evt.preventDefault();
    return true;
  };
  
  export const specialCharacterChange = (evt) => {
    const charCode = evt.which ? evt.which : evt.keyCode;
    const isShiftPressed = evt.nativeEvent.shiftKey;
    const isCtrlPressed = evt.ctrlKey;
    if (isShiftPressed) {
      if (
        (charCode > 47 && charCode < 58) ||
        (charCode > 185 && charCode < 193) ||
        (charCode > 218 && charCode < 223)
      )
        return evt.preventDefault();
    } else {
      if (
        isCtrlPressed &&
        (charCode === 86 || charCode === 67 || charCode === 65)
      ) {
        return true;
      } else if (
        (charCode > 185 && charCode < 193) ||
        (charCode > 218 && charCode < 223)
      ) {
        return evt.preventDefault();
      }
      return true;
    }
  
    return true;
  };
  
  export const dotSpecialCharacterChange = (evt) => {
    const charCode = evt.which ? evt.which : evt.keyCode;
  
    const isShiftPressed = evt.nativeEvent.shiftKey;
    if (isShiftPressed) {
      if (
        (charCode > 47 && charCode < 58) ||
        (charCode > 185 && charCode < 193) ||
        (charCode > 218 && charCode < 223)
      )
        return evt.preventDefault();
    } else {
      if (charCode === 190) {
        return true;
      }
      if (
        (charCode > 185 && charCode < 193) ||
        (charCode > 218 && charCode < 223)
      ) {
        return evt.preventDefault();
      }
      return true;
    }
  
    return true;
  };
  
  export const commaSpecialCharacterChange = (evt) => {
    const charCode = evt.which ? evt.which : evt.keyCode;
  
    if (charCode === 188) {
      return evt.preventDefault();
    }
    return true;
  };
  
  export const specialCharacterAndNumberChange = (evt) => {
    const charCode = evt.which ? evt.which : evt.keyCode;
    const isShiftPressed = evt.nativeEvent.shiftKey;
    const isCtrlPressed = evt.ctrlKey;
    if (isShiftPressed) {
      if (
        (charCode > 47 && charCode < 58) ||
        (charCode > 185 && charCode < 193) ||
        (charCode > 218 && charCode < 223)
      )
        return evt.preventDefault();
    } else {
      if (
        isCtrlPressed &&
        (charCode === 86 || charCode === 67 || charCode === 65)
      ) {
        return true;
      } else if (
        (charCode > 47 && charCode < 58) ||
        (charCode > 185 && charCode < 193) ||
        (charCode > 218 && charCode < 223)
      ) {
        return evt.preventDefault();
      }
      return true;
    }
  
    return true;
  };
  
  export function numberWithdot(data) {
    if (data && data !== undefined && data !== null && data !== "") {
      return data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    } else {
      return data;
    }
  }
  
  export function UTCToDate(date) {
    const utcDate = new Date(`${date}`);
    if (utcDate && utcDate instanceof Date) {
      var d = utcDate.getDate();
      var m = utcDate.getMonth() + 1;
      var y = utcDate.getFullYear();
  
      if (d < 10) {
        d = "0" + d;
      }
      if (m < 10) {
        m = "0" + m;
      }
      //return `${y}-${m}-${d}`;
      return `${d}/${m}/${y}`;
    }
    return utcDate;
  }
  
  export function UTCToTime(date) {
    const utcDate = new Date(`${date}`);
    if (utcDate && utcDate instanceof Date) {
      var h = utcDate.getHours();
      var m = utcDate.getMinutes();
      var s = utcDate.getSeconds();
  
      if (h < 10) {
        h = "0" + h;
      }
      if (m < 10) {
        m = "0" + m;
      }
      if (s < 10) {
        s = "0" + s;
      }
  
      return `${h}:${m}:${s}`;
    }
  }
  
  export function UTCToYear(date) {
    const utcDate = new Date(`${date}`);
    if (utcDate && utcDate instanceof Date) {
      var y = utcDate.getFullYear();
      return y;
    }
    return utcDate;
  }
  
  export function dateConvertFormat(date) {
    if (date != "") {
      var data = date.split("/");
      return data[2] + "-" + data[1] + "-" + data[0];
    }
    return false;
  }
  
  export function Timer({ expiryTimestamp, setDisable }) {
    const {
      seconds,
      minutes,
      hours,
      days
    } = useTimer({ expiryTimestamp, onExpire: () => setDisable(true) });
  
    return (
      <>
        <div style={{ textAlign: "center" }}>
          <span>{days}</span>:<span>{hours}</span>:<span>{minutes}</span>:
          <span>{seconds}</span>
        </div>
      </>
    );
  }
  
  export function toLetters(num) {
    "use strict";
    var mod = num % 26,
      pow = (num / 26) | 0,
      out = mod ? String.fromCharCode(64 + mod) : (--pow, "Z");
    return pow ? toLetters(pow) + out : out;
  }
  export function CheckMimeType(data) {
    if (typeof data === "string") {
      if (data.indexOf("data:image/jpeg;base64") === -1) {
        return `data:image/jpeg;base64,${data}`;
      } else {
        return data;
      }
    } else {
      return data;
    }
  }
  
  export function CheckImageHeight(params) {
    var image = document.createElement("img");
    image.src = params;
    var height;
    image.addEventListener("load", heights(image.height));
    function heights(params) {
      height = params;
    }
    return height;
  }
  
  export function downloadFilePDF(base64) {
    const byteString = window.atob(base64);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
  }
  
  export function downloadFileExcel(base64) {
    const byteString = window.atob(base64);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: "application/vnd.ms-excel" });
    // const blob = new Blob([int8Array], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
  }
  
  export function replaceString(string) {
    return string.replace(".pdf", "");
  }
  
  export function replaceAccessToken(response) {
    const { url } = response.config;
    const { access_token, token_type } = response.headers;
  
    if (url.indexOf("login") > -1) {
      encryptStorage.setItem("access_token_encrypt", access_token);
  
      if (access_token) {
        Cookies.set("access_token", access_token);
        const jwtParsed = parseJwt(access_token);
        const { permissions, additionalInfo } = jwtParsed;
        Cookies.set("channelId", additionalInfo?.channelId);
        encryptStorage.setItem(
          "isAllowCurrentAccount",
          additionalInfo?.isAllowCurrentAccount
        );
        encryptStorage.setItem("isLajuActive", additionalInfo?.isLajuActive);
        encryptStorage.setItem("isLajuVisible", additionalInfo?.isLajuVisible);
        encryptStorage.setItem("features", additionalInfo?.features);
        if (permissions[0] === USER_ADMIN) {
          Cookies.set("access_role", USER_ADMIN);
          encryptStorage.setItem("access_role", USER_ADMIN);
        } else if(permissions[0] === USER){
          Cookies.set("access_role", USER);
          encryptStorage.setItem("access_role", USER);
        }
      }
  
      if (token_type) {
        Cookies.set("token_type", token_type);
        encryptStorage.setItem("token_type", token_type);
      }
    }
  
    if (access_token) {
      encryptStorage.setItem("access_token_encrypt", access_token);
    }
  }
  
  export function clearUserFootPrint() {
    encryptStorage.removeItem("username");
    encryptStorage.removeItem("companyid");
    encryptStorage.removeItem("onboardingTask_access");
    encryptStorage.removeItem("allowCallNow_access");
    encryptStorage.removeItem("currentAccountOpening_access");
    encryptStorage.removeItem("limasGroupId");
    encryptStorage.removeItem("companyidlimasStatus");
    encryptStorage.removeItem("limasRole");
    encryptStorage.removeItem("limasExpired");
    encryptStorage.removeItem("isIndependentUser");
    encryptStorage.removeItem(KEY_PUBLIC);
    Cookies.remove("username");
    Cookies.remove("companyid");
    Cookies.remove("access_token");
    Cookies.remove("token_type");
    Cookies.remove("access_role");
    Cookies.remove("lang");
  }
  
  export const getTodayDate = () => {
    const todayDate = new Date();
    const monthArray = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const monthName = monthArray.filter(
      (month, index) => index === todayDate.getMonth()
    );
    return `${todayDate.getDate()} ${monthName} ${todayDate.getFullYear()}`;
  };
  
  export function csvToArray(str, delimiter = ",") {
    // slice from start of text to the first \n index
    // use split to create an array from string by delimiter
    const headers = str.slice(0, str.indexOf("\n")).split(delimiter);
  
    // slice from \n index + 1 to the end of the text
    // use split to create an array of each csv value row
    const rows = str.slice(str.indexOf("\n") + 1).split("\n");
  
    // Map the rows
    // split values from each row into an array
    // use headers.reduce to create an object
    // object properties derived from headers:values
    // the object passed as an element of the array
    const arr = rows.map(function (row) {
      const values = row.split(delimiter);
      const el = headers.reduce(function (object, header, index) {
        object[header] = values[index];
        return object;
      }, {});
      return el;
    });
  
    // return the array
    return arr;
  }
  
  export const getTodayDateID = () => {
    const todayDate = new Date();
    const monthArray = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];
    const monthName = monthArray.filter(
      (month, index) => index === todayDate.getMonth()
    );
    return `${todayDate.getDate()} ${monthName} ${todayDate.getFullYear()}`;
  };
  
  export const base64ToArrayBuffer = (data) => {
    var bString = window.atob(data);
    var bLength = bString.length;
    var bytes = new Uint8Array(bLength);
    for (var i = 0; i < bLength; i++) {
      var ascii = bString.charCodeAt(i);
      bytes[i] = ascii;
    }
    return bytes;
  };
  
  export const base64toWord = (data) => {
    const { fileName, file64 } = data;
    const bufferArray = base64ToArrayBuffer(file64);
    const blobStore = new Blob([bufferArray], {
      type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    });
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(blobStore);
      return;
    }
  
    const dataDownload = window.URL.createObjectURL(blobStore);
    const link = document.createElement("a");
    document.body.appendChild(link);
    link.href = dataDownload;
  
    link.download = `${fileName}`;
    link.click();
    window.URL.revokeObjectURL(dataDownload);
    link.remove();
  };
  
  export const base64toPDF = (data) => {
    const { fileName, file64 } = data;
    var bufferArray = base64ToArrayBuffer(file64);
    var blobStore = new Blob([bufferArray], { type: "application/pdf" });
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(blobStore);
      return;
    }
    const dataDownload = window.URL.createObjectURL(blobStore);
    const link = document.createElement("a");
    document.body.appendChild(link);
    link.href = dataDownload;
    link.download = `${fileName}`;
    link.click();
    window.URL.revokeObjectURL(dataDownload);
    link.remove();
  };
  
  export const base64toCSV = (data) => {
    const { fileName, file64 } = data;
    var bufferArray = base64ToArrayBuffer(file64);
    var blobStore = new Blob([bufferArray], { type: "text/csv" });
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(blobStore);
      return;
    }
    const dataDownload = window.URL.createObjectURL(blobStore);
    const link = document.createElement("a");
    document.body.appendChild(link);
    link.href = dataDownload;
    link.download = `${fileName}`;
    link.click();
    window.URL.revokeObjectURL(dataDownload);
    link.remove();
  };
  
  export const customEmail = (strFull) => {
    const strLength = strFull.length;
    const indexAtSign = strFull.indexOf("@");
    const str1 = strFull.slice(0, indexAtSign);
    const str2 = strFull.slice(indexAtSign + 1, strLength);
    const splitStr1 = str1.split(/[-_.+]/);
  
    const getChars = mapSpecialCharOnEmail(str1);
  
    const dotStr2 = str2.indexOf(".");
  
    const arrStr2 = str2.split("");
  
    const newStr1 = splitStr1.map((item) => {
      let arr = item.split("");
  
      let newArr = arr.map((character, idx) => {
        if (idx < 2) {
          return character;
        } else {
          return "x";
        }
      });
  
      const mergeString = newArr.join("");
  
      return mergeString;
    });
  
    const combineStr1 = newStr1.reduce((total, item, idx) => {
      if (getChars[idx - 1]) {
        return total + getChars[idx - 1] + item;
      } else {
        return total + item;
      }
    });
  
    const newStr2 = arrStr2.map((item, index) => {
      if (index < 2 || index >= dotStr2) {
        return item;
      } else {
        return "x";
      }
    });
  
    const strNew = `${combineStr1}@${newStr2.join("")}`;
  
    return strNew;
  };
  
  export const mapSpecialCharOnEmail = (str1) => {
    const checkCharacterRegex = /[-_.+]/;
    const arrStr1 = str1.split("");
  
    const arrChar = arrStr1.filter((item) => {
      return checkCharacterRegex.test(item);
    });
  
    return arrChar;
  };
  
  export const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  export const numberPattern = /^[0-9]*$/;
  export const phoneNumberRegex = /^([0-9]{8,20})$/;
  export const alphaNumericPattern = /^[a-zA-Z0-9_,.@'/\s-]*$/;
  export const alphabetPattern = /^[a-zA-Z ]*$/;
  
  export const specialManualErrorMessage = (
    message,
    isPersona,
    listErrorManual
  ) => {
    let returnedMessage = I18n.t(message);
  
    const errorMessageInd = listErrorManual.find(item => item.name === message)
    returnedMessage = isPersona === 1 ? `${I18n.t(message)}` : `${errorMessageInd.message}`
  
    return returnedMessage;
  }
  
  export const removeMitaLocalStorage = () => {
    localStorage.removeItem('at');
      localStorage.removeItem('name');
      localStorage.removeItem('email');
      localStorage.removeItem('phone');
      localStorage.removeItem('messages');
      localStorage.removeItem('expiry');
      localStorage.removeItem('uid');
      localStorage.removeItem('token');
      localStorage.removeItem('inmotion_chat_state')
      localStorage.removeItem('total_second_queue');
      localStorage.removeItem("last_quick_reply");
      localStorage.removeItem('first_response_agent');
      localStorage.removeItem('clear_messages');
      localStorage.removeItem('last_transaction_id');
      localStorage.removeItem('member_id');
  
    const mitaScript = document.getElementById('script-mita')
    const mitaIcon = document.getElementById("dolphin-chat-icon")
    const mitaNotification = document.getElementById("dolphin-chat-notification")
    const mitaChat = document.getElementById("dolphin-chat")
    const mitaLogin = document.getElementById("dolphin-login")
    const mitaFullBody = document.getElementById("dolphin-full-body")
  
    document.body.removeChild(mitaScript);
    document.body.removeChild(mitaIcon);
    document.body.removeChild(mitaNotification);
    document.body.removeChild(mitaChat);
    document.body.removeChild(mitaLogin);
    document.body.removeChild(mitaFullBody);
  }
  
  export const createSelfRedirectATag = url => {
    var element = document.createElement('a');
    element.setAttribute('href', url);
    element.setAttribute('target', '_blank')
    document.body.appendChild(element);
    element.click(); 
    document.body.removeChild(element);
  }
  export function moneyFormatIDR(amount) {
    let curr = new Intl.NumberFormat('en-ID', {
      style: 'currency',
      currency: 'IDR'
    }).format(amount)
      .replace(/[IDR]/gi, '')
      .replace(/(\.+\d{2})/, '')
      .trimLeft();
  
    return curr.replace(/,/gi, '.')+',00';
  }
  
  export const emptyDataHandler = (data) => {
    if (data === "" || data === null || data === undefined) {
      data = "-";
    }
    return data;
  }
  
  export function numberWithComma(data) {
    if (data && data !== undefined && data !== null && data !== "") {
      return data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    } else {
      return data;
    }
  }
  
  export const handlePreviewPdfFile = async (valBase64, type='application/octet-stream')=>{
    // console.log("base 64 value:: ", valBase64)
    let test = await fetch(`data:${type};base64,${valBase64}`).then(res => res.blob())
    let file
    if(test){
        var blob = new Blob([test], {type: 'application/pdf'});
        // this.setState({
        //     dataSyaratUmum:URL.createObjectURL(blob)
        // })
        file = URL.createObjectURL(blob)
    }
    
    window.open(file);
  }
  export function downloadFile(base64) {
    const byteString = window.atob(base64);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], {type: "application/pdf"});
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
  }
  
  export const checkFreeEmail = (email) => {
    const listEmail = [
      "gmail","yahoo","outlook","hotmail","aol","aim","yandex",
      "icloud","gmx","proton","zohomail","protonmail",
    ]
    const isEmail = email.toLowerCase().split("@")[1].split(".")[0]
    const result = listEmail.includes(isEmail)
    return result
  }
  
  export const checkFreeEmailLaju = (email) => {
    const listEmail = [
      "gmail","yahoo","outlook","hotmail","aol","aim","yandex",
      "icloud","gmx","proton","zohomail","protonmail", "tutanota",
      "tutamail", "tuta", "keemail", "titan", "zoho", "mail"
    ]
    const isEmail = email?.toLowerCase()?.split("@")[1]?.split(".")[0]
    const result = listEmail?.includes(isEmail)
    return result
  }
  
  export const checkAlphaumericOnkeydown = (e) => {
    let key = e.key;
    let regex = /^[a-zA-Z0-9_,.@'/\s-]*$/
    if( !regex.test(key) ) {
      e.preventDefault();
    }
  }
  
  export const checkEmailOnkeydown = (e) => {
    let {key} = e;
    const rgx = /^[a-zA-Z0-9@._-]*$/
    if( !rgx.test(key) ) {
      e.preventDefault();
    }
  }
  
  export const checkNumAndAlphabetOnKeyDown = e => {
    const { key } = e;
    const rgx = /^[a-zA-Z0-9 ]*$/;
    if (!rgx.test(key)) {
      e.preventDefault();
    }
  }
  
  export const formatRupiahNew = (val) => {
    let result
    let reverse = val.toString().split('').reverse().join('')
    result = reverse.match(/\d{1,3}/g);
    result = result.join('.').split('').reverse().join('');
    return result
  }
  

