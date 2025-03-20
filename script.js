// script.js
// 로컬 스토리지에서 데이터 불러오기
let members = JSON.parse(localStorage.getItem('members')) || [];
let scores = JSON.parse(localStorage.getItem('scores')) || [];
let golfCourses = JSON.parse(localStorage.getItem('golfCourses')) || [];



/* 마이그레이션 : nickname 기존 객체에 추가 
// 기존 데이터가 문자열 배열인 경우, 객체 배열로 변환
if (members.length > 0 && !members[0].nickname) {
    members = members.map(member => ({
        ...member,
        nickname: '' // 기본값으로 빈 문자열 추가
    }));

    // 변환된 데이터를 로컬 스토리지에 저장
    localStorage.setItem('members', JSON.stringify(members));
    console.log('마이그레이션 완료: 회원 데이터에 닉네임 필드 추가됨');
} */


/* 마이그레이션 함수
function migrateGolfCourses(oldGolfCourses) {
    const newGolfCourses = [];

    // 골프장 이름을 기준으로 그룹화
    const courseMap = {};
    oldGolfCourses.forEach(course => {
        if (!courseMap[course.name]) {
            courseMap[course.name] = {
                name: course.name,
                teeBoxes: []
            };
        }
        courseMap[course.name].teeBoxes.push({
            gender: course.gender,
            teeBox: course.teeBox,
            courseRating: course.courseRating,
            slopeRating: course.slopeRating,
            par: course.par
        });
    });

    // 그룹화된 데이터를 배열로 변환
    for (const key in courseMap) {
        newGolfCourses.push(courseMap[key]);
    }

    return newGolfCourses;
}

// 마이그레이션 실행 (한 번만 실행)
const oldGolfCourses = JSON.parse(localStorage.getItem('golfCourses')) || [];
if (oldGolfCourses.length > 0 && !oldGolfCourses[0].teeBoxes) {
    const newGolfCourses = migrateGolfCourses(oldGolfCourses);
    localStorage.setItem('golfCourses', JSON.stringify(newGolfCourses));
    console.log('마이그레이션 완료: 골프장 데이터 구조 업데이트됨');
}

*/



// 일반 회원 및 관리자 로그인 정보
const userCredentials = {
    username: 'pagolsa',
    password: 'soixante12'
};

// Admin credentials
const adminCredentials = {
    username: 'admin',
    password: 'admin123' // 실제로는 해시된 비밀번호를 사용하세요
};


// 예시: 로그인 상태를 나타내는 변수 (실제로는 서버에서 로그인 상태를 확인해야 함)
/*
const isLoggedIn = true; // 로그인 상태일 경우 true, 로그아웃 상태일 경우 false

const logoutButton = document.getElementById('logoutButton');

if (isLoggedIn) {
    logoutButton.classList.remove('hidden'); // 로그인 상태일 때 버튼 표시
} else {
    logoutButton.classList.add('hidden'); // 로그아웃 상태일 때 버튼 숨김
}
*/

// 로그인 폼 제출 시
if (document.getElementById('loginForm')) {
    document.getElementById('loginForm').addEventListener('submit', function (event) {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // 일반 회원 로그인
        if (username === userCredentials.username && password === userCredentials.password) {
            sessionStorage.setItem('isUser', 'true');
            window.location.href = 'index.html'; // 일반 회원 로그인 후 메인 페이지로 이동
        }
        // 관리자 로그인
        else if (username === adminCredentials.username && password === adminCredentials.password) {
            sessionStorage.setItem('isAdmin', 'true');
            window.location.href = 'index.html'; // 관리자 로그인 후 메인 페이지로 이동
        } else {
            alert('아이디 또는 비밀번호가 잘못되었습니다.');
        }
    });
}

// 일반 회원 페이지 접근 권한 확인
function checkUserAccess() {
    const isUser = sessionStorage.getItem('isUser') === 'true';
    const isAdmin = sessionStorage.getItem('isAdmin') === 'true';
    if (!isUser && !isAdmin) {
        window.location.href = 'login.html'; // 로그인 페이지로 이동
    }
}

// 관리자 접근 권한 확인 함수
function checkAdminAccess() {
    const isAdmin = sessionStorage.getItem('isAdmin') === 'true';
    if (!isAdmin) {
        const userChoice = confirm('이 페이지는 관리자만 접근할 수 있습니다. 로그인하시겠습니까?');
        if (userChoice) {
            window.location.href = 'login.html'; // 로그인 페이지로 이동
        } else {
            window.location.href = 'index.html'; // 메인 페이지로 이동
        }
    }
}

/* 관리자 페이지 접근 권한 확인
function checkAdminAccess() {
    const isAdmin = sessionStorage.getItem('isAdmin') === 'true';
    if (!isAdmin) {
        alert('이 페이지는 관리자만 접근할 수 있습니다.');
        window.location.href = 'index.html'; // 관리자 권한이 없으면 메인 페이지로 이동
    }
} */

// 관리자 권한 확인 후 페이지 리디렉션
function checkAdminAccessAndRedirect(page) {
    const isAdmin = sessionStorage.getItem('isAdmin') === 'true';
    if (!isAdmin) {
        const userChoice = confirm('이 페이지는 관리자만 접근할 수 있습니다. 로그인하시겠습니까?');
        if (userChoice) {
            window.location.href = 'login.html'; // 로그인 페이지로 이동
        } else {
            window.location.href = 'index.html'; // 메인 페이지로 이동
        }
    } else {
        window.location.href = page; // 관리자 권한이 있으면 해당 페이지로 이동
    }
}

// 페이지별 접근 권한 확인
if (window.location.pathname.includes('login.html')) {
    // 로그인 페이지에서는 세션 스토리지 초기화
    sessionStorage.removeItem('isUser');
    sessionStorage.removeItem('isAdmin');
} else if (window.location.pathname.includes('member-management.html') ||
           window.location.pathname.includes('golf-course.html') ||
           window.location.pathname.includes('register-score.html') ||
           window.location.pathname.includes('analytics.html')) {
    checkAdminAccess(); // 관리자 페이지는 관리자만 접근 가능
} else {
    checkUserAccess(); // 일반 페이지는 로그인한 사용자만 접근 가능
}

// 로그아웃 버튼 이벤트 리스너
if (document.getElementById('logoutButton')) {
    document.getElementById('logoutButton').addEventListener('click', function () {
        alert('정상적으로 로그 아웃 되었습니다.');
        logout();
    });
}

// 로그아웃 기능
function logout() {
    sessionStorage.removeItem('isUser');
    sessionStorage.removeItem('isAdmin');
    window.location.href = 'index.html'; // 홈 페이지로 이동
}

// 로그아웃 버튼 이벤트 리스너
if (document.querySelector('button[onclick="logout()"]')) {
    document.querySelector('button[onclick="logout()"]').addEventListener('click', logout);
}

// 취소 버튼 클릭 시 홈 페이지로 이동
function cancelLogin() {
    window.location.href = 'index.html';
}


//
// 공통 데이터 초기화
//
function initializeCommonData() {
    if (!localStorage.getItem('members')) localStorage.setItem('members', JSON.stringify(members));
    if (!localStorage.getItem('scores')) localStorage.setItem('scores', JSON.stringify(scores));
    if (!localStorage.getItem('golfCourses')) localStorage.setItem('golfCourses', JSON.stringify(golfCourses));
}

// 페이지 로드 시 공통 데이터 초기화
initializeCommonData();




//
// member-management.html
// 회원 등록
//

// 회원 등록 폼 제출 시
if (document.getElementById('registerForm')) {
    document.getElementById('registerForm').addEventListener('submit', function (event) {
        event.preventDefault();

        const newName = document.getElementById('newName').value;
        const nickname = document.getElementById('nickName').value; 
        const memberGender = document.getElementById('memberGender').value;
        const baseHandicap = document.getElementById('baseHandicap').value;
        const memberSenior = document.getElementById('memberSenior').checked;
        const memberPhoto = document.getElementById('memberPhoto').files[0];

        // 사진을 Base64로 변환
        const reader = new FileReader();
        reader.onload = function (e) {
            const photoBase64 = e.target.result;

            // 회원 데이터 객체 생성
            const newMember = {
                name: newName,
                nickname: nickname,
                gender: memberGender,
                baseHandicap: baseHandicap ? parseFloat(baseHandicap) : null, // 기준 핸디캡 추가
                senior: memberSenior,
                photo: photoBase64 // 사진을 Base64로 저장
            };

            // 회원 목록에 추가
            //members.push(newMember);
            //localStorage.setItem('members', JSON.stringify(members)); // 회원 데이터 저장

            // Firestore에 회원 추가
            await addMemberToFirestore(newMember);

            // 회원 선택 목록 및 테이블 업데이트
            updateMemberSelect();
            updateMemberTable();

            // 폼 초기화
            document.getElementById('registerForm').reset();
        };

        if (memberPhoto) {
            reader.readAsDataURL(memberPhoto); // 사진을 Base64로 변환
        } else {
            // 사진이 없을 경우
            const newMember = {
                name: newName,
                nickname: nickname,
                gender: memberGender,
                baseHandicap: baseHandicap ? parseFloat(baseHandicap) : null, // 기준 핸디캡 추가
                senior: memberSenior,
                photo: null // 사진 없음
            };

            // 로컬 스토리지에 데이터 저장
            //members.push(newMember);
            //localStorage.setItem('members', JSON.stringify(members));

            // Firestore에 회원 추가
            await addMemberToFirestore(newMember);


            updateMemberSelect();
            updateMemberTable();
            document.getElementById('registerForm').reset();
        }
    });
}



// 회원 선택 목록 업데이트
function updateMemberSelect() {
    if (document.getElementById('scoreInputs')) {
        const scoreInputs = document.getElementById('scoreInputs');
        scoreInputs.innerHTML = '';

        // 회원 이름으로 오름차순 정렬
        const sortedMembers = members.slice().sort((a, b) => a.name.localeCompare(b.name));

        // 정렬된 회원 목록으로 카드 생성
        sortedMembers.forEach(member => {
            const memberCard = document.createElement('div');
            memberCard.className = 'member-card';

            // 회원 사진 (기본 이미지 또는 업로드된 이미지)
            const memberPhotoContainer = document.createElement('div');
            if (member.photo) {
                const memberPhoto = document.createElement('img');
                memberPhoto.src = member.photo;
                memberPhoto.alt = member.name;
                memberPhotoContainer.appendChild(memberPhoto);
            } else {
                // 기본 프로필 이미지 (인물 아이콘)
                const defaultProfile = document.createElement('div');
                defaultProfile.className = 'default-profile';
                const profileIcon = document.createElement('i');
                profileIcon.className = 'fas fa-user-astronaut'; // Font Awesome의 사용자 아이콘
                defaultProfile.appendChild(profileIcon);
                memberPhotoContainer.appendChild(defaultProfile);
            }

            // 회원 정보 컨테이너
            const memberInfo = document.createElement('div');
            memberInfo.className = 'member-info';

            // 회원 이름
            const memberName = document.createElement('h3');
            memberName.textContent = member.name;

            // Tee Box 선택 필드
            const teeBoxSelect = document.createElement('select');
            teeBoxSelect.id = `teeBox-${member.name}`;
            teeBoxSelect.dataset.member = member.name;
            teeBoxSelect.innerHTML = `
                <option value="Black">Black</option>
                <option value="White">White</option>
                <option value="Yellow">Yellow</option>
                <option value="Blue">Blue</option>
                <option value="Red">Red</option>
            `;

            // 회원 정보에 따라 Tee Box 기본값 설정
            if (member.senior) {
                teeBoxSelect.value = 'Blue'; // Senior인 경우 Blue
            } else if (member.gender === '여성') {
                teeBoxSelect.value = 'Red'; // 여성인 경우 Red
            } else {
                teeBoxSelect.value = 'Yellow'; // 남성인 경우 Yellow
            }

            // 점수 입력 필드
            const scoreInput = document.createElement('input');
            scoreInput.type = 'number';
            scoreInput.id = member.name;
            scoreInput.dataset.member = member.name;
            scoreInput.min = 60;
            scoreInput.max = 144;

            // 점수 입력 필드에 이벤트 리스너 등록
            scoreInput.addEventListener('input', checkScoreInputs);

            // 회원 정보 컨테이너에 이름, 성별, Senior 정보, 점수 입력 필드 추가
            memberInfo.appendChild(memberName);
            memberInfo.appendChild(teeBoxSelect);
            memberInfo.appendChild(scoreInput);

            // 회원 카드에 사진과 정보 컨테이너 추가
            memberCard.appendChild(memberPhotoContainer);
            memberCard.appendChild(memberInfo);

            // 회원 카드를 그리드에 추가
            scoreInputs.appendChild(memberCard);
        });

        // 점수 등록 버튼 상태 초기화
        checkScoreInputs();
    }
}


// 회원 정보 수정 기능
function editMember(index) {
    const member = members[index];

    // 폼에 기존 데이터 채우기
    document.getElementById('newName').value = member.name;
    document.getElementById('nickName').value = member.nickname;
    document.getElementById('memberGender').value = member.gender;
    document.getElementById('baseHandicap').value = member.baseHandicap; // baseHandicap 값 채우기
    document.getElementById('memberSenior').checked = member.senior;

    // 수정 모드 활성화
    const registerButton = document.querySelector('#registerForm button[type="submit"]');
    registerButton.textContent = '수정 완료';

    // 기존 이벤트 리스너 제거
    registerButton.replaceWith(registerButton.cloneNode(true)); // 버튼을 복제하여 기존 이벤트 리스너 제거
    const newRegisterButton = document.querySelector('#registerForm button[type="submit"]');

    // 새로운 이벤트 리스너 등록
    newRegisterButton.addEventListener('click', function (event) {
        event.preventDefault();

        // 수정된 데이터 저장
        const updatedName = document.getElementById('newName').value;
        const updatedNickName = document.getElementById('nickName').value;
        const updatedGender = document.getElementById('memberGender').value;
        const updatedBaseHandicap = document.getElementById('baseHandicap').value; // baseHandicap 값 가져오기
        const updatedSenior = document.getElementById('memberSenior').checked;
        const updatedPhoto = document.getElementById('memberPhoto').files[0];

        const reader = new FileReader();
        reader.onload = function (e) {
            const photoBase64 = e.target.result;

            // 회원 데이터 업데이트
            members[index] = {
                name: updatedName,
                nickname: updatedNickName,
                gender: updatedGender,
                baseHandicap: updatedBaseHandicap ? parseFloat(updatedBaseHandicap) : null, // baseHandicap 업데이트
                senior: updatedSenior,
                photo: photoBase64
            };

            // 로컬 스토리지에 저장
            localStorage.setItem('members', JSON.stringify(members));

            // 회원 선택 목록 및 테이블 업데이트
            updateMemberSelect();
            updateMemberTable();

            // 폼 초기화 및 등록 모드로 복귀
            document.getElementById('registerForm').reset();
            newRegisterButton.textContent = '회원 등록';

            // 이벤트 리스너 다시 등록
            newRegisterButton.removeEventListener('click', arguments.callee); // 현재 이벤트 리스너 제거
            newRegisterButton.addEventListener('click', registerMember); // 등록 모드로 복귀

            alert('회원 정보가 수정되었습니다.');
        };

        if (updatedPhoto) {
            reader.readAsDataURL(updatedPhoto);
        } else {
            // 사진이 없을 경우 기존 사진 유지
            members[index] = {
                name: updatedName,
                nickname: updatedNickName,
                gender: updatedGender,
                baseHandicap: updatedBaseHandicap ? parseFloat(updatedBaseHandicap) : null, // baseHandicap 업데이트
                senior: updatedSenior,
                photo: member.photo // 기존 사진 유지
            };

            // 로컬 스토리지에 저장
            localStorage.setItem('members', JSON.stringify(members));

            // 회원 선택 목록 및 테이블 업데이트
            updateMemberSelect();
            updateMemberTable();

            // 폼 초기화 및 등록 모드로 복귀
            document.getElementById('registerForm').reset();
            newRegisterButton.textContent = '회원 등록';

            // 이벤트 리스너 다시 등록
            newRegisterButton.removeEventListener('click', arguments.callee); // 현재 이벤트 리스너 제거
            newRegisterButton.addEventListener('click', registerMember); // 등록 모드로 복귀

            alert('회원 정보가 수정되었습니다.');
        }
    });
}

// 회원 등록 폼 제출 시 기본 동작
function registerMember(event) {
    event.preventDefault();

    const newName = document.getElementById('newName').value;
    const nickName = document.getElementById('nickName').value;
    const memberGender = document.getElementById('memberGender').value;
    const memberBaseHandicap = document.getElementById('baseHandicap').value;
    const memberSenior = document.getElementById('memberSenior').checked;
    const memberPhoto = document.getElementById('memberPhoto').files[0];

    const reader = new FileReader();
    reader.onload = function (e) {
        const photoBase64 = e.target.result;

        const newMember = {
            name: newName,
            nickname: nickName,
            gender: memberGender,
            baseHandicap: memberBaseHandicap,
            senior: memberSenior,
            photo: photoBase64
        };

        members.push(newMember);
        localStorage.setItem('members', JSON.stringify(members));
        updateMemberSelect();
        updateMemberTable();
        document.getElementById('registerForm').reset();
    };

    if (memberPhoto) {
        reader.readAsDataURL(memberPhoto);
    } else {
        const newMember = {
            name: newName,
            nickname: nickName,
            gender: memberGender,
            baseHandicap: memberBaseHandicap,
            senior: memberSenior,
            photo: null
        };

        members.push(newMember);
        localStorage.setItem('members', JSON.stringify(members));
        updateMemberSelect();
        updateMemberTable();
        document.getElementById('registerForm').reset();
    }
}

