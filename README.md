# dnacu-ChangiCho-Tnk2U-learn-node

- 조찬기
- 조현욱
- 한규현

Node js의 javascript debugging 방법을 정리하는 Repo입니다.

## breakpoint

중단점, 중지점은 software 개발에서 프로그램을 의도적으로 잠시 또는 아예 멈추게 하는 장소 (point)를 가리킨다.

디버깅 목적으로 넣는 것이다.

## watch

> Object.Watch 및 Object.Observe는 Firefox 58버전 이전에서만 사용할 수 있는 기능이다.

watch를 걸어둔 객체의 'property'가 변경될 때 실행되는 callback 을 지정할 수 있음

watch 대신 현재는 Proxy를 사용해 비슷한 기능을 수행할 수 있다.

watch는 특정 property의 변경 시점에 특정 action을 취하고자 할 때 적합하다.

```javascript
var targetObj = {};
var targetProxy = new Proxy(targetObj, {
  set: function (target, key, value) {
    console.log(`${key} set to ${value}`);
    target[key] = value;
  },
});

targetProxy.hello_world = "test"; // console: 'hello_world set to test'
```

## call stack

자바스크립트 엔진이 구동되면서 실행 중인 코드를 추적하는 공간을 의미한다.

javascript는 하나의 스레드로 단 1개의 동시성만 다루는 언어이다.

![이미지](https://t1.daumcdn.net/cfile/tistory/2768724E58E497A90D)

call stack 의 크기

```javscript
var i=0;
function inc() {
    i++;
    inc();
}
inc();
```

위 작업으로 i의 갯수를 측정함

- Mozilla Firefox : 11788
- Google Chrome : 15673
- Safari : 36244

## Step over / Step into / Step out

[크롬 디버거 공부용 데모 링크](https://developers.google.com/web/tools/chrome-devtools/javascript?hl=ko)

### Step over

다음 줄에 나오는 명령을 실행하고 다음 줄로 점프합니다.

### Step into

다음 줄에 함수 호출이 포함되어 있다면 Step Into는 해당 함수로 점프하고 첫 줄에서 멈춥니다.

'Step’과 유사하지만, 다음 문이 함수 호출일 때 'Step’과는 다르게 동작합니다(alert 같은 내장함수에는 해당하지 않고, 직접 작성한 함수일 때만 동작이 다릅니다).

'Step’은 함수 내부로 들어가 함수 본문 첫 번째 줄에서 실행을 멈춥니다. 반면 'Step over’는 보이지 않는 곳에서 중첩 함수를 실행하긴 하지만 함수 내로 진입하지 않습니다.

실행은 함수 실행이 끝난 후에 즉시 멈춥니다.

'Step over’은 함수 호출 시 내부에서 어떤 일이 일어나는지 궁금하지 않을 때 유용합니다.

### Step out

현재 함수의 나머지 부분을 실행한 다음 함수 호출 뒤 다음 명령문에서 일시 중지합니다.

### Step
다음 문을 실행합니다. 클릭하면 alert 창이 뜨는 것을 확인할 수 있습니다.

Step 버튼을 계속 누르면 스크립트 전체를 문 단위로 하나하나 실행할 수 있습니다.


