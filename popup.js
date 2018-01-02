var filenames = [];

window.onload = function() {

  getImgList();

var button = document.getElementById("submit");

    button.addEventListener("click", function() {
        var answer = document.getElementById("img");
        var random = Math.floor((Math.random() * filenames.length));
        var imagePrefix = "img/";
        var image = imagePrefix.concat(filenames[random]);
        answer.setAttribute("src", image);
    });
}

function getImgList(){
  chrome.runtime.getPackageDirectoryEntry(function(directoryEntry) {
    directoryEntry.getDirectory('img', {}, function(subDirectoryEntry) {
    var directoryReader = subDirectoryEntry.createReader();
    (function readNext() {
        directoryReader.readEntries(function(entries) {
            if (entries.length) {
                for (var i = 0; i < entries.length; ++i) {
                    filenames.push(entries[i].name);
                }
                readNext();
            }
        });
    })();
    });
  });
}
