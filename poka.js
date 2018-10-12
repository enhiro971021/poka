var bahuda = []
var bahuda_mark = []

var rand_bahuda = []
var rand_bahuda_mark = []


$(function(){

  var ele = document.createElement("script");
  ele.type = "text/javascript";
  ele.src = "https://cdnjs.cloudflare.com/ajax/libs/mathjs/5.1.1/math.min.js";
  document.body.appendChild(ele);

  var x, y;
  var count = new Array(11);
  for(y = 0; y < 36; y++) {
    count[y] = new Array(8);
    for(x = 0; x < 9; x++) {
      count[y][x] = 0;
    }
  }

  var now_edit_id = "";

  $(".jihuda, .index-card").click(function() {
    now_edit_id = $(this).attr("data-id");
    show_jihuda(now_edit_id);
    $("#C").fadeIn("slow");
  });

  $("#mycard").click(function() {
    $("#B").fadeIn("slow");
  });


  function show_jihuda(num){

    var number = bahuda[num];

    if (bahuda[num] == 1){
      number = "A";
    };
    if (bahuda[num] == 11){
      number = "J";
    };
    if (bahuda[num] == 12){
      number = "Q";
    };
    if (bahuda[num] == 13){
      number = "K";
    };

    var mark = "";

    if (bahuda_mark[num] == "s"){
      mark = "♠";
    };
    if (bahuda_mark[num] == "h"){
      mark = "♥";
    };
    if (bahuda_mark[num] == "c"){
      mark = "♣";
    };
    if (bahuda_mark[num] == "d"){
      mark = "♦";
    };

    if (bahuda[num] == undefined && bahuda_mark[num] == undefined){
      if (num == 6 || num == 7){
        $(".viwe_now").html("自札" + (num - 5))
        $("#bafuda"+num).html("<img src='./card/z02.png'>")
      }else{
        $(".viwe_now").html("場札" + num)
        $("#bafuda"+num).html("<img src='./card/z02.png'>")
      }
    }else{
      $(".viwe_now").html(number + mark)
      $("#bafuda"+num).html("<img src='./card/"+bahuda_mark[num]+bahuda[num]+".png'>")
    }
  }


  $(".card-btn").click(function() {
    var name = $(this).attr("data-id");
    bahuda[now_edit_id] = Number(name);
    show_jihuda(now_edit_id);
  });

  $(".card-btn_mark").click(function() {
    var name = $(this).attr("data-id");
    bahuda_mark[now_edit_id] = name;
    show_jihuda(now_edit_id)
  });

  $("#e-back").click(function() {
    $("#C").fadeOut("slow");
    yaku_show()

  });

  $("#b-cancel").click(function() {
    $("#B").fadeOut("slow");
  });




  function yaku_line(label,point){
    return "<div class='yaku_line cf'>"+ yaku_label(label) +  yaku_point(point) +"</div>"
  }
  function yaku_label(ctx){
    return "<div class='yaku_label'>"+ ctx +"</div>"
  }
  function yaku_point(ctx){
    return "<div class='yaku_point'>"+ ctx/50 +"%</div>"
  }


  function yaku_show(){
    var labels = ["ロイヤルフラッシュ","ストレートフラッシュ","4カード","フルハウス","フラッシュ","ストレート","3カード","2ペア","1ペア","回数"]
    if( bahuda[6] == undefined && bahuda[7] == undefined){ return }


    for(y = 0; y < 36; y++) {
      for(x = 0; x < 10; x++) {
        count[y][x] = 0;
      }
    }
    var arr = [1,2,3,4,5,6,7].permutation(5)

    for ( var i = 0 ; i < 5000 ; i++ ){
      set_rnd();

      for(y = 0; y < 36; y++) {
        check_ans(y,arr[y][0],arr[y][1],arr[y][2],arr[y][3],arr[y][4]);
      }
    }


    var nn= new Array(11);
    for(var s = 0; s < 11; s++) {
      nn[s] = 0
    }
    for(var m = 0; m < 10;  m++) {
      for(s = 0; s < 36; s++) {
        if(nn[m] < count[s][m]){nn[m] = count[s][m]}
      }
    }

    var show_yaku_view = "";

    $.each(labels, function(index, value) {
      show_yaku_view += yaku_line(value,nn[index])
    });

    $(".yaku").html("");
    $(".yaku").html(show_yaku_view);

  }


  function set_rnd(){
    for ( var i = 1 ; i <=7  ; i++ ){
      if (bahuda[i] == undefined){
        rand_bahuda[i] = Math.floor( Math.random() * 13 ) + 1;
        var sutu = Math.floor( Math.random() * 4 ) + 1;
        if( sutu == 1 ){
          rand_bahuda_mark[i] = "s"
        };
        if( sutu == 2 ){
          rand_bahuda_mark[i] = "h"
        };
        if( sutu == 3 ){
          rand_bahuda_mark[i] = "c"
        };
        if( sutu == 4 ){
          rand_bahuda_mark[i] = "d"
        };
      }else{
        rand_bahuda[i] = bahuda[i]
        rand_bahuda_mark[i] = bahuda_mark[i]
      }
    }
  }

  function check_ans(n,a1,a2,a3,a4,a5){

    var nms = [];
    var mrs = [];
    var add_f = false;


    nms.push(rand_bahuda[a1])
    nms.push(rand_bahuda[a2])
    nms.push(rand_bahuda[a3])
    nms.push(rand_bahuda[a4])
    nms.push(rand_bahuda[a5])

    mrs.push(rand_bahuda_mark[a1])
    mrs.push(rand_bahuda_mark[a2])
    mrs.push(rand_bahuda_mark[a3])
    mrs.push(rand_bahuda_mark[a4])
    mrs.push(rand_bahuda_mark[a5])

    var cc = {};
    for (var i = 0; i < mrs.length; i++) {
      var num = mrs[i];
      cc[num] = cc[num] ? cc[num] + 1 : 1;
    }


    var nmc = {};
    for (var i = 0; i < nms.length; i++) {
      var num = nms[i];
      nmc[num] = nmc[num] ? nmc[num] + 1 : 1;
    }



    //ロイヤルフラッシュ0

    if (nms.indexOf(10) >= 1 &&
      nms.indexOf(11) >= 1 &&
      nms.indexOf(12) >= 1 &&
      nms.indexOf(13) >= 1 &&
      nms.indexOf(1) >= 1
    ){
      if(cc["s"] == 5 ||
      cc["h"] == 5 ||
      cc["c"] == 5 ||
      cc["d"] == 5 ){
        if(add_f == false){count[n][0]++;add_f = true;}
      }
    }

    add_f = false;
    //ストレートフラッシュ1
    for ( var i = 1 ; i <= 10 ; i++ ){
        if (i == 10){
          if (nmc[i] >= 1 &&
          nmc[i+1] >= 1 &&
          nmc[i+2] >= 1 &&
          nmc[i+3] >= 1 &&
          nmc[1] >= 1
        ){
          if(cc["s"] == 5 ||
          cc["h"] == 5 ||
          cc["c"] == 5 ||
          cc["d"] == 5 ){
            if(add_f == false){count[n][1]++;add_f = true;}

          }
        }

      }else{
        if (nmc[i] >= 1 &&
        nmc[i+1] >= 1 &&
        nmc[i+2] >= 1 &&
        nmc[i+3] >= 1 &&
        nmc[i+4] >= 1
      ){
        if(cc["s"] == 5 ||
        cc["h"] == 5 ||
        cc["c"] == 5 ||
        cc["d"] == 5 ){
          if(add_f == false){count[n][1]++;add_f = true;}

        }
      }
    }
  }

  add_f = false;
  //4カード2
  for ( var i = 1 ; i <= 13 ; i++ ){
    if (nmc[i] == 4){
    if(add_f == false){count[n][2]++;add_f = true;}

    }
  }

add_f = false;
//フルハウス3
  for ( var i = 1 ; i <= 13 ; i++ ){
    if (nmc[i] == 3){
      for ( var x = 1 ; x <= 13 ; x++ ){
        if (nmc[x] == 2){
          if(add_f == false){count[n][3]++;add_f = true;}
        }
      }
    }
  }

add_f = false;
//フラッシュ4

if(cc["s"] == 5 ||
cc["h"] == 5 ||
cc["c"] == 5 ||
cc["d"] == 5 ){
  if(add_f == false){count[n][4]++;add_f = true;}

}


add_f = false;
//ストレート5
for ( var i = 1 ; i <= 10 ; i++ ){
  if (i == 10){
      if (nmc[i] >= 1 &&
      nmc[i+1] >= 1 &&
      nmc[i+2] >= 1 &&
      nmc[i+3] >= 1 &&
      nmc[1] >= 1
    ){
      if(add_f == false){count[n][5]++;add_f = true;}
    }
  }
  else{
    if (nmc[i] >= 1 &&
    nmc[i+1] >= 1 &&
    nmc[i+2] >= 1 &&
    nmc[i+3] >= 1 &&
    nmc[i+4] >= 1
    ){
      if(add_f == false){count[n][5]++;add_f = true;}
    }
  }


}


add_f = false;
//3カード6
for ( var i = 1 ; i <= 13 ; i++ ){
  if (nmc[i] == 3){
    if(add_f == false){count[n][6]++;add_f = true;}

  }
}

add_f = false;
//2ペア7
for ( var i = 1 ; i <= 13 ; i++ ){
  if (nmc[i] == 2){
    for ( var x = 1 ; x <= 13 ; x++ ){
      if (nmc[i] == 2 && i == x){
        if(add_f == false){count[n][7]++;add_f = true;}
      }
    }
  }
}

add_f = false;
//1ペア8
for ( var i = 1 ; i <= 13 ; i++ ){
  if (nmc[i] == 2 || nmc[i] == 3 || nmc[i] == 4 || nmc[i] == 5){
    if(add_f == false){count[n][8]++;add_f = true;}
  }
}

add_f = false;
if(add_f == false){count[n][9]++;add_f = true;}


}

var generatePermutation = function(perm, pre, post, n) {
    var elem, i, rest, len;
    if (n > 0)
      for (i = 0, len = post.length; i < len; ++i) {
        rest = post.slice(0);
        elem = rest.splice(i, 1);
        generatePermutation(perm, pre.concat(elem), rest, n - 1);
      }
    else
      perm.push(pre);
  };

  /*
  extend Array.prototype
  e.g. [0, 1, 2].permutation(2)
  => [[0, 1], [0, 2], [1, 0], [1, 2], [2, 0], [2, 1]]
  */
  Array.prototype.permutation = function(n) {
    if (n == null) n = this.length;
    var perm = [];
    generatePermutation(perm, [], this, n);
    return perm;
  };









});
