let base_url = "https://touhidion.github.io/mockapi/hydra";
let type_dot_json = ".json";
let slash = "/";
let hydra_versions = {
    V1: "hydra_v1.json",
    V4: "hydra_v1.xml",
    V2: "hydra_v2.json",
    V5: "hydra_v2.xml",
    V3: "hydra_v3.json",
    V6: "hydra_v3.xml"
};
const ID_CODE_SNIPPET = "code_snippet";
const ID_TOOL_TIP = "tooltip";

let preSelectedHydraVersion = '';
async function loadData(hydra_version) {
    let url = base_url + slash + hydra_version;
    let response = await fetch(url);
    if (response.status === 200) {
        let data = await response.text();
        document.getElementById("code-area").style.visibility = "visible";
        document.getElementById(ID_CODE_SNIPPET).innerText = data;
        document.getElementById(hydra_version).style.backgroundColor = "#282828";
        document.getElementById(hydra_version).style.border = "2px #83a598 solid";
        if (preSelectedHydraVersion) {
            document.getElementById(preSelectedHydraVersion).style.backgroundColor = "#83a598";
        }
        preSelectedHydraVersion = hydra_version;
    } else {
        console.error("Data fetch error!");
    }
}

function copyElementTextToClipboard() {
    let elemId = ID_CODE_SNIPPET;
    var text = document.getElementById(elemId).innerText;
    navigator.clipboard.writeText(text);

    showToolTip("Copied to clipboard");
}

function showToolTip(msg) {
    let tooltip = document.getElementById(ID_TOOL_TIP);
    tooltip.innerHTML = msg;
}

window.onload = function () {
    let wrapper = document.getElementById("wrapper");
    let HTML = '';
    let hydra_versions_values = Object.values(hydra_versions)
    for (let i = 0; i < hydra_versions_values.length; i++) {
        HTML += '<button class="btn" id="' + hydra_versions_values[i] + '" onClick=loadData("' + hydra_versions_values[i] + '")>' + hydra_versions_values[i] + '</button>'
        if (i % 2 == 1) {
            HTML += '</br>'
        } else {
            HTML += '  |  '
        }
    }
    wrapper.innerHTML = HTML
}