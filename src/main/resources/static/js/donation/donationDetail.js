document.addEventListener('DOMContentLoaded', function() {
    loadSupportDetail();
});


/*후원 상세 조회*/
function loadSupportDetail() {
    const supportId = document.getElementById('supportId').value;
//    console.log('조회된 후원:' + supportId);

    const token = localStorage.getItem("accessToken");

    //좋아요 상태 확인
    if (token) {
        checkLikeStatus(supportId);
    }

    axios.get(`/support/${supportId}`)
        .then(function(response) {
            const supportDetail = response.data;

            document.title = supportDetail.title;   //페이지 제목 설정

            document.querySelector('#supportId').value = supportId;
            document.querySelector('.donation-title').textContent = supportDetail.title;
            var donationStatusElement = document.querySelector('.donation-status');
            if (supportDetail.supportStatus === 'ENDING_SOON') {
                donationStatusElement.classList.add('ending-soon');
                donationStatusElement.textContent = '종료 임박';
            } else if (supportDetail.supportStatus === 'END') {
                disablePaymentBtn();    //후원하기(결제) 버튼 막기
                donationStatusElement.classList.add('end');
                donationStatusElement.textContent = '후원 종료';
            }
            document.querySelector('.donation-img img').src = supportDetail.firstImg;
            document.querySelector('.start-date').textContent = supportDetail.startDate;
            document.querySelector('.end-date').textContent = supportDetail.endDate;
            const animalSubjects = supportDetail.animalSubjects;
            document.querySelector('.tag-name').setAttribute('id', animalSubjects);
            const tagName = animalSubjects === 'mml' ? '포유류' :
                            animalSubjects === 'bird' ? '조류' :
                            animalSubjects === 'amnrp' ? '양서파충류' :
                            animalSubjects === 'fish' ? '어류' :
                            animalSubjects === 'etc' ? 'etc' : '';
            document.querySelector('.tag-name').textContent = '#' + tagName;
            document.querySelector('.donation-amount span').textContent = supportDetail.supportAmount;
            document.querySelector('.goal-amount span').textContent = supportDetail.goalAmount;
            document.querySelector('.like-count').textContent = supportDetail.supportLike;
            document.querySelector('.content').innerHTML = supportDetail.content; //HTML로 렌더링
            document.querySelector('.comment-count').textContent = supportDetail.comments.length;

            //로그인 사용자에 따라 다른 버튼 보이기
            showUpDelBtnForWriter(token, supportDetail.memberId);

            //댓글 여부에 따라 댓글 보이기&숨기기
            if (supportDetail.commentCheck) {
                showHideElement('.detail-body-3');  //댓글 숨김
            }

            //댓글 리스트
            const commentList = document.querySelector('.comment-list');

            commentList.innerHTML = '';

            if (supportDetail.comments.length === 0) {
                const div = document.createElement('div');
                div.innerHTML = `<div class="no-result">
                                    <span class="info-icon material-symbols-outlined">info</span>
                                    <p class="info-memo">아직 댓글이 없습니다.</p>
                                </div>`;
                commentList.appendChild(div);
            } else {
                supportDetail.comments.forEach(function(comment) {
                    const commentBox = document.createElement('div');
                    commentBox.classList.add('commentBox');
                    commentBox.innerHTML = `
                        <div class="commentBox-R"><img src="https://cdn4.iconfinder.com/data/icons/christmas-special/512/renne.png" width="55" height="55"></div>
                        <div class="commentBox-L">
                            <div class="commentBox-LT">
                                <div class="edit-box">
                                    <input type="hidden" class="commentId" value="${comment.commentId}">
                                    <div class="delete-comment-btn">삭제하기</div>
                                </div>
                                <div class="commentBox-LTR comment-nickname">${comment.nickname}</div>
                                <div class="commentBox-LTL">
                                    <span class="material-symbols-outlined comment-edit">more_horiz</span>
                                </div>
                            </div>
                            <div class="commentBox-LM"><p class="comment-content">${comment.content}</p></div>
                            <div class="commentBox-LB"><span class="comment-date gray-text">${comment.createDate}</span></div>
                        </div>`;
                    commentList.appendChild(commentBox);

                    //각 댓글에 대한 이벤트 처리
                    commentBox.querySelector('.comment-edit').addEventListener('click', function() {
                        const editBox = this.closest('.commentBox-LT').querySelector('.edit-box');
                        //.edit-box 가 보이지 않는 경우 보이도록 함
                        //showHideElement(editBox);
                        if (editBox.style.display === 'none') {
                            editBox.style.display = 'block';
                        } else {
                            editBox.style.display = 'none';
                        }
                    });

                    if (isLoggedInMember(token, comment.memberId)) {
                        //삭제 버튼 보이기
                        commentBox.querySelector('.comment-edit').style.display = 'block';
                    }
                });
            }

            //댓글 삭제 함수 실행
            deleteComment();
        })
        .catch(function(error) {
            console.error(error);
        });
}

