//랜덤번호 지정
//유저가 번호를 입력한다 그리고 go라는 버튼을 누름
//만약 유저가 번호를 맞추면, 맞췄습니다!
//랜덤번호<유저번호 Down!!!
//랜덤번호>유저번호 Up!!
//Reset 버튼을 누르면 게임이 리셋된다
// 5번의 기회를 다쓰면 게임이 끝난다.(더이상 추측불가, 버튼이 disable)
//유저가 1~100범위 밖에 숫자를 입력하면 알려준다. 기회를 깎지 않는다
//유저가 이미 입력한 숫자를 또 입력하면, 알려준다, 기회를 깎지 않는다

let computerNum = 0; //랜덤번호를 저장할 변수
let playButton = document.getElementById('play-button');
let userInput = document.getElementById('user-input');
let resultArea = document.getElementById('result-area');
let resetButton = document.getElementById('reset-button');
let chances = 5;
let gameOver = false;
let chanceArea = document.getElementById('chance-area');
let history = [];

playButton.addEventListener('click', play);
resetButton.addEventListener('click', reset);
//숫자입력후 커서 올렸을때 숫자 자동삭제
userInput.addEventListener('focus', function () {
  userInput.value = '';
}); //이름없는 함수 사용

function pickRandomNum() {
  computerNum = Math.floor(Math.random() * 100) + 1; // Math.random:0~1(1은 안나옴)까지 랜덤으로 나옴, Math.floor:소수점 버림
  console.log('정답', computerNum);
}

function play() {
  let userValue = userInput.value;
  //범위 밖 숫자를 입력했을 시
  if (userValue < 1 || userValue > 100 || userValue == 0) {
    resultArea.textContent = '1과 100사이 숫자를 입력해주세요';
    return;
  }
  //이미 입력한 값이 있는지
  if (history.includes(userValue)) {
    resultArea.textContent = '이미 입력한 숫자입니다. 다른숫자를 입력하세요';
    return;
  }

  chances--; //왜 바로 4가 아닌가? ->이해o
  chanceArea.textContent = `남은 기회: ${chances}번`;

  console.log('chance', chances);

  if (userValue < computerNum) {
    resultArea.textContent = 'Up!!';
  } else if (userValue > computerNum) {
    resultArea.textContent = 'Down!!';
  } else {
    playButton.disabled = true; //gameOver=true 해도되지만, 실패 뜸
    resultArea.textContent = '정답입니다!!';
  }

  history.push(userValue);
  console.log(history);

  if (chances == 0) {
    gameOver = true;
  }
  if (gameOver == true) {
    playButton.disabled = true;
    resultArea.textContent = '실패!!';
  }
}

function reset() {
  //user input 창이 깨끗하게 정리되고
  userInput.value = '';
  history = [];
  chances = 5;
  chanceArea.textContent = `남은 기회: ${chances}번`;
  // 새로운 번호가 생성되고
  pickRandomNum();
  // Go버튼이 다시 활성화되고
  playButton.disabled = false;
  resultArea.textContent = '숫자를 입력하세요';
}

pickRandomNum();
