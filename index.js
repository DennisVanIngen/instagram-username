const sleep = require("./modules/sleep");
const _ = require('lodash');
const fs = require('fs');
const request = require('request');

const chars = "abcdefghijklmnopqrstuvwxyz0123456789".split('')
let done = 0;
let possible = 0;
const total = chars.length * chars.length * chars.length * chars.length;

_.each(chars, char1 => {
    _.each(chars, char2 => {
        _.each(chars, char3 => {
            _.each(chars, char4 => {
                const username = char1 + char2 + char3 + char4;
                request('https://www.instagram.com/' + username + "?__a=1", function (error, response, body) {
                    if (!response) return;
                    if (response.statusCode === 404) {
                        addToList(username)
                        possible++
                    }
                });
                sleep(1000)
                done++;
                console.log("did check " + done + "/" + total + " accountnames. " + possible + " possible free names so far. The last checked name: " + username)
            })
        })
    })
});

function addToList(name) {
    fs.appendFile('available.txt', name + '\r\n', err => {
        if (err) throw err;
        console.log("added " + name + " to list!");
    });
}