// 회원 목록 테이블
// function updateMemberTable() {
async function updateMemberTable() {
    if (document.getElementById('memberTable')) {
        // Firebase 에서 회원 목록 로딩
        const members = await loadMembersFromFirestore();

        const memberTableBody = document.getElementById('memberTable').getElementsByTagName('tbody')[0];
        memberTableBody.innerHTML = '';

        //console.log('회원 데이터:', members); // 디버깅용 로그

        members.forEach((member, index) => {
            const row = memberTableBody.insertRow();
            row.insertCell(0).textContent = member.name || '-'; // 이름이 없을 경우 대체 텍스트
            row.insertCell(1).textContent = member.nickname || '-'; // 이름이 없을 경우 대체 텍스트
            row.insertCell(2).textContent = member.gender || '-'; // 성별이 없을 경우 대체 텍스트
            row.insertCell(3).textContent = member.baseHandicap || '-'; // 기준핸디캡 없을 경우 대체 텍스트
            row.insertCell(4).textContent = member.senior ? 'Yes' : 'No'; // Senior 여부

            // 사진 표시
            const photoCell = row.insertCell(5);
            if (member.photo) {
                const img = document.createElement('img');
                img.src = member.photo;
                img.alt = member.name;
                img.style.width = '50px';
                img.style.height = '50px';
                img.style.borderRadius = '50%';
                photoCell.appendChild(img);
            } else {
                photoCell.textContent = '-';
            }

            // 수정 버튼
            const editCell = row.insertCell(6);
            const editButton = document.createElement('button');
            editButton.textContent = '수정';
            editButton.addEventListener('click', () => editMember(index));
            editCell.appendChild(editButton);

            // 삭제 버튼
            const deleteCell = row.insertCell(7);
            const deleteButton = document.createElement('button');
            deleteButton.textContent = '삭제';
            deleteButton.addEventListener('click', () => deleteMember(index));
            deleteCell.appendChild(deleteButton);
        });
    }
}

async function loadMembersFromFirestore() {
  try {
    const querySnapshot = await db.collection('members').get();
    const members = [];
    querySnapshot.forEach(doc => {
      members.push({ id: doc.id, ...doc.data() });
    });
    return members;
  } catch (error) {
    console.error('Firestore에서 회원 데이터 불러오기 중 오류 발생:', error);
    return [];
  }
}


// 회원 삭제 기능
function deleteMember(index) {
    const isConfirmed = confirm('정말로 이 회원을 삭제하시겠습니까?');
    if (isConfirmed) {
        members.splice(index, 1); // 해당 인덱스의 회원 삭제
        localStorage.setItem('members', JSON.stringify(members)); // 로컬 스토리지 업데이트

        // 회원 선택 목록 및 테이블 업데이트
        updateMemberSelect();
        updateMemberTable();
        alert('회원이 삭제되었습니다.');
    }
}



//
// golf-course.html
// 곺프장 등록
//

// 골프장 등록 폼 제출 시
if (document.getElementById('golfCourseForm')) {
    document.getElementById('golfCourseForm').addEventListener('submit', function (event) {
        event.preventDefault();

        const courseName = document.getElementById('courseName').value;
        const gender = document.getElementById('gender').value;
        const teeBox = document.getElementById('teeBox').value;
        const courseRatingInput = document.getElementById('courseRating');
        
        // 코스 레이팅 검증 (숫자 및 소수점 허용)
        const courseRating = parseFloat(courseRatingInput.value);
        if (isNaN(courseRating)) {
            alert('코스 레이팅은 숫자만 입력 가능합니다.');
            event.preventDefault(); // 폼 제출 방지
            courseRatingInput.focus(); // 입력 필드로 포커스 이동
        } else if (courseRating < 50 || courseRating > 100) {
            alert('코스 레이팅은 50에서 100 사이의 값이어야 합니다.');
            event.preventDefault(); // 폼 제출 방지
            courseRatingInput.focus(); // 입력 필드로 포커스 이동
        }

        const slopeRating = parseInt(document.getElementById('slopeRating').value, 10);
        const par = parseInt(document.getElementById('par').value, 10);
        let golfCourse = golfCourses.find(course => course.name === courseName);

        if (golfCourse) {

            // 동일한 gender와 teeBox가 이미 존재하는지 확인
            const isDuplicate = golfCourse.teeBoxes.some(t => 
                t.gender === gender && t.teeBox === teeBox
            );
            if (isDuplicate) {
                alert('이미 동일한 Gender와 티박스가 존재합니다. 다른 Gender/티박스를 선택하거나, 기존 골프장을 수정하세요.');
                return; // 중복된 경우 함수 종료
            }

            // 기존 골프장에 티박스 정보 추가
            golfCourse.teeBoxes.push({
                gender,
                teeBox,
                courseRating,
                slopeRating,
                par
            });
        } else {
            // 새로운 골프장 추가
            golfCourses.push({
                name: courseName,
                teeBoxes: [{
                    gender,
                    teeBox,
                    courseRating,
                    slopeRating,
                    par
                }]
            });
        }

        localStorage.setItem('golfCourses', JSON.stringify(golfCourses));

        // 폼 초기화 및 목록 업데이트
        document.getElementById('golfCourseForm').reset();
        updateGolfCourseTable();
        alert('골프장이 등록되었습니다.');
    });
}

// 골프장 목록 업데이트
function updateGolfCourseTable() {
    if (document.getElementById('golfCourseTable')) {
        const tableBody = document.getElementById('golfCourseTable').getElementsByTagName('tbody')[0];
        tableBody.innerHTML = '';

        golfCourses.forEach((course, index) => {
            // 각 골프장의 티박스 정보를 순회하며 테이블에 추가
            course.teeBoxes.forEach(teeBox => {
                const row = tableBody.insertRow();
                row.insertCell(0).textContent = course.name; // 골프장 이름
                row.insertCell(1).textContent = teeBox.gender || 'N/A'; // 성별 (없을 경우 N/A)
                row.insertCell(2).textContent = teeBox.teeBox; // 티박스
                row.insertCell(3).textContent = teeBox.courseRating; // 코스 레이팅
                row.insertCell(4).textContent = teeBox.slopeRating; // 슬로프 레이팅
                row.insertCell(5).textContent = teeBox.par; // 파(Par)

                // 수정 버튼
                const editCell = row.insertCell(6);
                const editButton = document.createElement('button');
                editButton.textContent = '수정';
                editButton.addEventListener('click', () => editGolfCourse(index, teeBox));
                editCell.appendChild(editButton);

                // 삭제 버튼
                const deleteCell = row.insertCell(7);
                const deleteButton = document.createElement('button');
                deleteButton.textContent = '삭제';
                deleteButton.addEventListener('click', () => deleteGolfCourse(index, teeBox));
                deleteCell.appendChild(deleteButton);
            });
        });
    }
}

// 골프장 목록을 이름으로 정렬하는 함수 (오름차순/내림차순 토글)
let ascending = true;

function sortGolfCoursesByName() {
    golfCourses.sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        return ascending ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
    });

    // 정렬된 골프장 목록을 테이블에 다시 렌더링
    updateGolfCourseTable();

    // 정렬 방향 토글
    ascending = !ascending;
}



// 골프장 수정 기능
function editGolfCourse(index, teeBox) {
    const course = golfCourses[index];

    // 폼에 기존 데이터 채우기
    document.getElementById('courseName').value = course.name;
    document.getElementById('gender').value = teeBox.gender || 'Male'; // 기본값 설정
    document.getElementById('teeBox').value = teeBox.teeBox;
    document.getElementById('courseRating').value = teeBox.courseRating;
    document.getElementById('slopeRating').value = teeBox.slopeRating;
    document.getElementById('par').value = teeBox.par;

    // 수정 모드 활성화
    document.getElementById('editCourseButton').disabled = false;
    document.getElementById('deleteCourseButton').disabled = false;

    // 수정 버튼 클릭 시
    document.getElementById('editCourseButton').onclick = function () {
        const updatedName = document.getElementById('courseName').value;
        const updatedGender = document.getElementById('gender').value;
        const updatedTeeBox = document.getElementById('teeBox').value;
        const updatedCourseRating = parseFloat(document.getElementById('courseRating').value);
        const updatedSlopeRating = parseInt(document.getElementById('slopeRating').value, 10);
        const updatedPar = parseInt(document.getElementById('par').value, 10);

        // 티박스 정보 업데이트
        teeBox.gender = updatedGender;
        teeBox.teeBox = updatedTeeBox;
        teeBox.courseRating = updatedCourseRating;
        teeBox.slopeRating = updatedSlopeRating;
        teeBox.par = updatedPar;

        // 로컬 스토리지에 저장
        localStorage.setItem('golfCourses', JSON.stringify(golfCourses));

        // 폼 초기화 및 목록 업데이트
        document.getElementById('golfCourseForm').reset();
        updateGolfCourseTable();
        alert('골프장 정보가 수정되었습니다.');
    };
}

// 골프장 삭제 기능
function deleteGolfCourse(index, teeBox) {
    const isConfirmed = confirm('정말로 이 티박스 정보를 삭제하시겠습니까?');
    if (isConfirmed) {
        const course = golfCourses[index];
        course.teeBoxes = course.teeBoxes.filter(t => t !== teeBox);

        // 티박스 정보가 모두 삭제된 경우 골프장도 삭제
        if (course.teeBoxes.length === 0) {
            golfCourses.splice(index, 1);
        }

        // 로컬 스토리지에 저장
        localStorage.setItem('golfCourses', JSON.stringify(golfCourses));
        updateGolfCourseTable();
        alert('티박스 정보가 삭제되었습니다.');
    }
}

// 
// CSV 골프장 데이터 파일 업로드
//

/*
let tempGolfData = []; // 임시로 저장할 점수 데이터

// CSV 파일 업로드 이벤트 리스너
if (document.getElementById('csvGolfFile')) {
    document.getElementById('csvGolfFile').addEventListener('change', function (event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const csvData = e.target.result;
                const parsedData = parseGolfCSV(csvData); // CSV 파일 파싱
                if (parsedData && parsedData.length > 0) {
                    tempGolfData = parsedData; // 임시로 데이터 저장
                    document.getElementById('csvGolfRegisterButton').disabled = false; // 등록 버튼 활성화
                    alert('CSV 파일이 성공적으로 업로드되었습니다. "골프장 데이터 등록" 버튼을 눌러 데이터를 등록하세요.');
                } else {
                    alert('CSV 파일에 유효한 데이터가 없습니다.');
                }
            };
            reader.onerror = function (e) {
                alert('CSV 파일을 읽는 중 오류가 발생했습니다.');
            };
            reader.readAsText(file);
        }
    });
}

// CSV 파일 파싱 함수
function parseGolfCSV(csvData) {
    const lines = csvData.split('\n').filter(line => line.trim() !== ''); // 빈 줄 제거
    if (lines.length < 2) return []; // 헤더와 최소 한 줄의 데이터가 없으면 빈 배열 반환

    const headers = lines[0].split(';').map(header => header.trim()); // 헤더 (Golf Course;Gender;TeeBox;Slope Rating;Course Rating;Par)
    const data = [];

    for (let i = 1; i < lines.length; i++) {
        const currentLine = lines[i].split(';');
        if (currentLine.length === headers.length) {
            const row = {
                golfCourse: currentLine[0].trim(), // 골프장 이름
                gender: currentLine[1].trim(), // 성별 (Male/Female)
                teeBox: currentLine[2].trim(), // 티박스 (Black, White, Yellow, Blue, Red)
                slopeRating: parseFloat(currentLine[3].trim()), // 슬로프 레이팅
                courseRating: parseFloat(currentLine[4].trim()), // 코스 레이팅
                par: parseInt(currentLine[5].trim(), 10) // 파(Par)
            };
            data.push(row);
        }
    }

    return data;
}

// 골프장 데이터 등록 버튼 클릭 이벤트 리스너
if (document.getElementById('csvGolfRegisterButton')) {
    document.getElementById('csvGolfRegisterButton').addEventListener('click', function () {
        if (tempGolfData && tempGolfData.length > 0) {
            addGolfCoursesFromCSV(tempGolfData); // CSV 데이터를 골프장 정보로 추가
            tempGolfData = []; // 임시 데이터 초기화
            document.getElementById('csvGolfRegisterButton').disabled = true; // 버튼 비활성화
            alert('골프장 데이터가 성공적으로 등록되었습니다.');
        } else {
            alert('업로드된 CSV 파일이 없습니다.');
        }
    });
}

// CSV 데이터를 골프장 정보로 추가하는 함수
function addGolfCoursesFromCSV(parsedData) {
    parsedData.forEach(row => {
        const { golfCourse, gender, teeBox, slopeRating, courseRating, par } = row;

        // 기존 골프장 확인
        let golfCourseObj = golfCourses.find(course => course.name === golfCourse);

        if (golfCourseObj) {
            // 동일한 gender와 teeBox가 이미 존재하는지 확인
            const isDuplicate = golfCourseObj.teeBoxes.some(t => 
                t.gender === gender && t.teeBox === teeBox
            );
            if (isDuplicate) {
                console.warn(`중복된 골프장 정보: ${golfCourse} (Gender: ${gender}, TeeBox: ${teeBox})`);
                return; // 중복된 경우 건너뜀
            }

            // 기존 골프장에 티박스 정보 추가
            golfCourseObj.teeBoxes.push({
                gender,
                teeBox,
                courseRating,
                slopeRating,
                par
            });
        } else {
            // 새로운 골프장 추가
            golfCourses.push({
                name: golfCourse,
                teeBoxes: [{
                    gender,
                    teeBox,
                    courseRating,
                    slopeRating,
                    par
                }]
            });
        }
    });

    // 로컬 스토리지에 저장
    localStorage.setItem('golfCourses', JSON.stringify(golfCourses));

    // 골프장 목록 테이블 업데이트
    updateGolfCourseTable();
}

*/


//
// register-score.html
// 경기 점수 등록
//


// 점수 등록 페이지에서 골프장 선택 목록 업데이트
function updateGolfCourseSelect() {
    if (document.getElementById('golfCourseSelect')) {
        const select = document.getElementById('golfCourseSelect');
        select.innerHTML = '<option value="">골프장을 선택하세요</option>';
        golfCourses.forEach(course => {
            const option = document.createElement('option');
            option.value = course.name;
            option.textContent = `${course.name}`;
            select.appendChild(option);
        });
    }
}


