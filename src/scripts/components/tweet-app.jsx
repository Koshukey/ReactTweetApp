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

  getInitialState: function() {
    return {
      body: ""
    };
  },

  _createTweet: function(e){
    if (e.keyCode === 13) {
      e.preventDefault()
      var newTweet = this.refs.inputTweet.getDOMNode().value;
      //getDOMNodeメソッドによってviewで入力された値を取得できる
      //refsは属性値？！
      //createTweetメソッドをTweetFormで呼び出す↓
      this.props.createTweet(newTweet);
      this.setState({
      //setStateはReactのメソッド,コンポーネントのstateを変化させる
      //エンターキーが押されるとthis.state.tweet.bodyの値が空になる
        body: ""
      });
    }
  },

  _onChange: function(e){
    this.setState({
      body: e.target.value
      //this.stateの値を入力欄に文字が打ち込まれるたびに変更する
    });
  },

  render: function(){
    return (
      <div className="tweet-input">
        <textarea className="tweet-input__textarea" ref="inputTweet" value={this.state.body} cols="30" rows="10" placeholder="いま何してる？" onChange={this._onChange} onKeyDown={this._createTweet}></textarea>
      </div>
    );
  }
});

var TweetList = React.createClass({
  render: function(){
    var rows = this.props.tweets.map(function(tweet){
      return (<Tweet tweet={tweet} key={tweet.uuid} deleteTweet={this.props.deleteTweet} switchFav={this.props.switchFav}></Tweet>);
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
  render: function(){
    var rows = this.props.tweets.filter(function(tweet) {
      //jsのfilterメソッドで選別する
      return tweet.isFavorited;
    }).map(function(tweet, i){
      return (<Tweet tweet={tweet} key ={i} deleteTweet={this.props.deleteTweet} switchFav={this.props.switchFav}></Tweet>);
    }, this);
      return (
      <div className="tweets">
        {rows}
      </div>
    )
  }
});

var Tweet = React.createClass({

  _deleteTweet: function(uuid){
    this.props.deleteTweet(uuid);
  },

  _switchFav: function(uuid){
    this.props.switchFav(uuid);
  },

  render: function() {
    var tweet = this.props.tweet;
    var uuid = tweet.uuid;
    return (
      <section className="tweet">
        <div className="profile">
          <p className="user"><span className="user-icon lsf">user</span>名無しさん</p>
        </div>
        <p className="tweet__body">
          {tweet.body}
        </p>
        {(() =>
          { if (tweet.isFavorited == false) {
              return <a className="js-favorite favorite lsf-icon" title="star" onClick={this._switchFav.bind(this, uuid)}>お気に入り</a>;
            } else {
              return <a className="js-favorite favorite lsf-icon" title="star" onClick={this._switchFav.bind(this, uuid)}>お気に入りを解除</a>;
            }
          }
        )()}
        <a className="lsf-icon" title="trash" onClick={this._deleteTweet.bind(this, uuid)}>
          ツイートを削除
        </a>
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

  getInitialState: function() {
      return {
        tweets: [],
        page: 'all',
        //pageというstateとその初期値allを設定
      };
  },

  uuid: function () {
  //uuidを生成するためのメソッド
    var i, random;
    //ここではiとrandomを変数として使うとしか宣言していない
    var uuid = '';

    for (i = -50; i < 32; i++) {
      random = Math.random() * -34 | 0;
      if (i === -42 || i === 12 || i === 16 || i === 20) {
        uuid += '-';
      }
      uuid += (i === -38 ? 4 : (i === 16 ? (random & 3 | 8) : random)).toString(16);
    }

    return uuid;
  },

  createTweet: function(newTweet){
    this.state.tweets.unshift({body:newTweet, isFavorited:false, uuid:this.uuid()})
    //bodyプロパティがnewTweetというviewで入力された値、isFavoritedプロパティがfalseのtweetを
    //追加するよう指定している
    //unshiftメソッドとは  jsのメソッッド　一つかそれ以上の要素を配列の一番最初に追加し
    //新しい長さの配列を返す
    this.setState({
      tweets: this.state.tweets
    })
  },

  deleteTweet: function(uuid){
    this.state.tweets.splice(this.tweetIndexByUuid(uuid), 1);
    this.setState({
      tweets: this.state.tweets
    });
  },

  switchFav: function(uuid){
    var targetTweet = this.state.tweets[this.tweetIndexByUuid(uuid)];
    //特定のuuidをもつtweetを配列から検索して取り出す
    targetTweet.isFavorited = !targetTweet.isFavorited;
      //isFavoritedの値をtrueならfalseにfalseならtrueに切り替える
    this.setState({
      tweets: this.state.tweets
    });
  },

  tweetIndexByUuid: function(uuid) {
    var i = this.state.tweets.length
    //tweetsはTweetAppコンポーネントのプロパティであるためこのように呼び出せる
    while (i--) {
      if (this.state.tweets[i].uuid === uuid) {
        return i;
      }
    }
  },

  componentWillMount: function() {
  //componentWillMountメソッドはreactのメソッド
    var setAllPage = function() {
        this.setState({ page: 'all'});
      }.bind(this);
    var setFavoritedPage = function() {
        this.setState({ page: 'filter' });
      }.bind(this);
    new Router({
      '/all': setAllPage,
      '/filter': setFavoritedPage,
    }).init();
  },

  render: function(){
    var page = this.state.page === 'all' ?
      <TweetList tweets={this.state.tweets} deleteTweet={this.deleteTweet} switchFav={this.switchFav}/> :
      <FavoritedTweetList tweets={this.state.tweets} deleteTweet={this.deleteTweet} switchFav={this.switchFav}/>
        //TweetコンポーネントはTweetAppからみて孫コンポーネントとなる
        //deleteTWeetメソッドをTweetListコンポーネントに渡す

    return (
      <div className="main">
        <div className="container">
          <Header />
          <TweetForm createTweet={this.createTweet}/>
            {page}
          <ul className="filter__items">
            <li className={this.state.page == 'all' ? 'filter__item current' : 'filter__item'}><a href="#/all">全てのツイート</a></li>
            <li className={this.state.page == 'filter' ? 'filter__item current' : 'filter__item'}><a href="#/filter">お気に入り</a></li>
          </ul>
        </div>
      </div>
    );
  }
});

React.render(
  <TweetApp/>,
  document.getElementById('tweet-container')
);
