//HeaderコンポーネントはTweetコンポーネントの中で呼び出されている
var Header = React.createClass({
 render: function(){
   return (
     <header className="main-header">
       <h1 className="logo">tweets</h1>
     </header>
   );
  }
});

// React,render(
//   <Header/>,
//   document.getElementById()
// );

var TweetForm = React.createClass({
  render: function() {
    return(
      <div class="tweet-input">
        <textarea class="tweet-input__textarea" name="tweet" id="js-tweet-body" cols="30" rows="10" placeholder="いま何してる？"></textarea>
      </div>
    );
  }
});

var TweetList = React,createClass({
  render: function() {
    var rows = this.props.tweets.map(function(tweet){
      return (<Tweet tweet={tweet} key={tweet.uuid}></Tweet>);
      //<Tweetというタグで囲んでいるあたりXMLみたい
      //ここでTweetListからTweetにtweetという値を渡している
    }, this);
    //コンポーネント内で作り出された子要素にはkeyという値をそれぞれの子要素に持たせる必要がある
    //なぜならreactは前回表示された差分のみを再描画する習性を持つから。
    //uuidとは？誰でもいつでも作れるけど、作ったIDは世界中で重複しないようになっているID
    return (
      <div className="tweets">
        {rows}
      </div>
    );
  }
});

var FavoritedTweetList = React.createClass({
  render: function() {
  return(
    <div className="tweets">
        <Tweet />
      </div>
    );
  }
});

var Tweet = React.createClass({
  render: function() {
    return(
      <section class="tweet" data-uuid={{uuid}}>
        <div class="profile">
          <p class="user"><span class="user-icon lsf">user</span>名無しさん</p>
        </div>
        <p class="tweet__body">
          {this.props.tweet.body}
          //this.propsオブジェクト経由でパラメーターを参照できる
        </p>

        <a class="js-favorite favorite lsf-icon" title="star">お気に入り</a>
        <a class="js-destroy destroy lsf-icon" title="trash">削除</a>
      </section>
    );
  }
});




//TweetAppというコンポーネントの定義
//createClassによってコンポーネントを定義
//getInitialStateメソッドによってinitial stateを返す
//つまりコンポーネントを持っているstateを初期化する
//renderメソッドによってレンダリングするコンポーネントの要素を返す
//tweetsという配列は色々なコンポーネントで使用する値なので
//全てのコンポーネントの親であるTweetAppコンポーネントに初期値を設定する
var TweetApp = React.createClass({
  getInitialState: function(){
    return{
      tweets: [
        {body:"HelloWorld", isFavorited:true},
        {body:"helloReact", isFavorited:true}
      ]
    }
  }
  render: function() {
    return (
      <div className="main">
        <div className="container">
          <Header/>
          <TweetForm/>
          <TweetList tweet={this.state.tweets}/>
          //TweetAppの状態である配列tweetsをTweetListコンポーネントに渡す
          <ul className="filter__items">
             <li className='filter__item current'><a href="#/all">全てのツイート</a></li>
             <li className='filter__item'><a href="#/filter">お気に入り</a></li>
           </ul>
        </div>
      </div>
    );
  }
});

//TweetAppコンポーネントの呼び出し
//renderによってコンポーネントを呼び出すかつidを指定して呼び出す場所を決める
//index.htmlにidがtweet-containerの要素がある
React.render(
  <TweetApp/>,
  document.getElementById('tweet-container')
);