document.addEventListener('DOMContentLoaded', async function () {
    // 공통 초기화 로직
    updateMemberTable(); // 회원 목록 테이블 업데이트
}


document.addEventListener('DOMContentLoaded', function () {
    // 공통 초기화 로직
    initializeCommonData(); // 공통 데이터 초기화
    updateMemberSelect(); // 회원 목록 표시
    //updateMemberTable(); // 회원 목록 테이블 업데이트
    updateGolfCourseSelect(); // 골프장 선택 목록 업데이트
    sortGolfCoursesByName(); // 초기 골프장 목록 정렬

    // 페이지별 로직 실행
    if (window.location.pathname.includes('register-score.html')) {
        // 점수 등록 페이지 로직
        const dateInput = document.getElementById('date');
        const golfCourseSelect = document.getElementById('golfCourseSelect');
        const scoreInputs = document.querySelectorAll('#scoreInputs input');

        if (dateInput && golfCourseSelect) {
            dateInput.addEventListener('change', checkDateAndCourse);
            golfCourseSelect.addEventListener('change', checkDateAndCourse);
        }

        scoreInputs.forEach(input => {
            input.addEventListener('input', checkScoreInputs);
        });

        // 점수 등록, 수정, 삭제 로직
        const scoreForm = document.getElementById('scoreForm');
        if (scoreForm) {
            // 등록 버튼 클릭 이벤트 리스너 추가
            const registerButton = document.getElementById('registerScoreButton');
            if (registerButton) {
                registerButton.addEventListener('click', function (event) {
                    // 폼 제출 이벤트 강제 실행
                    scoreForm.dispatchEvent(new Event('submit'));
                });
            } else {
                console.log('등록 버튼이 존재하지 않습니다.'); // 등록 버튼 없음 로그
            }

            // 수정 버튼 클릭 이벤트 리스너 추가
            const editButton = document.getElementById('editScoreButton');
            if (editButton) {
                editButton.addEventListener('click', function () {
                    const date = document.getElementById('date').value;
                    const golfCourse = document.getElementById('golfCourseSelect').value;

                    if (!date || !golfCourse) {
                        alert('날짜와 골프장을 선택해주세요.');
                        return;
                    }

                    const scoreInputs = document.querySelectorAll('#scoreInputs input');
                    scoreInputs.forEach(input => {
                        const member = input.dataset.member;
                        const score = parseInt(input.value, 10);
                        const teeBoxSelect = document.getElementById(`teeBox-${member}`);
                        const selectedTeeBox = teeBoxSelect ? teeBoxSelect.value : 'Yellow';

                        if (!isNaN(score)) {
                            // 기존 점수 찾기
                            const existingScoreIndex = scores.findIndex(entry =>
                                entry.date === date &&
                                entry.golfCourse === golfCourse &&
                                entry.name === member
                            );

                            if (existingScoreIndex !== -1) {
                                // 기존 점수 업데이트
                                scores[existingScoreIndex].score = score;
                                scores[existingScoreIndex].teeBox = selectedTeeBox;
                            } else {
                                // 새로운 점수 추가
                                scores.push({
                                    name: member,
                                    date,
                                    golfCourse,
                                    teeBox: selectedTeeBox,
                                    score,
                                    ignoreHandicap: document.getElementById('ignoreHandicap').checked,
                                    ignoreLeague: document.getElementById('ignoreLeague').checked
                                });
                            }
                        }
                    });

                    // 로컬 스토리지에 저장
                    localStorage.setItem('scores', JSON.stringify(scores));
                    alert('점수가 수정되었습니다.');

                    // 폼 초기화
                    scoreForm.reset();
                    clearScoreInputs();

                    // 점수 기록 테이블 및 핸디캡 순위 테이블 업데이트
                    updateScoreTable();
                    updateHandicapRanking();
                });
            } else {
                console.log('수정 버튼이 존재하지 않습니다.'); // 수정 버튼 없음 로그
            }

            // 삭제 버튼 클릭 이벤트 리스너 추가
            const deleteButton = document.getElementById('deleteScoreButton');
            if (deleteButton) {
                deleteButton.addEventListener('click', function () {
                    const date = document.getElementById('date').value;
                    const golfCourse = document.getElementById('golfCourseSelect').value;

                    if (!date || !golfCourse) {
                        alert('날짜와 골프장을 선택해주세요.');
                        return;
                    }

                    // 해당 날짜와 골프장의 점수 삭제
                    scores = scores.filter(entry =>
                        !(entry.date === date && entry.golfCourse === golfCourse)
                    );

                    // 로컬 스토리지에 저장
                    localStorage.setItem('scores', JSON.stringify(scores));
                    alert('점수가 삭제되었습니다.');

                    // 폼 초기화
                    scoreForm.reset();
                    clearScoreInputs();

                    // 점수 기록 테이블 및 핸디캡 순위 테이블 업데이트
                    updateScoreTable();
                    updateHandicapRanking();
                });
            } else {
                console.log('삭제 버튼이 존재하지 않습니다.'); // 삭제 버튼 없음 로그
            }

            // 폼 제출 이벤트 리스너 등록
            scoreForm.addEventListener('submit', function (event) {
                //console.log('폼 제출 이벤트 트리거됨'); // 폼 제출 이벤트 확인 로그
                event.preventDefault(); // 폼 제출 방지

                const date = document.getElementById('date').value;
                const golfCourse = document.getElementById('golfCourseSelect').value;
                const ignoreHandicap = document.getElementById('ignoreHandicap').checked;
                const ignoreLeague = document.getElementById('ignoreLeague').checked;
                const selectedGolfCourse = golfCourses.find(course => course.name === golfCourse);
                //const teeBox = document.getElementById(`teeBox-${member}`);
                const scoreInputs = document.querySelectorAll('#scoreInputs input');

                // 점수 데이터 초기화
                const newScores = [];

                scoreInputs.forEach(input => {
                    const member = input.dataset.member;
                    const score = parseInt(input.value, 10);
                    const teeBoxSelect = document.getElementById(`teeBox-${member}`);
                    const selectedTeeBox = teeBoxSelect ? teeBoxSelect.value : 'Yellow';

                    if (!isNaN(score)) {
                        newScores.push({
                            name: member,
                            date,
                            golfCourse,
                            teeBox: selectedTeeBox,
                            score,
                            ignoreHandicap,
                            ignoreLeague
                        });
                    }
                });

                if (newScores.length > 0) {
                    // 기존 scores 배열에 새로운 점수 추가
                    scores.push(...newScores);

                    // 로컬 스토리지에 저장
                    localStorage.setItem('scores', JSON.stringify(scores));

                    // 폼 초기화
                    scoreForm.reset();
                    alert('점수가 등록되었습니다.');

                    // 점수 기록 테이블 및 핸디캡 순위 테이블 업데이트
                    updateScoreTable();
                    updateHandicapRanking();
                } else {
                    alert('점수를 입력해주세요.');
                }
            });
        } else {
            console.log('scoreForm이 존재하지 않습니다.'); // scoreForm 없음 로그
        }
    }
});


// 점수 등록 버튼 활성화 조건 추가
function checkScoreInputs() {
    const date = document.getElementById('date').value;
    const golfCourse = document.getElementById('golfCourseSelect').value;
    const scoreInputs = document.querySelectorAll('#scoreInputs input');
    let isScoreEntered = false;

    scoreInputs.forEach(input => {
        const score = parseInt(input.value, 10);
        if (!isNaN(score)) {
            isScoreEntered = true;
        }
    });

    if (date && golfCourse && isScoreEntered) {
        document.getElementById('registerScoreButton').disabled = false;
    } else {
        document.getElementById('registerScoreButton').disabled = true;
    }
}

// 경기 점수 테이블 업데이트 함수
function updateScoreTable() {
    if (document.getElementById('scoreTable')) {
        const scoreTableBody = document.getElementById('scoreTable').getElementsByTagName('tbody')[0];
        scoreTableBody.innerHTML = '';

        // 날짜별로 그룹화 (골프장 정보 포함)
        const dateMap = {};
        scores.forEach(entry => {
            const date = entry.date; // 날짜만 사용
            if (!dateMap[date]) {
                dateMap[date] = {
                    golfCourses: new Set(), // 같은 날짜에 여러 골프장이 있을 수 있음
                    memberScores: {}
                };
            }
            dateMap[date].golfCourses.add(entry.golfCourse); // 골프장 정보 추가
            if (!dateMap[date].memberScores[entry.name]) {
                dateMap[date].memberScores[entry.name] = [];
            }
            dateMap[date].memberScores[entry.name].push(entry.score);
        });

        // 날짜를 내림차순으로 정렬 (최신 순)
        const sortedDates = Object.keys(dateMap).sort((a, b) => {
            const dateA = new Date(a.replace(/-/g, '/')); // 날짜 파싱 (YYYY-MM-DD)
            const dateB = new Date(b.replace(/-/g, '/')); // 날짜 파싱 (YYYY-MM-DD)
            return dateB - dateA; // 최신 날짜가 먼저 오도록 정렬
        });

        // 테이블 헤더 업데이트
        updateScoreTableHeader();

        // 테이블에 데이터 추가
        sortedDates.forEach(date => {
            const { golfCourses, memberScores } = dateMap[date];

            // 골프장 이름을 쉼표로 구분하여 표시
            const golfCourseNames = Array.from(golfCourses).join(', ');

            // 각 회원별로 점수를 처리
            const row = scoreTableBody.insertRow();
            row.insertCell(0).textContent = date; // 날짜 (YYYY-MM-DD 형식)
            row.insertCell(1).textContent = golfCourseNames; // 골프장 이름

            members.forEach(member => {
                const cell = row.insertCell();
                if (memberScores[member.name] && memberScores[member.name].length > 0) {
                    cell.textContent = memberScores[member.name].join(', '); // 여러 점수가 있으면 쉼표로 구분
                } else {
                    cell.textContent = '';
                }
            });
        });
    }
}


// 날짜와 골프장 선택 시 회원 목록 표시 및 점수 기록 확인
function checkDateAndCourse() {
    const date = document.getElementById('date').value;
    const golfCourse = document.getElementById('golfCourseSelect').value;

    if (!date || !golfCourse) {
        return;
    }

    // 회원 목록 표시
    updateMemberSelect();

    // 이미 기록된 날짜와 골프장인지 확인
    const isAlreadyRecorded = scores.some(entry => entry.date === date && entry.golfCourse === golfCourse);
    if (isAlreadyRecorded) {
        const userChoice = confirm(
            `이미 기록된 날짜와 골프장입니다.\n\n` +
            `"확인"을 누르면 수정 또는 삭제가 가능합니다.\n` +
            `"취소"를 누르면 다른 날짜 또는 골프장을 선택할 수 있습니다.`
        );

        if (userChoice) {
            // 수정 또는 삭제 모드 활성화
            document.getElementById('editScoreButton').disabled = false;
            document.getElementById('deleteScoreButton').disabled = false;

            // 기존 점수 불러오기
            loadScoresForDateAndCourse(date, golfCourse);
        } else {
            // 다른 날짜 또는 골프장 선택을 위해 입력 필드 초기화
            document.getElementById('date').value = '';
            document.getElementById('golfCourseSelect').value = '';
            document.getElementById('editScoreButton').disabled = true;
            document.getElementById('deleteScoreButton').disabled = true;
            clearScoreInputs();
        }
    } else {
        // 새로운 날짜 및 골프장인 경우 등록 모드 활성화
        alert('새로운 날짜 및 골프장입니다. 점수를 등록해주세요.');
        document.getElementById('editScoreButton').disabled = true;
        document.getElementById('deleteScoreButton').disabled = true;

        // 점수 입력 필드 초기화
        clearScoreInputs();
    }

    // 점수 등록 버튼 활성화 확인
    checkScoreInputs();
}

// 특정 날짜와 골프장의 점수 불러오기
function loadScoresForDateAndCourse(date, golfCourse) {
    const scoreInputs = document.querySelectorAll('#scoreInputs input');
    scoreInputs.forEach(input => {
        const member = input.dataset.member;
        const existingScore = scores.find(entry => 
            entry.date === date && 
            entry.golfCourse === golfCourse && 
            entry.name === member
        );
        if (existingScore) {
            input.value = existingScore.score;
            const teeBoxSelect = document.getElementById(`teeBox-${member}`);
            if (teeBoxSelect) {
                teeBoxSelect.value = existingScore.teeBox; // 기존 Tee Box 값 불러오기
            }
        } else {
            input.value = '';
            const teeBoxSelect = document.getElementById(`teeBox-${member}`);
            if (teeBoxSelect) {
                // 회원 정보에 따라 Tee Box 기본값 설정
                const memberInfo = members.find(m => m.name === member);
                if (memberInfo) {
                    if (memberInfo.senior) {
                        teeBoxSelect.value = 'Blue'; // Senior인 경우 Blue
                    } else if (memberInfo.gender === '여성') {
                        teeBoxSelect.value = 'Red'; // 여성인 경우 Red
                    } else {
                        teeBoxSelect.value = 'Yellow'; // 남성인 경우 Yellow
                    }
                }
            }
        }
    });
}

// 점수 입력 필드 초기화
function clearScoreInputs() {
    const scoreInputs = document.querySelectorAll('#scoreInputs input');
    scoreInputs.forEach(input => {
        input.value = '';
    });
}

// 점수 기록 테이블 헤더 업데이트 (골프장 정보 추가)
function updateScoreTableHeader() {
    if (document.getElementById('scoreTable')) {
        const scoreTableHead = document.getElementById('scoreTable').getElementsByTagName('thead')[0];
        scoreTableHead.innerHTML = ''; // 기존 헤더 초기화

        const headerRow = scoreTableHead.insertRow(0); // 헤더 행 생성

        // 날짜 열
        const dateHeader = headerRow.insertCell(0);
        dateHeader.textContent = '날짜';
        dateHeader.classList.add('table-header'); // 클래스 추가

        // 골프장 열
        const courseHeader = headerRow.insertCell(1);
        courseHeader.textContent = '골프장';
        courseHeader.classList.add('table-header'); // 클래스 추가

        // 회원 이름 열 (끝에서 2글자만 표시)
        members.forEach(member => {
            const memberHeader = headerRow.insertCell();
            const shortName = member.name.substring(member.name.length - 2);
            memberHeader.textContent = shortName;
            memberHeader.classList.add('table-header'); // 클래스 추가
        });
    }
}


//
// 전체 회원 핸디캡
//

// 핸디캡 태그 클라우드 생성 함수
function createTagCloud() {
    const tagCloud = document.querySelector('.handicap-tag-cloud');
    tagCloud.innerHTML = ''; // 기존 내용 초기화

    // 회원 데이터를 이름순으로 정렬
    const sortedMembers = members.slice().sort((a, b) => a.name.localeCompare(b.name));

    // 최신 핸디캡 계산
    const weeklyHandicaps = calculateWeeklyHandicap();
    const recent12WeekEnds = getRecent12WeekEnds();
    const latestWeekEnd = recent12WeekEnds[0]; // 가장 최근 일요일 날짜
    const previousWeekEnd = recent12WeekEnds[1]; // 전주 일요일 날짜

    sortedMembers.forEach(member => {
        // 닉네임이 없으면 이름을 사용
        const displayName = member.nickname + ` ` + member.name;

        // 최신 핸디캡 값 가져오기
        const finalHandicap = weeklyHandicaps[member.name]?.[latestWeekEnd] || member.baseHandicap || 0;
        const previousHandicap = weeklyHandicaps[member.name]?.[previousWeekEnd] || member.baseHandicap || 0;

        // 핸디캡 변동 계산
        const handicapChange = Math.round(finalHandicap) - Math.round(previousHandicap);

        // 태그 생성
        const tag = document.createElement('div');
        tag.className = 'tag';

        // 핸디캡 변동에 따라 클래스 추가
        if (handicapChange < 0) {
            tag.classList.add('handicap-improved'); // 핸디캡이 낮아짐 (개선)
        } else if (handicapChange > 0) {
            tag.classList.add('handicap-worsened'); // 핸디캡이 높아짐 (악화)
        }

        // 반올림된 핸디캡 표시
        const roundedHandicap = Math.round(finalHandicap);
        if (handicapChange == 0) {
            tag.textContent = `${displayName} (${roundedHandicap})`;
        } else if (handicapChange > 0) {
            tag.textContent = `${displayName} (${roundedHandicap}) 변동폭: +${handicapChange}`;
        } else {
            tag.textContent = `${displayName} (${roundedHandicap}) 변동폭: ${handicapChange}`;
        }

        // 핸디캡 변동 아이콘 추가
        if (handicapChange !== 0) {
            const icon = document.createElement('i');
            icon.className = handicapChange < 0 ? 'fas fa-arrow-down' : 'fas fa-arrow-up';
            tag.appendChild(icon);
        }

        tagCloud.appendChild(tag);
    });
}





//
// 핸디캡 랭킹 테이블
//

// 확인필요: 아래는 테이블만 업데이트 하는데, 챠트는 업데이트 안해도 되나?
// 핸디캡 테이블 업데이트
function updateHandicapRanking() {
    if (document.getElementById('handicapRankingTable')) {
        const handicapRankingTableBody = document.getElementById('handicapRankingTable').getElementsByTagName('tbody')[0];
        handicapRankingTableBody.innerHTML = ''; // 테이블 초기화

        // 모든 회원의 평균 점수 및 최종 핸디캡 계산
        const weeklyHandicaps = calculateWeeklyHandicap(); // 주간 핸디캡 데이터 가져오기
        const recent12WeekEnds = getRecent12WeekEnds(); // 최근 12주의 일요일 날짜 추출
        const twelveWeeksAgo = new Date(recent12WeekEnds[11]); // 12주 전의 일요일 날짜

        const memberData = members.map(member => {
            const memberScores = scores.filter(score => score.name === member.name);

            // 총 경기 참가 수 계산
            const totalGames = memberScores.length;

            // 최근 12주 경기 참가수 계산
            const recent12WeekGames = memberScores.filter(score => {
                const scoreDate = new Date(score.date);
                return scoreDate >= twelveWeeksAgo; // 12주 전부터 현재까지의 경기만 카운트
            }).length;

            if (memberScores.length >= 10) {
                // 최종 핸디캡 계산 (최신 주간 핸디캡 값 사용)
                const latestWeekEnd = recent12WeekEnds[0]; // 최신 주의 일요일 날짜
                const finalHandicap = weeklyHandicaps[member.name]?.[latestWeekEnd] || 0; // 최종 핸디캡

                return {
                    name: member.name,
                    totalGames: totalGames,
                    recent12WeekGames: recent12WeekGames,
                    finalHandicap: finalHandicap.toFixed(2) // 최종 핸디캡
                };
            } else if (memberScores.length > 0) {
                return {
                    name: member.name,
                    totalGames: totalGames,
                    recent12WeekGames: recent12WeekGames,
                    finalHandicap: `${member.baseHandicap} (기준핸디)` // 최종 핸디캡
                };
            } 
            else {
                // 점수 데이터가 없는 경우
                return {
                    name: member.name,
                    totalGames: 0,
                    recent12WeekGames: 0,
                    finalHandicap: `${member.baseHandicap} (기준핸디)` // 최종 핸디캡
                };
            }
        });

        // 핸디캡 지수가 낮은 순으로 정렬 (숫자가 낮을수록 좋은 핸디캡)
        memberData.sort((a, b) => {
            if (a.finalHandicap === '기록 부족') return 1; // 기록 부족인 경우 가장 뒤로
            if (b.finalHandicap === '기록 부족') return -1; // 기록 부족인 경우 가장 뒤로
            return parseFloat(a.finalHandicap) - parseFloat(b.finalHandicap);
        });

        // 테이블에 데이터 추가
        memberData.forEach((data, index) => {
            const row = handicapRankingTableBody.insertRow();
            row.insertCell(0).textContent = index + 1; // 번호 (1부터 시작)
            row.insertCell(1).textContent = data.name; // 회원 이름
            row.insertCell(2).textContent = data.finalHandicap; // 최종 핸디캡
            row.insertCell(3).textContent = data.totalGames; // 총 경기 참가 수
            row.insertCell(4).textContent = data.recent12WeekGames; // 최근 12주 경기 참가수
        });
    }
}


//
// 최근 12주 핸디캡 순위
//


// 모든 회원의 12주 최종 핸디캡 
function renderWeeklyHandicapChart() {
    const weeklyHandicaps = calculateWeeklyHandicap();
    const recent12WeekEnds = getRecent12WeekEnds();

    // 지난 한 달 동안 가장 많이 경기에 참가한 회원순으로 상위 5명 선택
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1); // 한 달 전 날짜 계산
    const memberGameCounts = members.map(member => {
        const gameCount = scores.filter(score => 
            score.name === member.name && new Date(score.date) >= oneMonthAgo
        ).length;
        return { member, gameCount };
    });

    // 경기 참가 횟수가 많은 순으로 정렬
    memberGameCounts.sort((a, b) => b.gameCount - a.gameCount);

    // 상위 5명만 선택
    const top5Members = memberGameCounts.slice(0, 5).map(data => data.member.name);

    // 그래프 데이터 준비
    //const labels = recent12WeekEnds.reverse(); // X축 순서를 반대로 (왼쪽이 예전, 오른쪽이 최신)

    // 날짜를 MM-DD 형식으로 변환 (X축 레이블용)
    const labels = recent12WeekEnds.reverse().map(date => {
        const [year, month, day] = date.split('-'); // YYYY-MM-DD를 분리
        return `${month}-${day}`; // MM-DD 형식으로 반환
    });

    

    // 모든 회원의 데이터셋 생성
    const datasets = members.map((member, index) => {
        const data = recent12WeekEnds.map(weekEnd => weeklyHandicaps[member.name]?.[weekEnd] || 0);
        const color = getGradientColor(index, members.length); // 오렌지에서 녹색으로 그라데이션

        // 상위 5명인지 확인
        const isTop5 = top5Members.includes(member.name);

        return {
            label: `${member.name}`, // 회원 이름을 레전드에 표시
            data: data,
            borderColor: color,
            backgroundColor: color.replace(')', ', 0.2)'), // 투명도 추가
            borderWidth: 2,
            pointBackgroundColor: color, // 포인트 배경색 (라인 색상과 동일)
            pointBorderColor: darkenColor(color, 20), // 포인트 테두리 색상 (라인 색상보다 어둡게)
            pointRadius: 5,
            pointHoverRadius: 7,
            fill: false,
            hidden: !isTop5, // 상위 5명이 아니면 숨김
        };
    });

    // 그래프를 표시할 컨테이너 생성
    const chartContainer = document.getElementById('overallWeeklyHandicapChart');
    chartContainer.innerHTML = ''; // 기존 내용 초기화

    // 캔버스 생성
    const ctx = document.createElement('canvas');
    chartContainer.appendChild(ctx);

    // Chart.js로 그래프 생성
    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels, // X축: 날짜 (왼쪽이 예전, 오른쪽이 최신)
            datasets: datasets, // Y축: 각 회원의 핸디캡 데이터
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: false,
                    text: '핸디캡',
                    font: {
                        size: 16,
                        weight: 'bold'
                    }
                },
                legend: {
                    display: true, // 레전드 표시 활성화
                    position: 'bottom', // 레전드 위치 (하단)
                    labels: {
                        usePointStyle: true, // 레전드 아이콘을 포인트 스타일로 표시
                        pointStyle: 'circle', // 포인트 스타일을 원형으로 설정
                        boxWidth: 30, // 레전드 아이콘의 너비
                        padding: 20, // 레전드 아이템 간의 간격
                        font: {
                            size: 12, // 레전드 폰트 크기
                        },
                        color: '#6b5a52', // 레전드 텍스트 색상
                    }
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: '핸디캡 업데이트 날짜 (일요일 경기 등록 후)',
                        font: {
                            size: 12,
                            //weight: 'bold'
                        }
                    },
                    grid: {
                        display: false
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: '핸디캡 지수',
                        font: {
                            size: 12,
                            //weight: 'bold'
                        }
                    },
                    grid: {
                        color: '#E0E0E0'
                    },
                    ticks: {
                        stepSize: 1,
                        precision: 1,
                    }
                }
            }
        }
    });

    /* 회원별 그래프 토글 버튼 생성
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'button-container';
    chartContainer.appendChild(buttonContainer);

    // 상위 5명의 버튼 (초기 상태: 활성화)
    top5Members.forEach((member) => {
        const button = createMemberToggleButton(member, true, chart, labels, weeklyHandicaps);
        buttonContainer.appendChild(button);
    });

    // 나머지 회원의 버튼 (초기 상태: 비활성화)
    const remainingMembers = members.filter(member => !top5Members.includes(member.name));
    remainingMembers.forEach(member => {
        const button = createMemberToggleButton(member.name, false, chart, labels, weeklyHandicaps);
        buttonContainer.appendChild(button);
    }); */
}

