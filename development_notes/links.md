
# old code for links
```JavaScript
function getLink() {
    var searchString = window.location.search;
    var output = searchString == '' ? window.location.href + '?' + params.toString() : window.location.href.replace(searchString, '?' + params.toString());
    return output;
}

function copyLink() {
    navigator.clipboard.writeText(getLink());
}

function updateLink() {
    document.querySelector('#generatedURL').value = getLink();
}

```