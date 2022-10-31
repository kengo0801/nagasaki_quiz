// 定数の宣言
const $mask = document.querySelector('.mask');
const $mask_btn = document.querySelector('.mask_btn');
const $screen_tytle = document.querySelector('.screen_tytle');
const $screen_subtytle = document.querySelector('.screen_subtytle');
const $screen_sentence = document.querySelector('.screen_sentence');
const $img_off = document.querySelector('.img_off');
const $red_btn = document.querySelector('.red_btn');
const $blue_btn = document.querySelector('.blue_btn');
const $circle = document.querySelector('.circle');
const $batsu1 = document.querySelector('.batsu1');
const $batsu2 = document.querySelector('.batsu2');
const $style_follow_chiico_btn = document.querySelector('.style_follow_chiico_btn');
const $style_follow_tano_btn = document.querySelector('.style_follow_tano_btn');
const $style_tweet_btn = document.querySelector('.style_tweet_btn');
const $tweet_btn = document.querySelector('.tweet_btn')

// ページが読み込まれたときの説明画面
window.addEventListener('load',() => {    
    mask_off();
    $style_follow_chiico_btn.classList.remove('off')
    $screen_tytle.textContent = 'chiico長崎の話'
    $screen_subtytle.textContent = 'chiicoの長崎クイズへようこそ。'
    $screen_sentence.textContent = '長崎にまつわる簡単な◯✕クイズが5問出題されます。間違えると即ゲームオーバー。全問正解後のタイムを競います。心の準備ができたらスタートを押してください。'
    $mask_btn.textContent = 'スタート'

    $mask_btn.addEventListener('click',()=> {
        timer_start();
        $style_follow_chiico_btn.classList.add('off')
        $mask.classList.add('off')
        $screen_tytle.classList.add('off')
        $screen_subtytle.classList.add('off')
        $screen_sentence.classList.add('off')
        $img_off.classList.remove('img_off')  
    });
});

// マスク非表示
const mask_off = ()=> {
    $mask.classList.remove('off')
    $screen_tytle.classList.remove('off')
    $screen_subtytle.classList.remove('off')
    $screen_sentence.classList.remove('off')
};

// 丸かバツか
const quiz_lot_RorB = ()=> {
    let quiz_lot_RorB_min = 1 ;
    let quiz_lot_RorB_max = 2 ;
    return Math.floor( Math.random() * (quiz_lot_RorB_max + 1 - quiz_lot_RorB_min) ) + quiz_lot_RorB_min ;
};

// 何番の問題か
const quiz_lot_no = () => {
    let quiz_lot_no_min = 1 ;
    let quiz_lot_no_max = 25 ;
    return Math.floor( Math.random() * (quiz_lot_no_max + 1 - quiz_lot_no_min) ) + quiz_lot_no_min ;
};

// クイズ画像を設定
const quiz_set = () =>{
const quiz_lot_RorB_rslt = quiz_lot_RorB();
const quiz_lot_no_rslt = quiz_lot_no();
const quiz_lot_rslt = "" + quiz_lot_RorB_rslt + quiz_lot_no_rslt ;
document.getElementById('js_quiz_img').innerHTML = '<img src="img/' + quiz_lot_rslt + '.png" class="screen_img" id="js_quiz_img">'
return [quiz_lot_RorB_rslt,quiz_lot_no_rslt]
};
let quiz_set_index = quiz_set();

// ボタンを押したとき
$red_btn.onclick = ()=> {
    judge(1);
};
$blue_btn.onclick = ()=> {
    judge(2);
};

let quiz_counter_index = 0;

// 正誤判定
const judge = (ans_index)=> {
    if(ans_index === quiz_set_index[0]){
        $circle.classList.remove('off');
        window.setTimeout(()=>{
            $circle.classList.add('off');
        },500)
        if(quiz_counter_index === 4){
            quiz_clear();
        };
        quiz_right();
    }else{
        $batsu1.classList.remove('off');
        $batsu2.classList.remove('off');
        window.setTimeout(()=>{
            $batsu1.classList.add('off');
            $batsu2.classList.add('off');
        },500)
        quiz_wrong();
    };
};

// 正解したとき
const quiz_right = ()=> {
        quiz_set();
        quiz_set_index = quiz_set(); 
        quiz_counter_index++;
};