// 색상을 어둡게 만드는 함수
function darkenColor(color, percent) {
    const rgba = color.match(/\d+/g); // rgba 값 추출
    const r = Math.round(rgba[0] * (1 - percent / 100));
    const g = Math.round(rgba[1] * (1 - percent / 100));
    const b = Math.round(rgba[2] * (1 - percent / 100));
    return `rgba(${r}, ${g}, ${b}, ${rgba[3]})`;
}

/* 회원별 그래프 토글 버튼 생성 함수
function createMemberToggleButton(member, isActive, chart, labels, weeklyHandicaps) {
    const button = document.createElement('button');
    const shortName = member.substring(member.length - 2); // 이름의 마지막 두 글자만 표시

    button.textContent = shortName;
    button.style.padding = '8px 16px'; // 버튼 크기 조정
    button.style.fontSize = '12px'; // 폰트 크기 줄임
    button.style.backgroundColor = isActive ? '#e67a1a' : '#cccccc'; // 오렌지 색상으로 통일
    button.style.color = isActive ? '#ffffff' : '#000000';
    button.style.border = 'none';
    button.style.borderRadius = '5px';
    button.style.cursor = 'pointer';
    button.style.transition = 'background-color 0.3s ease';

    // 버튼 클릭 시 그래프 토글
    button.addEventListener('click', () => {
        const datasetIndex = chart.data.datasets.findIndex(dataset => dataset.label === `${member}의 주간 핸디캡`);

        if (datasetIndex === -1) {
            // 그래프 추가
            const color = getGradientColor(members.indexOf(member), members.length); // 새로운 색상 할당
            const newDataset = {
                label: `${member}의 주간 핸디캡`,
                data: labels.map(weekEnd => weeklyHandicaps[member]?.[weekEnd] || 0),
                borderColor: color,
                backgroundColor: color.replace(')', ', 0.2)'),
                borderWidth: 2,
                pointBackgroundColor: color, // 포인트 배경색 (라인 색상과 동일)
                pointBorderColor: darkenColor(color, 20), // 포인트 테두리 색상 (라인 색상보다 어둡게)
                pointRadius: 5,
                pointHoverRadius: 7,
                fill: false,
            };
            chart.data.datasets.push(newDataset);
            button.style.backgroundColor = '#e67a1a'; // 활성화 시 오렌지 색상
            button.style.color = '#ffffff';
        } else {
            // 그래프 제거
            chart.data.datasets.splice(datasetIndex, 1);
            button.style.backgroundColor = '#cccccc'; // 비활성화 시 회색
            button.style.color = '#000000';
        }

        chart.update();
    });

    return button;
} */


// 오렌지색 계열 색상 생성 함수 (순위에 따라 색상 강약 조절)
function getOrangeColor(index) {
    const baseOrange = [230, 122, 26]; // 기본 오렌지색 (RGB)
    const opacity = 1 - (index * 0.15); // 순위가 낮을수록 색상이 연해짐
    return `rgba(${baseOrange[0]}, ${baseOrange[1]}, ${baseOrange[2]}, ${opacity})`;
}

// 오렌지에서 녹색으로 그라데이션되는 색상 생성 함수
function getGradientColor(index, totalMembers) {
    // 오렌지색 (RGB: 230, 122, 26)
    const orange = [230, 122, 26];
    // 녹색 (RGB: 26, 188, 156)
    const green = [26, 188, 156];

    // 회원 수에 따라 색상 보간
    const ratio = index / (totalMembers - 1);
    const r = Math.round(orange[0] + (green[0] - orange[0]) * ratio);
    const g = Math.round(orange[1] + (green[1] - orange[1]) * ratio);
    const b = Math.round(orange[2] + (green[2] - orange[2]) * ratio);

    return `rgba(${r}, ${g}, ${b}, 1)`;
}


// 랜덤 색상 생성 함수
function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgba(${r}, ${g}, ${b}, 1)`;
}

// 최근 12주의 일요일 날짜 추출 함수
function getRecent12WeekEnds() {
    const weekEnds = [];
    const today = new Date();
    let currentDate = new Date(today);

    // 오늘이 일요일인지 확인
    if (currentDate.getDay() === 0) {
        weekEnds.push(currentDate.toISOString().split('T')[0]); // 오늘 포함
    }

    // 최근 12주의 일요일 날짜 추출
    while (weekEnds.length < 12) {
        currentDate.setDate(currentDate.getDate() - 1); // 1일 전으로 이동
        if (currentDate.getDay() === 0) { // 일요일인 경우
            weekEnds.push(currentDate.toISOString().split('T')[0]);
        }
    }

    return weekEnds;
}


// 최근 104주의 일요일 날짜 추출 함수
function getAllWeekEnds() {
    const weekEnds = [];
    const today = new Date();
    let currentDate = new Date(today);

    // 오늘이 일요일인지 확인
    if (currentDate.getDay() === 0) {
        weekEnds.push(currentDate.toISOString().split('T')[0]); // 오늘 포함
    }

    // 최근 104주의 일요일 날짜 추출
    while (weekEnds.length < 104) {
        currentDate.setDate(currentDate.getDate() - 1); // 1일 전으로 이동
        if (currentDate.getDay() === 0) { // 일요일인 경우
            weekEnds.push(currentDate.toISOString().split('T')[0]);
        }
    }

    return weekEnds;
}


function calculateWeeklyHandicap() {
    const weeklyHandicaps = {};

    members.forEach(member => {

        const memberScores = scores.filter(score => score.name === member.name);

        // 최근 12주의 일요일 날짜 추출
        const recent12WeekEnds = getRecent12WeekEnds();

        // weeklyHandicaps[member]를 빈 객체로 초기화
        weeklyHandicaps[member.name] = {};

        // 각 주별로 최종 핸디캡 계산
        recent12WeekEnds.forEach(weekEnd => {
            // 해당 주의 일요일을 기준으로 최근 20경기 추출 (점수 기록이 있는 날짜만 포함)
            const weekEndDate = new Date(weekEnd);
            const recent20Scores = memberScores
                .filter(score => new Date(score.date) <= weekEndDate) // 해당 주의 일요일 이전의 점수만 필터링
                .sort((a, b) => new Date(b.date) - new Date(a.date)) // 최신순 정렬
                .slice(0, 20); // 최근 20경기 (점수 기록이 있는 날짜만 포함)

            // 최소 경기 수 확인 (10경기 미만인 경우 기준 핸디캡 사용)
            if (recent20Scores.length < 10) {
                weeklyHandicaps[member.name][weekEnd] = member.baseHandicap || 0; // 기준 핸디캡 사용, 없는 경우 18
                return;
            }

            // 상위 40% 경기 수
            const topScoresCount = Math.round(recent20Scores.length * 0.4); // 40% 경기 수 (반올림)
            const topScores = recent20Scores
                .map(score => {
                    const golfCourse = golfCourses.find(c => c.name === score.golfCourse);
                    if (!golfCourse) {
                        console.error(`골프장 정보를 찾을 수 없습니다: ${score.golfCourse}`);
                        return null; // 골프장 정보가 없는 경우
                    }

                    // 수정: 회원의 성별과 티박스 정보에 맞는 코스 레이팅과 슬로프 레이팅 조회
                    const teeBoxInfo = golfCourse.teeBoxes.find(
                        t => t.gender === member.gender && t.teeBox === score.teeBox
                    );
                    if (!teeBoxInfo) {
                        console.error(`티박스 정보를 찾을 수 없습니다: 골프장 ${score.golfCourse}, 성별 ${member.gender}, 티박스 ${score.teeBox}`);
                        return null; // 티박스 정보가 없는 경우
                    }

                    //console.log(`회원: ${member.name}, Score: ${score.score}, CourseRating: ${teeBoxInfo.courseRating}, slopeRating: ${teeBoxInfo.slopeRating} `);

                    const courseRating = teeBoxInfo.courseRating;
                    const slopeRating = teeBoxInfo.slopeRating;
                    const handicapIndex = ((score.score - courseRating) / slopeRating) * 113;

                    return handicapIndex;
                })
                .filter(index => index !== null) // 유효한 핸디캡 지수만 필터링
                .sort((a, b) => a - b) // 오름차순 정렬
                .slice(0, topScoresCount); // 상위 점수 선택

            if (topScores.length > 0) {
                const averageHandicap = topScores.reduce((sum, index) => sum + index, 0) / topScores.length;
                weeklyHandicaps[member.name][weekEnd] = parseFloat(averageHandicap.toFixed(2)); // 소수점 둘째 자리까지 반올림

                // 디버깅 로그 추가
                //console.log(`회원: ${member.name}, 주: ${weekEnd}`);
                //console.log(`최근 20경기 점수 데이터:`, recent20Scores.map(score => score.score));
                //console.log(`상위 8개 점수:`, topScores);
                //console.log(`계산된 핸디캡: ${averageHandicap.toFixed(2)}`);
            } else {
                weeklyHandicaps[member.name][weekEnd] = member.baseHandicap || 0; // 기준 핸디캡 사용, 없는 경우 18
                //console.log(`회원: ${member.name}, 주: ${weekEnd}, 핸디캡: 0 (점수 없음)`);
            }
        });
    });

    return weeklyHandicaps;
}


function calculateHistoricalWeeklyHandicap() {
    const historicalWeeklyHandicaps = {};

    members.forEach(member => {
        historicalWeeklyHandicaps[member.name] = {}; // 각 회원별로 빈 객체 초기화
        const memberScores = scores.filter(score => score.name === member.name);

        // 모든 주별로 핸디캡 계산
        const allWeekEnds = getAllWeekEnds(); // 모든 주의 일요일 날짜 추출
        allWeekEnds.forEach(weekEnd => {
            const weekEndDate = new Date(weekEnd);
            const recent20Scores = memberScores
                .filter(score => new Date(score.date) <= weekEndDate) // 해당 주의 일요일 이전의 점수만 필터링
                .sort((a, b) => new Date(b.date) - new Date(a.date)) // 최신순 정렬
                .slice(0, 20); // 최근 20경기

            // 최소 경기 수 확인 (10경기 미만인 경우 기준 핸디캡 사용)
            if (recent20Scores.length < 10) {
                historicalWeeklyHandicaps[member.name][weekEnd] = member.baseHandicap || 0; // 기준 핸디캡 사용, 없는 경우 18
                return;
            }

            const topScoresCount = Math.round(recent20Scores.length * 0.4); // 40% 경기 수 (반올림)
            const topScores = recent20Scores
                .map(score => {
                    const golfCourse = golfCourses.find(c => c.name === score.golfCourse);
                    if (!golfCourse) {
                        console.error(`골프장 정보를 찾을 수 없습니다: ${score.golfCourse}`);
                        return null; // 골프장 정보가 없는 경우
                    }

                    // 수정: 회원의 성별과 티박스 정보에 맞는 코스 레이팅과 슬로프 레이팅 조회
                    let teeBoxInfo = golfCourse.teeBoxes.find(
                        t => t.gender === member.gender && t.teeBox === score.teeBox
                    );

                    // 성별이 여성인 경우, Red 티박스를 기본값으로 사용
                    if (!teeBoxInfo && member.gender === '여성') {
                        teeBoxInfo = golfCourse.teeBoxes.find(
                            t => t.gender === '여성' && t.teeBox === 'Red'
                        );
                        if (teeBoxInfo) {
                            console.warn(`기본 Red 티박스 사용: 골프장 ${score.golfCourse}, 회원 ${member.name}`);
                        }
                    }        

                    if (!teeBoxInfo) {
                        console.error(`티박스 정보를 찾을 수 없습니다: 골프장 ${score.golfCourse}, 성별 ${member.gender}, 티박스 ${score.teeBox}`);
                        return null; // 티박스 정보가 없는 경우
                    }

                    //console.log(`Historical 회원: ${member.name}, CourseRating: ${teeBoxInfo.courseRating}, slopeRating: ${teeBoxInfo.slopeRating} `);

                    //const courseRating = golfCourse.courseRating;
                    //const slopeRating = golfCourse.slopeRating;
                    const courseRating = teeBoxInfo.courseRating;
                    const slopeRating = teeBoxInfo.slopeRating;
                    const handicapIndex = ((score.score - courseRating) / slopeRating) * 113;
                    return handicapIndex;
                })
                .filter(index => index !== null) // 유효한 핸디캡 지수만 필터링
                .sort((a, b) => a - b) // 오름차순 정렬
                .slice(0, topScoresCount); // 상위 점수 선택

            if (topScores.length > 0) {
                const averageHandicap = topScores.reduce((sum, index) => sum + index, 0) / topScores.length;
                historicalWeeklyHandicaps[member.name][weekEnd] = parseFloat(averageHandicap.toFixed(2)); // 소수점 둘째 자리까지 반올림
            } else {
                historicalWeeklyHandicaps[member.name][weekEnd] = member.baseHandicap || 0; // 기준 핸디캡 사용, 없는 경우 18
            }
        });
    });

    return historicalWeeklyHandicaps;
}


// 주의 마지막 날짜 계산 함수 (일요일 기준)
function getWeekEndDate(date) {
    const dayOfWeek = date.getDay();
    const diff = date.getDate() - dayOfWeek + (dayOfWeek === 0 ? 0 : 7); // 일요일까지의 차이 계산
    return new Date(date.setDate(diff));
}



//
// 2025년 파골사 리그 월별 순위
//
//


//2025년 핸디 대비 월별 점수 평균
function calculateMonthlyHandicapAdjustedScores() {
    const weeklyHandicaps = calculateHistoricalWeeklyHandicap(); // weeklyHandicaps 초기화
    const monthlyData = {};

    // 2025년 모든 월에 대한 데이터 초기화
    const months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
    months.forEach(month => {
        monthlyData[`2025-${month}`] = {};
    });

    // 각 회원별로 데이터 계산
    members.forEach(member => {
        const memberScores = scores.filter(score => score.name === member.name);

        months.forEach(month => {
            const monthKey = `2025-${month}`;
            const scoresForMonth = memberScores.filter(score => score.date.startsWith(monthKey));

            // 경기수 계산
            const gameCount = scoresForMonth.length;

            // 점수 평균 계산 (점수 - (전 주 핸디캡 + 골프장별 파))
            let totalAdjustedScore = 0;
            scoresForMonth.forEach(score => {
                const scoreDate = new Date(score.date);
                const previousWeekEnd = getClosestPreviousSunday(scoreDate); // 전 주의 일요일 날짜
                const previousWeekHandicap = weeklyHandicaps[member.name]?.[previousWeekEnd] || 0; // 전 주의 핸디캡

                // 골프장별 파(Par) 정보 가져오기
                const golfCourse = golfCourses.find(course => course.name === score.golfCourse);
                if (!golfCourse) {
                    console.error(`골프장 정보를 찾을 수 없습니다: ${score.golfCourse}`);
                    return null; // 골프장 정보가 없는 경우
                }

                // 회원의 성별과 티박스 정보에 맞는 코스 레이팅과 슬로프 레이팅 조회
                let teeBoxInfo = golfCourse.teeBoxes.find(
                    t => t.gender === member.gender && t.teeBox === score.teeBox
                );

                // 성별이 여성인 경우, Red 티박스를 기본값으로 사용
                if (!teeBoxInfo && member.gender === '여성') {
                    teeBoxInfo = golfCourse.teeBoxes.find(
                        t => t.gender === '여성' && t.teeBox === 'Red'
                    );
                    if (teeBoxInfo) {
                        console.warn(`기본 Red 티박스 사용: 골프장 ${score.golfCourse}, 회원 ${member.name}`);
                    }
                }

                if (!teeBoxInfo) {
                    console.error(`티박스 정보를 찾을 수 없습니다: 골프장 ${score.golfCourse}, 성별 ${member.gender}, 티박스 ${score.teeBox}`);
                    return null; // 티박스 정보가 없는 경우
                }

                // par 정보는 teeBoxInfo에서 가져옴
                const par = teeBoxInfo.par || 72; // teeBoxInfo에 par 정보가 없으면 기본값 72 사용

                // 경기 점수의 핸디캡 지수 계산
                const courseRating = teeBoxInfo.courseRating;
                const slopeRating = teeBoxInfo.slopeRating;
                const handicapIndex = ((score.score - courseRating) / slopeRating) * 113;

                // (경기 점수의 핸디캡 지수 - 지난 주 핸디캡) 계산
                totalAdjustedScore += (handicapIndex - previousWeekHandicap);;
            });

            const averageAdjustedScore = gameCount > 0 ? (totalAdjustedScore / gameCount).toFixed(2) : "";

            // 데이터 저장 (경기수가 0이면 빈칸)
            monthlyData[monthKey][member.name] = {
                gameCount: gameCount > 0 ? gameCount : "", // 경기수가 0이면 빈칸
                averageAdjustedScore
            };
        });
    });

    return monthlyData;
}


function getClosestPreviousSunday(date) {
    // 현재 날짜의 복사본을 만듭니다.
    const currentDate = new Date(date);
    
    // 해당 날짜의 요일을 가져옵니다. (0: 일요일, 1: 월요일, ..., 6: 토요일)
    let dayOfWeek = currentDate.getDay();
    if (dayOfWeek == 0) {
        dayOfWeek += 7;
    }
    

    // 일요일로 이동하기 위해 (dayOfWeek)일을 뺍니다.
    const closestPreviousSunday = new Date(currentDate.setDate(currentDate.getDate() - dayOfWeek));
    
    // ISO 형식으로 변환하여 날짜만 반환합니다.
    return closestPreviousSunday.toISOString().split('T')[0];
}

//
// 파골사 상위 5명에 대한 라인 그래프 
//

function calculateMonthlyPargolsaScores(scores, weeklyHandicaps, currentMonth) {
    const monthlyScores = {};

    scores.forEach(score => {
        if (!score.date.startsWith(currentMonth)) return; // 해당 월 데이터만 처리

        const member = score.name;
        const date = score.date;
        const previousWeekEnd = getClosestPreviousSunday(new Date(date)); // 가장 가까운 전 주의 일요일 날짜
        const previousWeekHandicap = weeklyHandicaps[member]?.[previousWeekEnd] || 0; // 전 주 핸디캡

        // 핸디캡 지수 계산
        const golfCourse = golfCourses.find(course => course.name === score.golfCourse);
        if (!golfCourse) return;

        const teeBoxInfo = golfCourse.teeBoxes.find(
            t => t.gender === members.find(m => m.name === member)?.gender && t.teeBox === score.teeBox
        );
        if (!teeBoxInfo) return;

        const courseRating = teeBoxInfo.courseRating;
        const slopeRating = teeBoxInfo.slopeRating;
        const handicapIndex = ((score.score - courseRating) / slopeRating) * 113;

        // 월파골사평균점수 계산 (전주핸디캡 - 핸디캡지수)
        const pargolsaScore = handicapIndex - previousWeekHandicap;
        //if (member == '???') {
        //    console.log(`날짜: ${date} 회원: ${member}, 핸디캡지수: ${handicapIndex} 전주 핸디 : ${previousWeekHandicap}, 파골사 지수: ${pargolsaScore}`);    
        //}

        if (!monthlyScores[member]) {
            monthlyScores[member] = { total: 0, count: 0, scoresByDate: {} };
        }

        monthlyScores[member].total += pargolsaScore;
        monthlyScores[member].count += 1; // 경기 수 증가
        monthlyScores[member].scoresByDate[date] = monthlyScores[member].total / monthlyScores[member].count;

        //if (member == '???') {
        //    console.log(`경기수 : ${monthlyScores[member].count}, 날짜별 점수: ${monthlyScores[member].scoresByDate[date]} `);    
        //}
        
    });

    return monthlyScores;
}

function getTop5MembersByPargolsaScore(monthlyScores) {
    return Object.entries(monthlyScores)
        .map(([name, data]) => ({
            name,
            finalScore: data.total / data.count, // 최종 월파골사평균점수
            count: data.count, // 경기 수 추가
            scoresByDate: data.scoresByDate // 날짜별 월파골사평균점수
        }))
        .sort((a, b) => a.finalScore - b.finalScore) // 오름차순 정렬 (낮은 점수가 좋은 점수)
        .slice(0, 5); // 상위 5명
}

function prepareChartData(top5Members, allDates) {
    return top5Members.map(member => {
        const data = allDates.map(date => member.scoresByDate[date] || null); // 날짜별 월파골사평균점수

        // null 값을 이전 값으로 채우기
        let lastValidValue = null;
        const filledData = data.map(value => {
            if (value !== null) {
                lastValidValue = value;
            }
            return lastValidValue;
        });

        return {
            label: member.name, // 회원 이름
            data: filledData,
            borderColor: getRandomColor(), // 랜덤 색상
            backgroundColor: 'rgba(0, 0, 0, 0)', // 투명 배경
            borderWidth: 2,
            pointBackgroundColor: '#ffffff', // 흰색 포인트
            pointBorderColor: '#000000', // 검은색 포인트 테두리
            pointRadius: 5,
            pointHoverRadius: 7,
            fill: false,
        };
    });
}


// 현재 월을 YYYY-MM 형식으로 반환하는 함수
function getCurrentMonth() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // 월을 두 자리로 포맷
    return `${year}-${month}`;
}

// 월 선택 드롭다운 초기화
function initializeMonthSelect() {
    const monthSelect = document.getElementById('monthSelect');
    if (monthSelect) {
        const currentMonth = getCurrentMonth(); // 현재 월
        monthSelect.value = currentMonth; // 기본값을 현재 월로 설정

        // 월 선택 시 그래프 다시 그리기
        monthSelect.addEventListener('change', function () {
            const selectedMonth = this.value;
            renderPargolsaTop5Chart(selectedMonth);
            renderPargolsaDetailTable(selectedMonth);
        });
    }
}

// renderPargolsaTop5Chart (월을 파라미터로 받도록)
function renderPargolsaTop5Chart(month = getCurrentMonth()) {
    const weeklyHandicaps = calculateHistoricalWeeklyHandicap(); // 주간 핸디캡 데이터
    const currentMonth = month; // 파라미터로 받은 월 사용

    // 해당월의 모든 경기 날짜 추출 (오름차순 정렬)
    const allDates = [...new Set(scores
        .filter(score => score.date.startsWith(currentMonth)) // 해당월 데이터만 필터링
        .map(score => score.date) // 날짜만 추출
        .sort((a, b) => new Date(a) - new Date(b)) // 날짜 순으로 정렬 (오름차순)
    )];

    // 날짜를 MM-DD 형식으로 변환 (X축 레이블용)
    const labels = allDates.map(date => {
        const [year, month, day] = date.split('-'); // YYYY-MM-DD를 분리
        return `${month}-${day}`; // MM-DD 형식으로 반환
    });

    // 월파골사평균점수 계산
    const monthlyScores = calculateMonthlyPargolsaScores(scores, weeklyHandicaps, currentMonth);

    // 상위 5명 회원 추출 (월파골사평균점수 기준)
    const top5Members = getTop5MembersByPargolsaScore(monthlyScores);

    // 5등부터 1등 순서로 정렬
    const reversedTop5Members = top5Members.slice().reverse();

    // 4경기 미만인 회원이 있는지 확인
    const hasInsufficientGames = top5Members.some(member => member.count < 4);

    // 경고 메시지 표시
    const chartInfoMessage = document.getElementById('pargolsaChartInfoMessage');
    if (chartInfoMessage) { // infoMessage 요소가 존재하는지 확인
        if (hasInsufficientGames) {
            chartInfoMessage.textContent = '* 4경기 미만인 회원의 경우 점선으로 표시됩니다. 월말까지 4경기 미만일 경우, 파골사 리그 순위에서 제외됩니다.';
        } else {
            chartInfoMessage.textContent = ''; // 경고 메시지 숨기기
        }
    } else {
        console.error('pargolsaInfoMessage 요소를 찾을 수 없습니다.');
    }

    // 그래프 데이터 준비 (5등부터 1등 순서로 데이터셋 생성)
    let rank = 5; // 1등부터 5등까지
    const datasets = reversedTop5Members.map((member, index) => {
        const data = allDates.map(date => member.scoresByDate[date] || null); // 날짜별 월파골사평균점수

        // null 값을 이전 값으로 채우기
        let lastValidValue = null;
        const filledData = data.map(value => {
            if (value !== null) {
                lastValidValue = value;
            }
            return lastValidValue;
        });

        // 색상 그라데이션 (오렌지에서 녹색으로)
        const color = getGradientColor(index, reversedTop5Members.length);
        // 경기 수가 4경기 미만인 경우 점선으로 표시
        const borderDash = member.count < 4 ? [5, 5] : []; // 점선 스타일

        // 레전드에 등수 추가
        const labelWithRank = `${member.name} (${rank}등)`;
        rank -= 1; // 등수를 1씩 감소시킴

        return {
            label: labelWithRank, // 회원 이름
            data: filledData,
            borderColor: color, // 라인 색상
            backgroundColor: color.replace(')', ', 0.2)'), // 배경색 (투명도 추가)
            borderWidth: 2,
            borderDash: borderDash, // 경기 수가 적은 경우 점선으로 표시
            pointBackgroundColor: color, // 포인트 배경색 (라인 색상과 동일)
            pointBorderColor: darkenColor(color, 20), // 포인트 테두리 색상 (라인 색상보다 어둡게)
            pointRadius: 5,
            pointHoverRadius: 7,
            fill: false,
            // 각 데이터셋의 애니메이션 딜레이 설정 (5등부터 1등까지 순차적으로 그리기)
            animation: {
                delay: index * 1000, // 1초 간격으로 순차적으로 그리기
            },
        };
    });

    // y축 범위 계산 (여유를 주기 위해 padding 추가)
    const allDataPoints = datasets.flatMap(dataset => dataset.data.filter(value => value !== null));
    const minValue = Math.min(...allDataPoints);
    const maxValue = Math.max(...allDataPoints);
    const padding = (maxValue - minValue) * 0.05; // 여유를 주기 위한 값 (필요에 따라 조정)

    // 그래프 컨테이너 초기화
    const chartContainer = document.getElementById('pargolsaTop5ChartContainer');
    chartContainer.innerHTML = '<canvas id="pargolsaTop5Chart"></canvas>';

    // Chart.js로 그래프 생성
    const ctx = document.getElementById('pargolsaTop5Chart').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels, // X축: 날짜
            datasets: datasets, // Y축: 각 회원의 월파골사평균점수
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
                duration: 2000, // 애니메이션 지속 시간 (2초)
                easing: 'easeInOutQuad', // 부드러운 애니메이션 효과
            },
            plugins: {
                title: {
                    display: true,
                    text: `${currentMonth.slice(5, 7)}월 TOP 5 파골사 지수`, // 제목 (예: "2025년 03월 상위 5명 월파골사평균점수")
                    font: {
                        size: 16,
                        weight: 'bold'
                    }
                },
                legend: {
                    display: true, // 레전드 표시
                    position: 'bottom', // 레전드 위치
                    labels: {
                        usePointStyle: true, // 레전드 아이콘을 포인트 스타일로 표시
                        pointStyle: 'circle', // 포인트 스타일을 원형으로 설정
                        boxWidth: 30, // 레전드 아이콘의 너비
                        padding: 20, // 레전드 아이템 간의 간격
                        font: {
                            size: 12, // 레전드 폰트 크기
                        },
                        color: '#6b5a52', // 레전드 텍스트 색상
                    }
                },
                tooltip: {
                    callbacks: {
                        label: (context) => {
                            const member = reversedTop5Members[context.datasetIndex];
                            const value = context.raw || 0;
                            return `${member.name}: ${value.toFixed(2)}`; // 툴팁에 회원 이름과 월파골사평균점수 표시
                        }
                    }
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: '경기 일자',
                        font: {
                            size: 12,
                            //weight: 'bold'
                        }
                    },
                    grid: {
                        display: false
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: '오버파 평균',
                        font: {
                            size: 12,
                            //weight: 'bold'
                        }
                    },
                    grid: {
                        color: '#E0E0E0'
                    },
                    ticks: {
                        stepSize: 1,
                        precision: 1,
                        reverse: true, // y축을 반전시켜 위에서 아래로 내려오는 효과
                    },
                    // y축 범위 설정 (여유를 주기 위해 padding 추가)
                    min: minValue - padding,
                    max: maxValue + padding,
                }
            }
        }
    });
}

// 랜덤 색상 생성 함수
function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgba(${r}, ${g}, ${b}, 1)`;
}


