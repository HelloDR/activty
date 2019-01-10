/**
 * Created by 15345 on 2019/1/8.
 */
window.alert = function (str) {
    var shield = document.createElement("DIV");
    shield.id = "shield";
    shield.style.position = "absolute";
    shield.style.left = "50%";
    shield.style.top = "50%";
    shield.style.width = "280px";
    shield.style.height = "150px";
    shield.style.marginLeft = "-140px";
    shield.style.marginTop = "-110px";
    shield.style.zIndex = "25";
    var alertFram = document.createElement("DIV");
    alertFram.id = "alertFram";
    alertFram.style.position = "absolute";
    alertFram.style.width = "280px";
    alertFram.style.height = "150px";
    alertFram.style.left = "50%";
    alertFram.style.top = "50%";
    alertFram.style.marginLeft = "-140px";
    alertFram.style.marginTop = "-110px";
    alertFram.style.textAlign = "center";
    alertFram.style.lineHeight = "150px";
    alertFram.style.zIndex = "300";
    strHtml = "<ul style=\"list-style:none;margin:0;padding:0;width:100%\">\n";
    strHtml += " <li style=\"background:url('images/bg.jpg') no-repeat 0 -104px;-webkit-background-size: ;background-size: cover;text-align:left;padding-left:20px;font-size:14px;font-weight:bold;height:25px;line-height:25px;color:white\">[中奖提醒]</li>\n";
    strHtml += " <li style=\"background:url('images/bg.jpg') no-repeat 0 -358px;text-align:center;font-size:12px;height:95px;line-height:95px;color:#fff\">" + str + "</li>\n";
    strHtml += " <li style=\"background:url('images/bg.jpg') no-repeat 0 -514px;text-align:center;font-weight:bold;height:30px;line-height:25px;\"><input type=\"button\" value=\"确 定\" onclick=\"doOk()\" style=\"width:80px;height:20px;background:red;color:white;border:none;box-shadow:0 0 5px #ccc;font-size:14px;line-height:20px;outline:none;margin-top: 4px\"/></li>\n";
    strHtml += "</ul>\n";
    alertFram.innerHTML = strHtml;
    document.body.appendChild(alertFram);
    document.body.appendChild(shield);
    this.doOk = function () {
        alertFram.style.display = "none";
        shield.style.display = "none";
    };
    alertFram.focus();
    document.body.onselectstart = function () {
        return false;
    };
}
