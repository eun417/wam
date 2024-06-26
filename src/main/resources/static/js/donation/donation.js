//현재 페이지 번호
let pageNo = 1;

//무한 스크롤
window.addEventListener('scroll', onScroll);

function onScroll() {
    if (tagBool) {
        scrollList("loadTagList");
    } else {
        scrollList("loadSupportList");
    }
}

let isLoading = false; //데이터 요청 상태 추적

//무한 스크롤 함수
function scrollList(listName) {
    const scrollHeight = document.documentElement.scrollHeight; //문서의 총 높이
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop; //현재 스크롤 위치
    const clientHeight = document.documentElement.clientHeight; //현재 보이는 화면의 높이

    //스크롤이 페이지 하단에 도달했는지 확인
    //현재 스크롤 위치 + 화면 높이 = 현재 화면의 맨 아래 위치
    if (scrollTop + clientHeight >= scrollHeight - 10) {
        if (!isLoading) {
            isLoading = true; //데이터 요청 시작

            if (listName == "loadTagList") {
                //태그 클릭한 경우
                loadTagList(pageNo);
            } else {
                //추가 콘텐츠 로드
                loadSupportList(pageNo);
            }

            pageNo++;   //페이지 번호 증가
        }
    }
}


/*supportWrite 페이지 이동(create)*/
function goToSupportWrite(event) {
    event.preventDefault(); //기본 이벤트 실행 방지

    //로컬 스토리지에서 액세스 토큰 가져오기
    const token = localStorage.getItem('accessToken');

    if (!token) {
        alert('로그인 후 이용해주세요.');
        return;
    }

    //토큰이 있는 경우 페이지 이동
    window.location.href = "/support/write";
}


/*donationSearch 페이지 이동*/
document.getElementById('searchBtn').addEventListener('click', function() {
    let selectValue = document.querySelector('.select').value;
    let searchValue = document.querySelector('.search').value;
    if (searchValue.length < 2) {
        alert("검색어는 2글자 이상 입력해주세요.");
    } else {
        window.location.href = "/support/search?s=" + selectValue + "&q=" + searchValue;
    }
});

//Enter 하면 검색 버튼 클릭
function enterSearchBtn(event) {
    if (event.code === 'Enter') {
        event.preventDefault();
        document.getElementById('searchBtn').click();
    }
}