// 파골사 지수 상세 테이블 렌더링
function renderPargolsaDetailTable(month = getCurrentMonth()) {
    const weeklyHandicaps = calculateHistoricalWeeklyHandicap(); // 주간 핸디캡 데이터
    const currentMonth = month; // 파라미터로 받은 월 사용

    // 해당월의 모든 경기 날짜 추출 (오름차순 정렬)
    const allDates = [...new Set(scores
        .filter(score => score.date.startsWith(currentMonth)) // 해당월 데이터만 필터링
        .map(score => score.date) // 날짜만 추출
        .sort((a, b) => new Date(a) - new Date(b)) // 날짜 순으로 정렬 (오름차순)
    )];

    // 월파골사평균점수 계산
    const monthlyScores = calculateMonthlyPargolsaScores(scores, weeklyHandicaps, currentMonth);

    updatePargolsaDetailTable(monthlyScores);
}


// 파골사 지수 상세 테이블: 선택된 월의 전체 회원 상세 데이터를 테이블에 표시하는 함수
function updatePargolsaDetailTable(monthlyScores) {
    const tableBody = document.getElementById("pargolsaDetailTable").getElementsByTagName("tbody")[0];
    tableBody.innerHTML = ''; // 기존 데이터 초기화

    // monthlyScores에서 데이터를 추출하여 테이블에 추가
    const members = Object.keys(monthlyScores); // 회원 목록 가져오기

    // 파골사 지수를 기준으로 정렬 (낮은 순서대로)
    const sortedMembers = members.sort((a, b) => {
        const scoreA = monthlyScores[a].total / monthlyScores[a].count;
        const scoreB = monthlyScores[b].total / monthlyScores[b].count;
        return scoreA - scoreB;
    });

    // 정렬된 회원 데이터를 테이블에 추가
    sortedMembers.forEach((member, index) => {
        const row = tableBody.insertRow();
        const rankCell = row.insertCell(0);
        const nameCell = row.insertCell(1);
        const scoreCell = row.insertCell(2);
        const gameCountCell = row.insertCell(3);

        // 순위
        rankCell.textContent = index + 1;

        // 회원명
        nameCell.textContent = member;

        // 파골사 지수 (평균값)
        const averageScore = (monthlyScores[member].total / monthlyScores[member].count).toFixed(2);
        scoreCell.textContent = averageScore;

        // 경기수
        gameCountCell.textContent = monthlyScores[member].count;
    });
}



// 파골사 랭킹 테이블
function renderPargolsaRankingTable() {

    //renderPargolsaTop5Chart(); // 상위 5명 그래프 렌더링도 같이 시작

    const monthlyData = calculateMonthlyHandicapAdjustedScores();
    const tableBody = document.getElementById('pargolsaRankingTable').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = '';

    // 설명 메시지 업데이트
    const infoMessage = document.getElementById('pargolsaInfoMessage');
    infoMessage.textContent = '* 평균 점수 는 다음과 같이 계산됩니다. 평균 점수 = 해당월 (경기별 핸디캡 지수 - 지난 주 핸디캡) 의 총합 / 해당월 경기 수.      ** 순위 자격 요건: 월간 4 경기 이상';

    // 현재 월을 가져옴 (예: "2025-02")
    const currentDate = new Date();
    const currentMonth = currentDate.toISOString().slice(0, 7); // "YYYY-MM" 형식


    // 해당월 평균 점수를 기준으로 회원들을 정렬
    const sortedMembers = members.slice().sort((a, b) => {
        const aScore = parseFloat(monthlyData[currentMonth][a.name]?.averageAdjustedScore || Infinity);
        const bScore = parseFloat(monthlyData[currentMonth][b.name]?.averageAdjustedScore || Infinity);
        return aScore - bScore; // 오름차순 정렬 (낮은 점수가 좋은 점수)
    });

    // 순위를 매기기 위한 변수
    let rank = 1;

    sortedMembers.forEach(member => {
        const row = tableBody.insertRow();
        const rankCell = row.insertCell(0);
        rankCell.textContent = rank++; // 순위 표시

        const memberCell = row.insertCell(1);
        memberCell.textContent = member.name;

        const months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
        months.forEach(month => {
            const monthKey = `2025-${month}`;
            const data = monthlyData[monthKey][member.name];

            // 경기수와 점수 평균이 없는 경우 빈칸으로 처리
            const gameCountCell = row.insertCell();
            const averageScoreCell = row.insertCell();

            if (data && data.gameCount > 0) {
                gameCountCell.textContent = data.gameCount;
                averageScoreCell.textContent = data.averageAdjustedScore;

                // 모든 월에 대해 1등, 2등, 3등 확인 및 스타일 적용
                const rank = getTopRanks(monthKey, member.name, monthlyData);

                if (rank === 1) {
                    averageScoreCell.classList.add('rank-1'); // 1등 스타일 적용
                    averageScoreCell.innerHTML = `<span class="icon">🥇</span> ${data.averageAdjustedScore}`; // 아이콘 추가
                } else if (rank === 2) {
                    averageScoreCell.classList.add('rank-2'); // 2등 스타일 적용
                    averageScoreCell.innerHTML = `<span class="icon">🥈</span> ${data.averageAdjustedScore}`; // 아이콘 추가
                } else if (rank === 3) {
                    averageScoreCell.classList.add('rank-3'); // 3등 스타일 적용
                    averageScoreCell.innerHTML = `<span class="icon">🥉</span> ${data.averageAdjustedScore}`; // 아이콘 추가
                }

            } else {
                gameCountCell.textContent = ""; // 빈칸
                averageScoreCell.textContent = ""; // 빈칸
            }
        });
    });
}


// 해당 월의 1등, 2등, 3등을 확인하는 함수 (최소 4경기 조건 추가)
function getTopRanks(monthKey, member, monthlyData) {
    const membersInMonth = Object.keys(monthlyData[monthKey] || {});
    if (membersInMonth.length === 0) return 0; // 해당 월에 데이터가 없는 경우

    // 4경기 이상인 회원만 필터링
    const eligibleMembers = membersInMonth.filter(member => {
        const gameCount = monthlyData[monthKey][member]?.gameCount || 0;
        return gameCount >= 4;
    });

    // 평균 점수를 기준으로 오름차순 정렬 (낮은 점수가 좋은 점수)
    const sortedMembers = eligibleMembers.sort((a, b) => {
        const aScore = parseFloat(monthlyData[monthKey][a]?.averageAdjustedScore || Infinity);
        const bScore = parseFloat(monthlyData[monthKey][b]?.averageAdjustedScore || Infinity);
        return aScore - bScore;
    });

    // 해당 회원의 등수 반환 (1등, 2등, 3등)
    const rank = sortedMembers.indexOf(member) + 1;
    return rank <= 3 ? rank : 0; // 1등, 2등, 3등만 반환
}

// 전월을 계산하는 함수
function getPreviousMonth(currentMonth) {
    const date = new Date(currentMonth);
    date.setMonth(date.getMonth() - 1);
    return date.toISOString().slice(0, 7); // "YYYY-MM" 형식
}





//
// monthly-scores.html
// 월평균 핸디캡 및 평균타수 챠트
//

