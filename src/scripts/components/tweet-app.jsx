//HeaderコンポーネントはTweetコンポーネントの中で呼び出されている
var Header = React.createClass( {
  render: function() {
    return(
      <header class="main-header">
        <h1 class="logo">tweets</h1>
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
    return(
      <div className="tweets">
        <Tweet />
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
        <p class="tweet__body"></p>
        <a class="js-favorite favorite lsf-icon" title="star">お気に入り</a>
        <a class="js-destroy destroy lsf-icon" title="trash">削除</a>
      </section>
    );
  }
});




//TweetAppというコンポーネントの定義
//createClassによってコンポーネントを定義
var TweetApp = React.createClass({
  render: function() {
    return (
      <div className="main">
        <div className="container">
          <Header/>
          <TweetForm/>
          <TweetList/>
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
