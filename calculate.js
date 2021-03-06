function parseNum(s){
    return parseFloat(s.replace(/[^\d.,]/g, '').replace(',','.'));
}

function toPercent(x){
    return Math.round(10000.0 * x) / 100.0 + "%";
}

function toInt(x){
    return Math.round(x);
}

function validPercentage(x){
    if(x > 100.0){
        window.alert("Der Prozentsatz muss zwischen 0 und 100 liegen");
        return false;
    }
    return true;
}

function validIncidence(x){
    if(x > 100000.0){
        window.alert("Die Inzidenz muss zwischen 0 und 100000 liegen");
        return false;
    }
    return true;
}

function getIncidence(){
    var incid_parsed = parseNum(document.getElementById('incid').value);
    if(!validIncidence(incid_parsed)){
        incid_parsed = 100000;
        document.getElementById('incid').value = incid_parsed;
    }
    document.getElementById("incid_parsed").innerHTML = incid_parsed;
    return 1e-5 * incid_parsed;
}

function getSpecificity(){
    var sp_parsed = parseNum(document.getElementById('spec').value);
    if(!validPercentage(sp_parsed)){
        sp_parsed = 100;
        document.getElementById('spec').value = sp_parsed;
    }
    document.getElementById("sp_parsed").innerHTML = sp_parsed;
    return 0.01 * sp_parsed;
}

function getSensitivity(){
    var se_parsed = parseNum(document.getElementById('sens').value);
    if(!validPercentage(se_parsed)){
        se_parsed = 100;
        document.getElementById('sens').value = se_parsed;
    }
    document.getElementById("se_parsed").innerHTML = se_parsed;
    return 0.01 * se_parsed;
}

function calc(){
    var incid = getIncidence();
    var sp = getSpecificity();
    var se = getSensitivity();
    var sample = 1000;
    var cp = incid * sample;
    var cn = sample - cp;
    var tp = se * cp;
    var fp = cn * (1.0 - sp);
    var tn = sp * cn;
    var fn = cp * (1.0 - se);
    var ppv = tp / (tp + fp);
    var npv = tn / (tn + fn);
    document.getElementById("tp").innerHTML = toInt(tp);
    document.getElementById("tn").innerHTML = toInt(tn);
    document.getElementById("fp").innerHTML = toInt(fp);
    document.getElementById("fn").innerHTML = toInt(fn);
    document.getElementById("ppv").innerHTML = toPercent(ppv);
    document.getElementById("npv").innerHTML = toPercent(npv);
}

$(function () {
  calc();
  $('input').on('keyup', calc);
});