// 월간 평균 점수 그래프 렌더링 함수
function renderMonthlyAverageChart() {
    const weeklyChartsContainer = document.getElementById('weeklyCharts');

    // #weeklyCharts 요소가 존재하지 않으면 함수 종료
    if (!weeklyChartsContainer) {
        console.error('#weeklyCharts 요소를 찾을 수 없습니다.');
        return;
    }

    const monthlyAverages = calculateMonthlyAverageScores();
    const monthlyHandicaps = calculateMonthlyAverageHandicap();

    members.forEach(member => {
        const memberData = monthlyAverages[member.name];
        const memberHandicapData = monthlyHandicaps[member.name];
        const months = Object.keys(memberData).sort();
        const averageScores = months.map(month => parseFloat(memberData[month]));
        const averageHandicaps = months.map(month => parseFloat(memberHandicapData[month]));

        // 그래프를 표시할 컨테이너 생성
        const chartContainer = document.createElement('div');
        chartContainer.className = 'chart-container';
        weeklyChartsContainer.appendChild(chartContainer);

        // 캔버스 생성
        const ctx = document.createElement('canvas');
        chartContainer.appendChild(ctx);

        // Chart.js로 그래프 생성
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: months,
                datasets: [
                    {
                        label: `평균 점수`,
                        data: averageScores,
                        backgroundColor: 'rgba(255, 179, 102, 0.2)', // 연한 오렌지색 (배경)
                        borderColor: '#d46b08', // 어두운 오렌지색 (라인)
                        borderWidth: 2,
                        pointBackgroundColor: '#ffb366', // 연한 오렌지색 (포인트)
                        pointBorderColor: '#d46b08', // 어두운 오렌지색 (포인트 테두리)
                        pointRadius: 5,
                        pointHoverRadius: 7,
                        fill: true,
                        yAxisID: 'y-score', // 왼쪽 Y축 (평균 점수)
                    },
                    {
                        label: `평균 핸디캡`,
                        data: averageHandicaps,
                        backgroundColor: 'rgba(26, 188, 156, 0.2)', // 연한 초록색 (배경)
                        borderColor: '#1abc9c', // 어두운 초록색 (라인)
                        borderWidth: 2,
                        pointBackgroundColor: '#1abc9c', // 연한 초록색 (포인트)
                        pointBorderColor: '#16a085', // 어두운 초록색 (포인트 테두리)
                        pointRadius: 5,
                        pointHoverRadius: 7,
                        fill: true,
                        yAxisID: 'y-handicap', // 오른쪽 Y축 (핸디캡 지수)
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                animation: {
                    duration: 1500,
                    easing: 'easeInOutQuad',
                    delay: 300
                },
                plugins: {
                    title: {
                        display: true,
                        text: `${member.name}`,
                        font: {
                            size: 14,
                            weight: 'bold'
                        }
                    },
                    legend: {
                        display: true,
                        position: 'bottom',
                        labels: {
                            font: {
                                size: 12
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: '월',
                            font: {
                                size: 12,
                                //weight: 'bold'
                            }
                        },
                        grid: {
                            display: false
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: '평균 점수',
                            font: {
                                size: 12,
                                //weight: 'bold'
                            }
                        },
                        grid: {
                            color: '#E0E0E0'
                        },
                        ticks: {
                            stepSize: 1,
                            precision: 1,
                            min: Math.floor(Math.min(...averageScores)) - 2,
                            max: Math.ceil(Math.max(...averageScores)) + 2
                        },
                        id: 'y-score', // 왼쪽 Y축 (평균 점수)
                        position: 'left', // 왼쪽에 위치
                    },
                    y1: {
                        title: {
                            display: true,
                            text: '평균 핸디캡',
                            font: {
                                size: 14,
                                weight: 'bold'
                            }
                        },
                        grid: {
                            color: '#E0E0E0'
                        },
                        ticks: {
                            stepSize: 1,
                            precision: 1,
                        },
                        id: 'y-handicap', // 오른쪽 Y축 (핸디캡 지수)
                        position: 'right', // 오른쪽에 위치
                    }
                }
            }
        });
    });
}




// 월간 평균 점수 계산 함수
function calculateMonthlyAverageScores() {
    const monthlyAverages = {};

    members.forEach(member => {
        const memberScores = scores.filter(score => score.name === member.name);
        const monthlyScores = {};

        memberScores.forEach(score => {
            const date = new Date(score.date);

            if (isNaN(date.getTime())) {
                console.error("Invalid date for score:", score);
                return; // 유효하지 않은 날짜인 경우 건너뜀
            }

            // 월별 그룹화 (YYYY-MM 형식)
            const monthKey = date.toISOString().slice(0, 7); // YYYY-MM

            if (!monthlyScores[monthKey]) {
                monthlyScores[monthKey] = [];
            }
            monthlyScores[monthKey].push(score.score);
        });

        monthlyAverages[member.name] = {};
        for (const month in monthlyScores) {
            const averageScore = monthlyScores[month].reduce((sum, score) => sum + score, 0) / monthlyScores[month].length;
            monthlyAverages[member.name][month] = averageScore.toFixed(2);
        }
    });

    return monthlyAverages;
}


// 월별 평균 핸디캡 지수 계산 함수
function calculateMonthlyAverageHandicap() {
    const monthlyHandicaps = {};

    members.forEach(member => {
        const memberScores = scores.filter(score => score.name === member.name);
        const monthlyHandicapScores = {};

        memberScores.forEach(score => {
            const date = new Date(score.date);

            if (isNaN(date.getTime())) {
                console.error("Invalid date for score:", score);
                return; // 유효하지 않은 날짜인 경우 건너뜀
            }

            // 월별 그룹화 (YYYY-MM 형식)
            const monthKey = date.toISOString().slice(0, 7); // YYYY-MM

            // 골프장 정보 찾기
            const golfCourse = golfCourses.find(course => course.name === score.golfCourse);
            if (!golfCourse) {
                console.error("Golf course not found for score:", score);
                return; // 골프장 정보가 없는 경우 건너뜀
            }

            // 수정: 회원의 성별과 티박스 정보에 맞는 코스 레이팅과 슬로프 레이팅 조회
            const teeBoxInfo = golfCourse.teeBoxes.find(
                t => t.gender === member.gender && t.teeBox === score.teeBox
            );
            if (!teeBoxInfo) {
                console.error(`티박스 정보를 찾을 수 없습니다: 골프장 ${score.golfCourse}, 성별 ${member.gender}, 티박스 ${score.teeBox}`);
                return null; // 티박스 정보가 없는 경우
            }

            //console.log(`MonthlyAve 회원: ${member.name}, CourseRating: ${teeBoxInfo.courseRating}, slopeRating: ${teeBoxInfo.slopeRating} `);

            //const courseRating = golfCourse.courseRating;
            //const slopeRating = golfCourse.slopeRating;
            const courseRating = teeBoxInfo.courseRating;
            const slopeRating = teeBoxInfo.slopeRating;
            const handicapIndex = ((score.score - courseRating) / slopeRating) * 113;

            if (!monthlyHandicapScores[monthKey]) {
                monthlyHandicapScores[monthKey] = [];
            }
            monthlyHandicapScores[monthKey].push(handicapIndex);
        });

        monthlyHandicaps[member.name] = {};
        for (const month in monthlyHandicapScores) {
            const averageHandicap = monthlyHandicapScores[month].reduce((sum, handicap) => sum + handicap, 0) / monthlyHandicapScores[month].length;
            monthlyHandicaps[member.name][month] = averageHandicap.toFixed(2);
        }
    });

    return monthlyHandicaps;
}


//
// Member-Detail-Score.html
//

// 회원 선택 목록 업데이트
function updateMemberDetailSelect() {
    const memberSelect = document.getElementById('memberSelect');
    if (!memberSelect) {
        console.error('memberSelect 요소를 찾을 수 없습니다.');
        return;
    }

    // 회원 목록을 이름 순으로 정렬
    const sortedMembers = members.slice().sort((a, b) => a.name.localeCompare(b.name));

    memberSelect.innerHTML = '<option value="">-</option>';

    sortedMembers.forEach(member => {
        const option = document.createElement('option');
        option.value = member.name;
        option.textContent =  member.name; // member.nickname || member.name; // 닉네임, 없으면 이름 표시
        memberSelect.appendChild(option);
    });
}

/* 회원별 상세 정보 표시
function showMemberDetails(memberName) {

    // 날짜 기준 내림차순 정렬
    const memberScores = scores
        .filter(score => score.name === memberName)
        .sort((a, b) => new Date(b.date) - new Date(a.date)); // 날짜 내림차순 정렬

    // 최신 20경기와 상위 8경기 계산
    const recent20Scores = memberScores.slice(0, 20); // 최신 20경기

    const top8Scores = recent20Scores
        .map(score => {
            const golfCourse = golfCourses.find(c => c.name === score.golfCourse);
            if (!golfCourse) {
                console.error(`골프장 정보를 찾을 수 없습니다: ${score.golfCourse}`);
                return null;
            }

            // gender가 undefined인 경우 기본값 설정
            const gender = score.gender || '남성'; // 기본값: 남성
            const teeBoxInfo = golfCourse.teeBoxes.find(
                t => t.gender === gender && t.teeBox === score.teeBox
            );

            if (!teeBoxInfo) {
                console.error(`티박스 정보를 찾을 수 없습니다: 골프장 ${score.golfCourse}, 성별 ${gender}, 티박스 ${score.teeBox}`);
                return null;
            }

            const courseRating = teeBoxInfo.courseRating;
            const slopeRating = teeBoxInfo.slopeRating;
            const handicapIndex = ((score.score - courseRating) / slopeRating) * 113;

            return { ...score, courseRating, slopeRating, handicapIndex };
        })
        .filter(score => score !== null)
        .sort((a, b) => a.handicapIndex - b.handicapIndex) // 핸디캡 지수 오름차순 정렬
        .slice(0, Math.ceil(recent20Scores.length * 0.4)); // 상위 40% 선택

    // 테이블 업데이트
    const tableBody = document.getElementById('memberDetailsTable').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = '';

    memberScores.forEach(score => {
        const golfCourse = golfCourses.find(c => c.name === score.golfCourse);
        if (!golfCourse) {
            console.error(`골프장 정보를 찾을 수 없습니다: ${score.golfCourse}`);
            return;
        }

        // gender가 undefined인 경우 기본값 설정
        const gender = score.gender || '남성'; // 기본값: 남성
        const teeBoxInfo = golfCourse.teeBoxes.find(
            t => t.gender === gender && t.teeBox === score.teeBox
        );

        if (!teeBoxInfo) {
            console.error(`티박스 정보를 찾을 수 없습니다: 골프장 ${score.golfCourse}, 성별 ${gender}, 티박스 ${score.teeBox}`);
            return;
        }

        const courseRating = teeBoxInfo.courseRating;
        const slopeRating = teeBoxInfo.slopeRating;
        const handicapIndex = ((score.score - courseRating) / slopeRating) * 113;

        const row = tableBody.insertRow();

        // 최소 경기수(10경기)를 채운 경우에만 recent-20 및 top-8 스타일 적용
        if (memberScores.length >= 10) {
            const isRecent20 = recent20Scores.some(recentScore =>
                recentScore.date === score.date &&
                recentScore.golfCourse === score.golfCourse
            );
            const isTop8 = top8Scores.some(topScore =>
                topScore.date === score.date &&
                topScore.golfCourse === score.golfCourse
            );

            if (isRecent20) row.classList.add('recent-20');
            if (isTop8) row.classList.add('top-8');
        }

        row.insertCell(0).textContent = score.date; // 경기 날짜
        row.insertCell(1).textContent = score.golfCourse; // 골프장
        row.insertCell(2).textContent = score.teeBox; // 티박스 Gender
        row.insertCell(3).textContent = courseRating; // 코스 레이팅
        row.insertCell(4).textContent = slopeRating; // 슬로프 레이팅
        row.insertCell(5).textContent = score.score; // 점수
        row.insertCell(6).textContent = handicapIndex.toFixed(2); // 핸디캡 지수
    });
}
*/

function showMemberDetails(memberName) {
    const member = members.find(m => m.name === memberName);
    if (!member) return;

    const memberScores = scores
        .filter(score => score.name === memberName)
        .sort((a, b) => new Date(b.date) - new Date(a.date)); // 날짜 내림차순 정렬

    const tableBody = document.getElementById('memberDetailsTable').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = '';

    // 최종 핸디캡 계산
    const weeklyHandicaps = calculateWeeklyHandicap();
    const recent12WeekEnds = getRecent12WeekEnds();
    const latestWeekEnd = recent12WeekEnds[0]; // 최신 주의 일요일 날짜
    const finalHandicap = weeklyHandicaps[member.name]?.[latestWeekEnd] || member.baseHandicap || 0;

    // 최종 핸디캡 표시
    const finalHandicapDisplay = document.getElementById('finalHandicapDisplay');
    finalHandicapDisplay.textContent = finalHandicap; // Math.floor(finalHandicap); // 소수점 제거

    // 설명 메시지 업데이트
    const infoMessage = document.getElementById('handicapInfoMessage');
    if (memberScores.length < 10) {
        infoMessage.textContent = `* ${member.name} 회원은 최소 경기수(10경기)를 채우지 못했습니다. 핸디캡 계산 대신 기준 핸디캡(${member.baseHandicap || 'Undefined'})이 적용됩니다.`;
    } else {
        infoMessage.textContent = '* Handicap Index = (경기점수 - Course Rating) * (113 / Slope Rating). 최종 핸디캡은 20 경기 중, 상위 8 개 (주황색으로 표시) 의 Handicap Index 의 평균입니다.';
    }

    // 최신 20경기와 상위 8경기 계산 (최소 경기수 충족 시에만 적용)
    const recent20Scores = memberScores.length >= 10 ? memberScores.slice(0, 20) : [];
    const top8Scores = recent20Scores
        .map(score => {
            const golfCourse = golfCourses.find(c => c.name === score.golfCourse);
            if (!golfCourse) {
                console.error(`골프장 정보를 찾을 수 없습니다: ${score.golfCourse}`);
                return null;
            }

            const teeBoxInfo = golfCourse.teeBoxes.find(
                t => t.gender === member.gender && t.teeBox === score.teeBox
            );
            if (!teeBoxInfo) {
                console.error(`티박스 정보를 찾을 수 없습니다: 골프장 ${score.golfCourse}, 성별 ${member.gender}, 티박스 ${score.teeBox}`);
                return null;
            }

            const courseRating = teeBoxInfo.courseRating;
            const slopeRating = teeBoxInfo.slopeRating;
            const handicapIndex = ((score.score - courseRating) / slopeRating) * 113;

            return { ...score, courseRating, slopeRating, handicapIndex };
        })
        .filter(score => score !== null)
        .sort((a, b) => a.handicapIndex - b.handicapIndex) // 핸디캡 지수 오름차순 정렬
        .slice(0, Math.ceil(recent20Scores.length * 0.4)); // 상위 40% 선택

    // 테이블에 데이터 추가
    memberScores.forEach((score, index) => {
        const golfCourse = golfCourses.find(c => c.name === score.golfCourse);
        if (!golfCourse) {
            console.error(`골프장 정보를 찾을 수 없습니다: ${score.golfCourse}`);
            return;
        }

        const teeBoxInfo = golfCourse.teeBoxes.find(
            t => t.gender === member.gender && t.teeBox === score.teeBox
        );
        if (!teeBoxInfo) {
            console.error(`티박스 정보를 찾을 수 없습니다: 골프장 ${score.golfCourse}, 성별 ${member.gender}, 티박스 ${score.teeBox}`);
            return;
        }

        const courseRating = teeBoxInfo.courseRating;
        const slopeRating = teeBoxInfo.slopeRating;
        const handicapIndex = ((score.score - courseRating) / slopeRating) * 113;

        const row = tableBody.insertRow();

        // 번호 추가
        row.insertCell(0).textContent = index + 1; // 번호 (1부터 시작)

        // 최소 경기수(10경기)를 채운 경우에만 recent-20 및 top-8 스타일 적용
        if (memberScores.length >= 10) {
            const isRecent20 = recent20Scores.some(recentScore =>
                recentScore.date === score.date &&
                recentScore.golfCourse === score.golfCourse
            );
            const isTop8 = top8Scores.some(topScore =>
                topScore.date === score.date &&
                topScore.golfCourse === score.golfCourse
            );

            if (isRecent20) row.classList.add('recent-20');
            if (isTop8) row.classList.add('top-8');
        }

        row.insertCell(1).textContent = score.date; // 경기 날짜
        row.insertCell(2).textContent = score.golfCourse; // 골프장
        row.insertCell(3).textContent = score.teeBox; // 티박스
        row.insertCell(4).textContent = courseRating; // 코스 레이팅
        row.insertCell(5).textContent = slopeRating; // 슬로프 레이팅
        row.insertCell(6).textContent = score.score; // 점수
        row.insertCell(7).textContent = handicapIndex.toFixed(2); // 핸디캡 지수
    });
}


// 회원별 상세 정보 초기화
function clearMemberDetails() {
    const tableBody = document.getElementById('memberDetailsTable').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = '';
}

// 회원별 최근 12주 핸디캡 변동 그래프 렌더링
function renderMemberWeeklyHandicapChart(memberName) {
    const weeklyHandicaps = calculateWeeklyHandicap();
    const recent12WeekEnds = getRecent12WeekEnds();

    // 날짜를 MM-DD 형식으로 변환 (X축 레이블용)
    const labels = recent12WeekEnds.reverse().map(date => {
        const [year, month, day] = date.split('-'); // YYYY-MM-DD를 분리
        return `${month}-${day}`; // MM-DD 형식으로 반환
    });

    // 데이터 조회는 YYYY-MM-DD 형식으로 수행
    const data = recent12WeekEnds.map(date => weeklyHandicaps[memberName]?.[date] || 0);

    // 그래프를 표시할 컨테이너 생성
    const chartContainer = document.getElementById('memberWeeklyHandicapChart');
    chartContainer.innerHTML = ''; // 기존 내용 초기화

    // 캔버스 생성
    const ctx = document.createElement('canvas');
    chartContainer.appendChild(ctx);

    // Chart.js로 그래프 생성
    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: `${memberName}의 주간 핸디캡`,
                data: data,
                borderColor: '#4CAF50', // 녹색 계열 (어두운 초록색) // '#e67a1a', // 오렌지색
                backgroundColor: 'rgba(76, 175, 80, 0.2)', // 연한 초록색 (투명도 추가) // 'rgba(230, 122, 26, 0.2)', // 연한 오렌지색
                borderWidth: 2,
                pointBackgroundColor: '#4CAF50', // 포인트 배경색 (어두운 초록색) // '#e67a1a', // 포인트 배경색
                pointBorderColor: '#388E3C', // 포인트 테두리 색상 (더 어두운 초록색) // '#d46b08', // 포인트 테두리 색상
                pointRadius: 5,
                pointHoverRadius: 7,
                fill: true,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: false,
                    text: `최근 12주 핸디캡 변동 그래프`,
                    font: {
                        size: 14,
                        weight: 'bold'
                    }
                },
                legend: {
                    display: false, // 레전드 숨기기
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: '핸디캡 업데이트 날짜 (일요일 경기 등록 후)',
                        font: {
                            size: 12,
                            //weight: 'bold'
                        }
                    },
                    grid: {
                        display: false
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: '핸디캡',
                        font: {
                            size: 12,
                            //weight: 'bold'
                        }
                    },
                    grid: {
                        color: '#E0E0E0'
                    },
                    ticks: {
                        stepSize: 1,
                        precision: 1,
                    }
                }
            }
        }
    });
}





