export const stringToRupiah = str => {
    const prefix = "Rp. ";
  
    let remove_punctuation = str.replace(/[^\d]/g, "").toString();
    let splitComa = remove_punctuation.split(","); // memisahkan koma
    let remaining = splitComa[0].length % 3; // check sisa dari angka antara 1 dan 2
    let puluhanOrSatuan = splitComa[0].substring(0, remaining); // mengambil angka paling depan antara 1 atau 12
    let ribuan = splitComa[0].substring(remaining).match(/\d{3}/gi); // mengambil sisanya kemudian di pecah menjadi array untuk setiap panjang 3 angka
  
    if (ribuan) {
      let seperator = remaining ? "." : "";
      puluhanOrSatuan += seperator + ribuan.join(".");
    }
  
    puluhanOrSatuan =
      splitComa[1] != undefined
        ? puluhanOrSatuan + "," + splitComa[1]
        : puluhanOrSatuan;
    return prefix + " " + puluhanOrSatuan;
  };
  