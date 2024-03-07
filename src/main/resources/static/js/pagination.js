// 페이지 내비게이션을 생성하는 함수
function generatePagination(object, totalPages, currentPage) {
    var pagination = '';
    var maxVisiblePages = 5; // 표시할 최대 페이지 번호 수
    var startPage = Math.max(0, currentPage - 2);
    var endPage = Math.min(totalPages - 1, startPage + maxVisiblePages - 1);

    // 이전 버튼 추가
    if (currentPage > 0) {
        pagination += '<a class="page-navi" onclick="navigatePage(\'' + object + '\', ' + (currentPage - 1) + ')"><span class="material-symbols-outlined arrow">arrow_back_ios</span></a> ';
    }

    // 페이지 번호 추가
    for (var i = startPage; i <= endPage; i++) {
        if (i === currentPage) {
            pagination += '<span class="page-navi page-num active">' + (i + 1) + '</span> ';
        } else {
            pagination += '<a class="page-navi page-num" onclick="navigatePage(\'' + object + '\', ' + i + ')">' + (i + 1) + '</a> ';
        }
    }

    // 다음 버튼 추가
    if (currentPage < totalPages - 1) {
        pagination += '<a class="page-navi" onclick="navigatePage(\'' + object + '\', ' + (currentPage + 1) + ')"><span class="material-symbols-outlined arrow">arrow_forward_ios</span></a>';
    }

    return pagination;
}

// 페이지 내비게이션을 HTML에 추가하는 함수
function renderPagination(object, totalPages, currentPage) {
    var paginationContainer = document.getElementById('pagination');

    // 전체 페이지 수가 0 이하인 경우 페이지 내비게이션을 생성하지 않음
    if (totalPages <= 0) {
        paginationContainer.innerHTML = '';
        return;
    }

    // 페이지 내비게이션을 생성
    var paginationHTML = generatePagination(object, totalPages, currentPage);

    // 페이지 내비게이션을 HTML에 추가
    paginationContainer.innerHTML = paginationHTML;
}

// 페이지 이동 함수
function navigatePage(object, page) {
    switch (object) {
        case 'Member':
            loadMemberList(page);
            break;
        case 'Support':
            loadSupportList(page);
            break;
        case 'Qna':
            loadQnaList(page);
            break;
        default:
            console.error('잘못된 객체: ' + object);
            break;
    }
}