//
// 원본 (72회) CSV 경기 기록 파일 업로드
//

let tempScores = []; // 임시로 저장할 점수 데이터

// 경기 기록 CSV 파일 업로드 시 등록 버튼 활성화
if (document.getElementById('csvFile')) {
    document.getElementById('csvFile').addEventListener('change', function (event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const csvData = e.target.result;
                const parsedData = parseCSV(csvData); // parsedData 변수에 저장
                if (parsedData && parsedData.length > 0) {
                    tempScores = parsedData; // 임시 변수에 데이터 저장
                    document.getElementById('csvRegisterButton').disabled = false; // CSV 등록 버튼 활성화
                    alert('CSV 파일이 업로드되었습니다. "CSV 파일 등록" 버튼을 눌러 점수를 등록하세요.');
                } else {
                    alert('CSV 파일에 유효한 데이터가 없습니다.');
                }
            };
            reader.onerror = function (e) {
                alert('CSV 파일을 읽는 중 오류가 발생했습니다.');
            };
            reader.readAsText(file);
        }
    });
}

// CSV 파일 등록 버튼 클릭 시 임시 데이터를 scores 배열에 추가
if (document.getElementById('csvRegisterButton')) {
    document.getElementById('csvRegisterButton').addEventListener('click', function () {
        if (tempScores.length > 0) {
            addAllScores(tempScores); // 임시 데이터를 scores 배열에 추가
            tempScores = []; // 임시 데이터 초기화
            document.getElementById('csvRegisterButton').disabled = true; // 버튼 비활성화
            alert('CSV 파일의 모든 경기 점수가 등록되었습니다.');
        } else {
            alert('업로드된 CSV 파일이 없습니다.');
        }
    });
}

// 모든 경기 점수를 scores 배열에 추가하는 함수
function addAllScores(parsedData) {
    if (!Array.isArray(scores)) {
        scores = [];
    }

    parsedData.forEach(row => {
        const { date, golfCourse, teeBox, scores: rowScores } = row;

        // 각 회원의 점수를 scores 배열에 추가
        Object.entries(rowScores).forEach(([memberShortName, score]) => {
            if (score !== '') {
                // members 배열에서 회원 찾기 (세 글자로 먼저 찾고, 실패하면 끝 두 글자로 찾기)
                const member = members.find(m => m.name === memberShortName) || // 세 글자로 찾기
                               members.find(m => m.name.endsWith(memberShortName)); // 끝 두 글자로 찾기

                if (member) {
                    scores.push({
                        name: member.name, // 전체 이름 사용
                        date,
                        golfCourse,
                        teeBox,
                        score: parseInt(score, 10) // 점수를 숫자로 변환
                    });
                } else {
                    console.warn(`회원을 찾을 수 없습니다: ${memberShortName}`);
                }
            }
        });
    });

    // 로컬 스토리지에 저장
    localStorage.setItem('scores', JSON.stringify(scores));

    // 점수 기록 테이블 업데이트
    if (document.getElementById('scoreTable')) {
        updateScoreTable();
    }

    alert('CSV 파일의 모든 경기 점수가 등록되었습니다.');
}

function parseCSV(csvData) {
    // BOM 문자 제거 (만약 있다면)
    if (csvData.charCodeAt(0) === 0xFEFF) {
        csvData = csvData.substring(1);
    }

    const lines = csvData.split('\n').filter(line => line.trim() !== ''); // 빈 줄 제거
    if (lines.length < 2) return []; // 헤더와 최소 한 줄의 데이터가 없으면 빈 배열 반환

    const headers = lines[0].split(',').map(header => header.trim()); // 헤더 (날짜, 골프장, 티박스, 회원1, 회원2, ..., 회원24)
    const data = [];

    for (let i = 1; i < lines.length; i++) {
        const currentLine = lines[i].split(',');
        if (currentLine.length === headers.length) {
            const row = {
                date: currentLine[0].trim(), // 날짜
                golfCourse: currentLine[1].trim(), // 골프장
                teeBox: currentLine[2].trim(), // 티박스
                scores: {}
            };

            // 골프장 정보 찾기
            const golfCourseInfo = golfCourses.find(course => course.name === row.golfCourse);
            if (!golfCourseInfo) {
                console.error(`골프장 정보를 찾을 수 없습니다: ${row.golfCourse}`);
                continue; // 골프장 정보가 없으면 건너뜀
            }

            const teeBoxInfo = golfCourseInfo.teeBoxes.find(t => t.teeBox === row.teeBox);
            if (!teeBoxInfo) {
                console.error(`티박스 정보를 찾을 수 없습니다: 골프장 ${row.golfCourse}, 티박스 ${row.teeBox}`);
                continue; // 티박스 정보가 없으면 건너뜀
            }

            const par = teeBoxInfo.par || 72; // 기본값은 72
            //console.log('티박스 인퍼:', teeBoxInfo);
            

            // 회원별 점수 처리 (파(Par)를 기준으로 추가 점수 계산)
            for (let j = 3; j < headers.length; j++) {
                const memberShortName = headers[j].trim(); // CSV 파일의 회원 이름 (끝 두 글자)
                const additionalScore = currentLine[j].trim(); // 추가 점수 (빈 값일 수 있음)

                // members 배열에서 회원 찾기 (세 글자로 먼저 찾고, 실패하면 끝 두 글자로 찾기)
                const member = members.find(m => m.name === memberShortName) || // 세 글자로 찾기
                               members.find(m => m.name.endsWith(memberShortName)); // 끝 두 글자로 찾기

                if (member && additionalScore !== '' && !isNaN(additionalScore)) {
                    row.scores[member.name] = par + parseInt(additionalScore, 10); // 파(Par) + 추가 점수
                    //console.log('회원 이름:', member.name, '점수:', row.scores[member.name]); // 디버깅용 로그
                } else {
                    row.scores[memberShortName] = ''; // 유효한 점수가 아닌 경우 빈 값으로 처리
                    //console.log('회원을 찾을 수 없거나 점수가 유효하지 않음:', memberShortName); // 디버깅용 로그
                }
            }

            data.push(row);
        }
    }

    return data;
}



//
// analytics.html 경기 데이터 분석 
//


// 경기 기록 분석 데이터 계산
function calculateAnalyticsData(filteredScores = scores) {
    const weeklyHandicaps = calculateWeeklyHandicap();
    const analyticsData = [];

    members.forEach(member => {
        const memberScores = filteredScores.filter(score => score.name === member.name);
        let firstPlaceCount = 0;
        let topHalfCount = 0;

        memberScores.forEach(score => {
            const scoreDate = new Date(score.date);
            const previousWeekEnd = getClosestPreviousSunday(scoreDate);
            const previousWeekHandicap = weeklyHandicaps[member.name]?.[previousWeekEnd] || 0;

            // 골프장 정보 찾기
            const golfCourse = golfCourses.find(course => course.name === score.golfCourse);
            if (!golfCourse) {
                console.warn(`골프장 정보를 찾을 수 없습니다: ${score.golfCourse}`);
                return; // 골프장 정보가 없으면 건너뜀
            }

            // 티박스 정보 찾기
            const teeBoxInfo = golfCourse.teeBoxes.find(
                t => t.gender === member.gender && t.teeBox === score.teeBox
            );
            if (!teeBoxInfo) {
                console.warn(`티박스 정보를 찾을 수 없습니다: 골프장 ${score.golfCourse}, 성별 ${member.gender}, 티박스 ${score.teeBox}`);
                return; // 티박스 정보가 없으면 건너뜀
            }

            // 파골사 지수 계산
            const courseRating = teeBoxInfo.courseRating;
            const slopeRating = teeBoxInfo.slopeRating;
            const handicapIndex = ((score.score - courseRating) / slopeRating) * 113;
            const pargolsaScore = handicapIndex - previousWeekHandicap;

            // 같은 날짜의 다른 회원들과 비교
            const sameDateScores = filteredScores.filter(s => s.date === score.date);
            const pargolsaScores = sameDateScores.map(s => {
                const course = golfCourses.find(c => c.name === s.golfCourse);
                if (!course) {
                    console.warn(`골프장 정보를 찾을 수 없습니다: ${s.golfCourse}`);
                    return Infinity; // 골프장 정보가 없으면 무한대 반환
                }

                const teeBox = course.teeBoxes.find(
                    t => t.gender === members.find(m => m.name === s.name)?.gender && t.teeBox === s.teeBox
                );
                if (!teeBox) {
                    console.warn(`티박스 정보를 찾을 수 없습니다: 골프장 ${s.golfCourse}, 성별 ${members.find(m => m.name === s.name)?.gender}, 티박스 ${s.teeBox}`);
                    return Infinity; // 티박스 정보가 없으면 무한대 반환
                }

                const rating = ((s.score - teeBox.courseRating) / teeBox.slopeRating) * 113;
                return rating - (weeklyHandicaps[s.name]?.[previousWeekEnd] || 0);
            });

            // 1등 확인
            if (pargolsaScore === Math.min(...pargolsaScores)) {
                firstPlaceCount++;
            }

            // 상위 절반 확인
            const sortedScores = pargolsaScores.sort((a, b) => a - b);
            let halfIndex = Math.floor(sortedScores.length / 2); // 소수점 이하 버림

            // 참가 인원이 짝수인 경우, 한 명을 더 뺌
            if (sortedScores.length % 2 === 0) {
                halfIndex -= 1; // 짝수인 경우 한 명을 더 뺌
            }

            if (pargolsaScore <= sortedScores[halfIndex - 1]) { // 상위 절반의 마지막 인덱스
                topHalfCount++;
            }
        });

        analyticsData.push({
            name: member.name,
            totalGames: memberScores.length,
            firstPlace: firstPlaceCount,
            topHalf: topHalfCount,
        });
    });

    // 회원 이름으로 정렬
    analyticsData.sort((a, b) => a.name.localeCompare(b.name));

    return analyticsData;
}


// 날짜 필터 적용 함수
function applyFilters() {
    const startDate = document.getElementById("startDate").value;
    const endDate = document.getElementById("endDate").value;

    // 날짜 필터링된 데이터 계산
    const filteredScores = scores.filter(score => {
        const scoreDate = new Date(score.date);
        const start = new Date(startDate);
        const end = new Date(endDate);
        return scoreDate >= start && scoreDate <= end;
    });

    // 필터링된 데이터로 분석 데이터 계산
    const analyticsData = calculateAnalyticsData(filteredScores);

    // 테이블 및 그래프 업데이트
    updateAnalyticsTable(analyticsData);
    updateAnalyticsCharts(analyticsData);
    updateTopHalfRatioChart(analyticsData);
    updateGolfCourseBarChart(filteredScores);
}

// 테이블 업데이트
function updateAnalyticsTable(data) {
    const tableBody = document.querySelector("#analyticsTable tbody");
    tableBody.innerHTML = "";

    data.forEach(member => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${member.name}</td>
            <td>${member.totalGames}</td>
            <td>${member.firstPlace}</td>
            <td>${member.topHalf}</td>
            <td>${((member.topHalf / member.totalGames) * 100).toFixed(1)}%</td>
        `;
        tableBody.appendChild(row);
    });
}

// 그래프 업데이트
let barChartInstance = null;

function updateAnalyticsCharts(data) {
    const labels = data.map(member => member.name.slice(-2));
    const firstPlaceData = data.map(member => member.firstPlace);
    const topHalfData = data.map(member => member.topHalf);

    // Destroy existing charts if they exist
    if (barChartInstance) {
        barChartInstance.destroy();
    }

    // Create new stacked line chart
    barChartInstance = new Chart(document.getElementById("barChart"), {
        type: "line", // 라인 차트로 변경
        data: {
            labels: labels,
            datasets: [
                {
                    label: "1등 횟수",
                    data: firstPlaceData,
                    backgroundColor: "rgba(230, 122, 26, 0.2)", // 오렌지색 배경 (투명도 추가)
                    borderColor: "#e67a1a", // 오렌지색 라인
                    borderWidth: 2,
                    fill: true, // 채우기 활성화
                    tension: 0.4, // 곡선 형태로 라인을 부드럽게 표시
                    pointStyle: "circle", // 포인트 스타일을 원형으로 설정
                    pointBackgroundColor: "#e67a1a", // 포인트 배경색 (오렌지색)
                    pointBorderColor: "#ffffff", // 포인트 테두리 색상 (흰색)
                    pointRadius: 5, // 포인트 크기
                    pointHoverRadius: 7, // 호버 시 포인트 크기
                },
                {
                    label: "상위 40% 이상 횟수",
                    data: topHalfData,
                    backgroundColor: "rgba(76, 175, 80, 0.2)", // 녹색 배경 (투명도 추가)
                    borderColor: "#4CAF50", // 녹색 라인
                    borderWidth: 2,
                    fill: true, // 채우기 활성화
                    tension: 0.4, // 곡선 형태로 라인을 부드럽게 표시
                    pointStyle: "circle", // 포인트 스타일을 원형으로 설정
                    pointBackgroundColor: "#4CAF50", // 포인트 배경색 (녹색)
                    pointBorderColor: "#ffffff", // 포인트 테두리 색상 (흰색)
                    pointRadius: 5, // 포인트 크기
                    pointHoverRadius: 7, // 호버 시 포인트 크기
                },
            ],
        },
        options: {
            responsive: true, // 반응형으로 설정
            maintainAspectRatio: false, // 비율 유지하지 않음
            plugins: {
                title: {
                    display: true,
                    text: "회원별 성적 상위 랭킹 횟수",
                    font: {
                        size: 16,
                        family: "Poppins",
                        weight: "bold",
                    },
                },
                legend: {
                    display: true,
                    position: "bottom",
                    labels: {
                        font: {
                            size: 12,
                            family: "Poppins",
                        },
                    },
                },
                tooltip: {
                    mode: "index", // 여러 데이터셋의 툴팁을 동시에 표시
                    intersect: false, // 마우스가 라인 위에 있을 때 툴팁 표시
                },
            },
            scales: {
                x: {
                    grid: {
                        display: false, // x축 그리드 숨기기
                    },
                    ticks: {
                        font: {
                            family: "Poppins",
                            size: 12,
                        },
                        autoSkip: true, // 레이블 자동 스킵
                        maxRotation: 90, // 레이블 회전 각도 (세로 방향)
                        minRotation: 0, // 최소 회전 각도
                    },
                },
                y: {
                    stacked: true, // y축 누적 설정
                    grid: {
                        display: false, // y축 그리드 숨기기
                    },
                    ticks: {
                        font: {
                            family: "Poppins",
                            size: 12,
                        },
                    },
                },
            },
            interaction: {
                mode: "nearest", // 가장 가까운 데이터 포인트에 툴팁 표시
                axis: "x", // x축을 기준으로 툴팁 표시
            },
        },
    });

    // 화면 크기 변경 시 차트 리사이즈
    window.addEventListener("resize", () => {
        barChartInstance.resize(); // 차트 크기 조정
    });
}


let topHalfRatioChartInstance = null;

function updateTopHalfRatioChart(data) {
    const labels = data.map(member => member.name.slice(-2));
    const topHalfRatioData = data.map(member => ((member.topHalf / member.totalGames) * 100).toFixed(1));

    // Destroy existing chart if it exists
    if (topHalfRatioChartInstance) {
        topHalfRatioChartInstance.destroy();
    }

    // Create new line chart
    topHalfRatioChartInstance = new Chart(document.getElementById("topHalfRatioChart"), {
        type: "line",
        data: {
            labels: labels,
            datasets: [{
                label: "상위 40% 이상 비율 (%)",
                data: topHalfRatioData,
                borderColor: "#4CAF50", // 녹색 계열 (어두운 초록색)
                backgroundColor: "rgba(76, 175, 80, 0.2)", // 연한 초록색 (투명도 추가)
                borderWidth: 2,
                pointBackgroundColor: "#4CAF50", // 포인트 배경색 (어두운 초록색)
                pointBorderColor: "#ffffff", // 포인트 테두리 색상 (흰색)
                pointRadius: 5,
                pointHoverRadius: 7,
                fill: true,
                tension: 0.4, // 곡선 형태로 라인을 부드럽게 표시
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: "회원별 상위 랭킹 40% 이상 비율 (%)",
                    font: {
                        size: 16,
                        family: "Poppins",
                        weight: "bold",
                    },
                },
                legend: {
                    display: true,
                    position: "bottom",
                    labels: {
                        font: {
                            size: 12,
                            family: "Poppins",
                        },
                    },
                },
                tooltip: {
                    mode: "index",
                    intersect: false,
                },
            },
            scales: {
                x: {
                    grid: {
                        display: false,
                    },
                    ticks: {
                        font: {
                            family: "Poppins",
                            size: 12,
                        },
                        autoSkip: true,
                        maxRotation: 90,
                        minRotation: 0,
                    },
                },
                y: {
                    title: {
                        display: true,
                        text: "상위 절반 이상 비율 (%)",
                        font: {
                            size: 12,
                            family: "Poppins",
                        },
                    },
                    grid: {
                        display: false,
                    },
                    ticks: {
                        font: {
                            family: "Poppins",
                            size: 12,
                        },
                    },
                },
            },
            interaction: {
                mode: "nearest",
                axis: "x",
            },
        },
    });
}


// 골프장별 경기 횟수 계산 함수
function calculateGolfCourseCounts(filteredScores = scores) {
    const golfCourseCounts = {};

    // 날짜와 골프장의 조합을 저장할 Set
    const uniqueCombinations = new Set();

    filteredScores.forEach(score => {
        const key = `${score.date}-${score.golfCourse}`; // 날짜와 골프장의 조합
        if (!uniqueCombinations.has(key)) {
            uniqueCombinations.add(key); // 고유한 조합만 저장

            // 골프장별 경기 횟수 카운트
            if (golfCourseCounts[score.golfCourse]) {
                golfCourseCounts[score.golfCourse]++;
            } else {
                golfCourseCounts[score.golfCourse] = 1;
            }
        }
    });

    // 골프장 이름순으로 정렬
    const sortedGolfCourses = Object.keys(golfCourseCounts).sort((a, b) => a.localeCompare(b));
    const sortedCounts = {};
    sortedGolfCourses.forEach(golfCourse => {
        sortedCounts[golfCourse] = golfCourseCounts[golfCourse];
    });

    return sortedCounts;
}

// 녹색 계열 그라데이션 색상 생성 함수
function getGreenGradient(ctx, chartArea) {
    const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
    gradient.addColorStop(0, 'rgba(76, 175, 80, 0.6)'); // 연한 녹색
    gradient.addColorStop(1, 'rgba(26, 188, 156, 0.6)'); // 더 연한 녹색
    return gradient;
}

// 골프장별 경기 횟수 차트 업데이트 함수
function updateGolfCourseBarChart(filteredScores) {
    const golfCourseCounts = calculateGolfCourseCounts(filteredScores);
    const labels = Object.keys(golfCourseCounts);
    const data = Object.values(golfCourseCounts);

    const ctx = document.getElementById('golfCourseBarChart').getContext('2d');

    // 기존 차트가 있으면 제거
    if (window.golfCourseBarChart && typeof window.golfCourseBarChart.destroy === 'function') {
        window.golfCourseBarChart.destroy();
    }

    // 새로운 차트 생성
    window.golfCourseBarChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: '경기 횟수',
                data: data,
                backgroundColor: function (context) {
                    const chart = context.chart;
                    const { ctx, chartArea } = chart;
                    if (!chartArea) return null; // 차트 영역이 없을 경우
                    return getGreenGradient(ctx, chartArea); // 녹색 그라데이션 적용
                },
                borderColor: 'rgba(76, 175, 80, 1)', // 녹색 테두리
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: '골프장별 경기 횟수',
                    font: {
                        size: 16,
                        family: "Poppins",
                        weight: 'bold'
                    }
                },
                legend: {
                    display: false // 레전드 숨기기
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: '골프장',
                        font: {
                            size: 12,
                            family: "Poppins"
                        }
                    },
                    grid: {
                        display: false
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: '경기 횟수',
                        font: {
                            size: 12,
                            family: "Poppins"
                        }
                    },
                    grid: {
                        color: '#E0E0E0'
                    },
                    ticks: {
                        stepSize: 1, // y축 간격
                        precision: 0
                    }
                }
            }
        }
    });
}





//
// 데이터 백업
//


// 데이터를 CSV 형식으로 변환하는 함수
function convertToCSV(data) {
    if (data.length === 0) return ''; // 데이터가 없으면 빈 문자열 반환

    // 헤더 생성 (데이터의 첫 번째 객체의 키를 사용)
    const headers = Object.keys(data[0]).join(',');

    // 각 행을 CSV 형식으로 변환
    const rows = data.map(item => 
        Object.values(item).map(value => {
            // 값이 문자열인 경우, 쌍따옴표로 감싸고 내부의 쌍따옴표는 두 번 반복
            //if (typeof value === 'string') {
            //    return `"${value.replace(/"/g, '""')}"`;
            //}
            return value; // 숫자나 불리언 값은 그대로 반환
        }).join(',')
    ).join('\n');

    // 헤더와 행을 결합하여 CSV 문자열 반환 + BOM \uFEFF 추가 (UTF-8 인코딩을 위해)
    return '\uFEFF' + `${headers}\n${rows}`;
}


