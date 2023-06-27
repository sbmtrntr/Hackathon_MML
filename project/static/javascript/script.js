// window.onload = function() {
//     var changeColor = function() {
//         var e = document.getElementById('test');
//         e.style.color = 'red';
//         //console.log("書き換えテスト")
//     }
//     setTimeout(changeColor, 5000);
// }

let Q = ["apple","banana","melon","mango","starwberry","blueberry","orange"];//問題文
let Q_No = Math.floor( Math.random() * Q.length);//問題をランダムで出題する

let Q_i = 0;//回答初期値・現在単語どこまで合っているか判定している文字番号
let Q_l = Q[Q_No].length;//計算用の文字の長さ


window.addEventListener("keydown", push_Keydown);
