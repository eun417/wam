/*회원 목록 조회*/
function loadMemberList(pageNo) {
    api.get('/admin/member', {
        params: {
            pageNo: pageNo
        }
    }).then(function(response) {
        const memberList = response.data.content;
        const tableBody = document.querySelector('#memberTableBody');

        //DocumentFragment 생성
        const fragment = document.createDocumentFragment();

        memberList.forEach(function(member) {
            let row = `<tr>
                        <td>${member.memberId}</td>
                        <td>${member.name == null ? '(알 수 없음)' : member.name}</td>
                        <td>${member.email}</td>
                        <td>${member.nickname}</td>
                        <td>${member.createDate}</td>
                        <td><button class="answer-btn btn btn-s bc3" style="cursor: default;">${member.authority == 'ROLE_ADMIN' ? '관리자' : (member.authority == 'ROLE_USER' ? '사용자' : '임시회원')}</button></td>
                        <td><button class="deleteMember-btn btn-s bc6">회원 탈퇴</button></td>
                    </tr>`;
            let tr = document.createElement('tr');
            tr.innerHTML = row;

            fragment.appendChild(tr);
        });

        //테이블 내용을 한 번에 추가
        tableBody.innerHTML = '';
        tableBody.appendChild(fragment);

        //페이지 내비게이션 업데이트
        renderPagination('Member', response.data.totalPages, pageNo);

        //회원 탈퇴 버튼에 이벤트 리스너 추가
        tableBody.querySelectorAll('.deleteMember-btn').forEach(function(button) {
            button.addEventListener('click', function() {
                const memberId = this.parentNode.parentNode.firstElementChild.textContent;
//                console.log(memberId);

                if (confirm("회원을 탈퇴시키겠습니까?")) {
                    //사용자가 확인을 누르면 회원 탈퇴 요청
                    api.delete('/admin/member/' + memberId)
                        .then(function(response) {
                            button.parentNode.parentNode.remove();  //테이블에서 해당 행 제거
                            alert(response.data);
                        })
                        .catch(function(error) {
                            console.error(error);
                            alert(error.response.data.message);
                        });
                }
            });
        });
    })
    .catch(function(error) {
        console.error(error);
    });
}

/*후원 목록 조회*/
function loadSupportList(pageNo) {
    api.get('/admin/support', {
        params: {
            pageNo: pageNo
        }
    }).then(function(response) {
        const supportList = response.data.content;
        const tableBody = document.querySelector('#supportTableBody');

        //DocumentFragment 생성
        const fragment = document.createDocumentFragment();

        supportList.forEach(function(support) {
            let row = `<tr>
                        <td>${support.supportId}</td>
                        <td><a href="/support/detail/${support.supportId}" class="donation-title title-hover">${support.title}</a></td>
                        <td>${support.nickname}</td>
                        <td>${support.goalAmount}</td>
                        <td>${support.supportAmount}</td>
                        <td>${support.createDate}</td>
                        <td><button class="deleteSupport-btn btn-s bc6">삭제</button></td>
                    </tr>`;
            let tr = document.createElement('tr');
            tr.innerHTML = row;

            fragment.appendChild(tr);
        });

        //테이블 내용을 한 번에 추가
        tableBody.innerHTML = '';
        tableBody.appendChild(fragment);

        //페이지 내비게이션 업데이트
        renderPagination('Support', response.data.totalPages, pageNo);

        //삭제 버튼에 이벤트 리스너 추가
        tableBody.querySelectorAll('.deleteSupport-btn').forEach(function(button) {
            button.addEventListener('click', function() {
                let supportId = this.parentNode.parentNode.firstElementChild.textContent;
                console.log(supportId);

                if (confirm("후원을 삭제하시겠습니까?")) {
                    //사용자가 확인을 누르면 후원 삭제 요청
                    api.delete('/admin/support/' + supportId)
                        .then(function(response) {
                            button.parentNode.parentNode.remove();  //테이블에서 해당 행 제거
                            alert(response.data);
                        })
                        .catch(function(error) {
                            console.error(error);
                            alert(error.response.data.message);
                        });
                }
            });
        });
    })
    .catch(function(error) {
        console.error(error);
    });
}

/*QnA 목록 조회*/
function loadQnaList(pageNo) {
    api.get('/admin/qna', {
        params: {
            pageNo: pageNo
        }
    }).then(function(response) {
        const qnaList = response.data.content;
        const tableBody = document.querySelector('#qnaTableBody');

        //DocumentFragment 생성
        const fragment = document.createDocumentFragment();

        qnaList.forEach(function(qna) {
            let row = `<tr>
                        <td>${qna.qnaId}</td>
                        <td><a href="/qna/detail/${qna.qnaId}" class="title-hover">${qna.title}</a></td>
                        <td>${qna.nickname}</td>
                        <td>${qna.createDate}</td>
                        <td>${qna.viewCount}</td>
                        <td><button class="answer-btn btn btn-s ${qna.qnaCheck === 'CHECKING' ? 'bc3' : 'bc7'}" style="cursor: default;">${qna.qnaCheck === 'CHECKING' ? '확인 중' : '답변 완료'}</button></td>
                        <td><button class="deleteQna-btn btn-s bc6">삭제</button></td>
                    </tr>`;
            let tr = document.createElement('tr');
            tr.innerHTML = row;

            fragment.appendChild(tr);
        });

        //테이블 내용을 한 번에 추가
        tableBody.innerHTML = '';
        tableBody.appendChild(fragment);

        //페이지 내비게이션 업데이트
        renderPagination('Qna', response.data.totalPages, pageNo);

        //삭제 버튼에 이벤트 리스너 추가
        tableBody.querySelectorAll('.deleteQna-btn').forEach(function(button) {
            button.addEventListener('click', function() {
                const qnaId = this.parentNode.parentNode.firstElementChild.textContent;
//                console.log(qnaId);

                if (confirm("QnA를 삭제하시겠습니까?")) {
                    //사용자가 확인을 누르면 QnA 삭제 요청
                    api.delete('/admin/qna/' + qnaId)
                        .then(function(response) {
                            button.parentNode.parentNode.remove();  //테이블에서 해당 행 제거
                            alert(response.data);
                        })
                        .catch(function(error) {
                            console.error(error);
                            alert(error.response.data.message);
                        });
                }
            });
        });
    })
    .catch(function(error) {
        console.error(error);
    });
}