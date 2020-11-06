function parseNum(s){
    return parseFloat(s.replace(/[^\d.,]/g, '').replace(',','.'));
}

function toPercent(x){
    return Math.round(10000.0 * x) / 100.0 + "%";
}

function toInt(x){
    return Math.round(x);
}

function calc(){
    var icid_parsed = parseNum(document.getElementById('incid').value);
    var sp_parsed = parseNum(document.getElementById('spec').value);
    var se_parsed = parseNum(document.getElementById('sens').value);
    var incid = 1e-5 * icid_parsed;
    var sp = 0.01 * sp_parsed;
    var se = 0.01 * se_parsed;
    var sample = 1000;
    var cp = incid * sample;
    var cn = sample - cp;
    var tp = se * cp;
    var fp = cn * (1.0 - sp);
    var tn = sp * cn;
    var fn = cp * (1.0 - se);
    var ppv = tp / (tp + fp);
    var npv = tn / (tn + fn);
    document.getElementById("icid_parsed").innerHTML = icid_parsed;
    document.getElementById("sp_parsed").innerHTML = sp_parsed;
    document.getElementById("se_parsed").innerHTML = se_parsed;
    document.getElementById("tp").innerHTML = toInt(tp);
    document.getElementById("tn").innerHTML = toInt(tn);
    document.getElementById("fp").innerHTML = toInt(fp);
    document.getElementById("fn").innerHTML = toInt(fn);
    document.getElementById("ppv").innerHTML = toPercent(ppv);
    document.getElementById("npv").innerHTML = toPercent(npv);
}

$(document).ready(function(){
  calc();
  $('input').keyup(function(){
    calc();
  });
});
