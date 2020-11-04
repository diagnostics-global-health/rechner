function calc(){
    var incid = 1e-5 * parseFloat(document.getElementById('incid').value);
    var sample = 1000;
    var cp = incid * sample;
    var cn = sample - cp;
    var sp = 0.01 * parseFloat(document.getElementById('spec').value);
    var se = 0.01 * parseFloat(document.getElementById('sens').value);
    var tp = se * cp;
    var fp = cn * (1.0 - sp);
    var tn = sp * cn;
    var fn = cp * (1.0 - se);
    var ppv = tp / (tp + fp);
    var npv = tn / (tn + fn);
    document.getElementById("tp").innerHTML = Math.round(tp);
    document.getElementById("tn").innerHTML = Math.round(tn);
    document.getElementById("fp").innerHTML = Math.round(fp);
    document.getElementById("fn").innerHTML = Math.round(fn);
    document.getElementById("ppv").innerHTML = Math.round(10000.0 * ppv) / 100.0 + "%";
    document.getElementById("npv").innerHTML = Math.round(10000.0 * npv) / 100.0 + "%";
}

$(document).ready(function(){
  calc();
  $('input').keyup(function(){
    calc();
  });
});