// golfCourse 객체를 CSV로 변환하는 함수
function convertGolfCoursesToCSV(golfCourses) {
    if (golfCourses.length === 0) return ''; // 데이터가 없으면 빈 문자열 반환

    // 헤더 생성
    const headers = [
        "Golf Course Name", // 골프장 이름
        "Gender",           // 성별
        "Tee Box",          // 티박스
        "Course Rating",    // 코스 레이팅
        "Slope Rating",     // 슬로프 레이팅
        "Par"               // 파
    ].join(',');

    // 각 골프장의 티박스 정보를 평탄화하여 CSV 행으로 변환
    const rows = golfCourses.flatMap(course => {
        return course.teeBoxes.map(teeBox => {
            return [
                course.name,         // 골프장 이름
                teeBox.gender,       // 성별
                teeBox.teeBox,       // 티박스
                teeBox.courseRating, // 코스 레이팅
                teeBox.slopeRating,  // 슬로프 레이팅
                teeBox.par           // 파
            ].join(',');
        });
    }).join('\n');

    // 헤더와 행을 결합하여 CSV 문자열 반환 + BOM \uFEFF 추가 (UTF-8 인코딩을 위해)
    return '\uFEFF' + `${headers}\n${rows}`;
}

// scores 데이터를 CSV로 변환하는 함수
function convertScoresToCSV(scores) {
    if (scores.length === 0) return ''; // 데이터가 없으면 빈 문자열 반환

    // 헤더 생성
    const headers = [
        "Name",             // 회원 이름
        "Date",             // 경기 날짜
        "Golf Course",      // 골프장
        "Tee Box",          // 티박스
        "Score",            // 점수
        "Ignore Handicap",  // 핸디캡 계산 미반영 여부
        "Ignore League"     // 파골사 리그 미반영 여부
    ].join(',');

    // 각 점수 데이터를 CSV 행으로 변환
    const rows = scores.map(score => {
        return [
            score.name || '', // 회원 이름
            score.date || '', // 경기 날짜
            score.golfCourse || '', // 골프장
            score.teeBox || '', // 티박스
            score.score || '', // 점수
            score.ignoreHandicap !== undefined ? score.ignoreHandicap : false, // ignoreHandicap (없으면 false)
            score.ignoreLeague !== undefined ? score.ignoreLeague : false // ignoreLeague (없으면 false)
        ].join(',');
    }).join('\n');

    // 헤더와 행을 결합하여 CSV 문자열 반환 + BOM \uFEFF 추가 (UTF-8 인코딩을 위해)
    return '\uFEFF' + `${headers}\n${rows}`;
}

// 전체 데이터를 ZIP 파일로 내보내는 함수
function exportAllData() {
    if (members.length === 0 && golfCourses.length === 0 && scores.length === 0) {
        alert('내보낼 데이터가 없습니다.');
        return;
    }

    const zip = new JSZip();
    const date = getFormattedDate();

    if (members.length > 0) {
        const membersCSV = convertToCSV(members);
        zip.file(`members_${date}.csv`, membersCSV);
    }

    if (golfCourses.length > 0) {
        const golfCoursesCSV = convertGolfCoursesToCSV(golfCourses);
        zip.file(`golfCourses_${date}.csv`, golfCoursesCSV);
    }

    if (scores.length > 0) {
        const scoresCSV = convertScoresToCSV(scores);
        zip.file(`scores_${date}.csv`, scoresCSV);
    }

    zip.generateAsync({ type: 'blob' })
        .then(blob => {
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = `backup_${date}.zip`;
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        })
        .catch(error => {
            console.error('ZIP 파일 생성 중 오류 발생:', error);
            alert('ZIP 파일 생성 중 오류가 발생했습니다.');
        });
}

// 날짜 형식: YYYY-MM-DD
function getFormattedDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}



//
// 백업된 CSV 파일 업로드
//

// 백업된 CSV 파일 파싱
function parseBackupCSV(csvData) {
    const lines = csvData.split('\n').filter(line => line.trim() !== ''); // 빈 줄 제거
    if (lines.length < 2) return []; // 헤더와 최소 한 줄의 데이터가 없으면 빈 배열 반환

    const headers = lines[0].split(',').map(header => header.trim()); // 헤더
    const data = [];

    for (let i = 1; i < lines.length; i++) {
        const currentLine = lines[i].split(',');
        if (currentLine.length === headers.length) {
            const row = {};
            headers.forEach((header, index) => {
                row[header] = currentLine[index].trim();
            });
            data.push(row);
        }
    }

    return data;
}


function uploadData-original(csvData, type) {
    const parsedData = parseBackupCSV(csvData);
    const duplicates = []; // 중복된 데이터를 저장할 배열

    switch (type) {
        case 'golfCourses':
            parsedData.forEach(row => {
                const isDuplicate = golfCourses.some(course =>
                    course.name === row['Golf Course Name'] &&
                    course.teeBoxes.some(teeBox =>
                        teeBox.gender === row['Gender'] &&
                        teeBox.teeBox === row['Tee Box']
                    )
                );
                if (!isDuplicate) {
                    // 중복이 아니면 추가
                    const course = golfCourses.find(c => c.name === row['Golf Course Name']);
                    if (course) {
                        course.teeBoxes.push({
                            gender: row['Gender'],
                            teeBox: row['Tee Box'],
                            courseRating: parseFloat(row['Course Rating']),
                            slopeRating: parseInt(row['Slope Rating'], 10),
                            par: parseInt(row['Par'], 10)
                        });
                    } else {
                        golfCourses.push({
                            name: row['Golf Course Name'],
                            teeBoxes: [{
                                gender: row['Gender'],
                                teeBox: row['Tee Box'],
                                courseRating: parseFloat(row['Course Rating']),
                                slopeRating: parseInt(row['Slope Rating'], 10),
                                par: parseInt(row['Par'], 10)
                            }]
                        });
                    }
                } else {
                    duplicates.push(row); // 중복 데이터 저장
                }
            });
            break;

        case 'members':
            parsedData.forEach(row => {
                const isDuplicate = members.some(member =>
                    member.name === row['Name'] &&
                    member.gender === row['Gender']
                );
                if (!isDuplicate) {
                    members.push({
                        name: row['Name'],
                        gender: row['Gender'],
                        baseHandicap: parseFloat(row['Base Handicap']),
                        senior: row['Senior'] === 'true',
                        photo: row['Photo'] || null
                    });
                } else {
                    duplicates.push(row); // 중복 데이터 저장
                }
            });
            break;

        case 'scores':
            parsedData.forEach(row => {
                const isDuplicate = scores.some(score =>
                    score.name === row['Name'] &&
                    score.date === row['Date'] &&
                    score.golfCourse === row['Golf Course'] &&
                    score.teeBox === row['Tee Box'] &&
                    score.score === parseInt(row['Score'], 10)
                );
                if (!isDuplicate) {
                    scores.push({
                        name: row['Name'],
                        date: row['Date'],
                        golfCourse: row['Golf Course'],
                        teeBox: row['Tee Box'],
                        score: parseInt(row['Score'], 10),
                        ignoreHandicap: row['Ignore Handicap'] === 'true',
                        ignoreLeague: row['Ignore League'] === 'true'
                    });
                } else {
                    duplicates.push(row); // 중복 데이터 저장
                }
            });
            break;

        default:
            console.error('잘못된 데이터 타입입니다.');
            return;
    }

    // 중복 데이터 로그 파일 생성
    if (duplicates.length > 0) {
        const duplicatesCSV = convertToCSV(duplicates);
        const blob = new Blob([duplicatesCSV], { type: 'text/csv' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `duplicates_${type}_${getFormattedDate()}.csv`;
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    // 로컬 스토리지 업데이트
    localStorage.setItem('golfCourses', JSON.stringify(golfCourses));
    localStorage.setItem('members', JSON.stringify(members));
    localStorage.setItem('scores', JSON.stringify(scores));

    alert('데이터 업로드가 완료되었습니다. 중복된 데이터는 로그 파일로 저장되었습니다.');
}

// Backup 된 CSV 파일을 Firebase 에 업로드
async function uploadData(csvData, type) {
  const parsedData = parseBackupCSV(csvData);
  const duplicates = []; // 중복된 데이터를 저장할 배열

  if (type === 'members') {
    for (const row of parsedData) {
      // 중복 확인: Firestore에서 동일한 이름과 성별의 회원이 있는지 확인
      const querySnapshot = await db.collection('members')
        .where('name', '==', row['Name'])
        .where('gender', '==', row['Gender'])
        .get();

      if (querySnapshot.empty) {
        // 중복이 아니면 Firestore에 회원 데이터 추가
        const newMember = {
          name: row['Name'],
          gender: row['Gender'],
          baseHandicap: parseFloat(row['Base Handicap']),
          senior: row['Senior'] === 'true',
          photo: row['Photo'] || null // 사진이 없으면 null
        };
        await addCSVMemberToFirestore(newMember);
      } else {
        duplicates.push(row); // 중복 데이터 저장
      }
    }

    // 중복 데이터가 있으면 로그 파일로 저장
    if (duplicates.length > 0) {
      const duplicatesCSV = convertToCSV(duplicates);
      const blob = new Blob([duplicatesCSV], { type: 'text/csv' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `duplicates_members_${getFormattedDate()}.csv`;
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }

    alert('회원 데이터 업로드가 완료되었습니다. 중복된 데이터는 로그 파일로 저장되었습니다.');
  } else {
    alert('잘못된 데이터 타입입니다. 회원 데이터를 업로드하려면 타입을 "members"로 지정하세요.');
  }
}




// 로그인 폼 제출 시
if (document.getElementById('uploadForm')) {
    document.getElementById('uploadForm').addEventListener('submit', function (event) {
        event.preventDefault(); // 폼 제출 방지

        const file = document.getElementById('uploadFile').files[0];
        if (!file) {
            alert('파일을 선택해주세요.');
            return;
        }

        const reader = new FileReader();
        reader.onload = function (e) {
            const csvData = e.target.result;
            const type = prompt('업로드할 데이터 타입을 입력하세요 (golfCourses, members, scores):');
            if (type && ['golfCourses', 'members', 'scores'].includes(type)) {
                uploadData(csvData, type);
            } else {
                alert('잘못된 데이터 타입입니다.');
            }
        };
        reader.readAsText(file);
    });
}




// 페이지 로드 시 백업 스케줄링 시작
//document.addEventListener('DOMContentLoaded', scheduleBackup);

// 매주 월요일 00:00:00에 데이터 백업 수행
function scheduleBackup() {
    const now = new Date();
    const dayOfWeek = now.getDay(); // 현재 요일 (0: 일요일, 1: 월요일, ..., 6: 토요일)
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    // 다음 월요일 00:00:00까지의 시간 계산
    let timeUntilNextMonday;
    if (dayOfWeek === 1 && hours === 0 && minutes === 0 && seconds === 0) {
        // 현재 시간이 월요일 00:00:00인 경우
        timeUntilNextMonday = 0;
    } else {
        // 다음 월요일까지의 시간 계산
        const daysUntilMonday = (7 - dayOfWeek + 1) % 7;
        timeUntilNextMonday = daysUntilMonday * 24 * 60 * 60 * 1000; // 밀리초 단위
    }

    // 다음 월요일 00:00:00에 백업 실행
    setTimeout(() => {
        exportAllData(); // 전체 데이터 백업
        setInterval(exportAllData, 7 * 24 * 60 * 60 * 1000); // 이후 매주 동일 시간에 반복
    }, timeUntilNextMonday);
}





//
// Firebase DB Integration
//
async function addCSVMemberToFirestore(member) {
  try {
    // Firestore의 'members' 컬렉션에 회원 데이터 추가
    await db.collection('members').add(member);
    console.log('회원이 Firestore에 추가되었습니다:', member.name);
  } catch (error) {
    console.error('Firestore에 회원 추가 중 오류 발생:', error);
  }
}


// Firestore에 회원 추가 함수
async function addMemberToFirestore(member) {
    try {
        const docRef = await db.collection('members').add(member);
        console.log('회원 추가 성공:', docRef.id);
    } catch (error) {
        console.error('회원 추가 중 오류 발생:', error);
    }
}

// 모든 회원 데이터를 Firestore에 추가하는 함수
async function addAllMembersToFirestore() {
    for (const member of members) {
        await addMemberToFirestore(member);
    }
    alert('모든 회원 데이터가 Firestore에 추가되었습니다.');
}











// DOM이 완전히 로드된 후에 실행
document.addEventListener('DOMContentLoaded', function () {
    if (window.location.pathname.includes('pargolsa-league.html')) {
        // initializePargolsaPage(); // 파골사 페이지 초기화
        initializeMonthSelect(); // 월 선택 드롭다운 초기화
        renderPargolsaTop5Chart(getCurrentMonth()); // 현재 월로 그래프 초기 렌더링
        renderPargolsaDetailTable(getCurrentMonth()); // 현재 월로 테이블 초기 렌더링
        //renderPargolsaRankingTable(); // 2025년 파골사 월별 핸디 대비 오버파 평균
    } else if (window.location.pathname.includes('index.html')) {
        createTagCloud(); // 젠체 회원 핸디캡 - 태그 스타일
    } else if (window.location.pathname.includes('monthly-scores.html')) {
        renderMonthlyAverageChart(); // 회원별 월간 점수 그래프 렌더링
    } else if (window.location.pathname.includes('weekly-handicap-chart.html')) {
        renderWeeklyHandicapChart(); // 최근 12주 핸디캡 그래프 렌더링
        updateHandicapRanking(); // 최신 핸디캡 순위 테이블 업데이트
    } else if (window.location.pathname.includes('member-detail-score.html')) { // 회원별 상세 점수
        updateMemberDetailSelect(); // 회원 선택 목록 업데이트
        document.getElementById('memberSelect').addEventListener('change', function () {
            const selectedMember = this.value;
            if (selectedMember) {
                showMemberDetails(selectedMember);
                renderMemberWeeklyHandicapChart(selectedMember); // 선택된 회원의 그래프 렌더링
            } else {
                clearMemberDetails();
                document.getElementById('memberWeeklyHandicapChart').innerHTML = ''; // 그래프 초기화
            }
        }); 
    } else if (window.location.pathname.includes('backup-import.html')) {
        // 데이터 백업 이벤트 리스터 추가
        const exportButton = document.getElementById('exportButton');
        if (exportButton) {
            exportButton.addEventListener('click', function (event) {
                event.preventDefault(); // 폼 제출 방지
                exportAllData(); // 데이터 백업 함수 호출
            });
        }
    } else if (window.location.pathname.includes('analytics.html')) {
        const analyticsData = calculateAnalyticsData();
        updateAnalyticsTable(analyticsData);
        updateAnalyticsCharts(analyticsData);
        updateTopHalfRatioChart(analyticsData);
        updateGolfCourseBarChart(scores);
    }
});



        

// 페이지 로드 시 초기화
if (document.getElementById('memberTable')) {
    updateMemberTable();
}
if (document.getElementById('golfCourseTable')) {
    updateGolfCourseTable();
}
if (document.getElementById('scoreTable')) {
    updateScoreTableHeader();
    updateScoreTable();
    updateHandicapRanking();
}
if (document.getElementById('golfCourseSelect')) {
    updateGolfCourseSelect();
}