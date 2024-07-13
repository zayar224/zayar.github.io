document.addEventListener('DOMContentLoaded', function() {
    loadTextsFromLocalStorage();

    document.getElementById('textFormpost').addEventListener('submit', function(event) {
        event.preventDefault();
        var textInput = document.getElementById('textInput');
        var textValue = textInput.value.trim();

        if (textValue !== "") {
            saveTextToLocalStorage(textValue);
            addTextToList(textValue);
            alert(`Saved Text: ${textValue}`); // Display alert for saved text
            textInput.value = '';
        }
    });

    function saveTextToLocalStorage(text) {
        var texts = JSON.parse(localStorage.getItem('texts')) || [];
        texts.push(text);
        localStorage.setItem('texts', JSON.stringify(texts));
    }

    function loadTextsFromLocalStorage() {
        var texts = JSON.parse(localStorage.getItem('texts')) || [];
        texts.forEach(function(text) {
            addTextToList(text);
        });
    }

    function addTextToList(text) {
        var textList = document.getElementById('textList');
        var listItem = document.createElement('li');
        listItem.className = 'list-group-item';
        listItem.textContent = text;
        textList.appendChild(listItem);
    }
});