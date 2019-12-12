
(function() {
"use strict";
var undefined;

window.sagecell = window.sagecell || {};

sagecell.templates = {
    minimal: { // for an evaluate button and nothing else.
        editor: "textarea-readonly",
        hide: ["editor", "files", "permalink"],
    },
    restricted: { // to display/evaluate code that can't be edited.
        editor: "codemirror-readonly",
        hide: ["files", "permalink"],
    }
};

sagecell.allLanguages = ["sage", "gap", "gp", "html", "macaulay2", "maxima", "octave", "python", "r", "singular"];

// Deal with IE's lack of Promise
require(['es6-promise'], function(es6p) {
    if(es6p) {
        es6p.polyfill();
    }
});

var cell;
require(['cell'], function(cell_arg) {
    cell = cell_arg;
    console.debug('cell set');
});
sagecell.makeSagecell = function(args) {
    console.info('sagecell.makeSagecell called');
    var cellInfo = {};
    if (cell) {
        cell.make(args, cellInfo);
        console.info('sagecell.makeSagecell finished');
    } else {
        setTimeout(function tryAgain() {
            if (cell) {
                cell.make(args, cellInfo);
                console.info('sagecell.makeSagecell finished after delay');
            } else {
                setTimeout(tryAgain);
            }
        });
    }
    return cellInfo;
};
sagecell.deleteSagecell = function(cellInfo) {
    cell.delete(cellInfo);
};
sagecell.moveInputForm = function(cellInfo) {
    cell.moveInputForm(cellInfo);
};
sagecell.restoreInputForm = function(cellInfo) {
    cell.restoreInputForm(cellInfo);
};

// Purely for backwards compability
window.singlecell = window.sagecell;
window.singlecell.makeSinglecell = window.singlecell.makeSagecell;
})();
