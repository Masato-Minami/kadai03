function Card(mark, num) {
  //トランプのクラス
  this.mark = mark;
  this.num = num;
}

var cards = [];
function init() {
  //トランプのカードを作成
  var x = 0;
  for (var i = 1; i <= 13; i++) {
    cards[x] = new Card("♠", i);
    x++;
    cards[x] = new Card("☘", i);
    x++;
    cards[x] = new Card("❤", i);
    x++;
    cards[x] = new Card("♦", i);
    x++;
  }
}
init();

var hit = document.getElementById("hit");
var play = document.getElementById("play");
var stand = document.getElementById("stand");
var reset = document.getElementById("reset");
var your_card = document.getElementById("your_card"); //手札
var com_card = document.getElementById("com_card");
var your_sum = document.getElementById("your_sum"); //手札の合計
var com_sum = document.getElementById("com_sum");
var your_sum_process = 0;
var com_sum_process = 0;
var result = document.getElementById("result"); //結果を表示
var record = []; //既出のカードを記録

play.addEventListener("click", function () {
  while (com_sum_process <= 11) {
    //コンピューターのhitする基準
    var draw = Math.floor(Math.random() * 52); //カードを一枚ランダムに引く
    if (record.indexOf(draw) >= 0) {
      //既出の場合は引き直し
      draw = Math.floor(Math.random() * 52);
    }
    var com_box = document.createElement("td");
    var com_hand = document.createTextNode(cards[draw].mark + cards[draw].num);
    com_card.appendChild(com_box);
    com_box.appendChild(com_hand);
    record.push(draw);

    switch (cards[draw].num) {
      case 11:
      case 12:
      case 13:
        com_sum_process += 10;
        break;
      case 1:
        if (com_sum_process + 11 <= 21) {
          com_sum_process += 11;
        } else {
          com_sum_process += 1;
        }
        break;
      default:
        com_sum_process += cards[draw].num;
        break;
    }
    com_sum.innerHTML = com_sum_process;
  }
  if (com_sum_process > 0) {
    stand.className = "btn inactive";
    hit.className = "btn inactive";
  }
});

hit.addEventListener("click", function () {
  if (your_sum_process > 21) {
    return;
  } //ボタンを押せなくする

  var draw = Math.floor(Math.random() * 52); //カードを一枚ランダムに引く
  while (record.indexOf(draw) >= 0) {
    //重複の場合は引き直し
    draw = Math.floor(Math.random() * 52);
  }
  var your_box = document.createElement("td"); //手札の表示
  var your_hand = document.createTextNode(cards[draw].mark + cards[draw].num);
  your_card.appendChild(your_box);
  your_box.appendChild(your_hand);
  record.push(draw); //既出カードの記録

  switch (cards[draw].num) {
    case 11:
    case 12:
    case 13:
      your_sum_process += 10;
      break;
    case 1: //1はカードを引いた時点のみ判断可能
      if (your_sum_process + 11 <= 21) {
        your_sum_process += 11;
      } else {
        your_sum_process += 1;
      }
      break;
    default:
      your_sum_process += cards[draw].num;
      break;
  }
  your_sum.innerHTML = your_sum_process; //引いたカードを手札の合計へ
  if (your_sum_process > 21) {
    //disabledの修飾
    hit.className = "btn inactive";
  }
  if (your_sum_process > 0) {
    //disabledの修飾
    stand.className = "btn";
  }
});

stand.addEventListener("click", function () {
  if (com_sum_process <= 16) {
    //コンピューターのhitする基準
    var draw = Math.floor(Math.random() * 52); //カードを一枚ランダムに引く
    if (record.indexOf(draw) >= 0) {
      //既出の場合は引き直し
      draw = Math.floor(Math.random() * 52);
    }
    var com_box = document.createElement("td");
    var com_hand = document.createTextNode(cards[draw].mark + cards[draw].num);
    com_card.appendChild(com_box);
    com_box.appendChild(com_hand);
    record.push(draw);

    switch (cards[draw].num) {
      case 11:
      case 12:
      case 13:
        com_sum_process += 10;
        break;
      case 1:
        if (com_sum_process + 11 <= 21) {
          com_sum_process += 11;
        } else {
          com_sum_process += 1;
        }
        break;
      default:
        com_sum_process += cards[draw].num;
        break;
    }
    com_sum.innerHTML = com_sum_process;
  }
  if (com_sum_process > 0) {
    stand.className = "btn inactive";
    hit.className = "btn inactive";
  }

  //勝敗を決める
  if (your_sum_process < 22 && your_sum_process > com_sum_process) {
    result.innerHTML = "Won!";
  } else if (your_sum_process < 22 && com_sum_process > 21) {
    result.innerHTML = "Won!";
  } else if (your_sum_process < 22 && your_sum_process === com_sum_process) {
    result.innerHTML = "Draw!";
  } else if (your_sum_process > 21 && com_sum_process > 21) {
    result.innerHTML = "Draw!";
  } else {
    result.innerHTML = "Lost!";
  }
});

const clickBtn = document.getElementById("click-btn");
const popupWrapper = document.getElementById("popup-wrapper");
const close = document.getElementById("close");

// ボタンをクリックしたときにポップアップを表示させる
clickBtn.addEventListener("click", () => {
  popupWrapper.style.display = "block";
});

// ポップアップの外側又は「x」のマークをクリックしたときポップアップを閉じる
popupWrapper.addEventListener("click", (e) => {
  if (e.target.id === popupWrapper.id || e.target.id === close.id) {
    popupWrapper.style.display = "none";
  }
});

reset.addEventListener("click", function () {
  location.reload();
});
