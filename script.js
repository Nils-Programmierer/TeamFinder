const participantNames = document.getElementById('participantNames');


function Add() {
    let number = document.getElementsByClassName('participant').length + 1;

    if (number <= 100) {
        participantNames.appendChild(document.createElement('br'));

        const Align = document.createElement('div');
        Align.setAttribute('class', 'align-middle');
        Align.id = number;

        const newInput = document.createElement('input');
        newInput.type = 'text';
        newInput.placeholder = 'Teilnehmer ' + number;
        newInput.id = 'participant' + number;
        newInput.setAttribute('class', 'participant');
        Align.appendChild(newInput);


        const removeSymbol = document.createElement('img');
        removeSymbol.src = 'img/delete.png';
        removeSymbol.setAttribute('class', 'delete');
        removeSymbol.alt = 'Entfernen';
        removeSymbol.onclick = function () {
            document.getElementById(number).previousElementSibling.remove();
            document.getElementById(number).remove();
        };

        Align.appendChild(removeSymbol);
        participantNames.appendChild(Align);
    }
}


function Create() {
    const names = document.getElementById("participantNames");
    let amount = document.getElementById("amount").value;
    const option = document.getElementById("teamSelect").value;

    if (amount >= 2 && amount <= 50) {
        const inputs = names.querySelectorAll('input[type="text"]');
        let Names = Array.from(inputs).map(input => input.value);


        const isValid = Names.every(value => {
            return (
                value.length > 0 &&
                value.length <= 15 &&
                !/<|>|&|script|on[a-z]+=|javascript:/i.test(value)
            );
        });

        if (isValid) {
            generate(Names, amount, option);
        } else {
            console.error("Ungültige Eingabe! Es sind nur Werte bis 15 Zeichen erlaubt, ohne Quellcode.");
        }
    }
}



function generate(Names, amount, option) {
    let groups;

    if (+option === 1) {
        let mixedNames = [...Names].sort(() => Math.random() - 0.5);
        groups = Array.from({ length: amount }, () => []);

        mixedNames.forEach((name, index) => {
            groups[index % amount].push(name);
        });
    } else {
        let mixedNames = [...Names].sort(() => Math.random() - 0.5);
        groups = [];
        let amountGroups = Math.ceil(mixedNames.length / amount);

        for (let i = 0; i < amountGroups; i++) {
            groups.push(mixedNames.splice(0, Math.ceil(mixedNames.length / (amountGroups - i))));
        }
    }

    localStorage.setItem("groups", JSON.stringify(groups));
    window.location.href = "result.html";
}
