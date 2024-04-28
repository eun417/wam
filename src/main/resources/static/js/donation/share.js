const supportId = document.getElementById('supportId').value;

function shareTwitter() {
    var sendText = "WAM - 야생동물후원사이트"; // 전달할 텍스트
    var sendUrl = "http://ec2-15-165-6-171.ap-northeast-2.compute.amazonaws.com:8081/support/detail/"+supportId; // 전달할 URL
    window.open("https://twitter.com/intent/tweet?text=" + sendText + "&url=" + sendUrl);
}

function shareFacebook() {
    var sendUrl = "http://ec2-15-165-6-171.ap-northeast-2.compute.amazonaws.com:8081/support/detail/"+supportId; // 전달할 URL
    window.open("http://www.facebook.com/sharer/sharer.php?u=" + sendUrl);
}

function shareKakao() {
  //사용할 앱의 JavaScript 키 설정
  var jsKey = document.getElementById('jsKey').getAttribute('href');
  Kakao.init(jsKey);

  //카카오링크 버튼 생성
  Kakao.Link.createDefaultButton({
    container: '#btnKakao', // 카카오 공유 버튼 ID
    objectType: 'feed',
    content: {
      title: "WAM", // 보여질 제목
      description: "야생동물후원사이트", // 보여질 설명
      imageUrl: "https://cdn0.iconfinder.com/data/icons/christmas-time-02/91/Christmas_-_Celebrate_-_New_Year_28-512.png", // 콘텐츠 URL
      link: {
         mobileWebUrl: "http://ec2-15-165-6-171.ap-northeast-2.compute.amazonaws.com:8081/support/detail/"+supportId,
         webUrl: "http://ec2-15-165-6-171.ap-northeast-2.compute.amazonaws.com:8081/support/detail/"+supportId
      }
    }
  });
}

/*URL 복사*/
document.getElementById('urlLink').value = window.location.href;

const copyUrlLink = async () => {
    try {
        let urlLink = document.getElementById('urlLink').value;
        await navigator.clipboard.writeText(urlLink);
        alert("클립보드에 링크가 복사되었어요.");
    } catch (error) {
        console.log(error);
    }
};