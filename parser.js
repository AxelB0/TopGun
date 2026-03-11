function parseCalls(text) {
    const lines = text.split(/\r?\n/).map(line => line.trim()).filter(line => line.length > 0);

    const results = [];
    let currentDate = null;

    const isNumber = v => /^-?\d+(\.\d+)?$/.test(v.replace(/,/g, ""));

    for (let i = 0; i < lines.length; i++) {
        if (lines[i].startsWith("Expires")) {
            currentDate = lines[i].replace("Expires ", "");
            continue;
        }

        if (isNumber(lines[i])) {

            const block = lines.slice(i, i + 13);

            if (block.length === 13) {


                let strike = block[6].includes('.')? parseFloat(block[6]) : block[5];

                let last = parseFloat(block[0].replace(/,/g, ""));
                let oi = block[1] ? parseInt(block[1].replace(/,/g, "")) : null;

                results.push({
                    date: currentDate,
                    strike: strike,
                    last: last,
                    oi: oi
                });

                i += 12;
            }
        }
    }
    return results;
}

function run() {
    const text = document.getElementById("input").value;
    const data = parseCalls(text);

    document.getElementById("output").textContent = JSON.stringify(data, null, 2);
}