function lambert93toWGPS(lambertE, lambertN) {

    Math.tanh = Math.tanh || function(x) {
        if(x === Infinity) {
            return 1;
        } else if(x === -Infinity) {
            return -1;
        } else {
            return (Math.exp(x) - Math.exp(-x)) / (Math.exp(x) + Math.exp(-x));
        }
    };

    Math.atanh = Math.atanh || function(x) {
        return Math.log((1+x)/(1-x)) / 2;
    };

    let constantes = {
        GRS80E: 0.081819191042816,
        LONG_0: 3,
        XS: 700000,
        YS: 12655612.0499,
        n: 0.7256077650532670,
        C: 11754255.4261
    };

    let delX = lambertE - constantes.XS;
    let delY = lambertN - constantes.YS;
    let gamma = Math.atan(-delX / delY);
    let R = Math.sqrt(delX * delX + delY * delY);
    let latiso = Math.log(constantes.C / R) / constantes.n;
    let sinPhiit0 = Math.tanh(latiso + constantes.GRS80E * Math.atanh(constantes.GRS80E * Math.sin(1)));
    let sinPhiit1 = Math.tanh(latiso + constantes.GRS80E * Math.atanh(constantes.GRS80E * sinPhiit0));
    let sinPhiit2 = Math.tanh(latiso + constantes.GRS80E * Math.atanh(constantes.GRS80E * sinPhiit1));
    let sinPhiit3 = Math.tanh(latiso + constantes.GRS80E * Math.atanh(constantes.GRS80E * sinPhiit2));
    let sinPhiit4 = Math.tanh(latiso + constantes.GRS80E * Math.atanh(constantes.GRS80E * sinPhiit3));
    let sinPhiit5 = Math.tanh(latiso + constantes.GRS80E * Math.atanh(constantes.GRS80E * sinPhiit4));
    let sinPhiit6 = Math.tanh(latiso + constantes.GRS80E * Math.atanh(constantes.GRS80E * sinPhiit5));

    let longRad = Math.asin(sinPhiit6);
    let latRad = gamma / constantes.n + constantes.LONG_0 / 180 * Math.PI;

    let longitude = latRad / Math.PI * 180;
    let latitude = longRad / Math.PI * 180;

    return {longitude: longitude, latitude: latitude};
}
