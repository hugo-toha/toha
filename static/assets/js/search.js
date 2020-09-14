"use strict";
var searchFn = function () {
    var lastTerm = "You are likely to be eaten by a grue.";
    var stopwords = ["i", "me", "my", "we", "our", "you", "it",
        "its", "this", "that", "am", "is", "are", "was", "be",
        "has", "had", "do", "a", "an", "the", "but", "if", "or", "as",
        "of", "at", "by", "for", "with", "to", "then", "no", "not",
        "so", "too", "can", "and", "but"];
    var normalizer = document.createElement("textarea");
    var normalize = function (input) {
        normalizer.innerHTML = input;
        var inputDecoded = normalizer.value;
        return " " + inputDecoded.trim().toLowerCase().replace(/[^0-9a-z ]/gi, " ").replace(/\s+/g, " ") + " ";
    }

    var limit = 30;
    var minChars = 2;
    var searching = false;
    var render = function (results) {
        results.sort(function (a, b) { return b.weight - a.weight; });
        for (var i = 0; i < results.length && i < limit; i += 1) {
            var result = results[i].item;
    	    var templateDefinition = $('#search-results-template').html();
            var output = renderTemplate(templateDefinition,{"Title":result.showTitle,"Summary":result.summary,"RelPermalink":result.relPermalink});
            $('#search-results-holder').append(output);
	    }
        showSearchResultsAndHideCards();
    };

    var showSearchResultsAndHideCards = function() {
        $("#search-results-holder").show();
	    $("#post-card-holder ").hide();
        $("#search-results-holder .post-card").show();
        $('.paginator').hide();        
        $('#search-results').show();
    }
    var showCardssAndHideSearchResults = function() {
        $("#search-results-holder").hide();
        $('#post-card-holder').show();	        
        $('#search-results-holder').html("");
        $('.paginator').show();
        $('#search-results').hide();
    }

    var renderTemplate = function(templateString, data) {
	    var conditionalMatches,conditionalPattern,copy;
	    //now any conditionals removed we can do simple substitution
        var key, find, re;
        for (key in data) {
            find = '\\$\\{\\s*' + key + '\\s*\\}';
            re = new RegExp(find, 'g');
            templateString = templateString.replace(re, data[key]);
        }
        return templateString;
    }
    var checkTerms = function (terms, weight, target) {
        var weightResult = 0;
        terms.forEach(function (term) {
            if (~target.indexOf(term.term)) {
                var idx = target.indexOf(term.term);
                while (~idx) {
                    weightResult += term.weight * weight;
                    idx = target.indexOf(term.term, idx + 1);
                }
            }
        });
        return weightResult;
    };

    var search = function (terms) {
        var results = [];
        searchHost.index.forEach(function (item) {
            if (item.tags) {
                var weight_1 = 0;
                terms.forEach(function (term) {
                    if (item.title.startsWith(term.term)) {
                        weight_1 += term.weight * 32;
                    }
                });
                weight_1 += checkTerms(terms, 1, item.content);
                //weight_1 += checkTerms(terms, 2, item.description);
                //weight_1 += checkTerms(terms, 2, item.subtitle);
                item.tags.forEach(function (tag) {
                    weight_1 += checkTerms(terms, 4, tag);
                });
                weight_1 += checkTerms(terms, 16, item.title);
                if (weight_1) {
                    results.push({
                        weight: weight_1,
                        item: item
                    });
                }
            }
        });
        if (results.length) {
            var resultsMessage = results.length + " items found.";
            if (results.length > limit) {
                resultsMessage += " Showing first " + limit + " results.";
            }
            $("#search-results").html("<p>" + resultsMessage + "</p>");
            render(results);
        }
        else {
            showCardssAndHideSearchResults();
        }
    };


    var runSearch = function () {
        if (searching) {
            return;
        }
        var term = normalize($("#search-box").val()).trim();
        if (term === lastTerm) {
            return;
        }
        lastTerm = term;
        if (term.length < minChars) {
            showCardssAndHideSearchResults();
            return;
        }
        searching = true;
        var startSearch = new Date();
        $("#search-results").html('<p>Processing search...</p>');
        var terms = term.split(" ");
        var termsTree = [];
        for (var i = 0; i < terms.length; i += 1) {
            for (var j = i; j < terms.length; j += 1) {
                var weight = Math.pow(2, j - i);
                var str = "";
                for (var k = i; k <= j; k += 1) {
                    str += (terms[k] + " ");
                }
                var newTerm = str.trim();
                if (newTerm.length >= minChars && stopwords.indexOf(newTerm) < 0) {
                    termsTree.push({
                        weight: weight,
                        term: " " + str.trim() + " "
                    });
                }
            }
        }
        search(termsTree);
        searching = false;
        var endSearch = new Date();
        $("#search-results").append("<p><small>Search took " + (endSearch - startSearch) + "ms.</small></p>");
    };
    var initSearch = function () {
        $("#search-box").keyup(function () {
            runSearch();
        });
        runSearch();
    };
    $("#search-box").hide();
    var searchHost = {};
    $.getJSON("/index.json", function (results) {
        searchHost.index = [];
        var dup = {};
        results.forEach(function (result) {
            if (result.tags) {
                var res = {};
                res.showTitle = result.title;
                res.title = normalize(result.title);
                res.subtitle = normalize(result.subtitle);
                res.summary = result.summary;
                res.content = normalize(result.content);
		        res.relPermalink = result.relPermalink;
                var newTags_1 = [];
                result.tags.forEach(function (tag) {
                    return newTags_1.push(normalize(tag));
                });
                res.tags = newTags_1;
                searchHost.index.push(res);
                dup[result.permalink] = true;
            }
        });
        $("#loading").hide();
        
        $("#search-box").show()
            .removeAttr("disabled")
            .focus();
        initSearch();
    });
};
window.addEventListener("DOMContentLoaded", searchFn);