//"후원 종료" 상태인 후원의 결제 막는 함수
function disablePaymentBtn() {
    const paymentBtn = document.getElementById('paymentBtn');
    paymentBtn.disabled = true;
    paymentBtn.addEventListener('click', function() {
        alert('종료된 후원입니다');
    });
}


/*supportWrite 페이지 이동(update)*/
document.getElementById('updateDonationBtn').addEventListener('click', function() {
    const supportId = document.getElementById('supportId').value;
//    console.log('수정할 후원: ' + supportId);

    const token = localStorage.getItem("accessToken");

    if (!token) {
        alert('로그인 후 이용해주세요.');
        return;
    }

    //토큰이 있는 경우 페이지 이동
    window.location.href = "/support/update/" + supportId;
});


/*좋아요 상태에 따라 생성 or 삭제*/
document.getElementById('likeBtn').addEventListener('click', function() {
    const likeBtn = document.getElementById('likeBtn');
    const supportId = document.getElementById('supportId').value;

    if (likeBtn.classList.contains('liked')) {
        //이미 좋아요를 누름 -> 좋아요 취소
        deleteLike(supportId);

    } else {
        //좋아요를 누르지 않음 -> 좋아요 생성
        createLike(supportId);
    }
});

/*후원하기(결제) 클릭*/
document.getElementById('paymentBtn').addEventListener('click', function() {
    promptAmount();
});

/*댓글 작성 클릭*/
document.getElementById('createCommentBtn').addEventListener('click', function() {
    createComment();
});


/*후원 삭제*/
document.getElementById('deleteDonationBtn').addEventListener('click', function() {
    const supportId = document.getElementById('supportId').value;
//    console.log('삭제할 후원: ' + supportId);

    if (confirm("후원을 삭제하시겠습니까?")) {
        //사용자가 확인을 누르면 컨트롤러 호출
        api.delete(`/support/${supportId}`)
            .then(function(response) {
                console.log(response);
                alert(response.data);
                window.location.href = "/support/list";
            }).catch(function(error) {
                console.error(error);
                alert(error.response.data.message);
            });
    }
});



//요소를 보이게 하거나 숨기는 함수
function showHideElement(element) {
    let e = document.querySelector(element);
    if (e.style.display === 'none') {
        e.style.display = 'block';
    } else {
        e.style.display = 'none';
    }
}

//로그인 사용자가 작성자인지 확인, 수정&삭제 버튼 보이는 함수
function showUpDelBtnForWriter(token, memberId) {
    if (isLoggedInMember(token, memberId)) {
        showHideElement('.writer');
    }
}

function isLoggedInMember(token, memberId) {
    if (token) {
        //payload 에서 데이터 가져오기
        const payload = getPayloadData(token);
//        console.log('login memberId:' + payload.sub);
//        console.log('memberId:' + memberId);

        if (payload.sub == memberId) {
            return true;
        }
        return false;
    }
}