// 間違えたとき
const quiz_wrong = () =>{
    timer_stop();
    window.setTimeout(()=>{
        document.getElementById('js_quiz_img').innerHTML = '<img src="img/' + "3" + quiz_set_index[1]  + '.png" class="screen_img" id="js_quiz_img">';
        $mask.classList.remove('off')
        $mask_btn.textContent = '次へ'

        $mask_btn.addEventListener('click',()=>{
            timer_reset();
            mask_off();
            $style_follow_tano_btn.classList.remove('off')
            $img_off.classList.add('img_off')
            $screen_tytle.textContent = '失敗'
            $screen_subtytle.textContent = '残念！失敗です。ぜひ再挑戦してくださいね。'
            $screen_sentence.textContent = 'このゲームはchiicoが企画制作しました。Twitterで長崎のことを日々つぶやいています。良かったらフォローよろしくお願いします。'
            $mask_btn.textContent = 'スタート'

                $mask_btn.addEventListener('click',()=>{
                    $style_follow_tano_btn.classList.add('off')
                    restart();
                 });
        });

    },1000)
};

// クリア画面
const quiz_clear = () =>{
    timer_stop();
    console.log(timer_stop())
    $style_follow_chiico_btn.classList.remove('off')
    $img_off.classList.add('img_off')
    $mask.classList.remove('off')
    $screen_tytle.classList.remove('off')
    $screen_subtytle.classList.remove('off')
    $screen_sentence.classList.remove('off')
    $screen_tytle.textContent = 'クリア'
    $screen_subtytle.textContent = 'おめでとうございます！全問正解です！'
    $screen_sentence.textContent = 'このゲームはchiicoが企画制作しました。Twitterで長崎のことを日々つぶやいています。良かったらフォローよろしくお願いします。'
    $mask_btn.textContent = '次へ'

    $mask_btn.addEventListener('click',()=>{
        console.log(timer_stop())
        $style_tweet_btn.classList.remove('off');
        $style_follow_chiico_btn.classList.add('off');
        $img_off.classList.add('img_off');
        $mask.classList.remove('off');
        $screen_tytle.classList.remove('off');
        $screen_subtytle.classList.remove('off');
        $screen_sentence.classList.remove('off');
        $screen_tytle.textContent = timer_stop()
        $screen_subtytle.textContent = 'タイムは'+ timer_stop() +'でした。';
        $screen_sentence.textContent = 'ボタンを押すと結果をツイートします。タイムをフォロワーと競いましょう！もう一度挑戦する場合は「スタート」を押してください。';
        $mask_btn.textContent = 'スタート';
            $mask_btn.addEventListener('click',()=>{
                $style_tweet_btn.classList.add('off')
                restart();
            });
    });
};

// リスタート
const restart = ()=> {
    timer_reset();
    timer_start();     
    quiz_set();
    quiz_set_index = quiz_set(); 
    $mask.classList.add('off')
    $screen_tytle.classList.add('off')
    $screen_subtytle.classList.add('off')
    $screen_sentence.classList.add('off')
    $img_off.classList.remove('img_off')
    quiz_counter_index=0;

};

// ツイートボタン
$tweet_btn.onclick = function() {
    let text = '私のタイムは' + timer_stop() + 'でした。みなさんもプレイしてみてください！'
    let hashtags = "chiicoの長崎クイズ";
    let url = encodeURIComponent('https://chiiconagasakiquiz.web.app/index.html') 
    window.open("https://twitter.com/share?text=" + text + "&hashtags=" + hashtags + "&url=" + url);
}

// タイマー
const $timer = document.querySelector('.timer');
let timer_set = 0;
let timer_id

// タイマースタート
const timer_start = ()=>  {
    timer_set++;

    let sec = Math.floor(timer_set/100);
    let mSec = timer_set % 100;

    if (sec < 10) sec = '0' + sec; 
    if (mSec < 10) mSec = '0' + mSec;

    $timer.innerHTML = sec + ':' + mSec;
    timer_id = setTimeout(timer_start, 10);
};


// タイマーストップ
const timer_stop = ()=> {    
    clearTimeout(timer_id);
    timer_rslt = $timer.innerHTML
    return timer_rslt
};


// タイマーリセット
const timer_reset = ()=> {
    clearTimeout(timer_id);
    timer_set = 0;
};